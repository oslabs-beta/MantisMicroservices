import React from 'react';

export const DocumentationFooter: React.FC = () => {
  return (
    <footer className="mt-16 pt-8 border-t border-emerald-800/30 text-center text-gray-400">
      <div className="max-w-4xl mx-auto">
        <p className="mb-2">
          Mantis is an open-source project released under the MIT License.
        </p>
        <p className="mb-4">
          Copyright © {new Date().getFullYear()} Mantis Project.
        </p>
        <div className="flex justify-center space-x-6 text-sm">
          <a 
            href="https://github.com/orgs/oslabs-beta/teams/mantis_team" 
            className="text-emerald-400 hover:text-emerald-300 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a href="#" className="text-emerald-400 hover:text-emerald-300 transition-colors">
            Documentation
          </a>
          <a href="#" className="text-emerald-400 hover:text-emerald-300 transition-colors">
            API Reference
          </a>
          <a href="#" className="text-emerald-400 hover:text-emerald-300 transition-colors">
            Community
          </a>
        </div>
      </div>
    </footer>
  );
}; 