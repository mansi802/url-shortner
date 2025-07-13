import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllUserUrls } from "../api/user.api";

const UserUrl = () => {
  const {
    data: urls,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["userUrls"],
    queryFn: getAllUserUrls,
    refetchInterval: 30000,
    staleTime: 0,
  });
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (url, id) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center my-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <div className="terminal-text text-green-400">
            <span className="text-cyan-400">STATUS:</span> LOADING URL
            DATABASE...
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-900/50 border border-red-500 text-red-400 p-4 rounded-md my-4 terminal-text">
        <div className="font-bold text-red-300">SYSTEM ERROR:</div>
        {error.message}
      </div>
    );
  }

  if (!urls.urls || urls.urls.length === 0) {
    return (
      <div className="text-center text-gray-400 my-8 p-6 bg-black/50 rounded-lg border border-gray-600">
        <div className="text-6xl mb-4">🤖</div>
        <div className="terminal-text text-xl font-bold mb-2 text-yellow-400">
          NO URLS DETECTED
        </div>
        <div className="terminal-text text-sm">
          <span className="text-cyan-400">STATUS:</span> DATABASE EMPTY
        </div>
        <div className="text-xs text-gray-500 mt-2">
          * CREATE YOUR FIRST COMPRESSED URL TO BEGIN *
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black/50 rounded-lg mt-8 border border-green-500 overflow-hidden">
      <div className="bg-green-900/20 p-4 border-b border-green-500">
        <div className="terminal-text text-lg font-bold text-green-400">
          <span className="text-cyan-400">DATABASE:</span> URL RECORDS (
          {urls.urls.length})
        </div>
      </div>

      <div className="overflow-x-auto max-h-96">
        <table className="min-w-full">
          <thead className="bg-green-900/20">
            <tr>
              <th className="px-6 py-3 text-left terminal-text text-xs font-bold text-cyan-400 uppercase tracking-wider border-b border-green-500">
                ORIGINAL URL
              </th>
              <th className="px-6 py-3 text-left terminal-text text-xs font-bold text-cyan-400 uppercase tracking-wider border-b border-green-500">
                COMPRESSED URL
              </th>
              <th className="px-6 py-3 text-left terminal-text text-xs font-bold text-cyan-400 uppercase tracking-wider border-b border-green-500">
                CLICK COUNT
              </th>
              <th className="px-6 py-3 text-left terminal-text text-xs font-bold text-cyan-400 uppercase tracking-wider border-b border-green-500">
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-green-500/30">
            {urls.urls.reverse().map((url) => (
              <tr
                key={url._id}
                className="hover:bg-green-900/10 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="terminal-text text-sm text-gray-300 truncate max-w-xs">
                    {url.full_url}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="terminal-text text-sm">
                    <a
                      href={`http://localhost:8000/${url.short_url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-400 hover:text-green-300 hover:underline"
                    >
                      {`localhost:8000/${url.short_url}`}
                    </a>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="terminal-text text-sm">
                    <span className="px-3 py-1 inline-flex text-xs font-bold rounded-full bg-green-900/50 text-green-400 border border-green-500">
                      {url.clicks} {url.clicks === 1 ? "CLICK" : "CLICKS"}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-medium">
                  <button
                    onClick={() =>
                      handleCopy(
                        `http://localhost:8000/${url.short_url}`,
                        url._id
                      )
                    }
                    className={`inline-flex items-center px-4 py-2 border font-bold rounded-md transition-all duration-300 ${
                      copiedId === url._id
                        ? "bg-green-600 text-white border-green-500 neon-glow"
                        : "cyber-button"
                    }`}
                  >
                    {copiedId === url._id ? (
                      <>
                        <span className="mr-2">✓</span>
                        COPIED!
                      </>
                    ) : (
                      <>
                        <span className="mr-2">📋</span>
                        COPY
                      </>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserUrl;
