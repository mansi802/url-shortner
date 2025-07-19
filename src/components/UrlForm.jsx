import React, { useState } from "react";
import { createShortUrl } from "../api/shortUrl.api";
import { useSelector } from "react-redux";
import { queryClient } from "../main";

const UrlForm = () => {
  const [url, setUrl] = useState("https://www.google.com");
  const [shortUrl, setShortUrl] = useState();
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);
  const [customSlug, setCustomSlug] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleSubmit = async () => {
    setIsProcessing(true);
    try {
      const shortUrl = await createShortUrl(url, customSlug);
      setShortUrl(import.meta.env.VITE_API_URL + shortUrl);
      queryClient.invalidateQueries({ queryKey: ["userUrls"] });
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <label
          htmlFor="url"
          className="terminal-text block text-lg font-bold mb-3 text-cyan-400"
        >
          [URL INPUT] ENTER TARGET URL:
        </label>
        <input
          type="url"
          id="url"
          value={url}
          onInput={(event) => setUrl(event.target.value)}
          placeholder="https://example.com"
          required
          className="terminal-input w-full px-4 py-3 rounded-md text-lg"
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={isProcessing}
        className={`cyber-button w-full py-4 text-lg font-bold ${
          isProcessing ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isProcessing ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
            PROCESSING...
          </div>
        ) : (
          "COMPRESS URL"
        )}
      </button>

      {error && (
        <div className="bg-red-900/50 border border-red-500 text-red-400 p-4 rounded-md terminal-text">
          <div className="font-bold text-red-300">ERROR:</div>
          {error}
        </div>
      )}

      {isAuthenticated && (
        <div className="mt-6">
          <label
            htmlFor="customSlug"
            className="terminal-text block text-lg font-bold mb-3 text-purple-400"
          >
            [OPTIONAL] CUSTOM IDENTIFIER:
          </label>
          <input
            type="text"
            id="customSlug"
            value={customSlug}
            onChange={(event) => setCustomSlug(event.target.value)}
            placeholder="Enter custom slug"
            className="terminal-input w-full px-4 py-3 rounded-md text-lg"
          />
        </div>
      )}

      {shortUrl && (
        <div className="mt-8 bg-green-900/20 border border-green-500 p-6 rounded-lg">
          <h2 className="terminal-text text-xl font-bold mb-4 text-green-400">
            [SUCCESS] COMPRESSED URL GENERATED:
          </h2>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              readOnly
              value={shortUrl}
              className="terminal-input flex-1 p-3 rounded-l-md text-lg bg-black/50"
            />
            <button
              onClick={handleCopy}
              className={`px-6 py-3 rounded-r-md transition-all duration-300 font-bold ${
                copied ? "bg-green-600 text-white neon-glow" : "cyber-button"
              }`}
            >
              {copied ? "COPIED!" : "COPY"}
            </button>
          </div>
          <div className="mt-3 text-sm text-gray-400 terminal-text">
            <span className="text-cyan-400">STATUS:</span> URL COMPRESSION
            COMPLETE
          </div>
        </div>
      )}
    </div>
  );
};

export default UrlForm;
