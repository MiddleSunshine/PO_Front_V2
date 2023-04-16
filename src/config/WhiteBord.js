function getId(type){
    return `${type}_${Date.now()}`;
}

export {
    getId
}