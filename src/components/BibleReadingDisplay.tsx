interface ReadingSectionProps {
    title: string;
    content: string;
    bgClass: string;
  }

  const ReadingSection: React.FC<ReadingSectionProps> = ({ title, content, bgClass }) => (
    <div className={`p-4 rounded-lg shadow-md ${bgClass}`}>
      <h2 className="font-semibold text-lg">{title}</h2>
      <p dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );

  export default ReadingSection;