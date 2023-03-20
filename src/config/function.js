import {message} from "antd";

const LOGIN_TOKEN_KEY='auth_token';

const requestAPI=(api,init={},checkToken=true)=>{
    let sign=sessionStorage.getItem(LOGIN_TOKEN_KEY);
    if (!sign && checkToken){
        window.location="/login";
        return false;
    }
    api+="&sign="+sign;
    return  fetch("http://127.0.0.1:8080"+api,init).then((res)=>{
        return res.json().then((json)=>{
            if (json.NeedLogin==1){
                window.location='/login';
                return false;
            }
        })
    })
}

const Login=(userName,password)=>{
    return  fetch("http://127.0.0.1:8080/index.php?action=LoginController&method=Login",{
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
                        return true;
                    }
                    sessionStorage.setItem(LOGIN_TOKEN_KEY,token);
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