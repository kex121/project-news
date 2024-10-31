import React, { useEffect, useState } from 'react';
import axiosInstance from '../../services/axiosInstance';
import { Grid, Card, CardContent, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function UserProfilePage() {
  const [keyWords, setKeyWords] = useState([]);
  
  // userId должен передаваться пропсом

  useEffect(() => {
    const fetchKeyWords = async () => {
      try {
        const response = await axiosInstance.get(`/keyWords/${userId}`);
        setKeyWords(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    
    fetchKeyWords();
  }, []);

  // Задаток для удаления

  // const handleDelete = async (id) => {
  //   try {
  //     await axiosInstance.delete(`/keyWords/${id}`);
  //     setKeyWords(keyWords.filter(word => word.id !== id));
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const goodWords = keyWords.filter(word => word.isGood);
  const exceptionWords = keyWords.filter(word => !word.isGood);

  return (
    <Grid container spacing={2} padding={2}>
      <Grid item xs={6}>
        <Typography variant="h6" gutterBottom>Ключевые слова</Typography>
        {goodWords.map((word) => (
          <Card key={word.id} variant="outlined" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography>{word.name}</Typography>
            </CardContent>
            {/* Удаление слова */}
            {/* <IconButton onClick={() => handleDelete(word.id)} aria-label="delete">
              <DeleteIcon />
            </IconButton> */}
          </Card>
        ))}
      </Grid>
      
      <Grid item xs={6}>
        <Typography variant="h6" gutterBottom>Слова-исключения</Typography>
        {exceptionWords.map((word) => (
          <Card key={word.id} variant="outlined" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography>{word.name}</Typography>
            </CardContent>
            {/* Удаление слова */}
            {/* <IconButton onClick={() => handleDelete(word.id)} aria-label="delete">
              <DeleteIcon />
            </IconButton> */}
          </Card>
        ))}
      </Grid>
    </Grid>
  );
}
