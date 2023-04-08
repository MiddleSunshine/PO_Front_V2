import {message} from "antd";

const LOGIN_TOKEN_KEY='auth_token';

const requestAPI=(api,init={},checkToken=true)=>{
    let sign=localStorage.getItem(LOGIN_TOKEN_KEY);
    if (!sign && checkToken){
        window.location="/login";
        return new Promise(resolve => {},reject=>{});
    }
    api+="&sign="+sign;
    let requestUrl="";
    if (process.env.NODE_ENV=='development'){
        // 开发环境
        requestUrl="http://127.0.0.1:8050/";
    }else{
        // 正式环境
    }
    return  fetch(requestUrl+api,{
        ...init,
        mode:"cors"
    }).then((res)=>{
        return res.json().then((json)=>{
            if (json.NeedLogin==1){
                window.location='/login';
                return false;
            }
            return json;
        })
    })
}

const Login=(userName,password)=>{
    let requestUrl="";
    if (process.env.NODE_ENV=='development'){
        // 开发环境
        requestUrl="http://127.0.0.1:8050/";
    }else{
        // 正式环境
    }
    return  fetch(requestUrl+"index.php?action=LoginController&method=Login",{
        mode:"cors",
        method:"post",
        body:JSON.stringify({
            UserName:userName,
            Password:password
        })
    })
        .then((res)=>{
            return res.json().then((json)=>{
                if (json.Status==1){
                    let token=json?.Data?.Token;
                    if (!token){
                        message.error("Login Error");
                        return false;
                    }
                    message.success("Login Success");
                    localStorage.setItem(LOGIN_TOKEN_KEY,token);
                    return true
                }else{
                    message.warning(json.Message);
                    return false;
                }
            })
        })
}

export {
    requestAPI,
    Login
}