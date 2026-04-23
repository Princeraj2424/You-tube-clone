import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchData } from "../utils/rapidapi";
import Sidebar from "./Sidebar";
import SearchCard from "./SearchCard";


function Search () {
  const [ results, setResults ] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("q") || "New";

  useEffect(() => {
    fetchSearchResults();
  }, [searchQuery]);

  const fetchSearchResults = () => {
    fetchData(`search/?q=${searchQuery}`).then((res) => {
      const searchResults = Array.isArray(res?.contents) ? res.contents : [];
      setResults(searchResults);
    });
  };



  return (
    <div className="">
      <div className="flex h-[calc(100vh-72px)] flex-row">
        <Sidebar />
        <div className="grow overflow-y-auto overflow-x-hidden">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-2 py-4 md:px-4">
            {results?.map((item, index)=>{
              if(item?.type !== "video") return null;
              return <SearchCard key={item?.video?.videoId || item?.id || index} video={item?.video} />
            })}
          </div>

        </div>


      </div>
      
    </div>
  )
}

export default Search
