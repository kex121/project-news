import React, { useState, useEffect } from "react";
import { Box, Typography, Paper, Chip, Button } from "@mui/material";
import axiosInstance from "../../services/axiosInstance";

const SearchPage = () => {
  const [news, setNews] = useState([]);
  const [tags, setTags] = useState([]);
  const [showNews, setShowNews] = useState(false);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const userId = 4;
        const response = await axiosInstance.get(`/keywords/${userId}`);
        setTags(response.data);
      } catch (error) {
        console.error("Ошибка при загрузке тегов:", error);
      }
    };

    fetchTags();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await axiosInstance.get("/news/getnews");
      setNews(response.data.news);
      setShowNews(true);
    } catch (error) {
      console.error("Ошибка при загрузке новостей:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        padding: "20px",
        backgroundColor: "#f0f4f8",
        backgroundImage: "url(/BG.webp)",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        color: "#003366",
      }}
    >
      <Paper
        sx={{
          padding: 4,
          backgroundColor: "#ffffffcc",
          borderRadius: 3,
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: 800,
          border: "2px solid #003366",
        }}
      >
        <Typography
          variant="h5"
          align="center"
          sx={{ color: "#003366", fontWeight: "bold" }}
        >
          Добро пожаловать на наш новостной портал!
        </Typography>
        <Typography
          variant="body1"
          align="center"
          sx={{ color: "#003366", marginBottom: 2 }}
        >
          Мы понимаем, что не все новости приносят радость, и иногда хочется
          оградить себя от негативной информации. Наше приложение предлагает
          уникальную возможность адаптировать новостную ленту под ваши интересы.
        </Typography>
      </Paper>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 4,
          width: "100%",
          maxWidth: 800,
          backgroundColor: "#ffffffcc",
          padding: 3,
          borderRadius: 2,
          border: "2px solid #003366",
        }}
      >
        <Typography variant="h6" sx={{ color: "#003366", fontWeight: "bold" }}>
          Ваши тэги для поиска:
        </Typography>
        <Box
          display="flex"
          flexWrap="wrap"
          gap={1}
          justifyContent="center"
          sx={{ marginTop: 2 }}
        >
          {tags.map((tag) => (
            <Chip
              key={tag.id}
              label={tag.name}
              sx={{
                color: "#ffffff",
                backgroundColor: tag.isGood ? "#1e90ff" : "#ff6347",
                fontWeight: "bold",
              }}
            />
          ))}
        </Box>
      </Box>

      <Box display="flex" justifyContent="center" marginTop={4}>
        <Button
          variant="contained"
          onClick={fetchNews}
          sx={{
            backgroundColor: "#003366",
            color: "#ffffff",
            "&:hover": {
              backgroundColor: "#1e90ff",
            },
            paddingX: 4,
          }}
        >
          Получить новости на сегодня
        </Button>
      </Box>

      {showNews && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#ffffffcc",
            color: "#003366",
            padding: 3,
            borderRadius: 2,
            marginTop: 4,
            width: "100%",
            maxWidth: 800,
            border: "2px solid #003366",
          }}
        >
          <Typography variant="h6" sx={{ color: "#003366" }} gutterBottom>
            Новости
          </Typography>
          {news.length > 0 ? (
            news.map((item, index) => (
              <Paper
                key={index}
                sx={{
                  backgroundColor: "#ffffff",
                  color: "#003366",
                  padding: 2,
                  marginBottom: 2,
                  borderRadius: 2,
                  border: "1px solid #003366",
                }}
              >
                <Typography variant="h6" sx={{ color: "#003366" }}>
                  {item.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#003366" }}
                  gutterBottom
                >
                  {item.description || "Без описания"}
                </Typography>
                {item.publishedAt && (
                  <Typography
                    variant="caption"
                    sx={{ color: "#003366" }}
                    display="block"
                  >
                    Дата публикации:{" "}
                    {new Date(item.publishedAt).toLocaleDateString()}
                  </Typography>
                )}
                {item.imageUrl && (
                  <Box
                    component="img"
                    src={item.imageUrl}
                    alt={item.title}
                    sx={{
                      width: "100%",
                      borderRadius: 2,
                      marginTop: 1,
                    }}
                  />
                )}
                <Button
                  href={item.link}
                  target="_blank"
                  sx={{ color: "#003366", fontWeight: "bold", marginTop: 1 }}
                >
                  Читать далее
                </Button>
              </Paper>
            ))
          ) : (
            <Typography sx={{ color: "#003366" }}>
              Нет доступных новостей
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export default SearchPage;
