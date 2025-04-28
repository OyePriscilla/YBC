import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Sun, Moon, ArrowRight, ArrowLeft, Bookmark } from 'lucide-react';

interface Verse {
  verse: number;
  text: string;
}

interface Book {
  [chapter: string]: Verse[];
}

interface Testament {
  [book: string]: Book;
}

interface BibleData {
  Old: Testament;
  New: Testament;
}

const YorubaBibleViewer: React.FC = () => {
  const [bibleData, setBibleData] = useState<BibleData | null>(null);
  const [currentTestament, setCurrentTestament] = useState<'Old' | 'New'>('Old');
  const [currentBook, setCurrentBook] = useState<string>('Genesisi');
  const [currentChapter, setCurrentChapter] = useState<string>('1');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [bookmarkedVerses, setBookmarkedVerses] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState<string>("");


  const handleSearch = async () => {
    const res = await fetch(
      `https://yorubabibleapi.onrender.com/search?query=${encodeURIComponent(
        searchQuery
      )}`
    );
    const data = await res.text();
    setSearchResult(data);
  };


  useEffect(() => {
    const fetchBible = async () => {
      try {
        const response = await axios.get<BibleData>("/yoruba_bible_named.json");
        setBibleData(response.data);
      } catch (error) {
        console.error('Error fetching Bible data:', error);
      }
    };
    fetchBible();
  }, []);


  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentBook, currentChapter]);

  const toggleBookmark = (verse: number) => {
    const key = `${currentBook}-${currentChapter}-${verse}`;
    setBookmarkedVerses((prev) =>
      prev.includes(key) ? prev.filter((v) => v !== key) : [...prev, key]
    );
  };

  const getCurrentData = () => bibleData?.[currentTestament][currentBook] || {};

  const nextChapter = () => {
    if (!bibleData) return;
    const chapters = Object.keys(getCurrentData());
    const index = chapters.indexOf(currentChapter);
    if (index < chapters.length - 1) {
      setCurrentChapter(chapters[index + 1]);
    } else {
      const allBooks = Object.keys(bibleData[currentTestament]);

      const bookIndex = allBooks.indexOf(currentBook);
      if (bookIndex < allBooks.length - 1) {
        const nextBook = allBooks[bookIndex + 1];
        const nextChapters = Object.keys(bibleData[currentTestament][nextBook]);
        setCurrentBook(nextBook);
        setCurrentChapter(nextChapters[0]);
      } else if (currentTestament === 'Old') {
        const newBooks = Object.keys(bibleData['New']);
        setCurrentTestament('New');
        setCurrentBook(newBooks[0]);
        setCurrentChapter(Object.keys(bibleData['New'][newBooks[0]])[0]);
      }
    }
  };

  const previousChapter = () => {
    if (!bibleData) return;
    const chapters = Object.keys(getCurrentData());
    const index = chapters.indexOf(currentChapter);
    if (index > 0) {
      setCurrentChapter(chapters[index - 1]);
    } else {
      const allBooks = Object.keys(bibleData[currentTestament]);
      const bookIndex = allBooks.indexOf(currentBook);
      if (bookIndex > 0) {
        const prevBook = allBooks[bookIndex - 1];
        const prevChapters = Object.keys(bibleData[currentTestament][prevBook]);
        setCurrentBook(prevBook);
        setCurrentChapter(prevChapters[prevChapters.length - 1]);
      } else if (currentTestament === 'New') {
        const oldBooks = Object.keys(bibleData['Old']);
        const lastBook = oldBooks[oldBooks.length - 1];
        const lastChapters = Object.keys(bibleData['Old'][lastBook]);
        setCurrentTestament('Old');
        setCurrentBook(lastBook);
        setCurrentChapter(lastChapters[lastChapters.length - 1]);
      }
    }
  };

  const getCurrentVerses = (): Verse[] => {
    return getCurrentData()?.[currentChapter] || [];
  };

  const allBooks = bibleData ? Object.keys(bibleData[currentTestament]) : [];
  const allChapters = bibleData?.[currentTestament][currentBook] ? Object.keys(bibleData[currentTestament][currentBook]) : [];

  return (
    <div className={`min-h-screen p-4 transition-colors duration-500 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Bibeli Mimo</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
          aria-label="Toggle dark mode"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      <div className="flex flex-wrap gap-4 mb-4">
        <select
          value={currentTestament}
          onChange={(e) => {
            const newTestament = e.target.value as 'Old' | 'New';
            setCurrentTestament(newTestament);
            const newBook = Object.keys(bibleData?.[newTestament] || {})[0];
            const newChapter = Object.keys(bibleData?.[newTestament]?.[newBook] || {})[0];
            setCurrentBook(newBook);
            setCurrentChapter(newChapter);
          }}
          className="p-2 border rounded dark:bg-gray-700 dark:text-white"
        >
          <option value="Old">Old Testament</option>
          <option value="New">New Testament</option>
        </select>

        <select
          value={currentBook}
          onChange={(e) => {
            setCurrentBook(e.target.value);
            setCurrentChapter('1');
          }}
          className="p-2 border rounded dark:bg-gray-700 dark:text-white"
        >
          {allBooks.map((book) => (
            <option key={book} value={book}>{book}</option>
          ))}
        </select>

        <select
          value={currentChapter}
          onChange={(e) => setCurrentChapter(e.target.value)}
          className="p-2 border rounded dark:bg-gray-700 dark:text-white"
        >
          {allChapters.map((chapter) => (
            <option key={chapter} value={chapter}>Chapter {chapter}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="🔍 Search Yoruba Bible... e.g Jesu"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border rounded px-3 py-2 flex-grow"
        />

        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Search
        </button>
      </div>
      {Array.isArray(searchResult) && searchResult.length > 0 && (
        <div className="mt-4 bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h3 className="font-bold mb-2">🔍 Search Result:</h3>
          <pre className="whitespace-pre-wrap text-sm">
            {searchResult.map((item, index) => (
              <div key={index}>
                {`${item.book} ${item.chapter}:${item.verse} ${item.text}`}
              </div>
            ))}
          </pre>
        </div>
      )}
      <div className="flex justify-between mb-4">
        <button
          onClick={previousChapter}
          className="flex items-center gap-2 text-blue-500 hover:text-blue-700 transition-colors"
        >
          <ArrowLeft size={18} /> Previous
        </button>
        <button
          onClick={nextChapter}
          className="flex items-center gap-2 text-blue-500 hover:text-blue-700 transition-colors"
        >
          Next <ArrowRight size={18} />
        </button>
      </div>

      <div className="grid gap-4">
        {getCurrentVerses().map(({ verse, text }) => {
          const key = `${currentBook}-${currentChapter}-${verse}`;
          const isBookmarked = bookmarkedVerses.includes(key);
          return (
            <div
              key={verse}
              className="p-4 rounded-xl shadow-lg border  dark:bg-gray-800 transition-all duration-300 hover:scale-[1.01]"
            >
              <div className="flex justify-between">
                <span className="font-semibold">{verse}</span>
                <button onClick={() => toggleBookmark(verse)} aria-label={`Bookmark verse ${verse}`}>
                  <Bookmark
                    className={`transition-colors duration-300 ${isBookmarked ? 'text-yellow-500 fill-yellow-500' : 'text-gray-400 dark:text-gray-300'}`}
                    size={18}
                  />
                </button>
              </div>
              <p className=" text-justify mt-2 leading-relaxed font-serif text-lg">{text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default YorubaBibleViewer;
