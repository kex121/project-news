import React, { useEffect, useState } from 'react'; 
import axiosInstance from '../../services/axiosInstance';
import { Stack, Card, CardContent, Typography, IconButton, Box, Divider, Avatar, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';

export default function UserProfilePage() {
  const [keyWords, setKeyWords] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newKeyword, setNewKeyword] = useState('');
  const [isGood, setIsGood] = useState(true);

  useEffect(() => {
    const fetchKeyWords = async () => {
      try {
        const response = await axiosInstance.get(`/keywords/2`);
        setKeyWords(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchKeyWords();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/keywords/${id}`);
      setKeyWords(keyWords.filter(word => word.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddKeyword = async () => {
    try {
      const response = await axiosInstance.post(`/keywords`, { name: newKeyword, userId: 2, isGood });
      setKeyWords([...keyWords, response.data]);
      setNewKeyword('');
      setOpenAddDialog(false);
    } catch (error) {
      console.error(error);
    }
  };

  const openAddDialogWithIsGood = (value) => {
    setIsGood(value);
    setOpenAddDialog(true);
  };

  const goodWords = keyWords.filter(word => word.isGood);
  const exceptionWords = keyWords.filter(word => !word.isGood);

  return (
    <Box sx={{ padding: 8, backgroundColor: '#f0f4f8', minHeight: '100vh' }}>
      {/* User Information */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <Avatar sx={{ bgcolor: 'primary.main', mr: 2, width: 44, height: 44 }}>А</Avatar>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Имя</Typography>
          <Typography variant="body2" color="text.secondary">Почта</Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Keywords and Exclusion Words */}
      <Stack direction="row" spacing={3}>
        {/* Good Words Section */}
        <Stack flex={1} spacing={2} sx={{ backgroundColor: '#ffffff', borderRadius: 3, padding: 3, boxShadow: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              Ключевые слова
            </Typography>
            <IconButton color="primary" onClick={() => openAddDialogWithIsGood(true)}>
              <AddIcon />
            </IconButton>
          </Box>
          <Divider/>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 1 }}>
            {goodWords.map((word) => (
              <Card key={word.id} variant="outlined" sx={{ display: 'flex', alignItems: 'center', borderRadius: 2, borderColor: 'primary.light', flexBasis: '48%' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography>{word.name}</Typography>
                </CardContent>
                <IconButton onClick={() => handleDelete(word.id)} aria-label="delete" color="error">
                  <DeleteIcon />
                </IconButton>
              </Card>
            ))}
          </Box>
        </Stack>
        
        {/* Exception Words Section */}
        <Stack flex={1} spacing={2} sx={{ backgroundColor: '#ffffff', borderRadius: 3, padding: 3, boxShadow: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'error.main' }}>
              Слова-исключения
            </Typography>
            <IconButton color="error" onClick={() => openAddDialogWithIsGood(false)}>
              <AddIcon />
            </IconButton>
          </Box>
          <Divider/>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 1 }}>
            {exceptionWords.map((word) => (
              <Card key={word.id} variant="outlined" sx={{ display: 'flex', alignItems: 'center', borderRadius: 2, borderColor: 'error.light', flexBasis: '48%' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography>{word.name}</Typography>
                </CardContent>
                <IconButton onClick={() => handleDelete(word.id)} aria-label="delete" color="error">
                  <DeleteIcon />
                </IconButton>
              </Card>
            ))}
          </Box>
        </Stack>
      </Stack>

      {/* Add Keyword Dialog */}
      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
        <DialogTitle>Добавить {isGood ? 'ключевое слово' : 'слово-исключение'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Новое слово"
            type="text"
            fullWidth
            variant="outlined"
            value={newKeyword}
            onChange={(e) => setNewKeyword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)} color="secondary">
            Отмена
          </Button>
          <Button onClick={handleAddKeyword} color="primary">
            Добавить
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}