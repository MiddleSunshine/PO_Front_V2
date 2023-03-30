import {requestAPI} from "../../config/function";


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

export {
    CreateNewWhiteBoardAsync
}