import { useState, useEffect } from "react";
import bibleReadingPlan from "../data/bibleReadingPlan.json";
import ReadingSection from "../components/BibleReadingDisplay";

interface Reading {
  oldTestament1: string;
  oldTestament2: string;
  newTestament: string;
}

type MonthName =
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";

// ... (import statements remain unchanged)

const BibleCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [reading, setReading] = useState<Reading | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [selectedSection, setSelectedSection] = useState("Old Testament I & II, New Testament");

  const toggleBookmark = (date: string): void => {
    setBookmarks((prev) => {
      const updated = prev.includes(date)
        ? prev.filter((d) => d !== date)
        : [...prev, date];
      localStorage.setItem("bookmarks", JSON.stringify(updated));
      return updated;
    });
  };

  const isBookmarked = (date: string): boolean => {
    return bookmarks.includes(date);
  };

  useEffect(() => {
    const storedBookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    setBookmarks(storedBookmarks);
  }, []);

  const isToday = (date: string) =>
    date === new Date().toISOString().split("T")[0];

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    const newMode = !darkMode;
    localStorage.setItem("darkMode", newMode ? "enabled" : "disabled");
    document.documentElement.classList.toggle("dark", newMode);
  };

  useEffect(() => {
    const storedMode = localStorage.getItem("darkMode");
    if (storedMode === "enabled") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const getMonthName = (dateString: string): MonthName => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", { month: "long" }) as MonthName;
  };

  const getDay = (dateString: string): number => {
    const date = new Date(dateString);
    return date.getDate();
  };

  const navigateDay = (offset: number) => {
    const currentDate = new Date(selectedDate);
    currentDate.setDate(currentDate.getDate() + offset);
    setSelectedDate(currentDate.toISOString().split("T")[0]);
  };

  // @ts-expect-error: The next line causes an error, but it's intentional
  const renderCalendarDays = (month: string) => {
    const year = new Date().getFullYear();
    const monthIndex = new Date().getMonth();
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

    return Array.from({ length: daysInMonth }, (_, i) => i + 1).map((date) => {
      const fullDate = `${year}-${monthIndex + 1}-${date}`;
      return (
        <div
          key={date}
          className={`calendar-day p-2 rounded shadow-md cursor-pointer hover:bg-blue-100 ${
            isToday(fullDate) ? "bg-blue-500 text-white" : ""
          }`}
          onClick={() => setSelectedDate(fullDate)}
        >
          {date}
          <button
            className="ml-2"
            onClick={(e) => {
              e.stopPropagation();
              toggleBookmark(fullDate);
            }}
          >
            {isBookmarked(fullDate) ? "⭐" : "☆"}
          </button>
        </div>
      );
    });
  };

  const fetchBibleVerse = async (
    passage: string,
    title: string
  ): Promise<string> => {
    if (!passage) return `❌ No passage provided for ${title}`;
    try {
      const encodedPassage = encodeURIComponent(passage);
      const response = await fetch(
        `https://bible-api.com/${encodedPassage}?translation=kjv`
      );
      const data = await response.json();

      if (data.verses) {
        const formattedVerses = data.verses
          .map((verse: { chapter: number; verse: number; text: string }) => {
            return `<div>${verse.chapter}:${verse.verse}. ${verse.text.trim()}</div><hr class="border-t border-gray-300 dark:border-gray-950 mt-2" />`;
          })
          .join("");
        return `📖 ${title}: ${passage}<br /><br />${formattedVerses}`;
      } else {
        return `❌ No verse found for ${passage}`;
      }
    } catch (error) {
      console.error("Error fetching Bible verse:", error);
      return `⚠️ Error fetching passage: ${passage}`;
    }
  };

  useEffect(() => {
    if (selectedDate) {
      setLoading(true);
      const monthName = getMonthName(selectedDate);
      const day = getDay(selectedDate).toString();
      const monthData = bibleReadingPlan.yearly_bible_calendar.months[monthName];

      //@ts-ignore
      const readingPlan = monthData ? monthData[day] : null;

      if (readingPlan) {
        const {
          "Old Testament I": old1,
          "Old Testament II": old2,
          "New Testament": newT,
        } = readingPlan;

        const sectionsToFetch: Promise<string>[] = [];

        if (selectedSection === "Old Testament I") {
          sectionsToFetch.push(fetchBibleVerse(old1, "Old Testament I"));
        }
        if (selectedSection === "Old Testament II") {
          sectionsToFetch.push(fetchBibleVerse(old2, "Old Testament II"));
        }
        if (selectedSection === "New Testament") {
          sectionsToFetch.push(fetchBibleVerse(newT, "New Testament"));
        }
        if (selectedSection === "Old Testament I & II") {
          sectionsToFetch.push(fetchBibleVerse(old1, "Old Testament I"));
          sectionsToFetch.push(fetchBibleVerse(old2, "Old Testament II"));
        }
        if (selectedSection === "Old Testament I & II, New Testament") {
          sectionsToFetch.push(fetchBibleVerse(old1, "Old Testament I"));
          sectionsToFetch.push(fetchBibleVerse(old2, "Old Testament II"));
          sectionsToFetch.push(fetchBibleVerse(newT, "New Testament"));
        }

        if (sectionsToFetch.length === 0) {
          setReading(null);
          setLoading(false);
          return;
        }

        Promise.all(sectionsToFetch)
          .then((results) => {
            const readingResults: any = {};
            let i = 0;
            if (selectedSection.includes("Old Testament I")) {
              readingResults.oldTestament1 = results[i++];
            }

            if (selectedSection.includes("II")) {
              readingResults.oldTestament2 = results[i++];
            }

            if (selectedSection.includes("New Testament")) {
              readingResults.newTestament = results[i++];
            }
            setReading(readingResults);
            setLoading(false);
          })
          .catch(() => setLoading(false));
      } else {
        setReading(null);
        setLoading(false);
      }
    }
  }, [selectedDate, selectedSection]);

  return (
    <div className="p-4 min-h-screen">
      {/* Navigation */}
      <div className="flex justify-between items-center mb-2">
        <button
          onClick={() => navigateDay(-1)}
          className="bg-gray-300 dark:bg-gray-700 p-2 rounded shadow-md"
        >
          ◀️ Prev
        </button>
        <h1 className="text-xl font-bold">
          📅 {getMonthName(selectedDate)} {getDay(selectedDate)}
        </h1>
        <button
          onClick={() => navigateDay(1)}
          className="bg-gray-300 dark:bg-gray-700 p-2 rounded shadow-md"
        >
          Next ▶️
        </button>
      </div>

      {/* Calendar */}
      <div className="flex flex-wrap justify-center gap-2 p-4 w-full max-w-6xl mx-auto rounded-md text-black bg-blue-50">
        {renderCalendarDays(getMonthName(selectedDate))}
      </div>

      {/* Controls */}
      <div className="flex flex-wrap justify-between items-end w-full h-auto p-4 bg-white dark:bg-gray-900 rounded-lg shadow-md">
        <div className="w-full sm:w-1/2 lg:w-1/3 mb-4 sm:mb-0 mr-4">
          <label className="block font-semibold text-gray-800 dark:text-white mb-2">
            Select Section
          </label>
          <select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            className="w-full p-3 border rounded-md bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          >
            <option value="Old Testament I & II">Old Testament I & II</option>
            <option value="Old Testament I & II, New Testament">
              Old Testament I & II, New Testament
            </option>
            <option value="New Testament">New Testament</option>
          </select>
        </div>

        <div className="w-full sm:w-1/2 lg:w-1/3 mb-4 sm:mb-0">
          <label className="block font-semibold text-gray-800 dark:text-white mb-2">
            Select Date
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full p-3 border rounded-md bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700"
          />
        </div>

        <div className="flex gap-x-4 mt-4 sm:mt-0">
          <button
            onClick={() => toggleBookmark(selectedDate)}
            className="flex items-center p-3 bg-yellow-400 dark:bg-yellow-600 text-gray-900 dark:text-white rounded-md shadow-md"
          >
            {isBookmarked(selectedDate) ? "⭐ Bookmarked" : "☆ Bookmark"}
          </button>

          <button
            onClick={toggleDarkMode}
            className="flex items-center p-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md shadow-md"
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>
      </div>

      {/* Loading */}
      {loading && <p className="mt-4">🔄 Loading...</p>}

      {/* Readings */}
      {reading && (
        <div className="max-w-screen-lg mx-auto mt-6 space-y-4">
          <ReadingSection
            title="📜 Old Testament I"
            content={reading.oldTestament1}
            bgClass={darkMode ? "bg-gray-900 text-white" : "bg-blue-100"}
          />
          <ReadingSection
            title="📜 Old Testament II"
            content={reading.oldTestament2}
            bgClass={darkMode ? "bg-gray-900 text-white" : "bg-green-100"}
          />
          <ReadingSection
            title="📜 New Testament"
            content={reading.newTestament}
            bgClass={darkMode ? "bg-gray-900 text-white" : "bg-yellow-100"}
          />
        </div>
      )}

      {!loading && selectedDate && !reading && (
        <p className="mt-4">❌ No reading plan found for this date.</p>
      )}
    </div>
  );
};

export default BibleCalendar;
