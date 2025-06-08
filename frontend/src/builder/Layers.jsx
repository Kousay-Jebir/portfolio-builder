import { useEditor } from "@craftjs/core";
import React, { useState, useRef, useEffect } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

function LayerItem({
  layer,
  onSelect,
  onToggleHidden,
  onDelete,
  copyComponent,
  openMap,
  setOpenMap,
}) {
  const { id, name, displayName, hidden, children } = layer;
  const { query } = useEditor();

  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(name);
  const inputRef = useRef(null);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [editing]);

  const saveTitle = () => {
    const newTitle = title.trim() || name;
    query.node(id).get().data.name = newTitle;
    setTitle(newTitle);
    setEditing(false);
  };

  const openForThis = openMap[id] || [];

  return (
    <AccordionItem value={id}>
      <AccordionTrigger className="flex items-center gap-2 w-full">
        <div
          onClick={(e) => {
            e.stopPropagation();
            onSelect(id);
          }}
          className="flex-1 cursor-pointer truncate"
        >
          {editing ? (
            <input
              ref={inputRef}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={saveTitle}
              onKeyDown={(e) => {
                if (e.key === "Enter") saveTitle();
                if (e.key === "Escape") {
                  setTitle(name);
                  setEditing(false);
                }
              }}
              className="w-full px-1 border border-gray-300 rounded text-sm"
            />
          ) : (
            <span
              onDoubleClick={(e) => {
                e.stopPropagation();
                setEditing(true);
              }}
              className="text-sm"
            >
              {title}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleHidden(id);
            }}
            title={hidden ? "Show" : "Hide"}
          >
            {hidden ? "🙈" : "👁"}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              copyComponent(id);
            }}
            title="Copy"
          >
            📋
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(id);
            }}
            title="Delete"
          >
            🗑️
          </button>
        </div>
      </AccordionTrigger>

      {children.length > 0 && (
        <AccordionContent className="pl-4">
          <Accordion
            type="multiple"
            collapsible
            value={openForThis}
            onValueChange={(vals) => setOpenMap((m) => ({ ...m, [id]: vals }))}
          >
            {children.map((child) => (
              <LayerItem
                key={child.id}
                layer={child}
                onSelect={onSelect}
                onToggleHidden={onToggleHidden}
                onDelete={onDelete}
                copyComponent={copyComponent}
                openMap={openMap}
                setOpenMap={setOpenMap}
              />
            ))}
          </Accordion>
        </AccordionContent>
      )}
    </AccordionItem>
  );
}

export default function Layers({ openMap, setOpenMap }) {
  const {
    nodes,
    actions: { selectNode, setHidden, delete: deleteNode, add },
    query,
  } = useEditor((ed) => ({ nodes: ed.nodes, query: ed.query }));

  const copyComponent = (nodeId, parentId = null) => {
    if (!parentId) parentId = query.node(nodeId).get().data.parent;

    const { type, props, isCanvas } = query.node(nodeId).get().data;
    const newNode = query.createNode(React.createElement(type, props));
    newNode.data.isCanvas = isCanvas;
    add(newNode, parentId);

    (query.node(nodeId).get().data.nodes || []).forEach((cid) =>
      copyComponent(cid, newNode.id)
    );
  };

  const buildTree = (id) => {
    const d = nodes[id]?.data || {};
    return {
      id,
      name: d.name || "ROOT",
      displayName: d.displayName,
      hidden: !!d.hidden,
      children: (d.nodes || []).map(buildTree),
    };
  };

  const root = buildTree("ROOT");
  if (!root.children.length) return null;

  return (
    <Card className="shadow-none rounded-none dark:bg-slate-900 bg-orange-200 ">
      <CardContent>
        <Accordion
          type="multiple"
          collapsible
          value={openMap["ROOT"] || []}
          onValueChange={(vals) => setOpenMap((m) => ({ ...m, ROOT: vals }))}
          className="w-full"
        >
          {root.children.map((layer) => (
            <LayerItem
              key={layer.id}
              layer={layer}
              onSelect={selectNode}
              onToggleHidden={(id) => setHidden(id, !nodes[id].data.hidden)}
              onDelete={deleteNode}
              copyComponent={copyComponent}
              openMap={openMap}
              setOpenMap={setOpenMap}
            />
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
