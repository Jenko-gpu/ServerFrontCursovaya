const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const PORT = 5000;

// Отдаём статические файлы из папки build
app.use(express.static(path.join(__dirname, 'build')));

app.use(cookieParser());


// Обработка всех маршрутов и отдача index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на https://localhost:${PORT}`);
});