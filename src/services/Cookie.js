import Cookies from "universal-cookie";

const cookies = new Cookies();

const accessIdKey = "accessId";
const addressKey = "address";

export function getAccessToken(){
    return cookies.get(accessIdKey);
}

export function setAccessToken(accessId){
    const now = new Date();
    now.setHours(now.getHours+3);
    return cookies.set(accessIdKey, accessId, {expires: now});
}

export function getAddress(){
    return cookies.get(addressKey);
}

export function setAddress(address){
    const now = new Date();
    now.setHours(now.getHours+3);
    return cookies.set(addressKey, address, {expires: now});
}

export function removeAllCookies(){
    cookies.remove(accessIdKey);
    cookies.remove(addressKey);
}
