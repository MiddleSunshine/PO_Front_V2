import { Button, Input } from "antd";
import { useState } from "react";
import {
    FileExcelOutlined,
    ExportOutlined,
    SaveOutlined
} from '@ant-design/icons';
// 节点
const SheetNode = (nodeProps) => {
    const [data, setData] = useState(nodeProps.data.data);

    const finishInput = (name) => {

    }

    return (
        <div className="SheetNode">
            <Input
                addonBefore={<FileExcelOutlined />}
                value={data?.Name}
                onChange={(e) => {
                    finishInput(e.target.value);
                }}
                addonAfter={
                    data?.ID
                        ? <Button
                            size="small"
                            type="link"
                            icon={<ExportOutlined />}
                            href="/sheet/"
                        ></Button>
                        : <Button
                            size="small"
                            type="link"
                            icon={<SaveOutlined />}
                        ></Button>
                }
            />
        </div>
    )
}



export {
    SheetNode
}
