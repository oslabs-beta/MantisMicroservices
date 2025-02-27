import { useEffect, useState } from 'react';

interface Section {
  id: string;
  title: string;
  content?: React.ReactNode;
}

interface TableOfContentsProps {
  sections: Section[];
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ sections }) => {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -70% 0px', threshold: 0 }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => {
      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) observer.unobserve(element);
      });
    };
  }, [sections]);

  return (
    <div className="hidden md:block sticky top-24 self-start max-h-[calc(100vh-8rem)] overflow-y-auto py-4 w-64">
      <div className="bg-[#0a1e19]/80 backdrop-blur-sm rounded-lg border border-[#164237] p-4">
        <h3 className="text-lg font-medium text-emerald-400 px-3 mb-4">Contents</h3>
        <nav>
          <ul className="space-y-1">
            {sections.map((section) => (
              <li key={section.id} className="px-2">
                <a 
                  href={`#${section.id}`} 
                  className={`
                    block pl-3 border-l-2 py-2 text-sm transition-all duration-200 hover:text-emerald-300
                    ${activeSection === section.id 
                      ? 'border-emerald-400 text-emerald-300 font-medium bg-emerald-900/20' 
                      : 'border-gray-700 text-gray-400 hover:border-gray-500'}
                  `}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default TableOfContents; 