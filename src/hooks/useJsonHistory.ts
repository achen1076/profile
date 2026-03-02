import { useCallback, useReducer } from "react";

export type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

interface HistoryState {
  past: JsonValue[];
  present: JsonValue | null;
  future: JsonValue[];
}

type Action =
  | { type: "SET"; value: JsonValue }
  | { type: "UNDO" }
  | { type: "REDO" }
  | { type: "MOVE"; sourcePath: string[]; targetPath: string[]; targetIndex: number }
  | { type: "UPDATE"; path: string[]; value: JsonValue }
  | { type: "DELETE"; path: string[] }
  | { type: "ADD"; path: string[]; key: string; value: JsonValue }
  | { type: "RENAME_KEY"; path: string[]; oldKey: string; newKey: string }
  | { type: "REORDER"; parentPath: string[]; fromIndex: number; toIndex: number };

function deepClone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

function getByPath(obj: JsonValue, path: string[]): JsonValue | undefined {
  let current: JsonValue = obj;
  for (const key of path) {
    if (current === null || typeof current !== "object") return undefined;
    if (Array.isArray(current)) {
      const idx = parseInt(key, 10);
      if (isNaN(idx) || idx < 0 || idx >= current.length) return undefined;
      current = current[idx];
    } else {
      if (!(key in current)) return undefined;
      current = current[key];
    }
  }
  return current;
}

function setByPath(obj: JsonValue, path: string[], value: JsonValue): JsonValue {
  if (path.length === 0) return value;
  const clone = deepClone(obj);
  let current: JsonValue = clone;
  for (let i = 0; i < path.length - 1; i++) {
    const key = path[i];
    if (Array.isArray(current)) {
      current = current[parseInt(key, 10)];
    } else if (current !== null && typeof current === "object") {
      current = (current as Record<string, JsonValue>)[key];
    }
  }
  const lastKey = path[path.length - 1];
  if (Array.isArray(current)) {
    current[parseInt(lastKey, 10)] = value;
  } else if (current !== null && typeof current === "object") {
    (current as Record<string, JsonValue>)[lastKey] = value;
  }
  return clone;
}

function deleteByPath(obj: JsonValue, path: string[]): JsonValue {
  if (path.length === 0) return obj;
  const clone = deepClone(obj);
  let current: JsonValue = clone;
  for (let i = 0; i < path.length - 1; i++) {
    const key = path[i];
    if (Array.isArray(current)) {
      current = current[parseInt(key, 10)];
    } else if (current !== null && typeof current === "object") {
      current = (current as Record<string, JsonValue>)[key];
    }
  }
  const lastKey = path[path.length - 1];
  if (Array.isArray(current)) {
    current.splice(parseInt(lastKey, 10), 1);
  } else if (current !== null && typeof current === "object") {
    delete (current as Record<string, JsonValue>)[lastKey];
  }
  return clone;
}

function addByPath(obj: JsonValue, path: string[], key: string, value: JsonValue): JsonValue {
  const parent = path.length === 0 ? obj : getByPath(obj, path);
  if (parent === undefined) return obj;

  const clone = deepClone(obj);
  let target: JsonValue = path.length === 0 ? clone : getByPath(clone, path)!;

  if (Array.isArray(target)) {
    target.push(value);
  } else if (target !== null && typeof target === "object") {
    (target as Record<string, JsonValue>)[key] = value;
  }
  return clone;
}

function renameKeyByPath(obj: JsonValue, path: string[], oldKey: string, newKey: string): JsonValue {
  if (oldKey === newKey) return obj;
  const parent = path.length === 0 ? obj : getByPath(obj, path);
  if (parent === null || typeof parent !== "object" || Array.isArray(parent)) return obj;

  const clone = deepClone(obj);
  const target = (path.length === 0 ? clone : getByPath(clone, path)) as Record<string, JsonValue>;

  // Preserve key order
  const entries = Object.entries(target);
  for (const k of Object.keys(target)) delete target[k];
  for (const [k, v] of entries) {
    target[k === oldKey ? newKey : k] = v;
  }
  return clone;
}

