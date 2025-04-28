import { useEffect, useState } from "react";
import bibleReadingPlan from "../data/bibleReadingPlan.json";
import yorubaBible from "../data/yoruba_bible_named.json";
import bookMap from "../data/bookMap.json";

export default function YorubaBibleCalendar() {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [readings, setReadings] = useState<any>(null);
  const [expandedSection, setExpandedSection] =
    useState<string>("Old Testament I");
  const [bookmarks, setBookmarks] = useState<{ [key: string]: boolean }>({});
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const selected = new Date(selectedDate);
    const month = selected.toLocaleString("default", { month: "long" });
    const day = selected.getDate().toString()
    const plan = (bibleReadingPlan as any)?.yearly_bible_calendar?.months?.[
      month
    ]?.[day];
    setReadings(plan || null);
  }, [selectedDate]);

  useEffect(() => {
    const saved = localStorage.getItem("yoruba_bible_bookmarks");
    if (saved) setBookmarks(JSON.parse(saved));
  }, []);

  const toggleBookmark = (ref: string) => {
    const updated = { ...bookmarks, [ref]: !bookmarks[ref] };
    setBookmarks(updated);
    localStorage.setItem("yoruba_bible_bookmarks", JSON.stringify(updated));
  };
  const getYorubaPassageText = (reference: string) => {
    if (!reference) return "No reference provided.";

    const parts = reference.trim().split(" ");
    if (parts.length < 2) return "Invalid reference format.";

    const range = parts[parts.length - 1]; // last part is the range
    const book = parts.slice(0, -1).join(" "); // rest is the book name

    const yorubaBook = (bookMap as any)[book];
    if (!yorubaBook) return `📚 Book not found: ${book}`;

    const source =
      (yorubaBible as any).Old[yorubaBook] ||
      (yorubaBible as any).New[yorubaBook];

    if (!source) return `📚 Book not found: ${yorubaBook}`;

    let text = "";

    if (range.includes("-")) {
      const [start, end] = range.split("-");
      const [startChap, startVerse] = start.split(":").map(Number);
      const [endChap, endVerse] = (end?.split(":") || [startChap, startVerse]).map(Number);
      for (let ch = startChap; ch <= endChap; ch++) {
        const verses = source?.[ch.toString()];
        if (!verses) continue;
        const from = ch === startChap ? startVerse : 1;
        const to = ch === endChap ? endVerse : verses.length;
        for (let i = from - 1; i < to; i++) {
          const v = verses[i];
          if (v) text += `${ch}:${v.verse} ${v.text}\n`;
        }
      }
    } else if (range.includes(":")) {
      const [chapter, verse] = range.split(":").map(Number);
      const verses = source?.[chapter.toString()];
      const v = verses?.[verse - 1];
      return v ? `${chapter}:${v.verse} ${v.text}` : "Verse not found.";
    } else {
      const chapter = parseInt(range);
      const verses = source?.[chapter.toString()];
      if (!verses) return "Chapter not found.";
      for (const v of verses) {
        text += `${chapter}:${v.verse} ${v.text}\n`;
      }
    }

    return text || "🔍 Passage not found.";
  };



  return (
    <div
      style={{ fontFamily: "EB Garamond" }}
      className={`min-h-screen p-4 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">📖 Yoruba Bible Daily Reading</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      <div className="flex gap-4 flex-wrap mb-6">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border rounded px-3 py-2"
        />
      </div>
      {readings ? (
        <div className="space-y-4">
          {["Old Testament I", "Old Testament II", "New Testament"].map(
            (section) => (
              <div
                key={section}
                className={`border rounded shadow ${
                  darkMode
                    ? "bg-gray-800 border-gray-600"
                    : "bg-gray-100 border-gray-300"
                }`}
              >
                <div
                  className="flex items-center justify-between px-4 py-2 cursor-pointer"
                  onClick={() =>
                    setExpandedSection((prev) =>
                      prev === section ? "" : section
                    )
                  }
                >
                  <h2 className="text-xl font-semibold">
                    {section}: {readings[section]}
                  </h2>
                  <div className="flex gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBookmark(readings[section]);
                      }}
                      className={`text-xl ${
                        bookmarks[readings[section]]
                          ? "text-yellow-400"
                          : "text-gray-400"
                      } hover:text-yellow-500`}
                      title="Bookmark"
                    >
                      ★
                    </button>
                    <span>{expandedSection === section ? "🔽" : "▶️"}</span>
                  </div>
                </div>
                {expandedSection === section && (
                  <pre className="p-4 whitespace-pre-wrap text-lg">
                    {getYorubaPassageText(readings[section])}
                  </pre>
                )}
              </div>
            )
          )}
        </div>
      ) : (
        <p className="text-red-500">❌ No reading found for this date.</p>
      )}
    </div>
  );
}
