import axios from "axios";

class HttpClient{
    axiosInstance

    constructor(){
        this.axiosInstance = axios;
    }

    async post(url, data, config){
        return (await this.axiosInstance.post(url,data,config)).data;
    }

    async get(url, config){
        return (await this.axiosInstance.get(url, config)).data;
    }
}

const httpClient = new HttpClient();
export default httpClient