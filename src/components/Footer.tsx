// Footer.tsx
const Footer = () => {
  return (
    <footer className="mt-10 bg-gray-100 dark:bg-blue-800 text-gray-700 dark:text-gray-300 px-6 py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column */}
        <div>
          <h2 className="text-lg font-bold mb-2">👤 Contact Info</h2>
          <p><strong>Email:</strong> <a href="mailto:oyebadepriscilla22@gmail.com" className="text-blue-500 hover:underline">oyebadepriscilla22@gmail.com</a></p>
          <p><strong>Phone / WhatsApp:</strong> <a href="https://wa.me/2348036605211" target="_blank" rel="noopener noreferrer" className="text-green-500 hover:underline">+2348036605211</a></p>
        </div>

        {/* Middle Column */}
        <div>
          <h2 className="text-lg font-bold mb-2">🔗 Socials</h2>
          <ul className="space-y-2">
            <li>
              <a href="https://www.linkedin.com/in/oyepriscilla/" target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-600 dark:text-blue-400">LinkedIn</a>
            </li>
            <li>
              <a href="https://x.com/OyebadePriscil1" target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-500 dark:text-blue-300">Twitter</a>
            </li>
          </ul>
        </div>

        {/* Right Column */}
        <div>
          <h2 className="text-lg font-bold mb-2">📜 Reference</h2>
          <p>This WebApp is inspired by the works of <span className="font-semibold">Henry Groves</span>.</p>
        </div>
      </div>

      <div className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} Rehoboth Signature. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
