import { useParams } from "react-router-dom";
import { Workbook } from "@fortune-sheet/react";
import "@fortune-sheet/react/dist/index.css"
import { useEffect, useState, useRef } from "react";
import { GetNodeDetailAsync, UpdateNodeAsync } from "../Components/Nodes/BasicNode";
import { Row, Col, Button, message } from "antd";
// 编辑页面
const EditSheetNode = () => {
    const { id } = useParams();
    const [data, setData] = useState({});
    const [sheet, setSheet] = useState([]);
    const [nodeData, setNodeData] = useState({});
    const sheetRef = useRef(null);
    const GetNodeData = () => {
        GetNodeDetailAsync(id)
            .then((res) => {
                let newNodeData = JSON.parse(res.Data.node_data);
                setData(res.Data.data);
                setNodeData(newNodeData);
                console.table(newNodeData.sheet);
                return res.Data.data;
            })
            .then((returnData) => {
                document.title = returnData.Name;
            })
    }


    const SaveChange = () => {
        let newNodeData = { ...nodeData };
        let newSheet = [];
        sheet.map((s) => {
            newSheet.push({
                ...s,
                celldata: sheetRef.current?.dataToCelldata(s.data)
            })
            return s;
        });
        newNodeData.sheet = newSheet;
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
                {
                    nodeData?.sheet
                        ? <Workbook
                            ref={sheetRef}
                            // 这里我把 onchange 的结果重新输入到这里，为什么之前的数据不会重新渲染啊
                            data={nodeData.sheet}

                            onChange={(newSheet) => {
                                setSheet(newSheet);
                            }}
                        />
                        : ""
                }

            </div>
        </div>
    )
}



export default EditSheetNode;
