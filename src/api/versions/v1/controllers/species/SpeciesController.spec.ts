import fastify, {
  FastifyInstance,
  FastifyRequest,
  FastifyReply,
} from "fastify";
import axios from "axios";

import { SwapiService } from "../../../../services/swapi/Swapi";
import { SpeciesController } from "./SpeciesController";
import { HTTPClient } from "../../../../common/httpClient/HttpClient";
import { SpeciesModel } from "../../../../services/swapi/models/species/SpeciesModel";
import { ISpecies } from "../../../../services/swapi/models/species/ISpecies";

jest.mock("axios");

describe("SpeciesController", () => {
  let app: FastifyInstance;
  let swapiService: SwapiService;
  let mockedSwapiService: SwapiService;
  let mockSpeciesListing = [
    {
      name: "Human",
    },
    {
      name: "Wokiee",
    },
  ];

  beforeAll(() => {
    app = {
      get: jest.fn(),
    } as unknown as FastifyInstance;
    const httpclient = new HTTPClient("text/api", axios);
    mockedSwapiService = {
      species: {
        all: jest.fn(),
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
        .spyOn(SpeciesController.prototype, "routes")
        .mockImplementation(() => {});
      const speciesController = new SpeciesController(
        "/species",
        app,
        swapiService
      );
      expect(speciesController.basePath).toBe("/species");
      expect(speciesController.app).toBeInstanceOf(Object);
      expect(speciesController.swapi).toBeInstanceOf(SwapiService);
    });

    it("should call the routes() method", () => {
      jest
        .spyOn(SpeciesController.prototype, "routes")
        .mockImplementation(jest.fn());
      const speciesController = new SpeciesController(
        "/species",
        app,
        swapiService
      );
      expect(speciesController.routes).toHaveBeenCalled();
    });
  });

  describe("routes", () => {
    it("should set the correct routes", () => {
      new SpeciesController("/species", app, swapiService);
      expect(app.get).toHaveBeenNthCalledWith(
        1,
        "/species",
        expect.any(Function)
      );
    });
  });

  describe("all", () => {
    it("should return planets", async () => {
      jest.spyOn(mockedSwapiService.species, "all").mockResolvedValue({
        count: 10,
        prev: null,
        next: null,
        results: mockSpeciesListing as Array<ISpecies>,
      });
      const speciesController = new SpeciesController(
        "/species",
        app,
        mockedSwapiService
      );
      const mockFastifyReply = { send: jest.fn() } as unknown as FastifyReply;
      await speciesController.all({} as FastifyRequest, mockFastifyReply);
      expect(mockedSwapiService.species.all).toHaveBeenCalled();
      expect(mockFastifyReply.send).toHaveBeenCalledWith(mockSpeciesListing);
    });
  });
});
