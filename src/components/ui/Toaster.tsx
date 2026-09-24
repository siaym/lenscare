'use client';

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
}

interface ToastContextType {
  toast: (opts: Omit<Toast, 'id'>) => void;
  success: (title: string, message?: string) => void;
  error: (title: string, message?: string) => void;
  warning: (title: string, message?: string) => void;
  info: (title: string, message?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

const ICONS: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle size={18} />,
  error: <XCircle size={18} />,
  warning: <AlertCircle size={18} />,
  info: <Info size={18} />,
};

const COLORS: Record<ToastType, { bg: string; icon: string; border: string }> = {
  success: { bg: '#F0FAF4', icon: '#2D7A4F', border: '#B7E4C7' },
  error: { bg: '#FEF2F2', icon: '#C0392B', border: '#FECACA' },
  warning: { bg: '#FFFBEB', icon: '#D4870A', border: '#FDE68A' },
  info: { bg: '#EFF6FF', icon: '#1E6BA8', border: '#BFDBFE' },
};

let toastExternalFn: ((opts: Omit<Toast, 'id'>) => void) | null = null;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((opts: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(2);
    setToasts((prev) => [...prev.slice(-4), { ...opts, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  useEffect(() => {
    toastExternalFn = addToast;
    return () => {
      toastExternalFn = null;
    };
  }, [addToast]);

  const ctx: ToastContextType = {
    toast: addToast,
    success: (title, message) => addToast({ type: 'success', title, message }),
    error: (title, message) => addToast({ type: 'error', title, message }),
    warning: (title, message) => addToast({ type: 'warning', title, message }),
    info: (title, message) => addToast({ type: 'info', title, message }),
  };

  return (
    <ToastContext.Provider value={ctx}>
      {children}
      <div
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          right: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.625rem',
          zIndex: 'var(--z-toast)',
          pointerEvents: 'none',
        }}
      >
        <AnimatePresence>
          {toasts.map((t) => {
            const color = COLORS[t.type];
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem',
                  padding: '0.875rem 1rem',
                  background: color.bg,
                  border: `1px solid ${color.border}`,
                  borderRadius: 'var(--radius-xl)',
                  boxShadow: 'var(--shadow-lg)',
                  minWidth: '280px',
                  maxWidth: '360px',
                  pointerEvents: 'auto',
                }}
              >
                <span style={{ color: color.icon, flexShrink: 0, marginTop: '1px' }}>
                  {ICONS[t.type]}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1A1A1A' }}>
                    {t.title}
                  </p>
                  {t.message && (
                    <p style={{ fontSize: '0.8125rem', color: '#6B6B6B', marginTop: '0.125rem' }}>
                      {t.message}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => setToasts((prev) => prev.filter((x) => x.id !== t.id))}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer',
                    color: '#9A9A9A',
                    flexShrink: 0,
                    padding: '0',
                  }}
                >
                  <X size={14} />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function Toaster() {
  return null; // The actual toasts render inside ToastProvider
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside ToastProvider');
  return ctx;
}

// External toast function for use outside React tree (e.g., server actions)
export const toast = {
  success: (title: string, message?: string) =>
    toastExternalFn?.({ type: 'success', title, message }),
  error: (title: string, message?: string) =>
    toastExternalFn?.({ type: 'error', title, message }),
  warning: (title: string, message?: string) =>
    toastExternalFn?.({ type: 'warning', title, message }),
  info: (title: string, message?: string) =>
    toastExternalFn?.({ type: 'info', title, message }),
};
