# Social Support Application with AI Assistance

A modern, responsive web application for government social support portal that allows citizens to apply for financial assistance with AI-powered writing assistance.

## Features

- **Multi-step Form Wizard**: 3-step application process with progress tracking
- **AI Integration**: OpenAI GPT-powered text suggestions for form fields
- **Internationalization**: Full English and Arabic (RTL) language support
- **Responsive Design**: Mobile, tablet, and desktop optimized
- **Accessibility**: ARIA roles, keyboard navigation, and screen reader support
- **Local Storage**: Automatic progress saving and restoration
- **Form Validation**: Comprehensive client-side validation with helpful error messages

## Tech Stack

- **Frontend**: React 19.2.0
- **UI Library**: Material-UI (MUI) v5
- **Form Handling**: React Hook Form with Yup validation
- **State Management**: React Context API
- **Internationalization**: React-i18next
- **HTTP Client**: Axios
- **AI Integration**: OpenAI GPT-3.5-turbo API

## Project Structure

```
src/
├── components/
│   ├── steps/                 # Form step components
│   │   ├── PersonalDetailsStep.js
│   │   ├── FinancialInformationStep.js
│   │   └── AssistanceDetailsStep.js
│   ├── ProgressIndicator.js  # Step progress component
│   ├── LanguageSelector.js   # Language switcher
│   └── AIAssistance.js       # AI suggestion dialog
├── contexts/
│   └── FormContext.js        # Form state management
├── services/
│   └── openaiService.js      # OpenAI API integration
├── locales/
│   ├── en/                   # English translations
│   └── ar/                   # Arabic translations
├── utils/
│   └── i18n.js              # Internationalization setup
└── App.js                    # Main application component
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd xd_ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` and add your OpenAI API key:
   ```
   REACT_APP_OPENAI_API_KEY=your_actual_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

   The application will open at `http://localhost:3000`

### OpenAI API Setup

1. **Get an API Key**
   - Visit [OpenAI Platform](https://platform.openai.com/api-keys)
   - Create an account or sign in
   - Generate a new API key

2. **Configure the Application**
   - Copy `env.example` to `.env`
   - Add your API key to the `.env` file
   - Restart the development server

3. **API Usage**
   - The application uses GPT-3.5-turbo model
   - API calls are made for text generation assistance
   - Rate limits and error handling are implemented

## Usage

### Form Steps

1. **Personal Details**
   - Full name, date of birth, address
   - National ID, phone number, email
   - Form validation with error messages

2. **Financial Information**
   - Employment status selection
   - Monthly income input
   - Number of dependents

3. **Assistance Details**
   - Financial hardship description
   - Type of assistance needed
   - Additional information
   - **AI Assistance**: Click the sparkle icon (✨) to get AI-generated suggestions

### AI Features

- **Smart Suggestions**: AI generates contextual text based on user input
- **Multi-language Support**: Suggestions in English or Arabic
- **Edit & Accept**: Users can modify AI suggestions before accepting
- **Error Handling**: Graceful handling of API failures and timeouts

### Language Support

- **English (LTR)**: Default language with left-to-right layout
- **Arabic (RTL)**: Full right-to-left support with proper text direction
- **Language Persistence**: Selected language is saved in localStorage

## Development

### Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

### Code Structure

- **Components**: Reusable UI components with Material-UI
- **Context**: Centralized state management for form data
- **Services**: External API integrations (OpenAI)
- **Utils**: Helper functions and configurations
- **Locales**: Translation files for internationalization

### Key Features Implementation

#### Form State Management
```javascript
// Context-based state management
const { formData, updateFormData, currentStep } = useForm();
```

#### AI Integration
```javascript
// OpenAI service usage
const suggestion = await openaiService.generateTextSuggestion(
  prompt, 
  fieldType, 
  language
);
```

#### Internationalization
```javascript
// Translation usage
const { t } = useTranslation();
const isRTL = i18n.language === 'ar';
```

## Accessibility Features

- **ARIA Labels**: Proper labeling for screen readers
- **Keyboard Navigation**: Full keyboard support
- **Focus Management**: Proper focus handling
- **Semantic HTML**: Meaningful HTML structure
- **Color Contrast**: WCAG compliant color schemes

## Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Breakpoints**: Tablet and desktop layouts
- **Touch Friendly**: Appropriate touch targets
- **Flexible Layout**: Adapts to different screen sizes

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Deployment

### Build for Production

```bash
npm run build
```

The build folder contains the production-ready files.

### Environment Variables for Production

Ensure the following environment variables are set:

- `REACT_APP_OPENAI_API_KEY`: Your OpenAI API key

## Troubleshooting

### Common Issues

1. **OpenAI API Key Not Working**
   - Verify the API key is correct
   - Check if you have sufficient credits
   - Ensure the key has proper permissions

2. **Language Not Switching**
   - Clear browser localStorage
   - Check if translation files are loaded
   - Verify i18n configuration

3. **Form Data Not Saving**
   - Check browser localStorage permissions
   - Verify FormContext is properly wrapped
   - Check for JavaScript errors in console

### Performance Optimization

- **Code Splitting**: Implemented for better loading times
- **Lazy Loading**: Components loaded on demand
- **Memoization**: Optimized re-renders
- **Bundle Analysis**: Use `npm run build` to analyze bundle size

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Create an issue in the repository
- Check the troubleshooting section
- Review the documentation

## Architecture Decisions

### State Management
- **Context API**: Chosen for simplicity and React integration
- **Local Storage**: Automatic form persistence
- **Reducer Pattern**: Predictable state updates

### Form Handling
- **React Hook Form**: Performance and validation
- **Yup Schema**: Type-safe validation
- **Custom Hooks**: Reusable form logic

### AI Integration
- **Service Layer**: Separated API logic
- **Error Handling**: Comprehensive error management
- **Rate Limiting**: Built-in request throttling

### Internationalization
- **i18next**: Industry standard for React
- **Namespace Organization**: Logical translation structure
- **RTL Support**: Full right-to-left layout support