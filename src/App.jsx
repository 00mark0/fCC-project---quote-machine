import { useState, useEffect, useCallback } from "react";
import { FaTwitter } from "react-icons/fa";
import "./App.css";
import quotes from "../public/quotes.json";

function App() {
  const [quote, setQuote] = useState({ quote: "", author: "" });
  const [color, setColor] = useState("#000000");

  const getRandomQuote = useCallback(() => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 8)];
    }

    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
    setColor(color);
  }, []);

  useEffect(() => {
    getRandomQuote();
  }, [getRandomQuote]);

  const tweetQuote = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    '"' + quote.quote + '" ' + quote.author
  )}`;

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{ backgroundColor: color }}
    >
      <div id="quote-box" className="bg-white p-24 max-w-3xl">
        <div>
          <p
            id="text"
            className="text-xl md:text-3xl text-start mb-3"
            style={{ color: color }}
          >
            {quote.quote}
          </p>
          <p
            id="author"
            className="text-md md:text-lg text-end"
            style={{ color: color }}
          >
            - {quote.author}
          </p>
        </div>
        <div className="flex justify-between items-center mt-10">
          <div>
            <a
              href={tweetQuote}
              id="tweet-quote"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button
                className="p-3 text-white"
                style={{ backgroundColor: color }}
              >
                <FaTwitter size={22} />
              </button>
            </a>
          </div>
          <div>
            <button
              id="new-quote"
              onClick={getRandomQuote}
              style={{ backgroundColor: color }}
              className="p-3 text-white"
            >
              New Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
