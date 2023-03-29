import { AxiosInstance } from "axios";
import { HTTPClient, IHTTPClientResults } from "./HttpClient";

// mock data
const mockResponse = { data: { foo: "bar" }, status: 200 };
const mockAxiosInstance = {
  get: jest.fn(() => Promise.resolve(mockResponse)),
};

describe("HTTPClient", () => {
  let httpClient: HTTPClient;

  beforeEach(() => {
    httpClient = new HTTPClient(
      "http://localhost:3333",
      mockAxiosInstance as unknown as AxiosInstance
    );
  });

  it("should call axios.get with the correct URL when calling get()", async () => {
    await httpClient.get("/stars");
    expect(mockAxiosInstance.get).toHaveBeenCalledWith(
      "http://localhost:3333/stars"
    );
  });

  it("should return the correct response when calling get()", async () => {
    const response: IHTTPClientResults<{ foo: string }> = await httpClient.get(
      "/stars"
    );
    expect(response.statusCode).toBeDefined();
    expect(response.records).toBeDefined();
    expect(response.records).toEqual({ foo: "bar" });
  });

  it("should call axios.get with the correct URL when calling getURL()", async () => {
    const uniqueUrl = "some/very/unique/url";
    await httpClient.getURL(uniqueUrl);
    expect(mockAxiosInstance.get).toHaveBeenCalledWith(uniqueUrl);
  });

  it("should return the correct response when calling getURL()", async () => {
    const response: IHTTPClientResults<{ foo: string }> =
      await httpClient.getURL("some/very/unique/url");
    expect(response.statusCode).toBeDefined();
    expect(response.records).toBeDefined();
    expect(response.records).toEqual({ foo: "bar" });
  });
});
