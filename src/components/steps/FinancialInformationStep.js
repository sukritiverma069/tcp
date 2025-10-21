import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Box,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useForm as useFormContext } from '../../contexts/FormContext';

const FinancialInformationStep = ({ onNext, onBack }) => {
  const { t } = useTranslation();
  const { formData, updateFormData } = useFormContext();

  const schema = yup.object({
    employmentStatus: yup.string().required(t('validation.required')),
    monthlyIncome: yup.string().required(t('validation.required')),
    dependents: yup.string().required(t('validation.required'))
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

  const onSubmit = (data) => {
    updateFormData(data);
    onNext();
  };

  const employmentStatus = watch('employmentStatus');

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
        {t('steps.financialInformation')}
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Row 1 */}
        <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', sm: 'row' } }}>
          <Box sx={{ flex: 1 }}>
            <FormControl fullWidth error={!!errors.employmentStatus}>
              <InputLabel>{t('form.employmentStatus')}</InputLabel>
              <Select
                {...register('employmentStatus')}
                label={t('form.employmentStatus')}
                value={employmentStatus || ''}
                onChange={(e) => setValue('employmentStatus', e.target.value)}
                aria-label={t('form.employmentStatus')}
                sx={{
                  borderRadius: 2
                }}
              >
                <MenuItem value="employed">{t('employmentStatus.employed')}</MenuItem>
                <MenuItem value="unemployed">{t('employmentStatus.unemployed')}</MenuItem>
                <MenuItem value="selfEmployed">{t('employmentStatus.selfEmployed')}</MenuItem>
                <MenuItem value="retired">{t('employmentStatus.retired')}</MenuItem>
                <MenuItem value="student">{t('employmentStatus.student')}</MenuItem>
              </Select>
              {errors.employmentStatus && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 2 }}>
                  {errors.employmentStatus.message}
                </Typography>
              )}
            </FormControl>
          </Box>
          <Box sx={{ flex: 1 }}>
            <TextField
              fullWidth
              label={t('form.monthlyIncome')}
              type="number"
              {...register('monthlyIncome')}
              error={!!errors.monthlyIncome}
              helperText={errors.monthlyIncome?.message}
              InputProps={{
                startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
                'aria-label': t('form.monthlyIncome')
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
              label={t('form.dependents')}
              type="number"
              {...register('dependents')}
              error={!!errors.dependents}
              helperText={errors.dependents?.message}
              InputProps={{
                'aria-label': t('form.dependents')
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
          {t('buttons.next')}
        </Button>
      </Box>
    </Box>
  );
};

export default FinancialInformationStep;