import { useEditor } from "@craftjs/core";

function LayerItem({ layer, handleClick, toggleVisibility, visible, depth = 0 }) {
    return (
        <li className="text-xs border-b border-border">
            <div
                className="flex items-center justify-between hover:bg-muted/30 cursor-pointer py-1 px-2"
                style={{ paddingLeft: `${depth * 12}px` }}
                onClick={() => handleClick(layer.id)}
            >
                <span className="truncate">{layer.displayName || layer.name}</span>
                <span
                    className="ml-2 text-xs cursor-pointer"
                    onClick={(e) => {
                        e.stopPropagation(); // prevent triggering selectNode
                        toggleVisibility(layer.id);
                    }}
                    title={!visible ? "Hide Layer" : "Show Layer"}
                >
                    {!visible ? "👁" : "🙈"}
                </span>
            </div>

            {layer.children?.length > 0 && (
                <ul>
                    {layer.children.map((child) => (
                        <LayerItem
                            key={child.id}
                            layer={child}
                            handleClick={handleClick}
                            toggleVisibility={toggleVisibility}
                            visible={child.hidden}
                            depth={depth + 1}
                        />
                    ))}
                </ul>
            )}
        </li>
    );
}

export default function Layers() {
    const {
        nodes,
        actions: { selectNode, setHidden },
    } = useEditor((editor) => ({ nodes: editor.nodes }));

    const mapNodeById = (id) => {
        const node = nodes[id];
        return {
            id,
            name: node?.data.name,
            displayName: node?.data.displayName,
            children: node?.data.nodes || [],
            hidden: node?.data.hidden,
        };
    };

    const getTree = (node) => {
        if (!node) return;
        const children = node.children.map((childId) =>
            getTree(mapNodeById(childId))
        );
        return { ...node, children };
    };

    const rootNode = getTree(mapNodeById("ROOT"));

    return (
        <div className="border border-border rounded-none text-muted-foreground mt-2">
            <div className="border-b border-border text-xs font-medium px-2 py-1 tracking-wide">
                Layers
            </div>
            <ul className="divide-y divide-border p-1">
                {rootNode?.children?.map((child) => (
                    <LayerItem
                        key={child.id}
                        layer={child}
                        handleClick={selectNode}
                        toggleVisibility={(id) =>
                            setHidden(id, !nodes[id]?.data.hidden)
                        }
                        visible={child.hidden}
                    />
                ))}
            </ul>
        </div>
    );
}
