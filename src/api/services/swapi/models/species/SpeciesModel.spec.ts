import { HTTPClient } from "../../../../common/httpClient/HttpClient";
import { SpeciesModel } from "./SpeciesModel";

describe("Species Modal", () => {
  let httpClient: HTTPClient;
  let speciesModal: SpeciesModel;

  beforeEach(() => {
    httpClient = { get: jest.fn(), getURL: jest.fn() } as unknown as HTTPClient;
    speciesModal = new SpeciesModel(httpClient);
  });

  describe("constructor", () => {
    it("should set the basePath and httpClient properties", () => {
      expect(speciesModal.basePath).toEqual("/species");
      expect(speciesModal.httpClient).toBe(httpClient);
    });
  });
});
