import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "../components/searchBar";

// Type for search result verses
type SearchResult = {
  book_name: string;
  chapter: number;
  verse: number;
  text: string;
};

const English: React.FC = () => {
  const bibleChapters: Record<string, number> = {
    Genesis: 50, Exodus: 40, Leviticus: 27, Numbers: 36, Deuteronomy: 34,
    Joshua: 24, Judges: 21, Ruth: 4, "1 Samuel": 31, "2 Samuel": 24,
    "1 Kings": 22, "2 Kings": 25, "1 Chronicles": 29, "2 Chronicles": 36,
    Ezra: 10, Nehemiah: 13, Esther: 10, Job: 42, Psalms: 150,
    Proverbs: 31, Ecclesiastes: 12, "Song of Solomon": 8, Isaiah: 66,
    Jeremiah: 52, Lamentations: 5, Ezekiel: 48, Daniel: 12, Hosea: 14,
    Joel: 3, Amos: 9, Obadiah: 1, Jonah: 4, Micah: 7, Nahum: 3,
    Habakkuk: 3, Zephaniah: 3, Haggai: 2, Zechariah: 14, Malachi: 4,
    Matthew: 28, Mark: 16, Luke: 24, John: 21, Acts: 28, Romans: 16,
    "1 Corinthians": 16, "2 Corinthians": 13, Galatians: 6, Ephesians: 6,
    Philippians: 4, Colossians: 4, "1 Thessalonians": 5, "2 Thessalonians": 3,
    "1 Timothy": 6, "2 Timothy": 4, Titus: 3, Philemon: 1, Hebrews: 13,
    James: 5, "1 Peter": 5, "2 Peter": 3, "1 John": 5, "2 John": 1,
    "3 John": 1, Jude: 1, Revelation: 22,
  };

  const [selectedBook, setSelectedBook] = useState("Genesis");
  const [verses, setVerses] = useState<string[]>([]);
  const [selectedChapter, setSelectedChapter] = useState<number | null>(1);
  const [chapterText, setChapterText] = useState<string>("");
  const [isChapterSelected, setIsChapterSelected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setError("");
    setSearchResults([]);

    try {
      const response = await axios.get(`https://bible-api.com/${encodeURIComponent(query)}`);
      if (response.data.verses) {
        setSearchResults(response.data.verses);
      } else if (response.data.text) {
        setSearchResults([{
          book_name: response.data.reference,
          chapter: 0,
          verse: 0,
          text: response.data.text,
        }]);
      }
    } catch (err) {
      setError("No results found. Try a valid keyword or reference.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchChapter = async (book: string, chapter: number) => {
    try {
      const response = await fetch(
        `https://bible-api.com/${encodeURIComponent(`${book} ${chapter}`)}?translation=kjv`
      );
      const data = await response.json();
      if (data.verses) {
        const lines = data.verses.map((v: any) => `${v.verse}: ${v.text.trim()}`);
        setVerses(lines);
        setChapterText(lines.join("\n"));
      } else {
        setVerses(["Error loading verses."]);
        setChapterText("Error loading chapter text.");
      }
    } catch (error) {
      console.error("Error fetching verses:", error);
      setVerses(["Failed to load verses."]);
      setChapterText("Failed to load chapter text.");
    }
  };

  useEffect(() => {
    if (selectedChapter !== null) {
      fetchChapter(selectedBook, selectedChapter);
    }
  }, [selectedBook, selectedChapter]);

  const chapters = Array.from({ length: bibleChapters[selectedBook] }, (_, i) => i + 1);

  const handleChapterSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const chap = parseInt(event.target.value, 10);
    setSelectedChapter(chap);
    setIsChapterSelected(true);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white p-4">
      <div className="p-4 mt-12">
        {/* Search Bar */}
        <SearchBar onSearch={handleSearch} />

        {isLoading && <p className="text-blue-500">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="space-y-4 mt-4">
            <h2 className="text-xl font-semibold mt-12">Search Results</h2>
            {searchResults.map((verse, i) => (
              <div key={i} className="p-4 border rounded shadow">
                <p className="font-bold">
                  {verse.book_name} {verse.chapter}:{verse.verse}
                </p>
                <p>{verse.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Book and Chapter Selectors */}
      <div className="mb-4 w-full md:w-1/2">
        <div className="flex flex-row items-start">

          {/* Book Selector */}
          <select
            value={selectedBook}
            onChange={(e) => {
              setSelectedBook(e.target.value);
              setSelectedChapter(1);
              setIsChapterSelected(false);
            }}
            className="mr-8 w-full p-2 border rounded-md dark:bg-gray-800 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {Object.keys(bibleChapters).map((book) => (
              <option key={book} value={book}>
                {book}
              </option>
            ))}
          </select>

          {/* Chapter Selector */}
          <select
            value={selectedChapter ?? ""}
            onChange={handleChapterSelect}
            className="mr-8 w-full p-2 border rounded-md dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {chapters.map((chap) => (
              <option key={chap} value={chap}>
                Chapter {chap}
              </option>
            ))}
          </select>


          {/* Audio Control */}
          <div>
            <button
              onClick={() => {
                if (isSpeaking) {
                  speechSynthesis.cancel();
                  setIsSpeaking(false);
                } else {
                  const utterance = new SpeechSynthesisUtterance(chapterText);
                  utterance.lang = "en-US";
                  utterance.rate = 1;
                  speechSynthesis.speak(utterance);
                  setIsSpeaking(true);
                }
              }}
              className={`px-4 py-2 rounded-md ${isSpeaking ? "bg-red-600" : "bg-blue-600"} text-white hover:bg-blue-700 focus:outline-none`}
            >
              {isSpeaking ? "🔇" : "🔊"}
            </button>
          </div>
        </div>
      </div>

      {/* Verses Display */}
      <div className="pb-24 flex-1 w-full md:w-3/4 mt-6">
        <h2 className="text-xl font-bold mb-2">
          {selectedBook} {selectedChapter}
        </h2>
        <div className="space-y-4">
          {verses.map((line, idx) => (
            <div
              key={idx}
              className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow border dark:border-gray-700"
            >
              <p className="whitespace-pre-wrap">{line}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default English;
