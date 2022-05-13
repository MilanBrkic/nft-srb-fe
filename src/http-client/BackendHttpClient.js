import axios from 'axios';
import Constants from '../constants/Constants';
import { getAccessToken } from '../services/Cookie';

class BackendHttpClient {
  axiosInstance;
  backendUrl = Constants.BACKEND_URL;

  constructor() {
    this.axiosInstance = axios;
  }

  getHeaders(){
    const token = getAccessToken();
    return { Authorization: `Bearer ${token}`}
  }

  async post(url, data, config) {
    const modifiedUrl = this.backendUrl + url;
    const headers = this.getHeaders();
    return (await this.axiosInstance.post(modifiedUrl, data, {...config, headers })).data;
  }

  async get(url, config) {
    const modifiedUrl = this.backendUrl + url;
    const headers = this.getHeaders();
    return (await this.axiosInstance.get(modifiedUrl, {...config, headers})).data;
  }
}

const backendHttpClient = new BackendHttpClient();
export default backendHttpClient;
