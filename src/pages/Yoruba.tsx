import { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_BIBLE_API_KEY;
const BIBLE_ID = "b8d1feac6e94bd74-01"; // Yoruba Bible

type Book = {
  id: string;
  name: string;
};

type Chapter = {
  id: string;
  number: string; // API sometimes returns as string
};

type Verse = {
  id: string;
  text: string;
  reference?: string;
  verse?: string;
};

const Yoruba = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBookId, setSelectedBookId] = useState("");
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [selectedChapter, setSelectedChapter] = useState("");
  const [verses, setVerses] = useState<string | Verse[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch books
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          `https://api.scripture.api.bible/v1/bibles/${BIBLE_ID}/books`,
          {
            headers: {
              "api-key": API_KEY,
            },
          }
        );
        setBooks(response.data.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, []);

  // Fetch chapters when a book is selected
  useEffect(() => {
    const fetchChapters = async () => {
      if (!selectedBookId) return;
      try {
        const response = await axios.get(
          `https://api.scripture.api.bible/v1/bibles/${BIBLE_ID}/books/${selectedBookId}/chapters`,
          {
            headers: {
              "api-key": API_KEY,
            },
          }
        );
        setChapters(response.data.data);
      } catch (error) {
        console.error("Error fetching chapters:", error);
      }
    };
    fetchChapters();
  }, [selectedBookId]);

  // Fetch verses when a chapter is selected
  useEffect(() => {
    const fetchChapterContent = async () => {
      if (!selectedChapter) return;
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://api.scripture.api.bible/v1/bibles/${BIBLE_ID}/chapters/${selectedChapter}`,
          {
            headers: {
              "api-key": API_KEY,
            },
          }
        );
        const content = response.data.data.content;
        const items = response.data.data.verses;
        setVerses(items?.length ? items : content);
      } catch (error) {
        console.error("Error fetching verses:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchChapterContent();
  }, [selectedChapter]);

  return (
    <div className="pb-24 max-w-4xl mx-auto p-6 text-gray-900 dark:text-white">
      <h1 className="text-2xl font-bold text-center mb-4">📖 Bíbélì Mímọ́ Yorùbá</h1>

      {/* Selectors */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <select
          className="w-full p-2 border rounded"
          onChange={(e) => {
            setSelectedBookId(e.target.value);
            setSelectedChapter("");
            setChapters([]);
            setVerses([]);
          }}
          value={selectedBookId}
        >
          <option value="">📚 Select Book</option>
          {books.map((book) => (
            <option key={book.id} value={book.id}>
              {book.name}
            </option>
          ))}
        </select>

        <select
          className="w-full p-2 border rounded"
          onChange={(e) => setSelectedChapter(e.target.value)}
          value={selectedChapter}
          disabled={!chapters.length}
        >
          <option value="">📘 Select Chapter</option>
          {chapters.map((chapter) => (
            <option key={chapter.id} value={chapter.id}>
              Chapter {chapter.number}
            </option>
          ))}
        </select>
      </div>

      {/* Verses Display */}
      {isLoading ? (
        <p className="text-center text-lg">⏳ N ń kó àyọkà wá...</p>
      ) : (
        <div className="space-y-3">
          {selectedChapter && verses.length === 0 && (
            <p className="italic text-center">Ko si àyọkà fun ori yìí.</p>
          )}

          {/* Display string HTML (fallback) */}
          {typeof verses === "string" ? (
            <div
              className="bg-white border p-4 rounded shadow prose max-w-none"
              dangerouslySetInnerHTML={{ __html: verses }}
            />
          ) : (
            // Display each verse in new line
            verses.map((verse: Verse, idx) => (
              <div
                key={idx}
                className="bg-white border p-3 rounded shadow whitespace-pre-wrap"
              >
                <p>
                  <span className="font-bold whitespace-pre-wrap">Verse {verse.verse ?? idx + 1}:</span>{" "}
                  <span dangerouslySetInnerHTML={{ __html: verse.text }} />
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Yoruba;
