import {requestAPI} from "../../config/function";
import {message} from "antd";


const CreateNewWhiteBoardAsync=(Title,Type='')=>{
    if (!Title){
        return "";
    }
    return requestAPI("index.php?action=WhiteBordController&method=CreateWhiteBord",{
        method:"post",
        body:JSON.stringify({
            Title:Title,
            Type:Type
        })
    });
}

const SearchWhiteBoardAsync=(Keyword,Type='Data')=>{
    if (!Keyword){
        return new Promise(resolve => {},reject=>{});
    }
    return  requestAPI("index.php?action=WhiteBordController&method=SearchWhiteBoard",{
        body:JSON.stringify({
            Keywords:Keyword,
            Type:Type
        }),
        method:"post"
    });
}

export {
    CreateNewWhiteBoardAsync,
    SearchWhiteBoardAsync
}