import React, { useContext, useEffect, useState } from "react";

import { DataContext } from "../context/contextApi";
import LeftNav from "../components/LeftNav";
import VideoCard from "../components/VideoCard";
import UseOnline from "../utils/UseOnline";
import OfflineComponent from "../shared/OfflineComponent";
import ShimmerVideoCard from "../shared/ShimmerVideoCard";
import { getStoredVideos } from "../utils/videoDatabase"; // Импортируем нашу базу

const Feed = () => {
  const { loading, searchResults } = useContext(DataContext);
  const [localVideos, setLocalVideos] = useState([]);

  const isOnline = UseOnline();

  useEffect(() => {
    document.getElementById("root").classList.remove("custom-h");
    
    // Асинхронно загружаем видео с нашего сервера через .then()
    getStoredVideos().then((saved) => {
      if (Array.isArray(saved)) {
        setLocalVideos(saved);
      }
    });
  }, []);

  // Объединяем локальные видео класса с тем, что приходит из контекста (если есть)
  // Твои видео будут идти первыми!
  const combinedVideos = [...localVideos, ...(Array.isArray(searchResults) ? searchResults : [])];

  return (
    <div className="flex h-[calc(100%-56px)]">
      <LeftNav />

      {!isOnline && (
        <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black">
          <OfflineComponent />
        </div>
      )}
      {isOnline && (
        <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-white dark:bg-black">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-5">
            {loading && localVideos.length === 0
              ? Array(24)
                  .fill("")
                  .map((e, index) => {
                    return <ShimmerVideoCard key={index} />;
                  })
              : combinedVideos.map((item, index) => {
                  const videoData = item.video || item;
                  return <VideoCard key={videoData?.id || index} video={videoData} />;
                })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Feed;