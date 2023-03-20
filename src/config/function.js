
const requestAPI=(api,init={})=>{
    return  fetch("http://127.0.0.1:8090"+api,init).then((res)=>{
        return res.json().then((json)=>{
            if (json.NeedLogin==1){
                window.location='/';
            }
        })
    })
}

export {
    requestAPI
}