import { Box, Typography, TextField, Button, Paper, Link } from "@mui/material";

const SearchPage = () => {
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

        <Box display="flex" flexDirection="column" gap={2} mt={2}>
          <TextField
            label="Найти новость по ключевым словам"
            variant="outlined"
            fullWidth
            slotProps={{
              input: { style: { color: "white" } },
              inputLabel: { style: { color: "gray" } },
            }}
          />
          <TextField
            label="Введите нежелательные тэги через запятую"
            variant="outlined"
            fullWidth
            slotProps={{
              input: { style: { color: "white" } },
              inputLabel: { style: { color: "gray" } },
            }}
          />
          <Button
            variant="outlined"
            sx={{
              color: "white",
              borderColor: "gray",
              "&:hover": { borderColor: "white" },
            }}
          >
            начать поиск
          </Button>
        </Box>
      </Paper>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        bgcolor="#1a1a1a"
        color="white"
        padding={2}
        borderRadius={2}
      >
        <Typography variant="h6" gutterBottom>
          Новости
        </Typography>
        {[1, 2, 3].map((item, index) => (
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
            <Typography variant="body1">
              {index + 1}. Заголовок. Подзаголовок.{" "}
              <Link href="#" color="inherit" underline="hover">
                ссылка на новость
              </Link>
            </Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default SearchPage;
