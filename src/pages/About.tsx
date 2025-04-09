
import React from "react";

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <section>
        <h1 className="text-3xl font-bold text-center">📖 Yearly Bible Calendar</h1>
        <h2 className="text-xl font-semibold text-center mt-2">INTRODUCTION</h2>
        <p className="mt-4 text-gray-700 italic text-center">
          "Little need be said by way of introduction to the Yearly Bible Calendar."
        </p>
      </section>

      <section className="text-justify">
        <h3 className="text-2xl font-semibold">📘 It's Design</h3>
        <p className="mt-2 text-gray-700">
          The Yearly Bible Calendar is designed to help the children of God engage in
          systematic reading of the Holy Scriptures—so that no part is left unread of what
          has been given as a light to our feet. Often, help is found in the most unexpected
          places within Scripture.
        </p>
        <p className="mt-2 text-gray-700">
          Many tend to read only their favorite portions, which can unintentionally dishonor
          the fullness of God's Word. But we are reminded:
        </p>
        <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 my-3">
          “All Scripture is given by inspiration of God, and is profitable for doctrine,
          for reproof, for correction, for instruction in righteousness; that the man of
          God may be perfect, thoroughly furnished unto all good works.”
        </blockquote>
        <p className="text-gray-700">
          The person of God cannot afford to ignore any part of Scripture without suffering
          personal loss and reduced usefulness in God's service.
        </p>
        <p className="mt-2 text-gray-700">
          The Bible must be read regularly and consistently. And this habit, when developed
          early in the Christian journey, proves of great value. For the one who patiently
          seeks Christ will find Him throughout its pages.
        </p>
      </section>

      <section className="text-justify">
        <h3 className="text-2xl font-semibold">🗂 The Arrangement</h3>
        <p className="mt-2 text-gray-700">
          The <strong>Old Testament</strong> is divided into two parts, with a portion from
          each to be read daily. Those with limited time may opt to read only part each year.
        </p>
        <p className="mt-2 text-gray-700">
          The <strong>New Testament</strong> is structured to be read completely within the
          year—averaging just <strong>25 verses a day</strong>. Every Christian is encouraged
          to read it through yearly. Even the least educated believer can achieve this with
          consistency.
        </p>
        <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 my-3">
          “Every history and prophecy, every type and shadow, becomes a lattice through
          which The Beloved reveals Himself to the waiting soul.”
        </blockquote>
        <p className="text-gray-700">
          Short daily readings allow for deeper meditation—encouraging the reader to reflect
          and connect across the breadth of Scripture, drawing out treasures both new and old.
        </p>
      </section>

      <section className="text-justify">
        <h3 className="text-2xl font-semibold">📚 The Order of the Books</h3>
        <ul className="list-disc list-inside mt-2 text-gray-700 space-y-1">
          <li>
            <strong>Old Testament – Part I:</strong> The Pentateuch and the historical books,
            in the traditional biblical order.
          </li>
          <li>
            <strong>Old Testament – Part II:</strong> The five didactic books
            (Job, Psalms, Proverbs, Ecclesiastes, Song of Solomon) and all the prophetic books.
          </li>
          <li>
            <strong>New Testament:</strong> The Gospels, Acts, the Epistles, and Revelation—
            read fully once a year.
          </li>
        </ul>
      </section>

      <section className="mt-10 text-justify">
        <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-400 mb-3">✨ Features:</h2>
        <ul className="list-disc list-inside space-y-2 text-base md:text-lg text-gray-900 dark:text-gray-100">
          <li>Daily Bible readings from Old and New Testaments</li>
          <li>Track your progress by marking completed readings</li>
          <li>Light and Dark mode for a pleasant reading experience</li>
          <li>Easy navigation between dates with next and previous buttons</li>
          <li>Beautiful and user-friendly interface</li>
        </ul>
      </section>

      <p className="text-lg md:text-xl mt-10 text-gray-800 dark:text-gray-200 text-justify">
        We hope this app inspires you to stay connected with the Word of God daily.
        May it be a blessing on your spiritual journey. ✨🙏
      </p>
    </div>
  );
};

export default About;
