import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

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
            {openDropdown === "calendar" && (
              <div className="absolute top-full mt-2 bg-white text-gray-800 rounded shadow-lg transition-all duration-300 ease-in-out transform opacity-100 translate-y-0 z-50">
                <Link
                  to="/Bible-Calendar"
                  onClick={handleLinkClick}
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  English Plan
                </Link>
                <Link
                  to="/yoruba"
                  onClick={handleLinkClick}
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Yoruba Plan
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

      {/* Mobile Fullscreen Menu */}
      {isOpen && (
        <div className="fixed inset-0 bg-blue-900 flex flex-col px-8 py-18 gap-6 md:hidden text-2xl font-medium z-40 overflow-y-auto">
          <Link to="/" onClick={handleLinkClick} className="text-white">
            Home
          </Link>

          <Link to="/Bible-Calendar" onClick={handleLinkClick} className="text-white">
            Yearly Bible Calendar
          </Link>

          <Link to="/yoruba" onClick={handleLinkClick} className="text-white">
            Bibeli Ajùmọ̀kà Ojoojúmọ́
          </Link>

          <Link to="/yorubaBible" onClick={handleLinkClick} className="text-white">
            Yoruba Bible
          </Link>

          <Link to="/englishkjv" onClick={handleLinkClick} className="text-white">
            English Bible
          </Link>

          <a
            href="https://oyepriscilla.github.io/QuizAppFrontend/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white"
          >
            Bible Quiz
          </a>

          <Link to="/bookmark" onClick={handleLinkClick} className="text-white">
            Bookmark
          </Link>

          <Link to="/about" onClick={handleLinkClick} className="text-white">
            About
          </Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
