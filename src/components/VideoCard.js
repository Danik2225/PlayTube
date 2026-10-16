import React, { useState } from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";

const VideoCard = ({ video }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!video) return null;

  const isLocal = video.mediaUrl;
  const mediaSrc = isLocal ? video.mediaUrl : (video?.thumbnails?.[0]?.url);
  const authorName = typeof video?.author === 'string' ? video.author : (video?.author?.title || "Daniel");
  const mediaType = video?.mediaType || 'image';

  return (
    <>
      <div 
        onClick={() => setIsOpen(true)}
        className="flex flex-col mb-8 cursor-pointer group"
      >
        <div className="relative h-48 md:h-40 md:rounded-xl overflow-hidden bg-gray-900 border border-gray-800">
          {isLocal && mediaType === 'video' ? (
            <video className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 muted">
              <source src={mediaSrc} />
            </video>
          ) : isLocal && mediaType === 'audio' ? (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-tr from-purple-900 to-indigo-900 text-white p-4">
              <span className="text-3xl mb-1">🎵</span>
              <span className="text-xs font-bold text-center truncate w-full">{video?.title}</span>
            </div>
          ) : (
            <img
              src={mediaSrc}
              alt="media"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          )}
          <span className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded font-bold">
            {mediaType === 'video' ? '🎬 Видео' : mediaType === 'audio' ? '🎵 Аудио' : '📸 Фото'}
          </span>
        </div>

        <div className="flex text-white mt-3">
          <div className="flex h-9 w-9 rounded-full overflow-hidden shrink-0">
            <img src="/Daniel.jpg" alt="Avatar" className="h-full w-full object-cover" />
          </div>
          <div className="flex flex-col ml-3 overflow-hidden">
            <span className="text-sm font-bold line-clamp-2">{video?.title}</span>
            <span className="text-[12px] font-semibold mt-1 text-gray-400 flex items-center">
              {authorName}
              <BsFillCheckCircleFill className="text-gray-400 text-[12px] ml-1" />
            </span>
            <span className="text-[12px] text-gray-500">{video?.publishedTimeText || "Только что"}</span>
          </div>
        </div>
      </div>

      {/* МОДАЛЬНОЕ ОКНО ПРОСМОТРА */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-[#181818] rounded-2xl max-w-2xl w-full p-4 relative border border-gray-700 text-white flex flex-col items-center"
          >
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl z-10 bg-black/50 p-2 rounded-full"
            >
              ✕
            </button>

            <h3 className="text-lg font-bold mb-3 w-full text-left">{video?.title}</h3>

            <div className="w-full max-h-[70vh] flex items-center justify-center bg-black rounded-lg overflow-hidden mb-3 p-2">
              {isLocal && mediaType === 'video' ? (
                <video controls autoPlay className="max-h-[65vh] max-w-full rounded">
                  <source src={mediaSrc} />
                  Ваш браузер не поддерживает видео.
                </video>
              ) : isLocal && mediaType === 'audio' ? (
                <div className="flex flex-col items-center justify-center py-12 w-full">
                  <div className="text-6xl mb-4 animate-bounce">🎵</div>
                  <p className="text-sm text-gray-300 mb-6">{video?.title}</p>
                  <audio controls autoPlay className="w-full max-w-md">
                    <source src={mediaSrc} />
                    Ваш браузер не поддерживает аудио.
                  </audio>
                </div>
              ) : (
                <img src={mediaSrc} alt="Full size" className="max-h-[65vh] max-w-full object-contain rounded" />
              )}
            </div>

            <div className="w-full flex justify-between items-center text-sm text-gray-400 px-1 pt-2 border-t border-gray-800">
              <span>Автор: <strong className="text-white">{authorName}</strong></span>
              <span>{video?.description || ""}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoCard;