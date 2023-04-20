import { useParams } from "react-router-dom";
import { Workbook } from "@fortune-sheet/react";
import "@fortune-sheet/react/dist/index.css"
import { useEffect, useMemo, useState } from "react";
import { GetNodeDetailAsync, UpdateNodeAsync } from "../Components/Nodes/BasicNode";
import { Row, Col, Button, message } from "antd";
// 编辑页面
const EditSheetNode = () => {
    const { id } = useParams();
    const [data, setData] = useState({});
    const [sheet, setSheet] = useState([]);
    const [nodeData, setNodeData] = useState({
        sheet: [{ name: "Sheet2" }]
    });
    const GetNodeData = () => {
        GetNodeDetailAsync(id)
            .then((res) => {
                let newNodeData = JSON.parse(res.Data.node_data);
                setData(res.Data.data);
                setNodeData(newNodeData);
                return res.Data.data;
            })
            .then((returnData) => {
                document.title = returnData.Name;
            })
    }


    const SaveChange = () => {
        let newNodeData = { ...nodeData };
        newNodeData.sheet = sheet;
        UpdateNodeAsync(data, newNodeData)
            .then((res) => {
                if (res.Status == 1) {
                    message.success("保存成功")
                } else {
                    message.error(res.Message);
                }
            })
    }

    useEffect(() => {
        GetNodeData();
    }, [])


    return (
        <div
            className="EditSheetNode"
        >
            <Row
                style={{ height: "5vh" }}
                align={"middle"}
                justify={"center"}
            >
                <Col span={4}>
                    <Button
                        type={"primary"}
                        size={"large"}
                        onClick={() => {
                            SaveChange();
                        }}
                    >
                        {data?.Name} (保存修改)
                    </Button>
                </Col>
            </Row>
            <div style={{ width: "100vw", height: "95vh" }}>
                <Workbook
                    data={nodeData.sheet}
                    onChange={(newSheet) => {
                        setSheet(newSheet);
                    }}
                />
            </div>
        </div>
    )
}



export default EditSheetNode;
