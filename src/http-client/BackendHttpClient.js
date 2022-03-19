import axios from "axios";
import Constants from '../constants/Constants'

class BackendHttpClient{
    axiosInstance
    backendUrl = Constants.BACKEND_URL;

    constructor(){
        this.axiosInstance = axios;
    }

    async post(url, data, config){
        const modifiedUrl = this.backendUrl + url;
        return (await this.axiosInstance.post(modifiedUrl,data,config)).data;
    }

    async get(url, config){
        const modifiedUrl = this.backendUrl + url;
        return (await this.axiosInstance.get(modifiedUrl, config)).data;
    }
}

const backendHttpClient = new BackendHttpClient();
export default backendHttpClient