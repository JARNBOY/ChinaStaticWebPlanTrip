/**
 * Helper to copy Chinese place name / address for DiDi or taxi drivers.
 * In China, showing the exact Chinese name or pasting it into DiDi is the most reliable way.
 */
export async function copyForDriverOrDiDi(
  chineseTitle?: string,
  address?: string,
  onCopied?: (text: string) => void
): Promise<boolean> {
  const textToCopy = [chineseTitle, address].filter(Boolean).join(" · ") || "";
  if (!textToCopy) return false;

  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(textToCopy);
    } else {
      // Fallback for older browsers / webviews
      const textArea = document.createElement("textarea");
      textArea.value = textToCopy;
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    }
    if (onCopied) {
      onCopied(textToCopy);
    }
    return true;
  } catch (err) {
    console.error("Failed to copy text:", err);
    return false;
  }
}
