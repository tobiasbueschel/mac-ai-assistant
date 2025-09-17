import { registerOTel } from '@vercel/otel';

export function register() {
  registerOTel({ serviceName: 'mac-ai-assistant' });
}
