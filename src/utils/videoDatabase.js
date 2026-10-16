// src/utils/videoDatabase.js

export const getStoredVideos = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/videos');
    return await response.json();
  } catch (error) {
    console.error("Ошибка соединения с сервером:", error);
    return [];
  }
};

export const addVideoToDatabase = async (formData) => {
  try {
    const response = await fetch('http://localhost:5000/api/upload', {
      method: 'POST',
      body: formData // Отправляем через FormData, так как это реальный файл
    });
    return await response.json();
  } catch (error) {
    console.error("Ошибка загрузки файла:", error);
  }
};