// Example mapping from abbreviation to Yoruba full book name
  import { useState, useEffect } from 'react';
  import axios from 'axios';

  const bookNameMap: Record<string, string> = {
    "Gen": "Genesisi",
"Exo": "Eksodu",
"Lev": "Lefitiku",
"Num": "Numeri",
"Deut": "Deuteronomi",
"Josh": "Joshua",
"Judg": "Onidajọ",
"Ruth": "Rutu",
"1Sam": "1 Samueli",
"2Sam": "2 Samueli",
"1Kin": "1 Ọba",
"2Kin": "2 Ọba",
"1Chr": "1 Kronika",
"2Chr": "1 Kronika",
"Ezra": "Esra",
"Neh": "Nehemiah",
"Esth": "Esteri",
"Job": "Jobu",
"Ps": "Orin Dafidi",
"Prov": "Òwe",
"Eccl": "Oníwaasu",
"Song": "Orin Solomoni",
"Isa": "Isaiah",
"Jer": "Jeremiah",
"Lam": "Ẹkun Jeremiah",
"Ezek": "Esekieli",
"Dan": "Daniẹli",
"Hos": "Hosea",
"Joel": "Joeli",
"Amos": "Amosi",
"Obad": "Obadiah",
"Jonah": "Jonah",
"Mic": "Mika",
"Nah": "Nahumu",
"Hab": "Habakukku",
"Zeph": "Sefaniah",
"Hag": "Haggai",
"Zech": "Sekariah",
"Mal": "Malaki",
"Matt": "Matteu",
"Mark": "Marku",
"Luke": "Luku",
"John": "Johannu",
"Acts": "Iṣe Awọn Aposteli",
"Rom": "Romu",
"1Cor": "1 Kọrinti",
"2Cor": "1 Kọrinti",
"Gal": "Galatia",
"Eph": "Efesu",
"Phil": "Filipi",
"Col": "Kolosse",
"1Thess": "1 Tesalonika",
"2Thess": "2 Tesalonika",
"1Tim": "1 Timotiu",
"2Tim": "2 Timotiu",
"Titus": "Titu",
"Philem": "Filimoni",
"Heb": "Héberu",
"James": "Jakọbu",
"1Pet": "1 Peteru",
"2Pet": "2 Peteru",
"1John": "1 Johannu",
"2John": "2 Johannu",
"3John": "3 Johannu",
"Jude": "Juda",
"Rev": "Ifihan",
  };

  const BibleSearch = () => {
    const [bibleData, setBibleData] = useState<any>(null);
    const [query, setQuery] = useState<string>('');
    const [results, setResults] = useState<any[]>([]);

    useEffect(() => {
      const fetchBibleData = async () => {
        try {
          const response = await axios.get('/yoruba_bible_named.json');
          setBibleData(response.data);
        } catch (error) {
          console.error('Error fetching Bible data:', error);
        }
      };
      fetchBibleData();
    }, []);

    const handleSearch = () => {
      if (bibleData && query) {
        const { startRef, endRef } = parseRange(query);
        const foundVerses = searchPassage(startRef, endRef, bibleData);
        setResults(foundVerses);
      }
    };

    const parseRange = (range: string) => {
      const [start, end] = range.split('-');

      const parseReference = (ref: string) => {
        const match = ref.trim().match(/^([A-Za-z]+)\.?\s*(\d+):(\d+)$/);
        if (!match) return null;

        const [_, bookAbbrev, chapter, verse] = match;
        const book = bookNameMap[bookAbbrev];

        if (!book) {
          console.error(`Book abbreviation "${bookAbbrev}" not found in mapping.`);
          return null;
        }

        return {
          book,
          chapter: parseInt(chapter),
          verse: parseInt(verse),
        };
      };

      const startRef = parseReference(start);
      const endRef = parseReference(end || start);

      if (!startRef || !endRef) {
        throw new Error("Invalid Bible range format.");
      }

          return { startRef, endRef };
    };

    const searchPassage = (startRef: any, endRef: any, bibleData: any) => {
      const verses: any[] = [];

      // If start and end references are the same, find that single verse
      if (startRef.book === endRef.book && startRef.chapter === endRef.chapter) {
        const bookData = bibleData[startRef.book];
        if (bookData) {
          const chapterData = bookData[startRef.chapter];
          if (chapterData) {
            const verse = chapterData.find((v: any) => v.verse === startRef.verse);
            if (verse) {
              verses.push(verse);
            }
          }
        }
      }
      // If it's a range of verses
      else {
        let foundStart = false;
        Object.keys(bibleData).forEach(book => {
          const bookData = bibleData[book];
          if (book === startRef.book || book === endRef.book) {
            Object.keys(bookData).forEach(chapter => {
              const chapterData = bookData[parseInt(chapter)];
              chapterData.forEach((verseData: any) => {
                // Check if the verse falls within the range
                if (
                  (book === startRef.book && startRef.chapter === parseInt(chapter) && verseData.verse >= startRef.verse) ||
                  (book === endRef.book && endRef.chapter === parseInt(chapter) && verseData.verse <= endRef.verse) ||
                  (book !== startRef.book && book !== endRef.book)
                ) {
                  verses.push(verseData);
                }
              });
            });
          }
        });
      }

      return verses;
    };


    return (
      <div>
        <input
          type="text"
          placeholder="Search Bible (e.g., Gen. 1:5-1:8)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>

        <div>
          {results.length > 0 ? (
            results.map((verse, index) => (
              <div key={index}>
                <strong>{verse.verse}</strong>: {verse.text}
              </div>
            ))
          ) : (
            <p>No results found.</p>
          )}
        </div>
      </div>
    );
  };

export default BibleSearch;



// OR for different books

