import {Handle} from "reactflow";
import {LogoutOutlined} from "@ant-design/icons"
const OutputConnectionNode=(nodeProps)=>{
    return <div>
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