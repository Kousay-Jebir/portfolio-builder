import { useEditor } from "@craftjs/core";
import { useState } from "react";

function LayerItem({ layer, handleClick, toggleVisibility, visible }) {
    return (
        <li style={styles.item}>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }} onClick={handleClick}>
                <span style={styles.name}>{layer.displayName || layer.name}
                </span>
                <span
                    style={{
                        ...styles.icon,
                        color: !visible ? "#4caf50" : "#f44336",
                    }}
                    onClick={toggleVisibility}
                    title={!visible ? "Hide Layer" : "Show Layer"}
                >
                    {!visible ? "👁" : "🙈"}
                </span>
            </div>

            {
                layer.children && layer.children.length > 0 && (
                    <ul style={{ paddingLeft: 16 }}>
                        {layer.children.map((child) => (
                            <LayerItem key={child.id} layer={child} />
                        ))}
                    </ul>
                )
            }
        </li >
    );
}

export default function Layers() {
    const { nodes, actions: { selectNode, setHidden } } = useEditor((editor) => ({ nodes: editor.nodes }));

    function mapNodeById(id) {
        const craftNode = nodes[id];
        return {
            id,
            name: craftNode.data.name,
            displayName: craftNode.data.displayName,
            children: craftNode.data.nodes || [],
            hidden: craftNode.data.hidden
        };
    }

    function getTree(node) {
        if (!node) return;

        const mappedChildren = node.children.map((childId) => {
            const childNode = mapNodeById(childId);
            return getTree(childNode); // Recursively build the tree
        });

        return {
            ...node,
            children: mappedChildren,
        };
    }

    const rootEntry = nodes['ROOT'];
    const rootNode = mapNodeById(rootEntry.id);
    const tree = getTree(rootNode);

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Layers</h2>
            <ul style={styles.list}>
                {tree.children.map((child) => (
                    <LayerItem key={child.id} layer={child} handleClick={() => selectNode(child.id)} toggleVisibility={() => setHidden(child.id, !child.hidden)} visible={child.hidden} />
                ))}
            </ul>
        </div>
    );
}


const styles = {
    container: {
        width: "100%",
        maxWidth: "300px",
        backgroundColor: "#fff",
        borderRadius: "12px",
        padding: "16px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        fontFamily: "sans-serif",
    },
    title: {
        marginBottom: "12px",
        fontSize: "20px",
        fontWeight: "600",
        borderBottom: "1px solid #eee",
        paddingBottom: "8px",
    },
    list: {
        listStyle: "none",
        padding: 0,
        margin: 0,
    },
    item: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "8px 0",
        borderBottom: "1px solid #f1f1f1",
    },
    name: {
        fontSize: "16px",
    },
    icon: {
        cursor: "pointer",
        fontSize: "18px",
        transition: "transform 0.2s",
    },
};
