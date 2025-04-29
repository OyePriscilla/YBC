import { useEffect, useState } from "react";
import { BibleVerses } from "../data/BibleVerses.json";
import { Link } from "react-router-dom";
import image from '../assets/background.jpg';

const getRandomVerse = () => {
  const randomIndex = Math.floor(Math.random() * BibleVerses.length);
  const verse = BibleVerses[randomIndex];
  return { reference: verse.verse, text: verse.text };
};

const Home = () => {
  const [currentDate, setCurrentDate] = useState<string>("");

  useEffect(() => {
    const date = new Date();
    const formattedDate = date.toLocaleString("en-GB", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "Africa/Lagos",
    });
    const formattedTime = date.toLocaleString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZone: "Africa/Lagos",
    });

    setCurrentDate(`${formattedDate} - ${formattedTime}`);
  }, []);

  const [randomVerse, setRandomVerse] = useState<{
    reference: string;
    text: string;
  } | null>(null);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]; // Get the current date in YYYY-MM-DD format
    const storedDate = localStorage.getItem("verseDate"); // Get the stored date when the verse was shown

    if (today !== storedDate) {
      const verse = getRandomVerse();
      setRandomVerse(verse);
      localStorage.setItem("verseDate", today); // Store the current date to ensure it's only updated once per day
    } else {
      const storedVerse = localStorage.getItem("verse"); // Retrieve the previously stored verse
      if (storedVerse) {
        setRandomVerse(JSON.parse(storedVerse)); // Set the previously stored verse
      }
    }
  }, []);

  useEffect(() => {
    if (randomVerse) {
      localStorage.setItem("verse", JSON.stringify(randomVerse)); // Store the current verse to be used later
    }
  }, [randomVerse]);

  return (
    <div className="bg-gray-400 relative flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat text-gray-800 dark:text-gray-100 p-6 font-serif">
      {/* Background Image with Opacity Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40 "
        style={{ backgroundImage: `url(${image})` }}
      ></div>

      {/* Content Layer */}
      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Welcome Text */}
        <p className="text-lg sm:text-xl text-center bg-white/70 dark:bg-gray-800/80 p-6 rounded-xl shadow-lg max-w-3xl mb-6 leading-relaxed animate-slideUp">
          Welcome! Your daily companion to read through the Bible in one year. Discover daily reading plans from the Old and New Testaments, and track your progress effortlessly.
        </p>

        {/* Current Date and Time */}
        <p className="text-base text-white bg-green-600 p-2 border-4 sm:text-lg font-semibold mb-8 text-center animate-fadeInSlow">
          {currentDate} (UTC + 1)
        </p>

        {/* Navigation Buttons */}
        <div className="flex flex-wrap justify-center gap-6 mb-10">
          <Link
            to="/Bible-Calendar"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 sm:px-8 py-3 sm:py-4 rounded-xl shadow-md transition-transform transform hover:scale-105 text-center text-sm sm:text-base font-semibold"
          >
            📖 View Today's Yearly Bible Reading
          </Link>

          <Link
            to="/yoruba"
            className="bg-green-600 hover:bg-green-700 text-white px-5 sm:px-8 py-3 sm:py-4 rounded-xl shadow-md transition-transform transform hover:scale-105 text-center text-sm sm:text-base font-semibold"
          >
            📖 Ka Bibeli Ajùmọ̀kà Ojoojúmọ́
          </Link>
        </div>

        {/* Random Verse of the Day */}
        {randomVerse && (
          <div className="w-full max-w-xl p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-2xl text-center animate-slideUp">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-700 dark:text-blue-400 mb-2 drop-shadow">
              ✨ Verse of the Day ✨
            </h2>
            <h3 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-300 mb-3">
              📖 {randomVerse.reference}
            </h3>
            <p className="text-gray-700 dark:text-gray-100 text-base sm:text-lg whitespace-pre-wrap leading-relaxed">
              {randomVerse.text}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
