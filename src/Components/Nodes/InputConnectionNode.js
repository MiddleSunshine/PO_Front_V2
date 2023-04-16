import {Handle} from "reactflow";
import {GetNodeStyle} from "./BasicNode";
const InputConnectionNode=(nodeProps)=>{

    return <div
        style={GetNodeStyle(nodeProps)}
        className={"InputConnectionNode ConnectionNode"}
    >
        <Handle
            className={"TargetConnection"}
            type={"target"}
            id={`${nodeProps.id}_left`}
            position={'left'}
        />
        <Handle
            className={"TargetConnection"}
            type={"target"}
            id={`${nodeProps.id}_right`}
            position={'right'}
        />
        <Handle
            className={"TargetConnection"}
            type={"target"}
            id={`${nodeProps.id}_top`}
            position={'top'}
        />
        <Handle
            className={"TargetConnection"}
            type={"target"}
            id={`${nodeProps.id}_bottom`}
            position={'bottom'}
        />
        <div className={"Content"}>
        </div>
    </div>
}

export {
    InputConnectionNode
}