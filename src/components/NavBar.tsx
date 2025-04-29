import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import {
  Home,
  CalendarDays,
  Book,
  BookOpen,
  Globe,
  Star,
  Info,
  HelpCircle
} from "lucide-react";


const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLinkClick = () => {
    setIsOpen(false);
    setOpenDropdown(null);
  };

  const toggleDropdown = (menu: string) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-blue-900 text-white px-6 py-4 font-sans shadow-md relative z-50">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white drop-shadow-md mb-4 sm:mb-0">
          BE Inspired 📖
        </h1>

        {/* Hamburger Icon */}
        <button
          className="md:hidden focus:outline-none text-2xl"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        {/* Desktop Menu */}
        <div
          className="hidden md:flex items-center gap-6 text-lg font-medium relative"
          ref={dropdownRef}
        >
          <Link to="/" className="nav-link" onClick={handleLinkClick}>
            Home
          </Link>

          <a
            href="https://oyepriscilla.github.io/MyPortfolioSetup"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
          >
            Portfolio
          </a>

          {/* Bible Dropdown */}
          <div className="relative group">
            <button
              onClick={() => toggleDropdown("bible")}
              className="nav-link flex items-center gap-1"
            >
              Bible ▾
            </button>
            {openDropdown === "bible" && (
              <div className="absolute top-full mt-2 bg-white text-gray-800 rounded shadow-lg transition-all duration-300 ease-in-out transform opacity-100 translate-y-0 z-50">
                <Link
                  to="/yorubaBible"
                  onClick={handleLinkClick}
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Yoruba Bible
                </Link>
                <Link
                  to="/englishkjv"
                  onClick={handleLinkClick}
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  English Bible (KJV)
                </Link>
              </div>
            )}
          </div>

          {/* Yearly Calendar Dropdown */}
          <div className="relative group">
            <button
              onClick={() => toggleDropdown("calendar")}
              className="nav-link flex items-center gap-1"
            >
              Yearly Bible Calendar ▾
            </button>
            {isOpen && (
  <div className="fixed inset-0 bg-blue-900/95 backdrop-blur-md flex flex-col px-8 py-12 gap-6 md:hidden text-2xl font-semibold z-50 overflow-y-auto transition-all duration-300 ease-in-out shadow-lg rounded-b-lg">
    {/* Close Button */}
    <div className="flex justify-end mb-4">
      <button
        onClick={() => setIsOpen(false)}
        className="text-white text-3xl hover:text-red-300 transition duration-200"
        aria-label="Close menu"
      >
        ×
      </button>
    </div>

    <Link to="/" onClick={handleLinkClick} className="text-white hover:text-yellow-300 flex items-center gap-4">
      <Home size={28} /> Home
    </Link>

    <Link to="/Bible-Calendar" onClick={handleLinkClick} className="text-white hover:text-yellow-300 flex items-center gap-4">
      <CalendarDays size={28} /> Yearly Calendar
    </Link>

    <Link to="/yoruba" onClick={handleLinkClick} className="text-white hover:text-yellow-300 flex items-center gap-4">
      <BookOpen size={28} /> Bibeli Ajùmọ̀kà
    </Link>

    <Link to="/yorubaBible" onClick={handleLinkClick} className="text-white hover:text-yellow-300 flex items-center gap-4">
      <Book size={28} /> Yoruba Bible
    </Link>

    <Link to="/englishkjv" onClick={handleLinkClick} className="text-white hover:text-yellow-300 flex items-center gap-4">
      <Globe size={28} /> English Bible
    </Link>

    <a
      href="https://oyepriscilla.github.io/QuizAppFrontend/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-white hover:text-yellow-300 flex items-center gap-4"
    >
      <HelpCircle size={28} /> Bible Quiz
    </a>

    <Link to="/bookmark" onClick={handleLinkClick} className="text-white hover:text-yellow-300 flex items-center gap-4">
      <Star size={28} /> Bookmark
    </Link>

    <Link to="/about" onClick={handleLinkClick} className="text-white hover:text-yellow-300 flex items-center gap-4">
      <Info size={28} /> About
    </Link>
  </div>
)}
          </div>

          <a
            href="https://oyepriscilla.github.io/QuizAppFrontend/"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
          >
            Bible Quiz
          </a>

          <Link to="/bookmark" onClick={handleLinkClick} className="nav-link">
            Bookmark
          </Link>

          <Link to="/about" onClick={handleLinkClick} className="nav-link">
            About
          </Link>
        </div>
      </div>

      {isOpen && (
  <div className="fixed inset-0 bg-blue-900/95 backdrop-blur-md flex flex-col px-8 py-12 gap-6 md:hidden text-2xl font-semibold z-50 overflow-y-auto transition-all duration-300 ease-in-out shadow-lg rounded-b-lg">
    {/* Close Button */}
    <div className="flex justify-center mb-4">
    <h1 className="text-2xl mr-18 sm:text-4xl font-extrabold text-white drop-shadow-md mb-4 sm:mb-0">
          BE Inspired 📖
        </h1>
      <button
        onClick={() => setIsOpen(false)}
        className="text-white text-3xl hover:text-red-300 transition duration-200"
        aria-label="Close menu"
      >
        ×
      </button>
    </div>

    <Link to="/" onClick={handleLinkClick} className="text-white hover:text-yellow-300 transition">
      Home
    </Link>

    <Link to="/Bible-Calendar" onClick={handleLinkClick} className="text-white hover:text-yellow-300 transition">
      Yearly Bible Calendar
    </Link>

    <Link to="/yoruba" onClick={handleLinkClick} className="text-white hover:text-yellow-300 transition">
      Bibeli Ajùmọ̀kà Ojoojúmọ́
    </Link>

    <Link to="/yorubaBible" onClick={handleLinkClick} className="text-white hover:text-yellow-300 transition">
      Yoruba Bible
    </Link>

    <Link to="/englishkjv" onClick={handleLinkClick} className="text-white hover:text-yellow-300 transition">
      English Bible
    </Link>

    <a
      href="https://oyepriscilla.github.io/QuizAppFrontend/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-white hover:text-yellow-300 transition"
    >
      Bible Quiz
    </a>

    <Link to="/bookmark" onClick={handleLinkClick} className="text-white hover:text-yellow-300 transition">
      Bookmark
    </Link>

    <Link to="/about" onClick={handleLinkClick} className="text-white hover:text-yellow-300 transition">
      About
    </Link>
  </div>
)}

    </nav>
  );
};

export default NavBar;
