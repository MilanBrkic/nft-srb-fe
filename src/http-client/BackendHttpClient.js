import axios from 'axios';
import Constants from '../constants/Constants';
import { getAccessToken, removeAllCookies } from '../services/Cookie';

class BackendHttpClient {
  axiosInstance;
  backendUrl = Constants.BACKEND_URL;

  constructor() {
    this.axiosInstance = axios;
  }

  getHeaders() {
    const token = getAccessToken();
    return { Authorization: `Bearer ${token}` };
  }

  async post(url, data, config) {
    const modifiedUrl = this.backendUrl + url;
    const headers = this.getHeaders();
    try {
      return (await this.axiosInstance.post(modifiedUrl, data, { ...config, headers })).data;
    } catch (error) {
      this.checkForUnauthorizedError(error);
      throw error;
    }
  }

  async get(url, config) {
    const modifiedUrl = this.backendUrl + url;
    const headers = this.getHeaders();
    try {
      return (await this.axiosInstance.get(modifiedUrl, { ...config, headers })).data;
    } catch (error) {
      this.checkForUnauthorizedError(error);
      throw error;
    }
  }

  checkForUnauthorizedError(error) {
    if (error.response && error.response.status === 401) {
      alert('Connection expired, disconnecting');
      removeAllCookies();
      window.location.reload();
    }
  }
}

const backendHttpClient = new BackendHttpClient();
export default backendHttpClient;
