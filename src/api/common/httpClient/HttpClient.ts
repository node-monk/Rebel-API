import { Axios } from "axios";

export interface IHTTPClientResults<T> {
  statusCode: number;
  records: T;
}

export class HTTPClient {
  axios: Axios;
  baseURI: string;
  constructor(baseURI: string, axiosClient: Axios) {
    this.baseURI = baseURI;
    this.axios = axiosClient;
  }
  async get<T>(urlPath: string): Promise<IHTTPClientResults<T>> {
    const response = await this.axios.get(`${this.baseURI}${urlPath}`);
    return {
      statusCode: response.status,
      records: response.data,
    };
  }

  async getURL<T>(urlPath: string): Promise<IHTTPClientResults<T>> {
    const response = await this.axios.get(urlPath);
    return {
      statusCode: response.status,
      records: response.data,
    };
  }
}
