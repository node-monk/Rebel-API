import { HTTPClient } from "../../../../common/httpClient/HttpClient";
import { PeopleModel } from "./PeopleModel";
import { IPeople } from "./IPeople";
import { ISwapiResultsResponse } from "../ISwapiResultsResponse";

describe("People Modal", () => {
  let httpClient: HTTPClient;
  let peopleModal: PeopleModel;

  beforeEach(() => {
    httpClient = { get: jest.fn(), getURL: jest.fn() } as unknown as HTTPClient;
    peopleModal = new PeopleModel(httpClient);
  });

  describe("constructor", () => {
    it("should set the basePath and httpClient properties", () => {
      expect(peopleModal.basePath).toEqual("/people");
      expect(peopleModal.httpClient).toBe(httpClient);
    });
  });

  describe("byName", () => {
    const filmResults: ISwapiResultsResponse<IPeople> = {
      count: 1,
      next: null,
      prev: null,
      results: [],
    };

    beforeEach(() => {
      jest.spyOn(httpClient, "get").mockResolvedValueOnce(filmResults as any);
    });

    it("should call httpClient.get with the correct search path and return the records", async () => {
      const result = await peopleModal.byName("Search Term");
      expect(httpClient.get).toHaveBeenCalledWith(
        `/people/?search=Search Term`
      );
    });
  });
});
