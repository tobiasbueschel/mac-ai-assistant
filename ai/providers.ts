import { customProvider } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { isTestEnvironment } from '@/lib/constants';

const openai = createOpenAI();

export const myProvider = isTestEnvironment
  ? (() => {
      const {
        artifactModel,
        chatModel,
        reasoningModel,
        titleModel,
      } = require('./models.mock');
      return customProvider({
        languageModels: {
          'chat-model': chatModel,
          'chat-model-reasoning': reasoningModel,
          'title-model': titleModel,
          'artifact-model': artifactModel,
        },
      });
    })()
  : customProvider({
      languageModels: {
        'chat-model': openai('gpt-4o'),
        'chat-model-reasoning': openai('gpt-5'),
        'title-model': openai('gpt-4o-mini'),
        'artifact-model': openai('gpt-5-nano'),
      },
    });
