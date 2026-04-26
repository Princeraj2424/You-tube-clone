import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchData } from "../utils/rapidapi";
import Sidebar from "./Sidebar";
import SearchCard from "./SearchCard";

const FILTERS = ["All", "Short", "Medium", "Long"];

const getVideoDurationBucket = (seconds = 0) => {
  if (seconds < 4 * 60) return "Short";
  if (seconds <= 20 * 60) return "Medium";
  return "Long";
};

const toViews = (value) => {
  if (typeof value === "number") return value;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

function Search () {
  const [ results, setResults ] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [sortBy, setSortBy] = useState("relevance");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("q") || "New";

  const filteredResults = results
    .filter((item) => item?.type === "video")
    .filter((item) => {
      if (activeFilter === "All") return true;
      return getVideoDurationBucket(Number(item?.video?.lengthSeconds || 0)) === activeFilter;
    })
    .sort((a, b) => {
      if (sortBy === "views") {
        return toViews(b?.video?.stats?.views) - toViews(a?.video?.stats?.views);
      }

      if (sortBy === "title") {
        return String(a?.video?.title || "").localeCompare(String(b?.video?.title || ""));
      }

      return 0;
    });

  const fetchSearchResults = useCallback(() => {
    setLoading(true);
    fetchData(`search/?q=${searchQuery}`)
      .then((res) => {
        const searchResults = Array.isArray(res?.contents) ? res.contents : [];
        setResults(searchResults);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [searchQuery]);

  useEffect(() => {
    fetchSearchResults();
  }, [fetchSearchResults]);

  return (
    <div className="">
      <div className="flex h-[calc(100vh-72px)] flex-row">
        <Sidebar />
        <div className="grow overflow-y-auto overflow-x-hidden">
          <div className="flex w-full flex-col gap-2 px-2 py-4 md:px-6">
            <h2 className="px-2 text-sm font-semibold text-gray-600">Search results for "{searchQuery}"</h2>
            <div className="flex flex-wrap items-center justify-between gap-2 px-2">
              <div className="flex flex-wrap gap-2">
                {FILTERS.map((filter) => (
                  <button
                    key={filter}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                      activeFilter === filter
                        ? "bg-black text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    onClick={() => setActiveFilter(filter)}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className="rounded-full border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 outline-none"
              >
                <option value="relevance">Sort: Relevance</option>
                <option value="views">Sort: Views</option>
                <option value="title">Sort: Title</option>
              </select>
            </div>
            {loading && <p className="px-2 py-4 text-sm text-gray-500">Loading videos...</p>}

            {!loading && filteredResults.length === 0 && (
              <p className="px-2 py-6 text-sm text-gray-500">No videos found right now. Try a different search.</p>
            )}

            {filteredResults?.map((item, index)=>{
              return <SearchCard key={item?.video?.videoId || item?.id || index} video={item?.video} />
            })}
          </div>

        </div>


      </div>
      
    </div>
  )
}

export default Search
