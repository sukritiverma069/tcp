import React from 'react';
import { Box, Stepper, Step, StepLabel, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useForm } from '../contexts/FormContext';

const ProgressIndicator = () => {
  const { t } = useTranslation();
  const { currentStep } = useForm();

  const steps = [
    { key: 'personalDetails', label: t('steps.personalDetails') },
    { key: 'financialInformation', label: t('steps.financialInformation') },
    { key: 'assistanceDetails', label: t('steps.assistanceDetails') }
  ];

  return (
    <Box 
      sx={{ 
        width: '100%',
        mb: 4
      }}
      role="progressbar"
      aria-label={`Step ${currentStep} of ${steps.length}`}
      aria-valuenow={currentStep}
      aria-valuemin={1}
      aria-valuemax={steps.length}
    >
      <Stepper 
        activeStep={currentStep - 1} 
        alternativeLabel
        sx={{
          '& .MuiStepLabel-root': {
            '& .MuiStepLabel-label': {
              fontSize: { xs: '0.875rem', sm: '1rem' },
              fontWeight: currentStep === 1 ? 600 : 400,
              color: currentStep === 1 ? '#1976d2' : '#666'
            },
            '& .MuiStepLabel-iconContainer': {
              '& .MuiSvgIcon-root': {
                fontSize: { xs: '1.5rem', sm: '1.75rem' },
                color: currentStep === 1 ? '#1976d2' : '#ccc'
              }
            }
          }
        }}
      >
        {steps.map((step, index) => (
          <Step key={step.key}>
            <StepLabel>
              <Typography 
                variant="body2" 
                sx={{ 
                  fontWeight: currentStep === index + 1 ? 600 : 400,
                  color: currentStep === index + 1 ? '#1976d2' : '#666'
                }}
              >
                {step.label}
              </Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default ProgressIndicator;