import Cookies from 'universal-cookie';

const cookies = new Cookies();

const accessIdKey = 'accessId';
const addressKey = 'address';

export function getAccessToken() {
  return cookies.get(accessIdKey);
}

export function setAccessToken(accessId) {
  const now = new Date();
  now.setHours(now.getHours + 3);
  return cookies.set(accessIdKey, accessId, { expires: now });
}

export function getAddress() {
  return cookies.get(addressKey);
}

export function setAddress(address) {
  const now = new Date();
  now.setHours(now.getHours + 3);
  return cookies.set(addressKey, address, { expires: now });
}

export function addEdited(tokenId, obj){
  const now = new Date();
  now.setMinutes(now.getMinutes + 5);
  cookies.set(tokenId, obj, now);
}

export function isEdited(tokenId){
  return cookies.get(tokenId);
}

export function addToBought(tokenId){
  const now = new Date();
  now.setMinutes(now.getMinutes + 5);
  const bought = cookies.get("bought");
  if(bought){
    bought.push(tokenId);
    cookies.set("bought", bought, {expires: now});
  }
  else{
    const arr = [tokenId];
    cookies.set("bought", arr, {expires: now});
  }
}

export function getBought(){
  return new Set(cookies.get("bought"));
}
export function removeAllCookies() {
  cookies.remove(accessIdKey);
  cookies.remove(addressKey);
}
