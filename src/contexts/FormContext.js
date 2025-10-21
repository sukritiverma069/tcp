import React, { createContext, useContext, useReducer, useEffect, useRef, useCallback } from 'react';

const FormContext = createContext();

const STORAGE_KEY = 'socialSupportFormData';

const initialState = {
  currentStep: 1,
  formData: {
    // Step 1: Personal Details
    fullName: '',
    dateOfBirth: '',
    address: '',
    nationalId: '',
    phoneNumber: '',
    email: '',
    
    // Step 2: Financial Information
    employmentStatus: '',
    monthlyIncome: '',
    dependents: '',
    
    // Step 3: Assistance Details
    financialHardship: '',
    assistanceNeeded: '',
    additionalInfo: ''
  },
  isSubmitting: false
};

const formReducer = (state, action) => {
  switch (action.type) {
    case 'SET_STEP':
      return {
        ...state,
        currentStep: action.payload
      };
    
    case 'UPDATE_FORM_DATA':
      return {
        ...state,
        formData: {
          ...state.formData,
          ...action.payload
        }
      };
    
    case 'SET_SUBMITTING':
      return {
        ...state,
        isSubmitting: action.payload
      };
    
    
    case 'LOAD_SAVED_DATA':
      return {
        ...state,
        formData: {
          ...state.formData,
          ...action.payload
        }
      };
    
    case 'RESET_FORM':
      return initialState;
    
    default:
      return state;
  }
};

export const FormProvider = ({ children }) => {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const isInitialLoad = useRef(true);

  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        dispatch({ type: 'LOAD_SAVED_DATA', payload: parsedData });
      } catch (error) {
        console.error('Error loading saved form data:', error);
      }
    }
    isInitialLoad.current = false;
  }, []);

  useEffect(() => {
    if (!isInitialLoad.current) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.formData));
    }
  }, [state.formData]);

  const setStep = useCallback((step) => {
    dispatch({ type: 'SET_STEP', payload: step });
  }, []);

  const updateFormData = useCallback((data) => {
    dispatch({ type: 'UPDATE_FORM_DATA', payload: data });
  }, []);

  const setSubmitting = useCallback((isSubmitting) => {
    dispatch({ type: 'SET_SUBMITTING', payload: isSubmitting });
  }, []);


  const resetForm = useCallback(() => {
    dispatch({ type: 'RESET_FORM' });
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const value = {
    ...state,
    setStep,
    updateFormData,
    setSubmitting,
    resetForm
  };

  return (
    <FormContext.Provider value={value}>
      {children}
    </FormContext.Provider>
  );
};

export const useForm = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useForm must be used within a FormProvider');
  }
  return context;
};