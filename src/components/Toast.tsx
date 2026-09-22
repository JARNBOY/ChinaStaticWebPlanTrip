import React from "react";
import { Check } from "lucide-react";

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      onClick={onClose}
      style={{
        position: "fixed",
        bottom: 90,
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "#1F1F1E",
        color: "#F8F6F1",
        padding: "10px 18px",
        borderRadius: "999px",
        fontSize: "13px",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.25)",
        zIndex: 9999,
        maxWidth: "90vw",
        cursor: "pointer",
        animation: "toastSlideUp 200ms ease-out",
        fontFamily: "var(--font-sans)",
      }}
    >
      <Check size={16} color="#85A98F" />
      <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
        {message}
      </span>
    </div>
  );
};
