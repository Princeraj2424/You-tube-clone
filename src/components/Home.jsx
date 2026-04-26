import React from "react";
import Sidebar from "./Sidebar.jsx";
import Video from "./video";
import { useAuth } from "../Context/AuthContext.jsx";
import ListItems from "./ListItems.jsx";
function Home() {
  const { data, loading } = useAuth();
  const videos = Array.isArray(data) ? data.filter((item) => item?.type === "video") : [];

  return (
    <div className="flex gap-0">
      <Sidebar />
      <div className="h-[calc(100vh-72px)] flex-1 min-w-0 overflow-y-auto overflow-x-hidden px-2 md:px-4">
        <ListItems />
        {loading && (
          <p className="px-2 py-6 text-sm text-gray-500">Loading videos...</p>
        )}

        {!loading && videos.length === 0 && (
          <p className="px-2 py-6 text-sm text-gray-500">No videos available right now. Try another category.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 px-1 py-4 md:px-2 md:py-4">
          {!loading &&
            videos.map((item, index) => {
              const itemVideo = item?.video;
              const itemKey = itemVideo?.videoId || item?.video?.videoId || item?.id || index;
              return <Video key={itemKey} video={itemVideo} />;
            })}
        </div>
      </div>
    </div>
  );
}

export default Home;