import {Input, message} from "antd";
import {useState} from "react";
import {requestAPI} from "../../config/function";

const HistoryNode=()=>{
    const [keyword,setkeyword]=useState('');

    const searchNode=(searchKeyword)=>{
        if (!searchKeyword){
            message.warning("Please input the keyword");
            return false;
        }
        requestAPI('index.php?action=NodeController&method=SearchNode',{
            method:"post",
            body:JSON.stringify({
                keyword:searchKeyword
            })
        })
            .then((res)=>{
                res.json().then((json)=>{
                    // todo 这里开始接着写
                    debugger
                })
            })
    }

    return <div>
        <Input
            value={keyword}
            onChange={(e)=>{
                setkeyword(e.target.value);
            }}
            onPressEnter={()=>{
                searchNode(keyword)
            }}
        />
    </div>
}

export {
    HistoryNode
}