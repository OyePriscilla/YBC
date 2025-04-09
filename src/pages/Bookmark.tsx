import { useState, useEffect } from "react";

const BookmarkPage = () => {
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  // Load Bookmarks from localStorage
  useEffect(() => {
    const storedBookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    setBookmarks(storedBookmarks);
  }, []);

  // Remove bookmark by date
  const removeBookmark = (date: string) => {
    const updatedBookmarks = bookmarks.filter((bookmark) => bookmark !== date);
    localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
    setBookmarks(updatedBookmarks);
  };

  return (
    <div
      className="pb-24 min-h-screen mt-12 flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
    >
      <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-2xl font-bold">📚 Bookmarked Dates</h1>
        <button
          onClick={() => window.history.back()}
          className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 focus:outline-none"
        >
          Back to Calendar
        </button>
      </div>

      <div className="p-6">
        {/* Show if there are no bookmarks */}
        {bookmarks.length === 0 ? (
          <p className="text-lg text-center text-gray-500">
            ❌ No bookmarks found. Start bookmarking some dates from the calendar!
          </p>
        ) : (
          <div className="space-y-4">
            {/* List of Bookmarked Dates */}
            {bookmarks.map((date, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-4 bg-blue-100 dark:bg-blue-800 rounded-lg shadow-md"
              >
                <div className="flex items-center">
                  <span className="mr-3 text-xl font-semibold">{date}</span>
                  <button
                    onClick={() => removeBookmark(date)}
                    className="text-red-500 hover:text-red-700 focus:outline-none"
                  >
                    ❌ Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookmarkPage;
