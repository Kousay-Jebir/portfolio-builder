import { useEditor } from "@craftjs/core";

function LayerItem({
    layer,
    handleClick,
    toggleVisibility,
    handleDelete,
    visible,
    depth = 0,
}) {
    return (
        <li className="text-xs border-b border-border">
            <div
                className="flex items-center justify-between hover:bg-muted/30 cursor-pointer py-1 px-2"
                style={{ paddingLeft: `${depth * 12}px` }}
                onClick={() => handleClick(layer.id)}
            >
                <span className="truncate">
                    {layer.displayName || layer.name}
                </span>
                <div className="flex items-center space-x-2">
                    {/* visibility toggle */}
                    <span
                        className="text-xs cursor-pointer"
                        onClick={e => {
                            e.stopPropagation();
                            toggleVisibility(layer.id);
                        }}
                        title={visible ? "Show Layer" : "Hide Layer"}
                    >
                        {visible ? "👁" : "🙈"}
                    </span>
                    {/* delete icon */}
                    <span
                        className="text-xs cursor-pointer select-none"
                        onClick={e => {
                            e.stopPropagation();
                            handleDelete(layer.id);
                        }}
                        title="Delete Layer"
                    >
                        🗑️
                    </span>
                </div>
            </div>

            {layer.children?.length > 0 && (
                <ul>
                    {layer.children.map(child => (
                        <LayerItem
                            key={child.id}
                            layer={child}
                            handleClick={handleClick}
                            toggleVisibility={toggleVisibility}
                            handleDelete={handleDelete}
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
        actions: { selectNode, setHidden, delete: deleteNode },
    } = useEditor(editor => ({ nodes: editor.nodes }));

    const mapNodeById = id => {
        const node = nodes[id];
        return {
            id,
            name: node?.data.name,
            displayName: node?.data.displayName,
            children: node?.data.nodes || [],
            hidden: node?.data.hidden,
        };
    };

    const getTree = node => {
        if (!node) return;
        const children = node.children.map(childId =>
            getTree(mapNodeById(childId))
        );
        return { ...node, children };
    };

    const rootNode = getTree(mapNodeById("ROOT"));

    const handleDelete = id => {
        deleteNode(id)
    };

    return (
        <div className="border border-border rounded-none text-muted-foreground mt-2">
            <div className="border-b border-border text-xs font-medium px-2 py-1 tracking-wide">
                Layers
            </div>
            <ul className="divide-y divide-border p-1">
                {rootNode?.children?.map(child => (
                    <LayerItem
                        key={child.id}
                        layer={child}
                        handleClick={selectNode}
                        toggleVisibility={id =>
                            setHidden(id, !nodes[id]?.data.hidden)
                        }
                        handleDelete={handleDelete}
                        visible={child.hidden}
                    />
                ))}
            </ul>
        </div>
    );
}

