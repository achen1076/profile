import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FiChevronRight, FiTrash2, FiEdit2, FiPlus } from "react-icons/fi";
import { RxDragHandleDots2 } from "react-icons/rx";
import type { JsonValue } from "../../hooks/useJsonHistory.ts";

// ─── Types ────────────────────────────────────────────
interface JsonNodeProps {
  nodeKey: string;
  value: JsonValue;
  path: string[];
  isArrayItem: boolean;
  depth: number;
  globalExpanded: boolean | null;
  onReorder: (parentPath: string[], fromIndex: number, toIndex: number) => void;
  onUpdate: (path: string[], value: JsonValue) => void;
  onDelete: (path: string[]) => void;
  onAdd: (path: string[], key: string, value: JsonValue) => void;
  onRenameKey: (path: string[], oldKey: string, newKey: string) => void;
}

function getValueType(value: JsonValue): string {
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  return typeof value;
}

function getTypeLabel(value: JsonValue): string {
  if (value === null) return "null";
  if (Array.isArray(value)) return `Array(${value.length})`;
  if (typeof value === "object") return `Object(${Object.keys(value).length})`;
  return typeof value;
}

// ─── Sortable Wrapper ─────────────────────────────────
function SortableItem({ id, children }: { id: string; children: (props: {
  listeners: ReturnType<typeof useSortable>["listeners"];
  attributes: ReturnType<typeof useSortable>["attributes"];
  setNodeRef: ReturnType<typeof useSortable>["setNodeRef"];
  isDragging: boolean;
  style: React.CSSProperties;
}) => React.ReactNode }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    isOver,
  } = useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    position: "relative" as const,
  };

  return (
    <div
      className={`transition-transform duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] rounded-md ${
        isDragging ? "opacity-30 bg-jt-accent-subtle rounded-md" : ""
      } ${isOver ? "before:content-[''] before:absolute before:left-0 before:right-0 before:-top-px before:h-0.5 before:bg-jt-accent before:rounded-sm before:z-10 before:shadow-[0_0_8px_rgba(99,102,241,0.5)]" : ""}`}
    >
      {children({ listeners, attributes, setNodeRef, isDragging, style })}
    </div>
  );
}

// ─── Drag Preview ──────────────────────────────────────
function DragPreview({ nodeKey, value, isArrayItem }: { nodeKey: string; value: JsonValue; isArrayItem: boolean }) {
  const isObject = value !== null && typeof value === "object" && !Array.isArray(value);
  const isArray = Array.isArray(value);
  const label = getTypeLabel(value);

  return (
    <div className="flex items-center gap-2 px-3.5 py-2 bg-jt-surface-2 border-[1.5px] border-jt-accent rounded-lg shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_0_1px_rgba(99,102,241,0.2),0_0_20px_rgba(99,102,241,0.15)] font-mono text-[13px] max-w-[400px] backdrop-blur-[12px] whitespace-nowrap overflow-hidden">
      <span className="text-jt-accent flex items-center text-sm">
        <RxDragHandleDots2 />
      </span>
      <span className="text-jt-json-key font-medium">
        {isArrayItem ? `[${nodeKey}]` : nodeKey}
      </span>
      <span className="text-jt-text-muted">:</span>
      {isObject || isArray ? (
        <span className="text-jt-text-muted text-[11px] italic">{label}</span>
      ) : (
        <span className="text-jt-json-string overflow-hidden text-ellipsis">
          {value === null ? "null" : JSON.stringify(value)}
        </span>
      )}
    </div>
  );
}

