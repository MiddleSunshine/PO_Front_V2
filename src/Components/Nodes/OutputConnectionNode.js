import {Handle} from "reactflow";
import {LogoutOutlined} from "@ant-design/icons"
import {GetNodeStyle} from "./BasicNode";
const OutputConnectionNode=(nodeProps)=>{
    return <div
        style={GetNodeStyle(nodeProps)}
    >
        <Handle
            type={"source"}
            id={`${nodeProps.id}`}
            position={"right"}
        />
        <LogoutOutlined />
    </div>
}

export {
    OutputConnectionNode
}