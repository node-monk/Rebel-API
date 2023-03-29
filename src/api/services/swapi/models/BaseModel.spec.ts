import { BaseModel } from "./BaseModel";
import { HTTPClient } from "../../../common/httpClient/HttpClient";
import axios from "axios";
import { ISwapiResultsResponse } from "./ISwapiResultsResponse";

jest.mock("axios");

interface TestResponse {
  records: Array<string>;
}

describe("BaseModel", () => {
  let basePath: string;
  let httpClient: HTTPClient;
  let baseModel: BaseModel<TestResponse>;

  beforeEach(() => {
    basePath = "test/api";
    httpClient = new HTTPClient("test/api", axios);
    baseModel = new BaseModel<TestResponse>(basePath, httpClient);
  });

  test("all() should send request to basepath", async () => {
    jest.spyOn(httpClient, "get").mockResolvedValue({ records: [] } as any);

    const response = await baseModel.all();

    expect(httpClient.get).toHaveBeenCalledWith(basePath);
    expect(response).toEqual([]);
  });

  test("batch() should return data for URLs", async () => {
    const urls = ["fake/url/01", "fake/url/02"];
    const item = {
      name: "item 01",
    };

    jest
      .spyOn(httpClient, "getURL")
      .mockResolvedValue({ records: item } as any);

    const result = await baseModel.batch(urls);
    expect(httpClient.getURL).toHaveBeenCalledTimes(urls.length);
    expect(result).toEqual([item, item]);
  });
});
