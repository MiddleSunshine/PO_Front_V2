import {Handle} from "reactflow";
import {LoginOutlined} from "@ant-design/icons"
import {GetNodeStyle} from "./BasicNode";
const InputConnectionNode=(nodeProps)=>{
    return <div
        style={GetNodeStyle(nodeProps)}
    >
        <Handle
            type={"target"}
            id={`${nodeProps.id}`}
            position={"left"}
        />
        <LoginOutlined />
    </div>
}

export {
    InputConnectionNode
}