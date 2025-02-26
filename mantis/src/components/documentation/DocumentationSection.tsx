interface DocumentationSectionProps {
  id: string;
  title: string;
  content: React.ReactNode;
}

const DocumentationSection: React.FC<DocumentationSectionProps> = ({ id, title, content }) => {
  return (
    <section id={id} className="mb-12 bg-[#0a1e19] bg-opacity-80 p-6 rounded-lg backdrop-blur-sm border border-[#164237]">
      <h2 className="text-3xl font-semibold mb-4 border-b border-[#164237] pb-2 text-white">{title}</h2>
      <div className="text-gray-300">
        {content}
      </div>
    </section>
  );
};

export default DocumentationSection; 