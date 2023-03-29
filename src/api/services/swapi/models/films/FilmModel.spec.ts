import { HTTPClient } from "../../../../common/httpClient/HttpClient";
import { FilmModel } from "./FilmModel";
import { IFilm } from "./IFilm";
import { ISwapiResultsResponse } from "../ISwapiResultsResponse";

describe("FilmModel", () => {
  let httpClient: HTTPClient;
  let filmModel: FilmModel;

  beforeEach(() => {
    httpClient = { get: jest.fn(), getURL: jest.fn() } as unknown as HTTPClient;
    filmModel = new FilmModel(httpClient);
  });

  describe("constructor", () => {
    it("should set the basePath and httpClient properties", () => {
      expect(filmModel.basePath).toEqual("/films");
      expect(filmModel.httpClient).toBe(httpClient);
    });
  });

  describe("byName", () => {
    const filmResults: ISwapiResultsResponse<IFilm> = {
      count: 1,
      next: null,
      prev: null,
      results: [],
    };

    beforeEach(() => {
      jest.spyOn(httpClient, "get").mockResolvedValueOnce(filmResults as any);
    });

    it("should call httpClient.get with the correct search path and return the records", async () => {
      const result = await filmModel.byName("Search Term");
      expect(httpClient.get).toHaveBeenCalledWith(`/films/?search=Search Term`);
    });
  });
});
