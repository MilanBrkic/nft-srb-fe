import { Redirect } from 'react-router-dom';
import { getAccessToken } from '../services/Cookie';

export function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

export async function checkAspectRatio(file) {
  return new Promise((resolve, reject) => {
    const _URL = window.URL;
    const img = new Image();
    var objectUrl = _URL.createObjectURL(file);
    img.onload = function () {
      if (Math.abs(this.width - this.height) > 5) {
         resolve(false);
      }

      _URL.revokeObjectURL(objectUrl);
      resolve(true);
    };
    img.src = objectUrl;
  });
}

export function checkIfFileIsAnImage(image) {
  if (image.type !== 'image/png' && image.type !== 'image/jpg' && image.type !== 'image/jpeg') {
    return false;
  }
  return true;
}

export function trimAddress(address) {
  return address.slice(0, 5) + '...' + address.slice(address.length - 5, address.length);
}

export function redirectToHomePageIfNeeded(toReturn) {
  if (getAccessToken()) return toReturn;
  else return <Redirect to="/" />;
}
