import axios, {AxiosInstance, AxiosResponse} from "axios";

export default class HttpService {

    axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: window.location.origin,
            headers: {
                'Content-type': 'text/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
                'Expires': '0',
            }
        });
    }

    async get(url: string): Promise<any> {
        let result = null;
        try {
            result = await this.axiosInstance.get('/content/' + url);
        }catch (e: any) {
            throw new Error("Failed to load 'content/" + url + "'. " + e.message);
        }

        if (typeof result.data === 'string'){
            try {
                return JSON.parse(result.data);
            } catch (e: any) {
                throw new Error("Failed to parse JSON data for 'content/" + url + "'. " + e.message)
            }
        }

        if (typeof result.data === 'object') {
            return result.data;
        }

        throw new Error("Unknown data type for fetched result of 'content/" + url + "'");
    }

    getContent(language: string, filename: string): Promise<any> {
        return this.get(language + '/' + filename);
    }

}
