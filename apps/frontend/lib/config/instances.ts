import {HttpClient} from "./http-client";

export const httpClient = new HttpClient(process.env.NEXT_PUBLIC_API_URL || "http://localhost:1338/api");
