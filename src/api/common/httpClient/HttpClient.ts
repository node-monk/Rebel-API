/**
 * Simple HTTP Client intended as a wrapper around
 */
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
  /**
   * Combines basePath and urlPath to for URL
   * @param urlPath String path (without host)
   * @returns
   */
  async get<T>(urlPath: string): Promise<IHTTPClientResults<T>> {
    const response = await this.axios.get(`${this.baseURI}${urlPath}`);
    return {
      statusCode: response.status,
      records: response.data,
    };
  }

  /**
   * Sends a request to the RAW provided URL.
   * @param urlPath String path (with host)
   * @returns
   */
  async getURL<T>(urlPath: string): Promise<IHTTPClientResults<T>> {
    const response = await this.axios.get(urlPath);
    return {
      statusCode: response.status,
      records: response.data,
    };
  }
}
