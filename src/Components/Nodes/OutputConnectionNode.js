import {Handle} from "reactflow";
import {GetNodeStyle} from "./BasicNode";

const OutputConnectionNode=(nodeProps)=>{
    return <div
        style={GetNodeStyle(nodeProps)}
        className={"OutputConnectionNode ConnectionNode"}
    >
        <Handle
            className={"SourceConnection"}
            type={"source"}
            id={`${nodeProps.id}_top`}
            position={"top"}
        />
        <Handle
            className={"SourceConnection"}
            type={"source"}
            id={`${nodeProps.id}_left`}
            position={"left"}
        />
        <Handle
            className={"SourceConnection"}
            type={"source"}
            id={`${nodeProps.id}_bottom`}
            position={"bottom"}
        />
        <Handle
            className={"SourceConnection"}
            type={"source"}
            id={`${nodeProps.id}_right`}
            position={"right"}
        />
        <div className={"Content"}></div>
    </div>
}

export {
    OutputConnectionNode
}