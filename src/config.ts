export const config = {
  openaiApiKey: process.env.VITE_OPENAI_API_KEY || '',
};

// Validate API key is present
if (!config.openaiApiKey) {
  console.error('OpenAI API key is not configured. Please set VITE_OPENAI_API_KEY environment variable.');
} 