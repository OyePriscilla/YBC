import { useEffect, useState } from "react";
import { BibleVerses } from "../data/BibleVerses.json";
import { Link } from "react-router-dom";

const getRandomVerse = () => {
  const randomIndex = Math.floor(Math.random() * BibleVerses.length);
  const verse = BibleVerses[randomIndex];
  return { reference: verse.verse, text: verse.text };
};

const Home = () => {

  const [randomVerse, setRandomVerse] = useState<{ reference: string; text: string } | null>(null);

  useEffect(() => {
    const verse = getRandomVerse();
    setRandomVerse(verse);
  }, []);

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-4 sm:p-6">
      <h1 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 text-center">
        📅 Bible Yearly Calendar
      </h1>

      <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-center max-w-3xl">
        Welcome to the Bible Yearly Calendar! Your daily companion to read through the Bible in one year.
        Discover daily reading plans from the Old Testament and New Testament, and track your progress effortlessly.
      </p>

      {/* Navigation Buttons */}
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8">
        <Link
          to="/Bible-Calendar"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-md transition text-sm sm:text-base"
        >
          📖 View Yearly Bible Calendar

        </Link>
        <Link
          to="/englishkjv"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-md transition text-sm sm:text-base"
        >
          📖 English Bible
        </Link>
        <Link
          to="/yoruba"
          className="bg-green-500 hover:bg-green-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-md transition text-sm sm:text-base"
        >
          📖 Yoruba Bible
        </Link>
        <Link
          to="/about"
          className="bg-green-500 hover:bg-green-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-md transition text-sm sm:text-base"
        >
          ℹ️ About
        </Link>
      </div>

      {/* Random Verse */}
      {randomVerse && (
        <div className="w-full max-w-lg p-4 sm:p-6 bg-blue-100 dark:bg-gray-800 rounded-lg shadow-md text-center">
          <h1 className="text-xl sm:text-2xl font-bold text-blue-600 mb-2">
            📖 {randomVerse.reference}
          </h1>
          <p className="text-sm sm:text-base text-gray-700 dark:text-white whitespace-pre-wrap">
            {randomVerse.text}
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;
