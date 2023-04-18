
import { Workbook } from "@fortune-sheet/react";
import "@fortune-sheet/react/dist/index.css"
import { useState } from "react";

// 编辑页面
const EditSheetNode = () => {
    const [data, setData] = useState();

    return (
        <div
            className="EditSheetNode"
        >
            <Workbook
                data={data}
                onChange={(newData) => {
                    setData(newData);
                }}
            />
        </div>
    )
}



export default EditSheetNode;
