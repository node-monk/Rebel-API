import fastify, {
  FastifyInstance,
  FastifyRequest,
  FastifyReply,
} from "fastify";
import axios from "axios";

import { SwapiService } from "../../../../services/swapi/Swapi";
import { FilmController, FilmRequestGeneric } from "./FilmController";
import { IFilm } from "../../../../services/swapi/models/films/IFilm";
import { HTTPClient } from "../../../../common/httpClient/HttpClient";
import { FilmModel } from "../../../../services/swapi/models/films/FilmModel";
import { ISpecies } from "../../../../services/swapi/models/species/ISpecies";
import { SpeciesModel } from "../../../../services/swapi/models/species/SpeciesModel";

jest.mock("axios");

describe("FilmController", () => {
  let app: FastifyInstance;
  let swapiService: SwapiService;
  let mockedSwapiService: SwapiService;
  let mockFilmListing = [
    {
      title: "First Film",
    },
    {
      title: "Second Film",
    },
  ];

  beforeAll(() => {
    app = {
      get: jest.fn(),
    } as unknown as FastifyInstance;
    const httpclient = new HTTPClient("text/api", axios);
    mockedSwapiService = {
      films: {
        all: jest.fn(),
        byName: jest.fn(),
      } as unknown as FilmModel,
      species: {
        batch: jest.fn(),
      } as unknown as SpeciesModel,
    } as unknown as SwapiService;
    swapiService = new SwapiService(httpclient);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("constuctor", () => {
    it("should set basepath, app, and swapiService", () => {
      jest
        .spyOn(FilmController.prototype, "routes")
        .mockImplementation(() => {});
      const filmController = new FilmController("/films", app, swapiService);
      expect(filmController.basePath).toBe("/films");
      expect(filmController.app).toBeInstanceOf(Object);
      expect(filmController.swapi).toBeInstanceOf(SwapiService);
    });

    it("should call the routes() method", () => {
      jest
        .spyOn(FilmController.prototype, "routes")
        .mockImplementation(jest.fn());
      const filmController = new FilmController("/films", app, swapiService);
      expect(filmController.routes).toHaveBeenCalled();
    });
  });

  describe("routes", () => {
    it("should set the correct routes", () => {
      new FilmController("/films", app, swapiService);
      expect(app.get).toHaveBeenNthCalledWith(
        1,
        "/films",
        expect.any(Function)
      );

      expect(app.get).toHaveBeenNthCalledWith(
        2,
        "/films/:episode/species",
        expect.any(Function)
      );
    });
  });

  describe("all", () => {
    it("should return films", async () => {
      jest.spyOn(mockedSwapiService.films, "all").mockResolvedValue({
        count: 10,
        prev: null,
        next: null,
        results: mockFilmListing as Array<IFilm>,
      });
      const filmController = new FilmController(
        "/films",
        app,
        mockedSwapiService
      );
      const mockFastifyReply = { send: jest.fn() } as unknown as FastifyReply;
      await filmController.all({} as FastifyRequest, mockFastifyReply);
      expect(mockedSwapiService.films.all).toHaveBeenCalled();
      expect(mockFastifyReply.send).toHaveBeenCalledWith(mockFilmListing);
    });
  });

  describe("species", () => {
    it("should return an array of species classifications for the specified episode", async () => {
      const mockSpecies = [
        { name: "Human", classification: "mammal" },
        { name: "Wookiee", classification: "mammal" },
      ] as Array<ISpecies>;

      const mockFilm = {
        species: [
          "https://swapi.dev/api/species/1/",
          "https://swapi.dev/api/species/2/",
        ],
      } as IFilm;

      jest.spyOn(mockedSwapiService.films, "byName").mockResolvedValue({
        count: 2,
        next: null,
        prev: null,
        results: [mockFilm],
      });
      jest
        .spyOn(mockedSwapiService.species, "batch")
        .mockResolvedValue(mockSpecies);

      const filmController = new FilmController(
        "/films",
        app,
        mockedSwapiService
      );

      const mockFastifyReply = { send: jest.fn() } as unknown as FastifyReply;
      await filmController.species(
        { params: { episode: "4" } } as FastifyRequest<FilmRequestGeneric>,
        mockFastifyReply
      );

      expect(mockedSwapiService.films.byName).toHaveBeenCalledWith(
        "A New Hope"
      );
      expect(mockedSwapiService.species.batch).toHaveBeenCalledWith(
        mockFilm.species
      );
      expect(mockFastifyReply.send).toHaveBeenCalledWith(
        mockSpecies.map((s) => ({
          name: s.name,
          classification: s.classification,
        }))
      );
    });
  });
});
