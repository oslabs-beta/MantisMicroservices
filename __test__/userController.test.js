// Using plain JS so we don't run into TS type conflicts
const { createNewUser, loginUser } = require("../server/controllers/userController");
const User = require("../server/models/userModel");
const { BucketsAPI, AuthorizationsAPI } = require("@influxdata/influxdb-client-apis");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ------------------------
// MOCK ALL EXTERNAL MODULES
// ------------------------
jest.mock("../server/models/userModel");
jest.mock("@influxdata/influxdb-client-apis");
jest.mock("bcryptjs");
jest.mock("jsonwebtoken");

describe("User Controller", () => {
  // Helpers to create mock req/res/next
  function mockReq(body = {}) {
    return { body };
  }

  function mockRes() {
    const res = {};
    // mock chain .status(...).json(...)
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  }

  let req, res, nextFn;

  beforeEach(() => {
    jest.clearAllMocks();
    req = mockReq();
    res = mockRes();
    nextFn = jest.fn();
  });

  // --------------------------
  // CREATE NEW USER TESTS
  // --------------------------
  describe("createNewUser", () => {
    it("should create a new user with bucket & token when data is valid", async () => {
      req = mockReq({
        email: "test@example.com",
        username: "testuser",
        password: "secret123",
      });

      // Mock: no existing user
      User.findOne.mockResolvedValue(null);

      // Mock Influx Buckets & Authorizations
      const postBucketsMock = jest.fn().mockResolvedValue({ id: "fake_bucket_id" });
      const postAuthorizationsMock = jest.fn().mockResolvedValue({ token: "fake_influx_token" });
      BucketsAPI.mockImplementation(() => ({
        postBuckets: postBucketsMock,
      }));
      AuthorizationsAPI.mockImplementation(() => ({
        postAuthorizations: postAuthorizationsMock,
      }));

      // Mock user save
      User.mockImplementation(() => ({
        save: jest.fn().mockResolvedValue(true),
      }));

      await createNewUser(req, res, nextFn);

      expect(User.findOne).toHaveBeenCalledWith({ username: "testuser" });
      expect(postBucketsMock).toHaveBeenCalledTimes(1);
      expect(postAuthorizationsMock).toHaveBeenCalledTimes(1);

      // Check that new User was constructed with correct fields
      expect(User).toHaveBeenCalledWith({
        email: "test@example.com",
        username: "testuser",
        password: "secret123",
        influxToken: "fake_influx_token",
        bucket: "bucket_testuser",
      });

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "User created succesfully",
          username: "testuser",
          email: "test@example.com",
          influxToken: "fake_influx_token",
        })
      );
    });

    it("should return 400 if user already exists", async () => {
      req = mockReq({
        email: "existing@example.com",
        username: "existinguser",
        password: "secret123",
      });

      User.findOne.mockResolvedValue({ _id: "123", username: "existinguser" });

      await createNewUser(req, res, nextFn);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "User already exists." });
    });

    it("should call next() if missing fields", async () => {
      req = mockReq({ username: "", email: "", password: "" });
      await createNewUser(req, res, nextFn);

      // We expect next() to be called, not res.status
      expect(nextFn).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });
  });

  // --------------------------
  // LOGIN USER TESTS
  // --------------------------
  describe("loginUser", () => {
    it("should log in and return token if credentials are correct", async () => {
      req = mockReq({
        email: "login@example.com",
        password: "secret123",
      });

      User.findOne.mockResolvedValue({
        _id: "user123",
        username: "loginuser",
        email: "login@example.com",
        password: "hashed_password",
        bucket: "bucket_loginuser",
      });

      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue("fake_jwt_token");

      await loginUser(req, res, nextFn);

      expect(User.findOne).toHaveBeenCalledWith({ email: "login@example.com" });
      expect(bcrypt.compare).toHaveBeenCalledWith("secret123", "hashed_password");
      expect(jwt.sign).toHaveBeenCalled();

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Logged in successfully",
        token: "fake_jwt_token",
        user: {
          _id: "user123",
          username: "loginuser",
          email: "login@example.com",
          bucket: "bucket_loginuser",
        },
      });
    });

    it("should return 401 if password is incorrect", async () => {
      req = mockReq({
        email: "login@example.com",
        password: "wrongpassword",
      });

      User.findOne.mockResolvedValue({
        _id: "user123",
        username: "loginuser",
        email: "login@example.com",
        password: "hashed_password",
      });

      bcrypt.compare.mockResolvedValue(false);

      await loginUser(req, res, nextFn);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        error: "Invalid username or password.",
      });
    });

    it("should return 401 if user does not exist", async () => {
      req = mockReq({
        email: "notfound@example.com",
        password: "secret123",
      });
      User.findOne.mockResolvedValue(null);

      await loginUser(req, res, nextFn);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        error: "Invalid username or password.",
      });
    });

    it("should call next(error) if something goes wrong", async () => {
      const fakeError = new Error("DB error");
      User.findOne.mockRejectedValue(fakeError);

      req = mockReq({ email: "login@example.com", password: "secret123" });
      await loginUser(req, res, nextFn);

      expect(nextFn).toHaveBeenCalledWith(fakeError);
    });
  });
});
