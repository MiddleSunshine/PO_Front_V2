import { useState } from "react"
import { GetNodeStyle } from "./BasicNode";
import { Button, Input } from "antd";
import { NodeResizer, NodeToolbar } from "reactflow";

const NoteNode = (nodeProps) => {
    const [ndoeData, setNodeData] = useState(nodeProps.data.node_data);

    return (
        <div
            className="NoteNode"
            style={GetNodeStyle(nodeProps)}
        >
            <NodeResizer
                isVisible={nodeProps.selected}
            />
            <NodeToolbar>
                <Button
                    type="primary"
                >
                    Save
                </Button>
            </NodeToolbar>
            <div>
                <Input.TextArea
                    className="InputLikeTitle"
                    defaultValue={ndoeData?.Name}
                    onChange={(e) => {
                        setNodeData({
                            ...ndoeData,
                            Name: e.target.value
                        })
                    }}
                />
            </div>
        </div >
    )

}

export {
    NoteNode
}
