import React, { useState, useEffect } from "react";
import { X, Plus, Trash2, RotateCcw, Save } from "lucide-react";
import type { TimelineEntry, StopTimelineEntry } from "../types/itinerary";

interface PlanEditorModalProps {
  isOpen: boolean;
  entries: TimelineEntry[];
  onClose: () => void;
  onSave: (updatedEntries: TimelineEntry[]) => void;
  onResetToDefault: () => void;
}

export const PlanEditorModal: React.FC<PlanEditorModalProps> = ({
  isOpen,
  entries,
  onClose,
  onSave,
  onResetToDefault,
}) => {
  const [draftEntries, setDraftEntries] = useState<TimelineEntry[]>(() =>
    JSON.parse(JSON.stringify(entries))
  );

  useEffect(() => {
    if (isOpen) {
      setDraftEntries(JSON.parse(JSON.stringify(entries)));
    }
  }, [isOpen, entries]);

  if (!isOpen) return null;

  const handleFieldChange = (
    id: string,
    field: "time" | "title" | "chineseTitle" | "cost" | "note",
    value: string
  ) => {
    setDraftEntries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Delete this checkpoint from your itinerary?")) {
      setDraftEntries((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleAddStop = () => {
    const existingStops = draftEntries.filter((e) => e.kind === "stop");
    const nextNumber = existingStops.length + 1;
    const newStop: StopTimelineEntry = {
      id: `custom-stop-${Date.now()}`,
      kind: "stop",
      checkpointNumber: nextNumber,
      time: "12:00",
      title: "New Landmark Stop",
      chineseTitle: "新地点",
      duration: "30 min",
      transport: "walk",
      cost: "—",
      note: "Custom stop added to trip",
      checkable: true,
      imageUrl: "/images/shanghai/wukang-building.jpg",
      imageAlt: "New Custom Landmark",
    };
    setDraftEntries((prev) => [...prev, newStop]);
  };

  const handleSave = () => {
    // Re-number checkable stops sequentially
    let counter = 1;
    const renumbered = draftEntries.map((e) => {
      if (e.kind === "stop") {
        return { ...e, checkpointNumber: counter++ };
      }
      return e;
    });
    onSave(renumbered);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog editor-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h3 className="modal-title">Edit Itinerary (V1)</h3>
            <p className="modal-subtitle">Customize times, names, costs, or notes for Day 1</p>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close editor">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div className="editor-controls-row">
            <button type="button" className="editor-btn add-btn" onClick={handleAddStop}>
              <Plus size={15} />
              <span>Add Checkpoint</span>
            </button>

            <button
              type="button"
              className="editor-btn reset-btn"
              onClick={() => {
                if (window.confirm("Reset all itinerary changes back to default?")) {
                  onResetToDefault();
                  onClose();
                }
              }}
            >
              <RotateCcw size={15} />
              <span>Reset to Default</span>
            </button>
          </div>

          <div className="editor-list">
            {draftEntries.map((entry) => {
              const isStop = entry.kind === "stop";
              return (
                <div key={entry.id} className={`editor-item-card ${isStop ? "is-stop" : "is-route"}`}>
                  <div className="editor-item-head">
                    <span className="editor-kind-tag">
                      {isStop ? `STOP ${entry.checkpointNumber}` : "ROUTE / TRANSIT"}
                    </span>
                    <button
                      type="button"
                      className="delete-item-btn"
                      onClick={() => handleDelete(entry.id)}
                      title="Delete checkpoint"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  <div className="editor-inputs-grid">
                    <div className="input-group">
                      <label>Time</label>
                      <input
                        type="text"
                        value={entry.time}
                        onChange={(e) => handleFieldChange(entry.id, "time", e.target.value)}
                        placeholder="08:00"
                      />
                    </div>

                    <div className="input-group">
                      <label>Title (EN)</label>
                      <input
                        type="text"
                        value={entry.title}
                        onChange={(e) => handleFieldChange(entry.id, "title", e.target.value)}
                        placeholder="Place name"
                      />
                    </div>

                    <div className="input-group">
                      <label>Chinese Name</label>
                      <input
                        type="text"
                        value={entry.chineseTitle || ""}
                        onChange={(e) => handleFieldChange(entry.id, "chineseTitle", e.target.value)}
                        placeholder="中文名称"
                      />
                    </div>

                    <div className="input-group">
                      <label>Cost</label>
                      <input
                        type="text"
                        value={entry.cost || ""}
                        onChange={(e) => handleFieldChange(entry.id, "cost", e.target.value)}
                        placeholder="¥25–60"
                      />
                    </div>

                    <div className="input-group full-width">
                      <label>Note</label>
                      <input
                        type="text"
                        value={entry.note || ""}
                        onChange={(e) => handleFieldChange(entry.id, "note", e.target.value)}
                        placeholder="Short reminder / tip"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="btn-primary" onClick={handleSave}>
            <Save size={15} />
            <span>Save Changes</span>
          </button>
        </div>
      </div>
    </div>
  );
};
