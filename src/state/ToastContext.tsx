import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastMessage {
  id: string;
  title?: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  toasts: ToastMessage[];
  addToast: (message: string, type?: ToastType, title?: string) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const addToast = useCallback((message: string, type: ToastType = 'info', title?: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastMessage = { id, message, type, title };
    setToasts(prev => [newToast, ...prev.slice(0, 2)]);

    setTimeout(() => {
      removeToast(id);
    }, 4000);
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      {/* Toast Region */}
      <div 
        aria-live="polite"
        className="fixed z-[90] pointer-events-none flex flex-col gap-2 p-4 bottom-14 right-4 md:bottom-16 md:right-4 max-w-sm w-full"
      >
        {toasts.map(toast => (
          <div
            key={toast.id}
            role="status"
            className={`pointer-events-auto flex items-start gap-3 p-3.5 bg-elevated rounded-md shadow-sh-2 border border-line text-sm text-ink transition-all duration-med animate-slide-up ${
              toast.type === 'success' ? 'border-l-4 border-l-status-success' :
              toast.type === 'error' ? 'border-l-4 border-l-status-error' :
              'border-l-4 border-l-status-info'
            }`}
          >
            <div className="shrink-0 mt-0.5">
              {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-status-success" />}
              {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-status-error" />}
              {toast.type === 'info' && <Info className="w-4 h-4 text-status-info" />}
            </div>
            <div className="flex-1">
              {toast.title && <div className="font-semibold text-xs tracking-wide uppercase text-ink-2 mb-0.5">{toast.title}</div>}
              <div className="leading-snug">{toast.message}</div>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="shrink-0 text-ink-3 hover:text-ink p-1 rounded transition-colors"
              aria-label="Close notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
