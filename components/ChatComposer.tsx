import React from "react";

interface ChatComposerProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  textareaRef?: React.RefObject<HTMLTextAreaElement>;
}

export function ChatComposer({
  value,
  onChange,
  onSend,
  textareaRef,
}: ChatComposerProps) {
  return (
    <div className="composer">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Ask anything"
      />
      <div className="composer-actions">
        <div className="composer-actions-right">
          <button className="send-circle" onClick={onSend} type="button" aria-label="Send">
            ↑
          </button>
        </div>
      </div>
    </div>
  );
}
