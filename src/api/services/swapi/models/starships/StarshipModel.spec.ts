import { HTTPClient } from "../../../../common/httpClient/HttpClient";
import { StarshipModel } from "./StarshipModel";

describe("Starship Modal", () => {
  let httpClient: HTTPClient;
  let starshipModal: StarshipModel;

  beforeEach(() => {
    httpClient = { get: jest.fn(), getURL: jest.fn() } as unknown as HTTPClient;
    starshipModal = new StarshipModel(httpClient);
  });

  describe("constructor", () => {
    it("should set the basePath and httpClient properties", () => {
      expect(starshipModal.basePath).toEqual("/starships");
      expect(starshipModal.httpClient).toBe(httpClient);
    });
  });
});
