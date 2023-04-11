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

/**
 let titleIndexMap=[
 "column_3",
 "column_2",
 "column_1"
 ];

 let titles=[];

 let columns=[];

 let length=3;
 let height=10;
 for (let i=1;i<=length;i++){
    titles[i]={
        title:i,
        dataIndex:titleIndexMap[i-1]
    };
}

 for (let row=0;row<height;row++){
    columns[row]={};
    for (let i=1;i<=length;i++){
        columns[row][titleIndexMap[i-1]]=1;
    }
}
 */