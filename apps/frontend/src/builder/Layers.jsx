import { useEditor } from "@craftjs/core";
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion";

function LayerItem({ layer, onSelect, onToggleHidden, onDelete, depth }) {
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
        actions: { selectNode, setHidden, delete: deleteNode },
    } = useEditor(editor => ({ nodes: editor.nodes }));


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
        <Accordion type="multiple" collapsible className="w-full">
            {root.children.map(layer => (
                <LayerItem
                    key={layer.id}
                    layer={layer}
                    onSelect={selectNode}
                    onToggleHidden={id => setHidden(id, !nodes[id].data.hidden)}
                    onDelete={deleteNode}
                    depth={0}
                />
            ))}
        </Accordion>
    );
}
