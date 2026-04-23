import React from "react";
import Sidebar from "./Sidebar.jsx";
import Video from "./video";
import { useAuth } from "../Context/AuthContext.jsx";
import ListItems from "./ListItems.jsx";
function Home() {
  const { data, loading } = useAuth();

  return (
    <div className="flex gap-4 px-2 md:px-4">
      <Sidebar />
      <div className="h-[calc(100vh-72px)] flex-1 min-w-0 overflow-y-auto overflow-x-hidden">
        <ListItems />
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 px-2 py-4 md:p-4">
          {!loading &&
            data.map((item, index) => {
              if (item?.type !== "video") return null;
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