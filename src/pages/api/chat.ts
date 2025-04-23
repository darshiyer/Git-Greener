import OpenAI from 'openai';
import { config } from '../../config';

const openai = new OpenAI({
  apiKey: config.openaiApiKey,
});

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { message, history } = req.body;

    // Prepare the messages array for OpenAI
    const messages = [
      {
        role: 'system',
        content: `You are a sustainability and code optimization assistant. Your goal is to help developers improve their codebase for better efficiency, reduced carbon footprint, and better performance. Focus on practical, actionable advice that can be implemented immediately. When suggesting improvements, consider:
        1. Code efficiency and optimization
        2. Resource utilization
        3. Energy consumption
        4. Infrastructure optimization
        5. Best practices for sustainable development`
      },
      ...history.map((msg: any) => ({
        role: msg.role,
        content: msg.content
      })),
      {
        role: 'user',
        content: message
      }
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages,
      temperature: 0.7,
      max_tokens: 500,
    });

    const response = completion.choices[0]?.message?.content || 'I apologize, but I was unable to generate a response.';

    return res.status(200).json({ response });
  } catch (error: any) {
    console.error('OpenAI API error:', error);
    return res.status(500).json({ 
      message: 'Failed to get response from OpenAI',
      error: error.message 
    });
  }
} 