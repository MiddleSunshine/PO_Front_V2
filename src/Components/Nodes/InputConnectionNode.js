import {Handle} from "reactflow";
import {LoginOutlined} from "@ant-design/icons"
const InputConnectionNode=(nodeProps)=>{
    return <div>
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