import React from "react";
import JsonNodeRow from "./JsonNode.tsx";
import type { JsonValue } from "../../hooks/useJsonHistory.ts";

interface JsonTreeViewProps {
  json: JsonValue;
  onReorder: (parentPath: string[], fromIndex: number, toIndex: number) => void;
  onUpdate: (path: string[], value: JsonValue) => void;
  onDelete: (path: string[]) => void;
  onAdd: (path: string[], key: string, value: JsonValue) => void;
  onRenameKey: (path: string[], oldKey: string, newKey: string) => void;
  globalExpanded: boolean | null;
}

export default function JsonTreeView({
  json,
  onReorder,
  onUpdate,
  onDelete,
  onAdd,
  onRenameKey,
  globalExpanded,
}: JsonTreeViewProps) {
  return (
    <div className="py-1">
      <JsonNodeRow
        nodeKey="root"
        value={json}
        path={[]}
        isArrayItem={false}
        depth={0}
        globalExpanded={globalExpanded}
        onReorder={onReorder}
        onUpdate={onUpdate}
        onDelete={onDelete}
        onAdd={onAdd}
        onRenameKey={onRenameKey}
      />
    </div>
  );
}
