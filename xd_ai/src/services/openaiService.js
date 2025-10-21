import axios from 'axios';

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
const OPENAI_MODEL = 'gpt-3.5-turbo';

class OpenAIService {
  constructor() {
    this.apiKey = process.env.REACT_APP_OPENAI_API_KEY || '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';
    this.client = axios.create({
      baseURL: OPENAI_API_URL,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      timeout: 30000 // 30 seconds timeout
    });
  }

  async generateTextSuggestion(prompt, fieldType, language = 'en') {
    if (!this.apiKey) {
      throw new Error('OpenAI API key not configured. Please set REACT_APP_OPENAI_API_KEY in your environment variables.');
    }

    console.log('Generating AI suggestion for:', fieldType, 'in', language);

    try {
      const systemPrompt = this.getSystemPrompt(fieldType, language);
      
      const response = await this.client.post('', {
        model: OPENAI_MODEL,
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 200,
        temperature: 0.7
      });

      return response.data.choices[0].message.content.trim();
    } catch (error) {
      console.error('OpenAI API Error:', error);
      
      if (error.code === 'ECONNABORTED') {
        throw new Error('Request timeout. Please try again.');
      }
      
      if (error.response?.status === 401) {
        throw new Error('Invalid API key. Please check your OpenAI API key.');
      }
      
      if (error.response?.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      }
      
      throw new Error('Failed to generate text suggestion. Please try again.');
    }
  }

  getSystemPrompt(fieldType, language) {
    const isArabic = language === 'ar';
    
    const prompts = {
      financialHardship: isArabic 
        ? 'أنت مساعد ذكي يساعد في كتابة طلبات الدعم الاجتماعي. اكتب وصفاً واضحاً ومؤثراً للصعوبات المالية باللغة العربية. كن صادقاً ومهذباً.'
        : 'You are a helpful assistant that helps write social support applications. Write a clear and compelling description of financial hardship in English. Be honest and respectful.',
      
      assistanceNeeded: isArabic
        ? 'أنت مساعد ذكي يساعد في كتابة طلبات الدعم الاجتماعي. اكتب وصفاً واضحاً لنوع المساعدة المطلوبة باللغة العربية. كن محدداً وعملياً.'
        : 'You are a helpful assistant that helps write social support applications. Write a clear description of the type of assistance needed in English. Be specific and practical.',
      
      additionalInfo: isArabic
        ? 'أنت مساعد ذكي يساعد في كتابة طلبات الدعم الاجتماعي. اكتب معلومات إضافية مفيدة باللغة العربية. كن مفيداً ومهذباً.'
        : 'You are a helpful assistant that helps write social support applications. Write additional helpful information in English. Be helpful and respectful.'
    };

    return prompts[fieldType] || prompts.financialHardship;
  }

  async testConnection() {
    try {
      console.log('Testing OpenAI API connection...');
      const result = await this.generateTextSuggestion('Test connection', 'financialHardship');
      console.log('API test successful:', result);
      return true;
    } catch (error) {
      console.error('API test failed:', error);
      return false;
    }
  }
}

const openaiService = new OpenAIService();
export default openaiService;