import React, { useState, useCallback } from "react";
import {
  FiCornerUpLeft,
  FiCornerUpRight,
  FiCopy,
  FiDownload,
  FiMaximize2,
  FiMinimize2,
} from "react-icons/fi";
import type { JsonValue } from "../../hooks/useJsonHistory.ts";

interface ToolbarProps {
  json: JsonValue | null;
  canUndo: boolean;
  canRedo: boolean;
  historySize: number;
  onUndo: () => void;
  onRedo: () => void;
  onExpandAll: () => void;
  onCollapseAll: () => void;
}

export default function Toolbar({
  json,
  canUndo,
  canRedo,
  historySize,
  onUndo,
  onRedo,
  onExpandAll,
  onCollapseAll,
}: ToolbarProps) {
  const [toast, setToast] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  }, []);

  const handleCopy = useCallback(() => {
    if (json === null) return;
    navigator.clipboard.writeText(JSON.stringify(json, null, 2));
    showToast("Copied to clipboard!");
  }, [json, showToast]);

  const handleDownload = useCallback(() => {
    if (json === null) return;
    const blob = new Blob([JSON.stringify(json, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.json";
    a.click();
    URL.revokeObjectURL(url);
    showToast("Downloaded!");
  }, [json, showToast]);

  const btnBase =
    "flex items-center gap-[5px] px-2.5 py-[5px] border-none bg-transparent text-jt-text-secondary text-[13px] rounded-[5px] cursor-pointer transition-colors whitespace-nowrap hover:bg-jt-surface-2 hover:text-jt-text-primary disabled:opacity-[0.35] disabled:cursor-default disabled:hover:bg-transparent disabled:hover:text-jt-text-secondary";

  const btnAccent =
    "flex items-center gap-[5px] px-2.5 py-[5px] border-none bg-transparent text-jt-text-secondary text-[13px] rounded-[5px] cursor-pointer transition-colors whitespace-nowrap hover:bg-jt-surface-2 hover:text-jt-text-primary disabled:opacity-[0.35] disabled:cursor-default disabled:hover:bg-transparent disabled:hover:text-jt-text-secondary";

  return (
    <div className="flex items-center px-5 py-2 border-b border-jt-border bg-jt-surface-1 gap-1 shrink-0">
      <div className="flex items-center gap-1">
        <button className={btnBase} onClick={onUndo} disabled={!canUndo} title="Undo (⌘Z)">
          <span className="flex items-center"><FiCornerUpLeft /></span>
          Undo
        </button>
        <button className={btnBase} onClick={onRedo} disabled={!canRedo} title="Redo (⌘Y)">
          <span className="flex items-center"><FiCornerUpRight /></span>
          Redo
        </button>
        {historySize > 0 && (
          <span className="text-[10px] px-[7px] py-0.5 rounded-full bg-jt-accent-subtle text-jt-accent font-semibold">
            {historySize} changes
          </span>
        )}
      </div>

      <div className="w-px h-5 bg-jt-border mx-1.5 shrink-0" />

      <div className="flex items-center gap-1">
        <button className={btnBase} onClick={onExpandAll} disabled={json === null} title="Expand All">
          <span className="flex items-center"><FiMaximize2 /></span>
          Expand
        </button>
        <button className={btnBase} onClick={onCollapseAll} disabled={json === null} title="Collapse All">
          <span className="flex items-center"><FiMinimize2 /></span>
          Collapse
        </button>
      </div>

      <div className="flex-1" />

      <div className="flex items-center gap-1">
        <button className={btnAccent} onClick={handleCopy} disabled={json === null} title="Copy JSON">
          <span className="flex items-center"><FiCopy /></span>
          Copy
        </button>
        <button className={btnAccent} onClick={handleDownload} disabled={json === null} title="Download JSON">
          <span className="flex items-center"><FiDownload /></span>
          Export
        </button>
      </div>

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 px-5 py-2.5 rounded-lg bg-jt-surface-3 text-jt-text-primary text-[13px] shadow-[0_8px_32px_rgba(0,0,0,0.3)] animate-jt-toast-in z-[100]">
          {toast}
        </div>
      )}
    </div>
  );
}
