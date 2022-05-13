import { Redirect } from "react-router-dom";
import { getAccessToken } from "../services/Cookie";

export function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

export async function checkAspectRatio(file) {
  return new Promise((resolve, reject) => {
    const _URL = window.URL;
    const img = new Image();
    var objectUrl = _URL.createObjectURL(file);
    img.onload = function () {
      if (this.width !== this.height) {
        reject(new Error('Image must be 1x1 aspect ration'));
      }

      _URL.revokeObjectURL(objectUrl);
      resolve();
    };
    img.src = objectUrl;
  });
}

export function checkIfFileIsAnImage(image) {
  if (image.type !== 'image/png' && image.type !== 'image/jpg' && image.type !== 'image/jpeg') {
    throw Error('File is not an image type');
  }
}

export function trimAddress(address) {
  return address.slice(0, 5) + '...' + address.slice(address.length - 3, address.length);
}

export function redirectToHomePageIfNeeded(toReturn){
  if(getAccessToken()) return toReturn;
  else return <Redirect to='/'/>
}