// ─── Sortable Children Container ──────────────────────
function SortableChildrenContainer({
  parentPath,
  entries,
  isArray,
  depth,
  globalExpanded,
  onReorder,
  onUpdate,
  onDelete,
  onAdd,
  onRenameKey,
}: {
  parentPath: string[];
  entries: [string, JsonValue][];
  isArray: boolean;
  depth: number;
  globalExpanded: boolean | null;
  onReorder: JsonNodeProps["onReorder"];
  onUpdate: JsonNodeProps["onUpdate"];
  onDelete: JsonNodeProps["onDelete"];
  onAdd: JsonNodeProps["onAdd"];
  onRenameKey: JsonNodeProps["onRenameKey"];
}) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  const prefix = parentPath.join(".") || "root";
  const sortableIds = entries.map((_, idx) => `${prefix}__${idx}`);

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(String(event.active.id));
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      setActiveId(null);
      const { active, over } = event;
      if (!over || active.id === over.id) return;

      const fromIndex = sortableIds.indexOf(String(active.id));
      const toIndex = sortableIds.indexOf(String(over.id));
      if (fromIndex === -1 || toIndex === -1) return;

      onReorder(parentPath, fromIndex, toIndex);
    },
    [sortableIds, parentPath, onReorder]
  );

  const handleDragCancel = useCallback(() => {
    setActiveId(null);
  }, []);

  const activeIndex = activeId ? sortableIds.indexOf(activeId) : -1;
  const activeEntry = activeIndex >= 0 ? entries[activeIndex] : null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <SortableContext items={sortableIds} strategy={verticalListSortingStrategy}>
        <div className="pl-5 border-l border-jt-guide-line ml-3 relative">
          {entries.map(([k, v], idx) => {
            const itemId = sortableIds[idx];
            return (
              <SortableItem key={itemId} id={itemId}>
                {({ listeners, attributes, setNodeRef, isDragging, style }) => (
                  <div ref={setNodeRef} style={style}>
                    <JsonNodeRow
                      nodeKey={isArray ? String(idx) : k}
                      value={v}
                      path={[...parentPath, isArray ? String(idx) : k]}
                      isArrayItem={isArray}
                      depth={depth + 1}
                      globalExpanded={globalExpanded}
                      onReorder={onReorder}
                      onUpdate={onUpdate}
                      onDelete={onDelete}
                      onAdd={onAdd}
                      onRenameKey={onRenameKey}
                      dragListeners={listeners}
                      dragAttributes={attributes}
                      isDragging={isDragging}
                    />
                  </div>
                )}
              </SortableItem>
            );
          })}
          <div className="py-0.5 text-jt-text-muted font-mono text-[13px]">
            {isArray ? "]" : "}"}
          </div>
        </div>
      </SortableContext>

      <DragOverlay dropAnimation={{
        duration: 200,
        easing: "cubic-bezier(0.18, 0.67, 0.6, 1.22)",
      }}>
        {activeEntry ? (
          <DragPreview
            nodeKey={isArray ? String(activeIndex) : activeEntry[0]}
            value={activeEntry[1]}
            isArrayItem={isArray}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

// ─── Single Node Row ──────────────────────────────────
function JsonNodeRow({
  nodeKey,
  value,
  path,
  isArrayItem,
  depth,
  globalExpanded,
  onUpdate,
  onDelete,
  onAdd,
  onRenameKey,
  onReorder,
  dragListeners,
  dragAttributes,
  isDragging,
}: JsonNodeProps & {
  dragListeners?: ReturnType<typeof useSortable>["listeners"];
  dragAttributes?: ReturnType<typeof useSortable>["attributes"];
  isDragging?: boolean;
}) {
  const [expanded, setExpanded] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState("");
  const [editingKey, setEditingKey] = useState(false);
  const [editKeyValue, setEditKeyValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const keyInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (globalExpanded !== null) {
      setExpanded(globalExpanded);
    }
  }, [globalExpanded]);

  const isObject = value !== null && typeof value === "object" && !Array.isArray(value);
  const isArray = Array.isArray(value);
  const isExpandable = isObject || isArray;
  const valueType = getValueType(value);

  const handleToggle = useCallback(() => {
    setExpanded((prev) => !prev);
  }, []);

  const startEditing = useCallback(() => {
    if (isExpandable) return;
    setEditing(true);
    setEditValue(value === null ? "null" : JSON.stringify(value));
    setTimeout(() => inputRef.current?.focus(), 10);
  }, [value, isExpandable]);

  const commitEdit = useCallback(() => {
    setEditing(false);
    const trimmed = editValue.trim();
    let parsed: JsonValue;
    try {
      parsed = JSON.parse(trimmed);
    } catch {
      parsed = trimmed;
    }
    onUpdate(path, parsed);
  }, [editValue, path, onUpdate]);

  const startEditingKey = useCallback(() => {
    if (isArrayItem) return;
    setEditingKey(true);
    setEditKeyValue(nodeKey);
    setTimeout(() => keyInputRef.current?.focus(), 10);
  }, [nodeKey, isArrayItem]);

  const commitKeyEdit = useCallback(() => {
    setEditingKey(false);
    if (editKeyValue.trim() && editKeyValue.trim() !== nodeKey) {
      onRenameKey(path.slice(0, -1), nodeKey, editKeyValue.trim());
    }
  }, [editKeyValue, nodeKey, path, onRenameKey]);

  const handleAddChild = useCallback(() => {
    if (isArray) {
      onAdd(path, "", "");
    } else if (isObject) {
      const keys = Object.keys(value as Record<string, JsonValue>);
      let newKey = "newKey";
      let i = 1;
      while (keys.includes(newKey)) {
        newKey = `newKey${i++}`;
      }
      onAdd(path, newKey, "");
    }
  }, [isArray, isObject, value, path, onAdd]);

  const editInputClasses = "bg-jt-surface-2 border border-jt-accent rounded px-1.5 py-px text-jt-text-primary font-mono text-[13px] outline-none min-w-[60px]";

  const renderValue = () => {
    if (editing) {
      return (
        <input
          ref={inputRef}
          className={editInputClasses}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") commitEdit();
            if (e.key === "Escape") setEditing(false);
          }}
          onBlur={commitEdit}
        />
      );
    }

    switch (valueType) {
      case "string":
        return (
          <span className="text-jt-json-string break-all" onDoubleClick={startEditing}>
            &quot;{value as string}&quot;
          </span>
        );
      case "number":
        return (
          <span className="text-jt-json-number" onDoubleClick={startEditing}>
            {String(value)}
          </span>
        );
      case "boolean":
        return (
          <span className="text-jt-json-boolean italic" onDoubleClick={startEditing}>
            {String(value)}
          </span>
        );
      case "null":
        return (
          <span className="text-jt-json-null italic" onDoubleClick={startEditing}>
            null
          </span>
        );
      default:
        return null;
    }
  };

  const entries: [string, JsonValue][] = isObject
    ? Object.entries(value as Record<string, JsonValue>)
    : isArray
    ? (value as JsonValue[]).map((item, idx) => [String(idx), item])
    : [];

  const childCount = entries.length;

  return (
    <div className={`font-mono text-[13px] leading-normal ${isDragging ? "opacity-40" : ""}`}>
      <div className="group flex items-center gap-1 pr-2 py-[3px] rounded-md cursor-default min-h-[30px] relative transition-colors hover:bg-jt-surface-2">
        {/* Drag handle */}
        <span
          className="flex items-center cursor-grab p-1 px-0.5 opacity-0 transition-all shrink-0 text-sm rounded text-jt-text-muted group-hover:opacity-70 hover:!opacity-100 hover:!text-jt-accent hover:!bg-jt-accent-subtle active:cursor-grabbing"
          {...(dragListeners || {})}
          {...(dragAttributes || {})}
          title="Drag to reorder"
        >
          <RxDragHandleDots2 />
        </span>

        {/* Expand/Collapse toggle */}
        {isExpandable ? (
          <button
            className={`flex items-center justify-center w-[18px] h-[18px] border-none bg-transparent cursor-pointer text-jt-text-muted p-0 transition-transform shrink-0 text-[11px] hover:text-jt-text-primary ${
              expanded ? "rotate-90" : ""
            }`}
            onClick={handleToggle}
          >
            <FiChevronRight />
          </button>
        ) : (
          <span className="w-[18px] shrink-0" />
        )}

        {/* Key */}
        {!isArrayItem ? (
          editingKey ? (
            <input
              ref={keyInputRef}
              className={editInputClasses}
              value={editKeyValue}
              onChange={(e) => setEditKeyValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") commitKeyEdit();
                if (e.key === "Escape") setEditingKey(false);
              }}
              onBlur={commitKeyEdit}
            />
          ) : (
            <span className="text-jt-json-key font-medium whitespace-nowrap cursor-default" onDoubleClick={startEditingKey}>
              {nodeKey}
            </span>
          )
        ) : (
          <span className="text-jt-text-muted text-[11px] font-normal whitespace-nowrap min-w-[14px]">
            {nodeKey}
          </span>
        )}

        <span className="text-jt-text-muted mx-1">:</span>

        {/* Value or bracket */}
        {isExpandable ? (
          <>
            <span className="text-jt-text-muted font-normal">{isArray ? "[" : "{"}</span>
            {!expanded && (
              <>
                <span className="text-jt-text-muted text-[11px] ml-1.5 italic">
                  {childCount} {childCount === 1 ? "item" : "items"}
                </span>
                <span className="text-jt-text-muted font-normal">{isArray ? "]" : "}"}</span>
              </>
            )}
          </>
        ) : (
          renderValue()
        )}

        {/* Type badge */}
        {isExpandable && !expanded && (
          <span className="text-[10px] px-1.5 py-px rounded bg-jt-surface-3 text-jt-text-muted font-medium ml-1.5 font-sans">
            {isArray ? "Array" : "Object"}
          </span>
        )}

        {/* Actions */}
        <div className="flex gap-0.5 ml-auto opacity-0 transition-opacity shrink-0 group-hover:opacity-100">
          {!isExpandable && (
            <button
              className="flex items-center justify-center w-[22px] h-[22px] border-none bg-transparent cursor-pointer text-jt-text-muted rounded p-0 text-xs transition-colors hover:bg-jt-surface-3 hover:text-jt-text-primary"
              onClick={startEditing}
              title="Edit value"
            >
              <FiEdit2 />
            </button>
          )}
          {isExpandable && (
            <button
              className="flex items-center justify-center w-[22px] h-[22px] border-none bg-transparent cursor-pointer text-jt-text-muted rounded p-0 text-xs transition-colors hover:bg-jt-surface-3 hover:text-jt-text-primary"
              onClick={handleAddChild}
              title="Add child"
            >
              <FiPlus />
            </button>
          )}
          <button
            className="flex items-center justify-center w-[22px] h-[22px] border-none bg-transparent cursor-pointer text-jt-text-muted rounded p-0 text-xs transition-colors hover:bg-red-400/15 hover:text-red-400"
            onClick={() => onDelete(path)}
            title="Delete"
          >
            <FiTrash2 />
          </button>
        </div>
      </div>

      {/* Children */}
      {isExpandable && expanded && (
        <SortableChildrenContainer
          parentPath={path}
          entries={entries}
          isArray={isArray}
          depth={depth}
          globalExpanded={globalExpanded}
          onReorder={onReorder}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onAdd={onAdd}
          onRenameKey={onRenameKey}
        />
      )}
    </div>
  );
}

export default JsonNodeRow;
