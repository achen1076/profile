import React, { useState, useRef, useCallback, useEffect } from "react";

interface InputPanelProps {
  json: unknown | null;
  onParse: (json: unknown) => void;
}

const SAMPLE_JSON = {
  name: "JSON Visualizer",
  version: "1.0.0",
  features: [
    "Upload & Paste",
    "Tree View",
    "Drag & Drop",
    "Undo / Redo",
    "Export & Copy"
  ],
  config: {
    theme: "dark",
    maxDepth: 10,
    animated: true
  },
  contributors: [
    { name: "Alice", role: "Developer" },
    { name: "Bob", role: "Designer" }
  ],
  metadata: {
    created: "2026-02-28",
    tags: ["json", "visualizer", "react"],
    stats: {
      downloads: 15230,
      stars: 487,
      active: true
    }
  }
};

function smartParse(input: string): unknown {
  const trimmed = input.trim();
  if (!trimmed) throw new Error("Empty input");

  try {
    return JSON.parse(trimmed);
  } catch {
    // continue
  }

  let fixed = trimmed;
  fixed = fixed.replace(/,\s*([}\]])/g, "$1");
  fixed = fixed.replace(/'([^'\\]*(\\.[^'\\]*)*)'/g, '"$1"');
  fixed = fixed.replace(/(?<=[{,]\s*)([a-zA-Z_$][\w$.-]*)\s*:/g, '"$1":');

  try {
    return JSON.parse(fixed);
  } catch {
    // continue
  }

  if (/^\s*["']?[a-zA-Z_$]/.test(fixed) && !fixed.startsWith("{") && !fixed.startsWith("[")) {
    const wrapped = `{${fixed}}`;
    let wrappedFixed = wrapped;
    wrappedFixed = wrappedFixed.replace(/,\s*([}\]])/g, "$1");
    wrappedFixed = wrappedFixed.replace(/'([^'\\]*(\\.[^'\\]*)*)'/g, '"$1"');
    wrappedFixed = wrappedFixed.replace(/(?<=[{,]\s*)([a-zA-Z_$][\w$.-]*)\s*:/g, '"$1":');
    try {
      return JSON.parse(wrappedFixed);
    } catch {
      // continue
    }
  }

  JSON.parse(trimmed);
  return null;
}

export default function InputPanel({ json, onParse }: InputPanelProps) {
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (json !== null && json !== undefined && !isFocused) {
      const formatted = JSON.stringify(json, null, 2);
      setText(formatted);
      setError(null);
    }
  }, [json, isFocused]);

  const handleTextChange = useCallback(
    (newText: string) => {
      setText(newText);
      setError(null);

      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        if (!newText.trim()) return;
        try {
          const parsed = smartParse(newText);
          setError(null);
          onParse(parsed);
        } catch {
          // wait for blur
        }
      }, 400);
    },
    [onParse]
  );

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    if (!text.trim()) return;
    try {
      const parsed = smartParse(text);
      setError(null);
      onParse(parsed);
      setText(JSON.stringify(parsed, null, 2));
    } catch (e) {
      setError((e as Error).message);
    }
  }, [text, onParse]);

  const handleFileUpload = useCallback(
    (file: File) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setText(content);
        try {
          const parsed = smartParse(content);
          setError(null);
          onParse(parsed);
        } catch (err) {
          setError((err as Error).message);
        }
      };
      reader.readAsText(file);
    },
    [onParse]
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFileUpload(file);
    },
    [handleFileUpload]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files?.[0];
      if (file && file.name.endsWith(".json")) {
        handleFileUpload(file);
      }
    },
    [handleFileUpload]
  );

  const handleLoadSample = useCallback(() => {
    setIsFocused(false);
    const formatted = JSON.stringify(SAMPLE_JSON, null, 2);
    setText(formatted);
    setError(null);
    onParse(SAMPLE_JSON);
  }, [onParse]);

  return (
    <div className="flex flex-col h-full p-4 gap-3">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-jt-text-primary uppercase tracking-widest m-0">
          JSON
        </h2>
        <span className="text-[9px] font-bold tracking-wider px-[7px] py-0.5 rounded bg-emerald-400/15 text-emerald-400 animate-jt-live-pulse">
          SYNCED
        </span>
      </div>

      <div
        className={`relative flex-1 flex rounded-lg border-[1.5px] border-dashed transition-colors overflow-hidden ${
          dragOver
            ? "border-jt-accent bg-jt-accent/[0.06]"
            : "border-jt-border focus-within:border-jt-accent focus-within:bg-jt-accent/[0.03]"
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        <textarea
          ref={textareaRef}
          className="flex-1 bg-transparent border-none text-jt-text-primary font-mono text-[12.5px] leading-relaxed px-3.5 py-3 resize-none outline-none placeholder:text-jt-text-muted placeholder:opacity-60"
          value={text}
          onChange={(e) => handleTextChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          placeholder={"Paste JSON here — supports relaxed syntax:\n• Unquoted keys\n• Trailing commas\n• Missing outer braces\n• Single-quoted strings"}
          spellCheck={false}
        />
        {dragOver && (
          <div className="absolute inset-0 bg-jt-accent/10 flex items-center justify-center text-sm font-medium text-jt-accent backdrop-blur-sm rounded-lg">
            <span>Drop .json file here</span>
          </div>
        )}
      </div>

      {error && (
        <div className="text-xs text-red-400 bg-red-400/[0.08] px-3 py-2 rounded-md border border-red-400/15">
          ⚠ {error}
        </div>
      )}

      <div className="flex gap-2 shrink-0">
        <button
          className="px-4 py-2 rounded-md border border-jt-border bg-transparent text-jt-text-secondary text-[13px] font-medium cursor-pointer transition-colors hover:bg-jt-surface-2 hover:border-jt-text-muted"
          onClick={() => fileInputRef.current?.click()}
        >
          Upload File
        </button>
        <button
          className="px-4 py-2 rounded-md border-none bg-transparent text-jt-text-muted text-[13px] cursor-pointer transition-colors hover:text-jt-text-primary hover:bg-jt-surface-2"
          onClick={handleLoadSample}
        >
          Load Sample
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  );
}
