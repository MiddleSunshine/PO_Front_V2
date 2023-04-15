import {Handle} from "reactflow";
import {GetNodeStyle} from "./BasicNode";

const InputConnectionNode=(nodeProps)=>{
    return <div
        style={GetNodeStyle(nodeProps,nodeProps.selected)}
        className={"InputConnectionNode ConnectionNode"}
    >
        <Handle
            type={"target"}
            id={`${nodeProps.id}`}
            position={"left"}
        />
        <div className={"Content"}>
        </div>
    </div>
}

export {
    InputConnectionNode
}