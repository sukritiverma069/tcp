import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment
} from '@mui/material';
import { CalendarToday as CalendarIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useForm as useFormContext } from '../../contexts/FormContext';

const PersonalDetailsStep = ({ onNext }) => {
  const { t } = useTranslation();
  const { formData, updateFormData } = useFormContext();

  const schema = yup.object({
    fullName: yup.string().required(t('validation.required')),
    dateOfBirth: yup.string().required(t('validation.required')),
    address: yup.string().required(t('validation.required')),
    nationalId: yup.string().required(t('validation.required')),
    phoneNumber: yup.string().required(t('validation.required')),
    email: yup.string().email(t('validation.invalidEmail')).required(t('validation.required'))
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: formData
  });

  const onSubmit = (data) => {
    updateFormData(data);
    onNext();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
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
        {t('steps.personalDetails')}
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Row 1 */}
        <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', sm: 'row' } }}>
          <Box sx={{ flex: 1 }}>
            <TextField
              fullWidth
              label={t('form.fullName')}
              {...register('fullName')}
              error={!!errors.fullName}
              helperText={errors.fullName?.message}
              InputProps={{
                'aria-label': t('form.fullName')
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
              label={t('form.dateOfBirth')}
              type="date"
              InputLabelProps={{ shrink: true }}
              {...register('dateOfBirth')}
              error={!!errors.dateOfBirth}
              helperText={errors.dateOfBirth?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <CalendarIcon color="action" />
                  </InputAdornment>
                ),
                'aria-label': t('form.dateOfBirth')
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
              label={t('form.nationalId')}
              {...register('nationalId')}
              error={!!errors.nationalId}
              helperText={errors.nationalId?.message}
              InputProps={{
                'aria-label': t('form.nationalId')
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
              label={t('form.phoneNumber')}
              type="tel"
              {...register('phoneNumber')}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber?.message}
              InputProps={{
                'aria-label': t('form.phoneNumber')
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2
                }
              }}
            />
          </Box>
        </Box>

        {/* Row 3 */}
        <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', sm: 'row' } }}>
          <Box sx={{ flex: 1 }}>
            <TextField
              fullWidth
              label={t('form.email')}
              type="email"
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
              InputProps={{
                'aria-label': t('form.email')
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
              label={t('form.address')}
              multiline
              rows={3}
              {...register('address')}
              error={!!errors.address}
              helperText={errors.address?.message}
              InputProps={{
                'aria-label': t('form.address')
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2
                }
              }}
            />
          </Box>
        </Box>
      </Box>

      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        mt: 4 
      }}>
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
          {t('buttons.next')}
        </Button>
      </Box>
    </Box>
  );
};

export default PersonalDetailsStep;