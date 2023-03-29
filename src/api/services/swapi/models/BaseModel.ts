import { ISwapiResultsResponse } from "./ISwapiResultsResponse";
import { HTTPClient } from "../../../common/httpClient/HttpClient";
import { Readable } from "stream";
import { SwapiReadable } from "../SwapiReadable";
import { read } from "fs";

export class BaseModel<T> {
  basePath: string;
  httpClient: HTTPClient;
  constructor(basePath: string, httpClient: HTTPClient) {
    this.basePath = basePath;
    this.httpClient = httpClient;
  }

  async all(): Promise<ISwapiResultsResponse<T>> {
    const response = await this.httpClient.get<ISwapiResultsResponse<T>>(
      this.basePath
    );
    return response.records;
  }

  async batch(urls: Array<string>): Promise<Array<T>> {
    const batchPromises = urls.map((url) => this.httpClient.getURL<T>(url));
    const batchResponses = await Promise.all(batchPromises);
    const batchData = batchResponses.reduce((batchRecords, response) => {
      batchRecords.push(response.records);
      return batchRecords;
    }, [] as Array<T>);
    return batchData;
  }

  readableStream<T>(): SwapiReadable<T> {
    const reader = new SwapiReadable(
      { objectMode: true },
      `${this.httpClient.baseURI}/${this.basePath}`,
      this.httpClient
    );
    return reader;
  }
}
