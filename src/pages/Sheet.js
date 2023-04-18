import { useParams } from "react-router-dom";
import { Workbook } from "@fortune-sheet/react";
import "@fortune-sheet/react/dist/index.css"
import { useState } from "react";
import { GetNodeDetailAsync } from "../Components/Nodes/BasicNode";

// 编辑页面
const EditSheetNode = () => {
    const { id } = useParams();
    const [data, setData] = useState({});
    const [nodeData, setNodeData] = useState({
        sheet: [{ name: "Sheet1" }]
    });

    const getTableDetail = (NodeId) => {
        GetNodeDetailAsync(NodeId)
            .then((res) => {
                if (res.Data.node_data) {

                } else {

                }
            })
    }

    return (
        <div
            className="EditSheetNode"
        >
            <Workbook
                data={nodeData.sheet}
                onChange={(newData) => {

                }}
            />
        </div>
    )
}



export default EditSheetNode;
