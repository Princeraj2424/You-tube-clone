import React from "react";
import { useAuth } from "../Context/AuthContext.jsx";

function ListItems() {
  const { value, setValue } = useAuth();
  const categories = [
    "ALL",
    "music",
    "react routers",
    "computer Programming",
    "Reverberation",
    "movie musical",
    "Indian national cricket team",
    "News",
    "Movies",
    "1990s",
    "Telgu cinemas",
    "Live",
    "Dramedy",  
    "Debugging",
    "Indian soap operas",
    "Cricket",
    "Football",
    "Tennis",
    "Learn coding",
    "Comedy",
    "Cooking",
  ];
  return (
    <div className="bg-white overflow-x-auto no-scrollbar px-2 py-3 border-b border-gray-100 mb-1">
      <div className="flex gap-3 flex-nowrap">
        {categories.map((category) => {
          return (
            <div
              key={category}
              onClick={() => setValue(category)}
              className={`flex-none rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200 cursor-pointer ${
              value === category
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            >
              {category}
            </div>
          );
        })}
      </div>

    </div>
  );
}

export default ListItems;