function reorderInParent(obj: JsonValue, parentPath: string[], fromIndex: number, toIndex: number): JsonValue {
  const parent = parentPath.length === 0 ? obj : getByPath(obj, parentPath);
  if (parent === null || typeof parent !== "object") return obj;

  const clone = deepClone(obj);
  const target = parentPath.length === 0 ? clone : getByPath(clone, parentPath)!;

  if (Array.isArray(target)) {
    const [item] = target.splice(fromIndex, 1);
    target.splice(toIndex, 0, item);
  } else if (target !== null && typeof target === "object") {
    const entries = Object.entries(target as Record<string, JsonValue>);
    const [item] = entries.splice(fromIndex, 1);
    entries.splice(toIndex, 0, item);
    const rec = target as Record<string, JsonValue>;
    for (const k of Object.keys(rec)) delete rec[k];
    for (const [k, v] of entries) rec[k] = v;
  }
  return clone;
}

function reducer(state: HistoryState, action: Action): HistoryState {
  switch (action.type) {
    case "SET":
      return {
        past: state.present !== null ? [...state.past, state.present] : state.past,
        present: action.value,
        future: [],
      };
    case "UNDO": {
      if (state.past.length === 0) return state;
      const previous = state.past[state.past.length - 1];
      return {
        past: state.past.slice(0, -1),
        present: previous,
        future: state.present !== null ? [state.present, ...state.future] : state.future,
      };
    }
    case "REDO": {
      if (state.future.length === 0) return state;
      const next = state.future[0];
      return {
        past: state.present !== null ? [...state.past, state.present] : state.past,
        present: next,
        future: state.future.slice(1),
      };
    }
    case "REORDER": {
      if (state.present === null) return state;
      const reordered = reorderInParent(state.present, action.parentPath, action.fromIndex, action.toIndex);
      return {
        past: [...state.past, state.present],
        present: reordered,
        future: [],
      };
    }
    case "UPDATE": {
      if (state.present === null) return state;
      const updated = setByPath(state.present, action.path, action.value);
      return {
        past: [...state.past, state.present],
        present: updated,
        future: [],
      };
    }
    case "DELETE": {
      if (state.present === null) return state;
      const deleted = deleteByPath(state.present, action.path);
      return {
        past: [...state.past, state.present],
        present: deleted,
        future: [],
      };
    }
    case "ADD": {
      if (state.present === null) return state;
      const added = addByPath(state.present, action.path, action.key, action.value);
      return {
        past: [...state.past, state.present],
        present: added,
        future: [],
      };
    }
    case "RENAME_KEY": {
      if (state.present === null) return state;
      const renamed = renameKeyByPath(state.present, action.path, action.oldKey, action.newKey);
      return {
        past: [...state.past, state.present],
        present: renamed,
        future: [],
      };
    }
    default:
      return state;
  }
}

export function useJsonHistory() {
  const [state, dispatch] = useReducer(reducer, {
    past: [],
    present: null,
    future: [],
  });

  const set = useCallback((value: JsonValue) => dispatch({ type: "SET", value }), []);
  const undo = useCallback(() => dispatch({ type: "UNDO" }), []);
  const redo = useCallback(() => dispatch({ type: "REDO" }), []);
  const reorder = useCallback(
    (parentPath: string[], fromIndex: number, toIndex: number) =>
      dispatch({ type: "REORDER", parentPath, fromIndex, toIndex }),
    []
  );
  const updateNode = useCallback(
    (path: string[], value: JsonValue) => dispatch({ type: "UPDATE", path, value }),
    []
  );
  const deleteNode = useCallback(
    (path: string[]) => dispatch({ type: "DELETE", path }),
    []
  );
  const addNode = useCallback(
    (path: string[], key: string, value: JsonValue) => dispatch({ type: "ADD", path, key, value }),
    []
  );
  const renameKey = useCallback(
    (path: string[], oldKey: string, newKey: string) =>
      dispatch({ type: "RENAME_KEY", path, oldKey, newKey }),
    []
  );

  return {
    json: state.present,
    set,
    undo,
    redo,
    reorder,
    updateNode,
    deleteNode,
    addNode,
    renameKey,
    canUndo: state.past.length > 0,
    canRedo: state.future.length > 0,
    historySize: state.past.length,
  };
}
