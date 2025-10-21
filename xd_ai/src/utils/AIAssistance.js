import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  TextField,
  CircularProgress,
  Alert,
  IconButton
} from '@mui/material';
import { Close as CloseIcon, AutoFixHigh as SparkleIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import openaiService from '../services/openaiService';

const AIAssistance = ({ fieldType, currentValue, onAccept, isOpen, onClose }) => {
  const { t, i18n } = useTranslation();
  const [suggestion, setSuggestion] = useState('');
  const [editedSuggestion, setEditedSuggestion] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateSuggestion = async () => {
    setIsGenerating(true);
    setError('');
    
    try {
      const prompt = currentValue || `I am unemployed with no income. Help me describe my financial hardship.`;
      const language = i18n.language;
      
      const generatedText = await openaiService.generateTextSuggestion(
        prompt, 
        fieldType, 
        language
      );
      
      setSuggestion(generatedText);
      setEditedSuggestion(generatedText);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAccept = () => {
    onAccept(editedSuggestion);
    handleClose();
  };

  const handleClose = () => {
    setSuggestion('');
    setEditedSuggestion('');
    setError('');
    onClose();
  };

  const handleEdit = (event) => {
    setEditedSuggestion(event.target.value);
  };

  return (
    <Dialog 
      open={isOpen} 
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          minHeight: '400px'
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 1,
        pb: 1
      }}>
        <SparkleIcon sx={{ color: '#ffc107', fontSize: '1.25rem' }} />
        <Typography variant="h6" component="span">
          {t('buttons.helpMeWrite')}
        </Typography>
        <IconButton
          onClick={handleClose}
          sx={{ ml: 'auto' }}
          aria-label="Close"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
            {t('ai.suggestedText')}
          </Typography>
          
          {isGenerating ? (
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              py: 4
            }}>
              <CircularProgress size={24} sx={{ mr: 2 }} />
              <Typography>{t('ai.generating')}</Typography>
            </Box>
          ) : suggestion ? (
            <TextField
              fullWidth
              multiline
              rows={6}
              value={editedSuggestion}
              onChange={handleEdit}
              variant="outlined"
              placeholder={t('ai.suggestedText')}
              sx={{
                '& .MuiOutlinedInput-root': {
                  fontSize: '0.875rem'
                }
              }}
            />
          ) : (
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              py: 4,
              border: '2px dashed #ddd',
              borderRadius: 1
            }}>
              <Button
                variant="outlined"
                onClick={handleGenerateSuggestion}
                startIcon={<SparkleIcon />}
                sx={{ textTransform: 'none' }}
              >
                {t('buttons.helpMeWrite')}
              </Button>
            </Box>
          )}
          
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
        </Box>
      </DialogContent>
      
      {suggestion && (
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button
            onClick={handleClose}
            variant="outlined"
            sx={{ textTransform: 'none' }}
          >
            {t('buttons.discard')}
          </Button>
          <Button
            onClick={handleAccept}
            variant="contained"
            sx={{ textTransform: 'none' }}
          >
            {t('buttons.accept')}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default AIAssistance;