import React from "react";

interface InlineNoteToolbarProps {
  noteText: string;
  position: { top: number; left: number } | null;
  mode: "cta" | "note";
  onBeginNote: () => void;
  onChange: (value: string) => void;
  onConfirm: () => void;
  onDelete?: () => void;
  disabled?: boolean;
  tooltip?: string | null;
  isEditing?: boolean;
}

export function InlineNoteToolbar({
  noteText,
  position,
  mode,
  onBeginNote,
  onChange,
  onConfirm,
  onDelete,
  disabled = false,
  tooltip = null,
  isEditing = false,
}: InlineNoteToolbarProps) {
  if (!position) return null;

  const className = `inline-toolbar${mode === "cta" ? " toolbar-cta" : ""}`;

  return (
    <div
      className={className}
      style={{ top: position.top, left: position.left }}
      role="dialog"
      aria-label="Add inline note"
    >
      {mode === "cta" ? (
        <button className="toolbar-button primary" onClick={onBeginNote} type="button">
          Ask ChatGPT
        </button>
      ) : (
        <>
          <div className="toolbar-head">
            <span className="toolbar-label">Ask ChatGPT</span>
          </div>
          <textarea
            placeholder="Add a note for this selection…"
            value={noteText}
            onChange={(event) => onChange(event.target.value)}
            autoFocus
          />
          <div className="toolbar-actions">
            {isEditing && onDelete ? (
              <button className="toolbar-button ghost" onClick={onDelete} type="button">
                Delete
              </button>
            ) : null}
              <button
                className="toolbar-button primary"
                onClick={onConfirm}
                disabled={disabled}
                type="button"
              >
                {isEditing ? "Update" : "Add Note"}
              </button>
            </div>
          </>
        )}
      {tooltip ? <div className="toolbar-tooltip">{tooltip}</div> : null}
    </div>
  );
}
