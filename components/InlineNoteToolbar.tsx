import React from "react";

interface InlineNoteToolbarProps {
  noteText: string;
  position: { top: number; left: number } | null;
  mode: "cta" | "note";
  onBeginNote: () => void;
  onChange: (value: string) => void;
  onConfirm: () => void;
  disabled?: boolean;
  onCancel?: () => void;
}

export function InlineNoteToolbar({
  noteText,
  position,
  mode,
  onBeginNote,
  onChange,
  onConfirm,
  disabled = false,
  onCancel,
}: InlineNoteToolbarProps) {
  if (!position) return null;

  const className = `inline-toolbar${mode === "cta" ? " toolbar-cta" : ""}`;
  const keepSelection = (event: React.SyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const noteForm = (
    <>
      <div className="toolbar-head">
        <span className="toolbar-label">Ask ChatGPT</span>
        {onCancel ? (
          <button className="toolbar-button ghost toolbar-close" onClick={onCancel} type="button">
            Close
          </button>
        ) : null}
      </div>
      <textarea
        placeholder="Add a note for this selection…"
        value={noteText}
        onChange={(event) => onChange(event.target.value)}
        autoFocus={false}
      />
      <div className="toolbar-actions">
        <button className="toolbar-button primary" onClick={onConfirm} disabled={disabled} type="button">
          Add Note
        </button>
      </div>
    </>
  );

  const content =
    mode === "cta" ? (
      <button
        className="toolbar-button primary"
        onClick={onBeginNote}
        onMouseDown={keepSelection}
        onPointerDown={keepSelection}
        onTouchStart={keepSelection}
        onMouseUp={keepSelection}
        type="button"
      >
        Ask ChatGPT
      </button>
    ) : (
      noteForm
    );

  return (
    <div
      className={className}
      style={{ top: position.top, left: position.left }}
      role="dialog"
      aria-label="Add inline note"
      onClick={(event) => event.stopPropagation()}
    >
      {content}
    </div>
  );
}
