import axios, {type AxiosInstance, type AxiosResponse} from "axios";

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
            result = await this.axiosInstance.get(url);

            return this.handleResponse(result);
        }catch (e: any) {
            throw new Error("Failed to load '" + url + "'. " + e.message);
        }

    }

    private handleResponse(response: AxiosResponse): any {

        if (typeof response.data === 'string'){
            try {
                return JSON.parse(response.data);
            } catch (e: any) {
                throw new Error("Failed to parse JSON data " + e.message)
            }
        }

        if (typeof response.data === 'object') {
            return response.data;
        }

        throw new Error("Unknown data type for fetched result");
    }
}
