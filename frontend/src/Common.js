
export const API_URL = 'http://127.0.0.1:8000/api/'
export const DATA_LIMIT = 10

export function getUser(){
    const user = JSON.parse(localStorage.getItem("user"))
    return user
}

export function getToken(){
    if (getUser()){
        return getUser().token
    }
    
    return ''
}



export function getHeader(){
    let token = getToken()
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    return config
}




export function getMultyHeaders(){
    let token = getToken()
    const config = { headers: {
        'Content-Type': 'multipart/form-data',
        "Authorization" : `Bearer ${token}`,
    }}
    return config
}