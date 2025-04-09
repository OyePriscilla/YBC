import { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    setIsOpen(false); // close menu on click
  };

  return (
    <nav className="bg-blue-800 text-white p-4">
      <div className="flex justify-between items-center">
        <div className="text-xl font-bold">Bible</div>

        {/* Hamburger Icon */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-4">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <li className="list-none mx-2">
            <a
              href="https://oyepriscilla.github.io/MyPortfolioSetup"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white dark:text-blue-400 rounded-lg transition duration-300 ease-in-out hover:underline"
            >
              Portfolio
            </a>
          </li>
          <Link to="/Bible-Calendar" className="hover:underline">
           Yearly Bible Calendar
          </Link>
          <Link to="/englishkjv" className="hover:underline">
            English
          </Link>
          <Link to="/yoruba" className="hover:underline">
            Yoruba
          </Link>
          <Link to="/bookmark" className="hover:underline">
            Bookmark
          </Link>
          <Link to="/about" className="hover:underline">
            About
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="flex flex-col md:hidden mt-2 gap-2">
          <Link to="/" onClick={handleLinkClick}>
            Home
          </Link>
          <li className="mx-2 list-none">
            <a
              onClick={handleLinkClick}
              href="https://oyepriscilla.github.io/MyPortfolioSetup"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white dark:text-blue-400 rounded-lg transition duration-300 ease-in-out hover:underline"
            >
              Portfolio
            </a>
          </li>

          <Link to="/Bible-Calendar" onClick={handleLinkClick}>
          Yearly Bible Calendar
          </Link>
          <Link to="/englishkjv" onClick={handleLinkClick}>
            English
          </Link>
          <Link to="/yoruba" onClick={handleLinkClick}>
            Yoruba
          </Link>
          <Link to="/bookmark" onClick={handleLinkClick}>
            Bookmark
          </Link>
          <Link to="/about" onClick={handleLinkClick}>
            About
          </Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
