import { CircleAlert, LoaderCircle } from 'lucide-react';

export function Loading({ label = 'Loading' }: { label?: string }) {
  return <div className="loading-state" role="status"><LoaderCircle size={18} className="spin" />{label}</div>;
}

export function ErrorNotice({ message }: { message: string }) {
  return <div className="error-notice" role="alert"><CircleAlert size={16} />{message}</div>;
}

export function getErrorMessage(error: unknown): string {
  if (typeof error === 'object' && error !== null && 'data' in error) {
    const data = error.data;
    if (typeof data === 'object' && data !== null) {
      if ('errors' in data && Array.isArray(data.errors)) {
        const messages = data.errors.flatMap((item: unknown) =>
          typeof item === 'object' && item !== null && 'message' in item && typeof item.message === 'string'
            ? [item.message]
            : [],
        );
        if (messages.length > 0) return messages.join(' ');
      }
      if ('message' in data && typeof data.message === 'string') return data.message;
    }
  }
  if (error instanceof Error) return error.message;
  return 'Something went wrong. Please try again.';
}