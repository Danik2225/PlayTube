import React, { useState } from "react";
import { addVideoToDatabase } from "../utils/videoDatabase";

export default function UploadModal({ onClose }) {
  const [videoTitle, setVideoTitle] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [fileObj, setFileObj] = useState(null);
  const [mediaType, setMediaType] = useState("video");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileObj(file);
      if (file.type.startsWith("video")) setMediaType("video");
      else if (file.type.startsWith("audio")) setMediaType("audio");
      else setMediaType("image");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!videoTitle || !authorName || !fileObj) {
      alert("Заполни все поля и выбери файл!");
      return;
    }

    const formData = new FormData();
    formData.append("title", videoTitle);
    formData.append("author", authorName);
    formData.append("mediaType", mediaType);
    formData.append("media", fileObj); // Сам файл

    await addVideoToDatabase(formData);
    alert("🎉 Файл успешно сохранен в папку uploads на сервере!");
    onClose();
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-[#1e1e1e] rounded-2xl w-full max-w-md p-6 shadow-2xl relative border border-gray-700 text-white">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl">✕</button>
        <h2 className="text-xl font-bold mb-4">📂 Загрузка в папку uploads</h2>
        
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-xs text-gray-400 mb-1">Имя автора *</label>
            <input 
              type="text" required placeholder="Например: Даня"
              value={authorName} onChange={(e) => setAuthorName(e.target.value)}
              className="w-full p-2.5 rounded-lg bg-[#2e2e2e] text-white border border-gray-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1">Название *</label>
            <input 
              type="text" required placeholder="Название ролика"
              value={videoTitle} onChange={(e) => setVideoTitle(e.target.value)}
              className="w-full p-2.5 rounded-lg bg-[#2e2e2e] text-white border border-gray-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1">Выберите файл (видео, аудио, фото)</label>
            <input 
              type="file" required onChange={handleFileChange}
              className="w-full p-2 rounded-lg bg-[#2e2e2e] text-white text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-pink-500 file:text-white cursor-pointer"
            />
          </div>

          <div className="pt-3 flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-400 hover:bg-gray-800 rounded-lg">Отмена</button>
            <button type="submit" className="px-5 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg font-medium">Загрузить на сервер</button>
          </div>
        </form>
      </div>
    </div>
  );
}