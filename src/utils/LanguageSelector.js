import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <Box 
      sx={{ 
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        position: 'absolute',
        top: 16,
        right: 16,
        zIndex: 1000
      }}
    >
      <Button
        variant={i18n.language === 'en' ? 'contained' : 'outlined'}
        size="small"
        onClick={() => handleLanguageChange('en')}
        sx={{
          minWidth: 'auto',
          px: 2,
          py: 0.5,
          fontSize: '0.875rem',
          fontWeight: 600,
          borderRadius: 1,
          textTransform: 'none'
        }}
        aria-label="Switch to English"
      >
        {t('language.en')}
      </Button>
      <Typography sx={{ color: '#666', fontSize: '0.875rem' }}>|</Typography>
      <Button
        variant={i18n.language === 'ar' ? 'contained' : 'outlined'}
        size="small"
        onClick={() => handleLanguageChange('ar')}
        sx={{
          minWidth: 'auto',
          px: 2,
          py: 0.5,
          fontSize: '0.875rem',
          fontWeight: 600,
          borderRadius: 1,
          textTransform: 'none'
        }}
        aria-label="التبديل إلى العربية"
      >
        {t('language.ar')}
      </Button>
    </Box>
  );
};

export default LanguageSelector;