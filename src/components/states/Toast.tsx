import { Icon } from "@/components/basics/Icon";
import { useCallback, useEffect, useState } from "react";

export type ToastTone = "info" | "success" | "undo";

export interface ToastMessage {
  id: number;
  text: string;
  tone?: ToastTone;
  /** When set, the toast offers a way back. */
  actionLabel?: string;
  onAction?: () => void;
}

const DISMISS_MS = 4000;

export interface ToastProps {
  toast: ToastMessage;
  onDismiss: (id: number) => void;
}

export function Toast({ toast, onDismiss }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => onDismiss(toast.id), DISMISS_MS);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  return (
    <div
      className="flex items-center gap-3 rounded-xl px-4 animate-fade-in"
      style={{
        minHeight: 44,
        background: "#16161D",
        color: "#FFFFFF",
        boxShadow: "0 16px 48px rgba(22,22,29,0.12), 0 2px 8px rgba(22,22,29,0.06)",
      }}
      role="status"
    >
      {toast.tone === "success" && (
        <Icon name="check" size={14} color="#6EE7B7" />
      )}
      <span style={{ fontSize: 13 }}>{toast.text}</span>
      {toast.actionLabel && toast.onAction && (
        <button
          onClick={() => {
            toast.onAction?.();
            onDismiss(toast.id);
          }}
          className="cursor-pointer"
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: "#B9BCF0",
            background: "none",
            border: "none",
            padding: 0,
            marginLeft: "auto",
          }}
        >
          {toast.actionLabel}
        </button>
      )}
    </div>
  );
}

export interface ToastStackProps {
  toasts: ToastMessage[];
  onDismiss: (id: number) => void;
}

/** Bottom-left so it never sits under the task-detail affordance. */
export function ToastStack({ toasts, onDismiss }: ToastStackProps) {
  if (toasts.length === 0) return null;
  return (
    <div
      className="fixed flex flex-col gap-2 z-50"
      style={{ left: 24, bottom: 24, minWidth: 280 }}
    >
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

/** Small queue helper so pages do not each reinvent one. */
export function useToasts() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const dismiss = useCallback((id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const push = useCallback((toast: Omit<ToastMessage, "id">) => {
    setToasts((current) => [...current, { ...toast, id: Date.now() + Math.random() }]);
  }, []);

  return { toasts, push, dismiss };
}

export default Toast;
