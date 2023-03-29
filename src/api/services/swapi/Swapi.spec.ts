import { SwapiService } from "./Swapi";
import { Models } from "./models/models";
import { HTTPClient } from "../../common/httpClient/HttpClient";
import axios from "axios";

jest.mock("axios");

describe("SwapiService", () => {
  let swapiService: SwapiService;

  beforeEach(() => {
    const httpclient = new HTTPClient("text/api", axios);
    swapiService = new SwapiService(httpclient);
  });

  test("people() should return PeopleModel instance", () => {
    const result = swapiService.people;
    expect(result).toBeInstanceOf(Models.PeopleModel);
  });

  test("planets() should return PlanetModel instance", () => {
    const result = swapiService.planets;
    expect(result).toBeInstanceOf(Models.PlanetModel);
  });

  test("species() should return SpeciesModel instance", () => {
    const result = swapiService.species;
    expect(result).toBeInstanceOf(Models.SpeciesModel);
  });

  test("starships() should return StarshipModel instance", () => {
    const result = swapiService.starships;
    expect(result).toBeInstanceOf(Models.StarshipModel);
  });

  test("films() should return FilmModel instance", () => {
    const result = swapiService.films;
    expect(result).toBeInstanceOf(Models.FilmModel);
  });
});
