import { useEditor } from "@craftjs/core";
import React, { useState } from "react";
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
    const hasChildren = children.length > 0;

    // Controlled open state for this node’s children:
    const openForThis = openMap[id] || [];

    return (
        <AccordionItem value={id}>
            <AccordionTrigger>
                <span onClick={() => onSelect(id)} className="flex-1 cursor-pointer">
                    {displayName || name}
                </span>
                <button
                    onClick={(e) => { e.stopPropagation(); onToggleHidden(id); }}
                    aria-label={hidden ? "Show" : "Hide"}
                >
                    {hidden ? "🙈" : "👁"}
                </button>
                <button
                    onClick={(e) => { e.stopPropagation(); onDelete(id); }}
                    aria-label="Delete"
                >
                    🗑️
                </button>
                <button
                    onClick={(e) => { e.stopPropagation(); copyComponent(id); }}
                >
                    Copy
                </button>
            </AccordionTrigger>

            {hasChildren && (
                <AccordionContent style={{ paddingLeft: 16 }}>
                    {/* Each group of children is its own Accordion */}
                    <Accordion
                        type="multiple"
                        collapsible
                        value={openForThis}
                        onValueChange={(newVals) =>
                            setOpenMap((m) => ({ ...m, [id]: newVals }))
                        }
                        className="w-full"
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

        const childIds = query.node(nodeId).get().data.nodes || [];
        childIds.forEach((cid) => copyComponent(cid, newNode.id));
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
        <Card className="rounded-xs shadow-none dark:bg-slate-900">
            <CardContent>
                <Accordion
                    type="multiple"
                    value={openMap["ROOT"] || []}
                    onValueChange={(vals) =>
                        setOpenMap((m) => ({ ...m, ROOT: vals }))
                    }
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
