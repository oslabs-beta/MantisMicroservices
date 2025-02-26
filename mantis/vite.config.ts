import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // change the port to the one we are going to use for backend, same with endpoint
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },

    },

    watch: {
      ignored: [
        '**/influx_data/**',  // Ignore InfluxDB WAL files
        '**/grafana_data/**', // Ignore Grafana DB files
        '**/server/**/*.ts',  // Ignore backend changes
        '**/node_modules/**', // Ignore dependencies
      ],
    },

  },
});
