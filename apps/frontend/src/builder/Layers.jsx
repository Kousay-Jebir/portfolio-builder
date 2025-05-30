import { useEditor } from "@craftjs/core";
import React, { useEffect } from "react";
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import uniqueId from "@/libs/nanoid";

function LayerItem({ layer, onSelect, onToggleHidden, onDelete, depth, copyComponent }) {
    const hasChildren = layer.children.length > 0;

    return (
        <AccordionItem value={layer.id}>
            <AccordionTrigger>
                {/* clicking the name selects; the trigger chevron still works */}
                <span onClick={() => onSelect(layer.id)} className="flex-1">
                    {layer.displayName || layer.name}
                </span>
                <button
                    onClick={e => {
                        e.stopPropagation();
                        onToggleHidden(layer.id);
                    }}
                    aria-label={layer.hidden ? "Show" : "Hide"}
                >
                    {layer.hidden ? "🙈" : "👁"}
                </button>
                <button
                    onClick={e => {
                        e.stopPropagation();
                        onDelete(layer.id);
                    }}
                    aria-label="Delete"
                >
                    🗑️
                </button>
                <button onClick={(e) => { e.stopPropagation(); copyComponent(layer.id) }}>Copy</button>
            </AccordionTrigger>
            {hasChildren && (
                <AccordionContent>
                    {layer.children.map(child => (
                        <Accordion type="multiple" collapsible className="w-full" style={{ paddingLeft: `${5 + depth}px` }}>
                            <LayerItem
                                key={child.id}
                                layer={child}
                                onSelect={onSelect}
                                onToggleHidden={onToggleHidden}
                                onDelete={onDelete}
                                depth={depth + 1}
                                copyComponent={copyComponent}
                            />
                        </Accordion>
                    ))}
                </AccordionContent>
            )}
        </AccordionItem>
    );
}


export default function Layers() {
    const {
        nodes,
        actions: { selectNode, setHidden, delete: deleteNode, addNodeTree, add },
        query
    } = useEditor(editor => ({ nodes: editor.nodes, query: editor.query }));

    const copyComponent = (nodeId, parentId = null) => {

        if (!parentId) {
            parentId = query.node(nodeId).get().data.parent;
        }
        const { type: nodeType, props: nodeProps, isCanvas } = query.node(nodeId).get().data



        const newNode = query.createNode(React.createElement(nodeType, nodeProps));
        newNode.data.isCanvas = isCanvas;
        add(newNode, parentId);


        const childNodes = query.node(nodeId).get().data.nodes || [];

        childNodes.forEach((childId) => {

            copyComponent(childId, newNode.id);
        });
        console.log(query.node('ROOT').toNodeTree())
    };

    const buildTree = id => {
        const d = nodes[id]?.data;
        return {
            id,
            name: d?.name || "ROOT",
            displayName: d?.displayName,
            hidden: !!d?.hidden,
            children: d?.nodes.map(buildTree) || [],
        };
    };
    const root = buildTree("ROOT");


    return (

        root.children.length > 0 ? (
            <Card className="rounded-xs shadow-none dark:bg-slate-900">
                <CardContent>
                    <Accordion type="multiple" collapsible className="w-full">
                        {root.children.map(layer => (
                            <LayerItem
                                key={layer.id}
                                layer={layer}
                                onSelect={selectNode}
                                onToggleHidden={id => setHidden(id, !nodes[id].data.hidden)}
                                onDelete={deleteNode}
                                copyComponent={copyComponent}
                                depth={0}
                            />
                        ))}
                    </Accordion>
                </CardContent>
            </Card>) : null

    );
}
