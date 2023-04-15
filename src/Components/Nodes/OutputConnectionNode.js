import {Handle} from "reactflow";
import {LogoutOutlined} from "@ant-design/icons"
import {GetNodeStyle} from "./BasicNode";

const OutputConnectionNode=(nodeProps)=>{
    return <div
        style={GetNodeStyle(nodeProps,nodeProps.selected)}
        className={"OutputConnectionNode ConnectionNode"}
    >
        <Handle
            type={"source"}
            id={`${nodeProps.id}`}
            position={"right"}
        />
        <div className={"Content"}></div>
    </div>
}

export {
    OutputConnectionNode
}