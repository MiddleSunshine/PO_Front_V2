import {GetNodeStyle} from "./BasicNode";

const TableNode=(nodeProps)=>{
    return (
        <div
            className={"TableNode"}
            style={GetNodeStyle(nodeProps)}
        >

        </div>
    )
}

export {
    TableNode
}