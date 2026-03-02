import React, { useState, useCallback, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import InputPanel from "../components/jsontool/InputPanel.tsx";
import Toolbar from "../components/jsontool/Toolbar.tsx";
import JsonTreeView from "../components/jsontool/JsonTreeView.tsx";
import { useJsonHistory, type JsonValue } from "../hooks/useJsonHistory.ts";

export default function JsonToolPage() {
  const {
    json,
    set,
    undo,
    redo,
    reorder,
    updateNode,
    deleteNode,
    addNode,
    renameKey,
    canUndo,
    canRedo,
    historySize,
  } = useJsonHistory();

  const [globalExpanded, setGlobalExpanded] = useState<boolean | null>(null);
  const [leftWidth, setLeftWidth] = useState(380);
  const isResizing = useRef(false);

  const handleParse = useCallback(
    (parsed: unknown) => {
      set(parsed as JsonValue);
      setGlobalExpanded(null);
    },
    [set]
  );

  const handleExpandAll = useCallback(() => {
    setGlobalExpanded(true);
    setTimeout(() => setGlobalExpanded(null), 50);
    setGlobalExpanded(true);
  }, []);

  const handleCollapseAll = useCallback(() => {
    setGlobalExpanded(false);
    setTimeout(() => setGlobalExpanded(null), 50);
    setGlobalExpanded(false);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        undo();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "y") {
        e.preventDefault();
        redo();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [undo, redo]);

  // Panel resizing
  const handleMouseDown = useCallback(() => {
    isResizing.current = true;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";

    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing.current) return;
      const newWidth = Math.max(280, Math.min(window.innerWidth * 0.5, e.clientX));
      setLeftWidth(newWidth);
    };

    const handleMouseUp = () => {
      isResizing.current = false;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-jt-bg text-jt-text-primary overflow-hidden font-[Inter,-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,sans-serif]">
      {/* Header */}
      <header className="flex items-center px-5 py-3 border-b border-jt-border bg-jt-surface-1 gap-3 shrink-0">
        <Link
          to="/"
          className="text-jt-text-muted hover:text-jt-text-primary transition-colors text-sm mr-2"
          title="Back to Portfolio"
        >
          ← Portfolio
        </Link>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-jt-accent text-white flex items-center justify-center font-bold text-sm font-mono">
            {"{}"}
          </div>
          <span className="text-lg font-bold text-jt-text-primary tracking-tight">
            JSON<span className="text-jt-accent">Viewer</span>
          </span>
        </div>
        <div className="flex-1" />
        <div className="flex items-center gap-2 text-xs text-jt-text-muted">
          <kbd className="inline-flex items-center px-1.5 py-0.5 rounded bg-jt-surface-2 border border-jt-border font-sans text-[11px] text-jt-text-secondary mr-0.5">
            ⌘Z
          </kbd>{" "}
          undo
          <kbd className="inline-flex items-center px-1.5 py-0.5 rounded bg-jt-surface-2 border border-jt-border font-sans text-[11px] text-jt-text-secondary mr-0.5">
            ⌘Y
          </kbd>{" "}
          redo
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded-md bg-jt-surface-2 text-jt-text-muted font-semibold tracking-wide">
          v1.0
        </span>
      </header>

      {/* Toolbar */}
      <Toolbar
        json={json}
        canUndo={canUndo}
        canRedo={canRedo}
        historySize={historySize}
        onUndo={undo}
        onRedo={redo}
        onExpandAll={handleExpandAll}
        onCollapseAll={handleCollapseAll}
      />

      {/* Main Content */}
      <main className="flex flex-1 overflow-hidden max-md:flex-col">
        {/* Input Panel */}
        <div
          className="shrink-0 flex flex-col border-r border-jt-border bg-jt-surface-1 min-w-[280px] max-md:!w-full max-md:max-h-[40vh] max-md:border-r-0 max-md:border-b max-md:border-jt-border"
          style={{ width: leftWidth }}
        >
          <InputPanel json={json} onParse={handleParse} />
        </div>

        {/* Resize Handle */}
        <div
          className="w-1 cursor-col-resize bg-transparent shrink-0 relative transition-colors hover:bg-jt-accent active:bg-jt-accent max-md:hidden"
          onMouseDown={handleMouseDown}
        />

        {/* Tree View Panel */}
        <div className="flex-1 overflow-auto px-5 py-4 bg-jt-bg">
          {json !== null ? (
            <div className="min-w-0">
              <JsonTreeView
                json={json}
                onReorder={reorder}
                onUpdate={updateNode}
                onDelete={deleteNode}
                onAdd={addNode}
                onRenameKey={renameKey}
                globalExpanded={globalExpanded}
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-jt-text-muted text-center p-10">
              <div className="text-5xl opacity-40">🔍</div>
              <div className="text-xl font-semibold text-jt-text-secondary">
                No JSON loaded
              </div>
              <div className="text-sm max-w-[380px] leading-relaxed">
                Paste JSON into the input panel, upload a file, or load the
                sample to get started.
              </div>
              <div className="mt-4 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-[13px]">
                  <span className="text-base">📋</span>
                  Paste or type JSON in the left panel
                </div>
                <div className="flex items-center gap-2 text-[13px]">
                  <span className="text-base">📁</span>
                  Upload a .json file
                </div>
                <div className="flex items-center gap-2 text-[13px]">
                  <span className="text-base">✨</span>
                  Click &quot;Load Sample&quot; for a quick demo
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
