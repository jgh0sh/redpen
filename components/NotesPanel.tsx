import React, { useState } from "react";
import { Annotation } from "./types";

interface NotesPanelProps {
  annotations: Annotation[];
  messagePlainText: string;
  onEdit: (id: string, noteText: string) => void;
  onDelete: (id: string) => void;
  onSelectAnnotation: (id: string) => void;
  onSubmitNotes: () => void;
  onDiscard: () => void;
}

export function NotesPanel({
  annotations,
  messagePlainText,
  onEdit,
  onDelete,
  onSelectAnnotation,
  onSubmitNotes,
  onDiscard,
}: NotesPanelProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draftText, setDraftText] = useState("");

  const startEditing = (annotation: Annotation) => {
    setEditingId(annotation.id);
    setDraftText(annotation.noteText);
  };

  const applyEdit = () => {
    if (!editingId) return;
    onEdit(editingId, draftText);
    setEditingId(null);
    setDraftText("");
  };

  return (
    <aside className="panel">
      <div className="panel-header">
        <div>
          <div className="panel-title">Highlights ({annotations.length})</div>
          <div className="panel-subtitle">
            Add notes inline while you select. Everything syncs to the chat box automatically.
          </div>
        </div>
        <button className="annotate-button" onClick={onDiscard} type="button">
          Clear all
        </button>
      </div>
      <div className="note-list">
        {annotations.length === 0 ? (
          <div className="note-item" style={{ gridTemplateColumns: "1fr" }}>
            <div className="note-meta">No notes yet. Select text in the answer to add one.</div>
          </div>
        ) : (
          annotations
            .slice()
            .sort((a, b) => a.start - b.start)
            .map((annotation) => {
              const snippet = messagePlainText.slice(annotation.start, annotation.end);
              const preview = snippet.length > 120 ? `${snippet.slice(0, 117)}...` : snippet;
              const isEditing = editingId === annotation.id;
              return (
                <div className="note-item" key={annotation.id}>
                  <div>
                    {isEditing ? (
                      <div>
                        <textarea
                          className="note-editor"
                          value={draftText}
                          onChange={(event) => setDraftText(event.target.value)}
                        />
                        <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                          <button className="toolbar-button" onClick={applyEdit} type="button">
                            Save
                          </button>
                          <button className="toolbar-button" onClick={() => setEditingId(null)} type="button">
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div
                          className="note-meta"
                          style={{ cursor: "pointer" }}
                          onClick={() => onSelectAnnotation(annotation.id)}
                        >
                          {annotation.noteText || "(empty note)"}
                        </div>
                        <div className="note-snippet">{preview}</div>
                      </>
                    )}
                  </div>
                  {!isEditing ? (
                    <div className="note-actions">
                      <button className="toolbar-button" onClick={() => startEditing(annotation)} type="button">
                        Edit
                      </button>
                      <button className="toolbar-button" onClick={() => onDelete(annotation.id)} type="button">
                        Delete
                      </button>
                    </div>
                  ) : null}
                </div>
              );
            })
        )}
      </div>
      <div className="panel-footer">
        <div className="panel-hint">
          Chat box stays up to date—jump there to review before sending.
        </div>
        <button className="primary-button" onClick={onSubmitNotes} type="button">
          Go to chat box
        </button>
      </div>
    </aside>
  );
}
