import { useState } from "react"
import { GetNodeStyle } from "./BasicNode";
import { Button, Input } from "antd";
import { Handle, NodeResizer, NodeToolbar } from "reactflow";

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
            <Handle
                className={"TargetConnection"}
                id={`${nodeProps.id}_top`}
                position={"top"}
                type={"target"}
            />
            <Handle
                className={"SourceConnection"}
                id={`${nodeProps.id}_bottom`}
                position={"bottom"}
                type={"source"}
            />
            <Handle
                className={"TargetConnection"}
                id={`${nodeProps.id}_left`}
                position={"left"}
                type={"target"}
            />
            <Handle
                className={"SourceConnection"}
                id={`${nodeProps.id}_right`}
                position={"right"}
                type={"source"}
            />
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
