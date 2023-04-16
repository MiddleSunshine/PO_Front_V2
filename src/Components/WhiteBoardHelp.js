import {List} from "antd";

const WhiteBoardHelp=()=>{
    return (
        <div>
            <List
                header={"快捷键"}
            >
                <List.Item>
                    shift+s 保存页面
                </List.Item>
                <List.Item>
                    shift+d 保存草稿
                </List.Item>
                <List.Item>
                    shift+e 编辑当前选中节点
                </List.Item>
                <List.Item>
                    shift+g 全局搜索
                </List.Item>
                <List.Item>
                    Backspace 删除选中节点或者连接线
                </List.Item>
            </List>
        </div>
    )
}

export default WhiteBoardHelp