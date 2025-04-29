import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

interface SearchResultItem {
  book: string;
  chapter: string;
  verse: string;
  text: string;
}

const YorubaSearch = () => {
  const location = useLocation();
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchTerm = searchParams.get("query");
    if (searchTerm) {
      setQuery(searchTerm);
      fetch(
        `https://yorubabibleapi.onrender.com/search?query=${encodeURIComponent(
          searchTerm
        )}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data.results)) {
            setResults(data.results);
          } else {
            console.warn("Unexpected API response:", data);
            setResults([]);
          }
        })
        .catch((err) => {
          console.error("Error:", err);
          setResults([]);
        });
    }
  }, [location.search]);

  return (
    <div className="p-4">
      <div className="flex justify-around font-bold">
        <h2 className="text-xl font-bold mb-4">
          Search Results for: "{query}"
        </h2>
        <Link to="/yorubaBible" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 mb-4">
Pada si Bibeli Kika          </Link>      </div>
      {results.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <ul className="space-y-3">
          {results.map((item, idx) => (
            <li key={idx} className="bg-gray-100 p-3 rounded dark:bg-gray-800">
              <strong>
                {item.book} {item.chapter}:{item.verse}
              </strong>{" "}
              — {item.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default YorubaSearch;
