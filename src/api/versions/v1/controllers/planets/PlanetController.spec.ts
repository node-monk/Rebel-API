import fastify, {
  FastifyInstance,
  FastifyRequest,
  FastifyReply,
} from "fastify";
import axios from "axios";

import { SwapiService } from "../../../../services/swapi/Swapi";
import { PlanetController } from "./PlanetController";
import { IPlanet } from "../../../../services/swapi/models/planet/IPlanet";
import { HTTPClient } from "../../../../common/httpClient/HttpClient";
import { PlanetModel } from "../../../../services/swapi/models/planet/PlanetModel";
jest.mock("axios");

describe("PlanetController", () => {
  let app: FastifyInstance;
  let swapiService: SwapiService;
  let mockedSwapiService: SwapiService;
  let mockPlanetListing = [
    {
      name: "Earth",
    },
    {
      name: "Jupiter",
    },
  ];

  beforeAll(() => {
    app = {
      get: jest.fn(),
    } as unknown as FastifyInstance;
    const httpclient = new HTTPClient("text/api", axios);
    mockedSwapiService = {
      planets: {
        all: jest.fn(),
      } as unknown as PlanetModel,
    } as unknown as SwapiService;
    swapiService = new SwapiService(httpclient);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("constuctor", () => {
    it("should set basepath, app, and swapiService", () => {
      jest
        .spyOn(PlanetController.prototype, "routes")
        .mockImplementation(() => {});
      const planetController = new PlanetController(
        "/planets",
        app,
        swapiService
      );
      expect(planetController.basePath).toBe("/planets");
      expect(planetController.app).toBeInstanceOf(Object);
      expect(planetController.swapi).toBeInstanceOf(SwapiService);
    });

    it("should call the routes() method", () => {
      jest
        .spyOn(PlanetController.prototype, "routes")
        .mockImplementation(jest.fn());
      const planetController = new PlanetController(
        "/planets",
        app,
        swapiService
      );
      expect(planetController.routes).toHaveBeenCalled();
    });
  });

  describe("routes", () => {
    it("should set the correct routes", () => {
      new PlanetController("/planets", app, swapiService);
      expect(app.get).toHaveBeenNthCalledWith(
        1,
        "/planets",
        expect.any(Function)
      );
    });
  });

  describe("all", () => {
    it("should return planets", async () => {
      jest.spyOn(mockedSwapiService.planets, "all").mockResolvedValue({
        count: 10,
        prev: null,
        next: null,
        results: mockPlanetListing as Array<IPlanet>,
      });
      const planetController = new PlanetController(
        "/planets",
        app,
        mockedSwapiService
      );
      const mockFastifyReply = { send: jest.fn() } as unknown as FastifyReply;
      await planetController.all({} as FastifyRequest, mockFastifyReply);
      expect(mockedSwapiService.planets.all).toHaveBeenCalled();
      expect(mockFastifyReply.send).toHaveBeenCalledWith(mockPlanetListing);
    });
  });
});
