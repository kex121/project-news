import { useState, useEffect } from "react";
import { Box, Typography, Paper, Link, Chip, Button } from "@mui/material";
import axiosInstance from "../../services/axiosInstance";

const SearchPage = () => {
  const [news, setNews] = useState([]);
  const [tags, setTags] = useState([]);
  const [showNews, setShowNews] = useState(false); // для контроля показа новостей

  useEffect(() => {
    // Функция для загрузки тегов пользователя
    const fetchTags = async () => {
      try {
        const userId = 4; // Замените на актуальный ID пользователя, если доступен
        const response = await axiosInstance.get(`/words/${userId}`);
        setTags(response.data);
      } catch (error) {
        console.error("Ошибка при загрузке тегов:", error);
      }
    };

    fetchTags();
  }, []);

  // Функция для загрузки новостей
  const fetchNews = async () => {
    try {
      const response = await axiosInstance.get("/news/getnews");
      setNews(response.data.news);
      setShowNews(true); // Показываем новости после их загрузки
    } catch (error) {
      console.error("Ошибка при загрузке новостей:", error);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      minHeight="100vh"
      bgcolor="#1a1a1a"
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          bgcolor: "#222",
          borderRadius: 2,
          maxWidth: 800,
          width: "100%",
          marginBottom: 4, // добавляем отступ снизу
        }}
      >
        <Typography variant="h5" color="white" align="center" gutterBottom>
          Добро пожаловать на наш новостной портал!
        </Typography>
        <Typography variant="body1" color="gray" align="center" gutterBottom>
          Мы понимаем, что не все новости приносят радость, и иногда хочется
          оградить себя от негативной информации. Наше приложение предлагает
          уникальную возможность адаптировать новостную ленту под ваши интересы.
          Добавьте теги с темами, которые вам интересны, и исключите слова,
          которые вы не хотите видеть в новостях. Войдя в свой аккаунт, вы
          сможете наслаждаться новостями, подобранными по вашим предпочтениям, и
          избежать нежелательных тем. Создайте комфортную новостную ленту именно
          для вас!
        </Typography>
      </Paper>

      {/* Отображение списка тегов */}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        mb={4}
        width="100%"
        maxWidth={800}
      >
        <Typography variant="h6" color="white" gutterBottom>
          Ваши тэги для поиска:
        </Typography>
        <Box display="flex" flexWrap="wrap" gap={1} justifyContent="center">
          {tags.map((tag) => (
            <Chip
              key={tag.id}
              label={tag.name}
              sx={{
                color: "white",
                bgcolor: tag.isGood ? "green" : "red",
                "& .MuiChip-label": { fontWeight: "bold" },
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Кнопка для получения новостей */}
      <Box display="flex" justifyContent="center" mb={4}>
        <Button
          variant="contained"
          color="primary"
          onClick={fetchNews}
          sx={{ paddingX: 4 }}
        >
          Получить новости на сегодня
        </Button>
      </Box>

      {/* Отображение списка новостей после нажатия кнопки */}
      {showNews && (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          bgcolor="#1a1a1a"
          color="white"
          padding={2}
          borderRadius={2}
          sx={{ width: "100%", maxWidth: 800 }}
        >
          <Typography variant="h6" gutterBottom>
            Новости
          </Typography>
          {news.length > 0 ? (
            news.map((item, index) => (
              <Paper
                key={index}
                variant="outlined"
                sx={{
                  bgcolor: "#222",
                  color: "white",
                  width: "100%",
                  maxWidth: 600,
                  padding: 2,
                  marginBottom: 2,
                  borderColor: "gray",
                }}
              >
                <Typography variant="h6">{item.title}</Typography>
                <Typography variant="body2" color="gray" gutterBottom>
                  {item.description || "Без описания"}
                </Typography>
                {item.imageUrl && (
                  <Box
                    component="img"
                    src={item.imageUrl}
                    alt={item.title}
                    width="100%"
                    sx={{ marginY: 2 }}
                  />
                )}
                <Link
                  href={item.link}
                  target="_blank"
                  color="inherit"
                  underline="hover"
                >
                  Читать далее
                </Link>
              </Paper>
            ))
          ) : (
            <Typography>Нет доступных новостей</Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export default SearchPage;
