import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Container, Box, Snackbar, Alert, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { FormProvider, useForm } from './contexts/FormContext';
import ProgressIndicator from './utils/ProgressIndicator';
import LanguageSelector from './utils/LanguageSelector';
import PersonalDetailsStep from './components/steps/PersonalDetailsStep';
import FinancialInformationStep from './components/steps/FinancialInformationStep';
import AssistanceDetailsStep from './components/steps/AssistanceDetailsStep';
import './utils/i18n';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#ffc107',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});

const AppContent = () => {
  const { t } = useTranslation();
  const { currentStep, setStep, setSubmitting } = useForm();
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Language switching is handled by i18n automatically

  const handleNext = () => {
    if (currentStep < 3) {
      setStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    
    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSnackbar({
        open: true,
        message: t('success.applicationSubmitted'),
        severity: 'success'
      });
      
      // Reset form after successful submission
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to submit application. Please try again.',
        severity: 'error'
      });
    } finally {
      setSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalDetailsStep onNext={handleNext} />;
      case 2:
        return <FinancialInformationStep onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <AssistanceDetailsStep onSubmit={handleSubmit} onBack={handleBack} />;
      default:
        return <PersonalDetailsStep onNext={handleNext} />;
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#f5f5f5'
      }}
    >
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box
          sx={{
            backgroundColor: 'white',
            borderRadius: 3,
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            p: { xs: 3, sm: 4, md: 6 },
            position: 'relative',
            border: '1px solid rgba(0,0,0,0.05)'
          }}
        >
          <LanguageSelector />
          
          <Typography 
            variant="h4" 
            component="h1" 
            sx={{ 
              mb: 4, 
              fontWeight: 700,
              color: '#333',
              textAlign: 'center'
            }}
          >
            {t('title')}
          </Typography>

          <ProgressIndicator />
          
          <Box sx={{ mt: 4 }}>
            {renderStep()}
          </Box>
        </Box>
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <FormProvider>
        <AppContent />
      </FormProvider>
    </ThemeProvider>
  );
}

export default App;
