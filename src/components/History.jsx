import React, { useState } from "react";
import Sidebar from "./Sidebar";
import SearchCard from "./SearchCard";

const WATCH_HISTORY_KEY = "yt_watch_history";

const readWatchHistory = () => {
  try {
    const cachedValue = localStorage.getItem(WATCH_HISTORY_KEY);
    const parsed = cachedValue ? JSON.parse(cachedValue) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

function History() {
  const [historyItems, setHistoryItems] = useState(() => readWatchHistory());

  const clearHistory = () => {
    localStorage.removeItem(WATCH_HISTORY_KEY);
    setHistoryItems([]);
  };

  return (
    <div className="flex h-[calc(100vh-72px)] flex-row">
      <Sidebar />
      <div className="grow overflow-y-auto overflow-x-hidden px-2 py-4 md:px-6">
        <div className="mb-4 flex items-center justify-between px-2">
          <h2 className="text-lg font-semibold text-gray-800">Watch history</h2>
          {historyItems.length > 0 && (
            <button
              onClick={clearHistory}
              className="rounded-full bg-gray-100 px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-200"
            >
              Clear all history
            </button>
          )}
        </div>

        {historyItems.length === 0 ? (
          <p className="px-2 py-6 text-sm text-gray-500">No watch history yet. Play a video to start tracking history.</p>
        ) : (
          <div className="space-y-2">
            {historyItems.map((video, index) => (
              <SearchCard key={video?.videoId || index} video={video} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default History;
