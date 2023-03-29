import { Readable, ReadableOptions } from "stream";
import { HTTPClient } from "../../common/httpClient/HttpClient";
import { ISwapiResultsResponse } from "./models/ISwapiResultsResponse";

export class SwapiReadable<T> extends Readable {
  url: string;
  httpClient: HTTPClient;
  constructor(
    options: ReadableOptions,
    startUrl: string,
    httpClient: HTTPClient
  ) {
    super(options);
    this.httpClient = httpClient;
    this.url = startUrl;
  }

  async _read(): Promise<void> {
    // Make a GET request to the API using the HTTP client
    const response = await this.httpClient.getURL<ISwapiResultsResponse<T>>(
      this.url
    );
    // Get the records from the response
    const data = response.records;

    // If there is a next page of data, update the URL to read from it next
    if (data.next != null) {
      this.url = data.next;
    }

    // Push each result record onto the readable stream
    data.results.forEach((record) => {
      this.push(record);
    });

    // If there is no more data, push a null value to signify the end of the stream
    if (data.next == null) {
      this.push(null);
    }
  }
}
