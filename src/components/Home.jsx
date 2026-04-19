import React from "react";
import Sidebar from "./Sidebar.jsx";
import Video from "./video.jsx";
import ListItems from "./ListItems.jsx";
import { useAuth } from "../Context/AuthProvider.jsx";

function Home() {
  const { data = [], loading } = useAuth();

  // Filter only valid videos
  const videos = data
    .map(item => item?.video || item)
    .filter(video => video?.videoId);

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 h-[calc(100vh-3.5rem)] overflow-y-scroll overflow-x-hidden">
        <ListItems />

        {loading ? (
          <p className="p-4">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-4 gap-y-8 px-4 py-3">
            {videos.map((video, index) => (
              <Video
                key={`${video.videoId}-${index}`}
                video={video}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;