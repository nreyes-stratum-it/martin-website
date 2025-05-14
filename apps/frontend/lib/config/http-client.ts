import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";

export class HttpClient {
    private client: AxiosInstance;

    constructor(baseURL: string) {
        this.client = axios.create({
            baseURL,
            headers: {
                "Content-Type": "application/json",
            },
        });

    }

    get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.client.get<T>(url, config);
    }

    post<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.client.post<T>(url, data, config);
    }

}
