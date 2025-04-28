import { useState, useRef } from "react";

interface ReadingSectionProps {
  title: string;
  content?: string;
  bgClass?: string;
  initiallyOpen?: boolean;
}

const ReadingSection = ({ title, content, bgClass = "", initiallyOpen = false }: ReadingSectionProps) => {
  const [isOpen, setIsOpen] = useState(initiallyOpen || false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleCollapse = () => {
    // Scroll to the section top before collapsing
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => {
      setIsOpen(false);
    }, 300); // Wait for scroll to finish before collapsing
  };

  return (
    <div
      ref={sectionRef}
      className={`rounded-lg shadow-md p-4 transition-all duration-300 ${bgClass}`}
    >
      {/* Expand Icon & Title (Top) */}
      {!isOpen && (
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          <h2 className="text-lg font-bold">{title}</h2>
          <button className="text-sm text-blue-600 dark:text-blue-400 underline">
            Expand
          </button>
        </div>
      )}

      {/* Expanded Content */}
      {isOpen && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-bold">▼ {title}</h2>
          </div>

          <div
            className="text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: content || "" }}
          />

          {/* Collapse Button at Bottom */}
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleCollapse}
              className="text-sm text-blue-600 dark:text-blue-400 underline"
            >
              ▲ Collapse
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadingSection;
