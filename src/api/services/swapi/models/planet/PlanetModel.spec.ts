import { HTTPClient } from "../../../../common/httpClient/HttpClient";
import { PlanetModel } from "./PlanetModel";

describe("Plamet Modal", () => {
  let httpClient: HTTPClient;
  let planetModal: PlanetModel;

  beforeEach(() => {
    httpClient = { get: jest.fn(), getURL: jest.fn() } as unknown as HTTPClient;
    planetModal = new PlanetModel(httpClient);
  });

  describe("constructor", () => {
    it("should set the basePath and httpClient properties", () => {
      expect(planetModal.basePath).toEqual("/planets");
      expect(planetModal.httpClient).toBe(httpClient);
    });
  });
});
