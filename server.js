const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

// Создаем папку uploads, если её ещё нет
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Делаем папку uploads доступной для чтения по сети
app.use('/uploads', express.static(uploadDir));

// Настройка сохранения файлов через multer (с сохранением оригинальных имен и уникальным префиксом)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + Buffer.from(file.originalname, 'latin1').toString('utf8'));
  }
});

const upload = multer({ storage });

// Путь к файлу базы данных
const DB_FILE = path.join(__dirname, 'database.json');

const getDb = () => {
  if (!fs.existsSync(DB_FILE)) return [];
  try {
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
  } catch (e) {
    return [];
  }
};

// 1. Получить список всех медиафайлов
app.get('/api/videos', (req, res) => {
  const videos = getDb();
  res.json(videos);
});

// 2. Загрузить новый файл (видео, аудио, фото)
app.post('/api/upload', upload.single('media'), (req, res) => {
  try {
    const { title, description, author, mediaType } = req.body;
    
    // Автоматическое определение хоста (корректно работает локально и на Render)
    const protocol = req.protocol;
    const host = req.get('host');
    const fileUrl = `${protocol}://${host}/uploads/${req.file.filename}`;

    const newVideo = {
      id: Date.now().toString(),
      title: title || "Без названия",
      description: description || "",
      author: { title: author || "Daniel" },
      mediaUrl: fileUrl,
      mediaType: mediaType || 'video',
      stats: { views: "1 просмотр" },
      publishedTimeText: "Только что"
    };

    const videos = getDb();
    videos.unshift(newVideo);
    fs.writeFileSync(DB_FILE, JSON.stringify(videos, null, 2), 'utf8');

    res.json({ success: true, video: newVideo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Динамический порт для Render или локальной машины
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на порту ${PORT}`);
});