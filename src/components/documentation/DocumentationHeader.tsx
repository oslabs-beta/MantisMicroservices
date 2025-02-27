import { Link } from 'react-router-dom';

const DocumentationHeader: React.FC = () => {
  return (
    <header className="mb-8 max-w-5xl mx-auto relative z-10">
      <h1 className="text-5xl font-bold mb-2 text-white">Mantis Documentation</h1>
      <p className="text-xl text-gray-300">
        An open-source API Gateway microservice designed to provide real-time monitoring and visualization of application health and performance.
      </p>
      <nav className="mt-4">
        <Link to="/" className="text-emerald-400 hover:text-emerald-300 hover:underline transition-colors">
          Back to Home
        </Link>
      </nav>
    </header>
  );
};

export default DocumentationHeader; 