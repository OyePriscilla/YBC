const Footer = () => {
  return (
    <footer className=" bg-gray-900 dark:bg-blue-950 text-gray-200 dark:text-gray-300 px-6 py-12 font-sans relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 border-b border-gray-700 dark:border-gray-600 pb-10">
        {/* Left Column */}
        <div>
          <h2 className="text-lg font-bold mb-4">👤 Contact Info</h2>
          <p className="mb-2">
            <span className="font-semibold">Email:</span>{" "}
            <a
              href="mailto:oyebadepriscilla22@gmail.com"
              className="text-blue-400 hover:text-blue-500 transition-colors duration-300 underline underline-offset-4"
            >
              oyebadepriscilla22@gmail.com
            </a>
          </p>
          <p>
            <span className="font-semibold">Phone / WhatsApp:</span>{" "}
            <a
              href="https://wa.me/2348036605211"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400 hover:text-green-500 transition-colors duration-300 underline underline-offset-4"
            >
              +2348036605211
            </a>
          </p>
        </div>

        {/* Middle Column */}
        <div>
          <h2 className="text-lg font-bold mb-4">🔗 Socials</h2>
          <ul className="space-y-3">
            <li>
              <a
                href="https://www.linkedin.com/in/oyepriscilla/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors duration-300 flex items-center gap-2"
              >
                <span>🔗</span> LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://x.com/OyebadePriscil1"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors duration-300 flex items-center gap-2"
              >
                <span>🐦</span> Twitter (X)
              </a>
            </li>
          </ul>
        </div>

        {/* Right Column */}
        <div>
          <h2 className="text-lg font-bold mb-4">📜 Reference</h2>
          <p className="leading-relaxed">
            Credit to <span className="font-semibold text-white">Henry Groves</span> who prayerfully and carefully crafted the Bible Yearly Calendar by God's inspiration.
          </p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="pt-6 text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} <span className="font-semibold text-gray-300 dark:text-gray-100">Rehoboth Signature</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
