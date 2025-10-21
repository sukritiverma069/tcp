import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment
} from '@mui/material';
import { AutoFixHigh as SparkleIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useForm as useFormContext } from '../../contexts/FormContext';
import AIAssistance from '../../utils/AIAssistance';

const AssistanceDetailsStep = ({ onSubmit, onBack }) => {
  const { t } = useTranslation();
  const { formData, updateFormData } = useFormContext();
  const [aiDialogOpen, setAiDialogOpen] = useState(false);
  const [currentField, setCurrentField] = useState('');

  const schema = yup.object({
    financialHardship: yup.string().required(t('validation.required')),
    assistanceNeeded: yup.string().required(t('validation.required')),
    additionalInfo: yup.string()
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: formData
  });

  const onFormSubmit = (data) => {
    updateFormData(data);
    onSubmit();
  };

  const handleAIAssistance = (fieldName) => {
    setCurrentField(fieldName);
    setAiDialogOpen(true);
  };

  const handleAcceptAISuggestion = (suggestion) => {
    setValue(currentField, suggestion);
    setAiDialogOpen(false);
  };

  const fields = [
    {
      name: 'financialHardship',
      label: t('form.financialHardship'),
      rows: 4
    },
    {
      name: 'assistanceNeeded',
      label: t('form.assistanceNeeded'),
      rows: 4
    },
    {
      name: 'additionalInfo',
      label: t('form.additionalInfo'),
      rows: 3
    }
  ];

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit(onFormSubmit)}
      sx={{
        '& .MuiTextField-root': {
          mb: 2
        }
      }}
      >
        <Typography 
          variant="h5" 
          component="h2" 
          sx={{ 
            mb: 3, 
            fontWeight: 600,
            color: '#333'
          }}
        >
          {t('steps.assistanceDetails')}
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Row 1 */}
          <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', sm: 'row' } }}>
            <Box sx={{ flex: 1 }}>
              <TextField
                fullWidth
                label={fields[0].label}
                multiline
                rows={fields[0].rows}
                {...register(fields[0].name)}
                error={!!errors[fields[0].name]}
                helperText={errors[fields[0].name]?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => handleAIAssistance(fields[0].name)}
                        edge="end"
                        aria-label={`${t('buttons.helpMeWrite')} for ${fields[0].label}`}
                        sx={{ 
                          color: '#ffc107',
                          '&:hover': {
                            backgroundColor: 'rgba(255, 193, 7, 0.1)'
                          }
                        }}
                      >
                        <SparkleIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                  'aria-label': fields[0].label
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2
                  }
                }}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <TextField
                fullWidth
                label={fields[1].label}
                multiline
                rows={fields[1].rows}
                {...register(fields[1].name)}
                error={!!errors[fields[1].name]}
                helperText={errors[fields[1].name]?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => handleAIAssistance(fields[1].name)}
                        edge="end"
                        aria-label={`${t('buttons.helpMeWrite')} for ${fields[1].label}`}
                        sx={{ 
                          color: '#ffc107',
                          '&:hover': {
                            backgroundColor: 'rgba(255, 193, 7, 0.1)'
                          }
                        }}
                      >
                        <SparkleIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                  'aria-label': fields[1].label
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2
                  }
                }}
              />
            </Box>
          </Box>

          {/* Row 2 */}
          <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', sm: 'row' } }}>
            <Box sx={{ flex: 1 }}>
              <TextField
                fullWidth
                label={fields[2].label}
                multiline
                rows={fields[2].rows}
                {...register(fields[2].name)}
                error={!!errors[fields[2].name]}
                helperText={errors[fields[2].name]?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => handleAIAssistance(fields[2].name)}
                        edge="end"
                        aria-label={`${t('buttons.helpMeWrite')} for ${fields[2].label}`}
                        sx={{ 
                          color: '#ffc107',
                          '&:hover': {
                            backgroundColor: 'rgba(255, 193, 7, 0.1)'
                          }
                        }}
                      >
                        <SparkleIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                  'aria-label': fields[2].label
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2
                  }
                }}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              {/* Empty field to maintain 2 fields per row */}
            </Box>
          </Box>

          {/* Row 3 */}
          <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', sm: 'row' } }}>
            <Box sx={{ flex: 1 }}>
              {/* Empty field to maintain 3 rows */}
            </Box>
            <Box sx={{ flex: 1 }}>
              {/* Empty field to maintain 3 rows */}
            </Box>
          </Box>
        </Box>

        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          mt: 4 
        }}>
          <Button
            onClick={onBack}
            variant="outlined"
            size="large"
            sx={{
              px: 6,
              py: 2,
              fontSize: '1.1rem',
              fontWeight: 600,
              textTransform: 'none',
              borderRadius: 3,
              minWidth: 140,
              borderWidth: 2,
              '&:hover': {
                borderWidth: 2,
                transform: 'translateY(-1px)'
              },
              transition: 'all 0.2s ease-in-out'
            }}
          >
            {t('buttons.back')}
          </Button>
          
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{
              px: 6,
              py: 2,
              fontSize: '1.1rem',
              fontWeight: 600,
              textTransform: 'none',
              borderRadius: 3,
              minWidth: 140,
              boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
              '&:hover': {
                boxShadow: '0 6px 16px rgba(25, 118, 210, 0.4)',
                transform: 'translateY(-1px)'
              },
              transition: 'all 0.2s ease-in-out'
            }}
          >
            {t('buttons.submit')}
          </Button>
        </Box>
      </Box>

      <AIAssistance
        fieldType={currentField}
        currentValue={watch(currentField)}
        onAccept={handleAcceptAISuggestion}
        isOpen={aiDialogOpen}
        onClose={() => setAiDialogOpen(false)}
      />
    </>
  );
};

export default AssistanceDetailsStep;