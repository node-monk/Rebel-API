import fastify, {
  FastifyInstance,
  FastifyRequest,
  FastifyReply,
} from "fastify";
import axios from "axios";

import { SwapiService } from "../../../../services/swapi/Swapi";
import { StarshipsController } from "./StarshipsController";
import { HTTPClient } from "../../../../common/httpClient/HttpClient";
import { StarshipModel } from "../../../../services/swapi/models/starships/StarshipModel";
import { IStarship } from "../../../../services/swapi/models/starships/IStarship";

jest.mock("axios");

describe("StarshipsController", () => {
  let app: FastifyInstance;
  let swapiService: SwapiService;
  let mockedSwapiService: SwapiService;
  let mockStarshipsListing = [
    {
      name: "X-Wing",
    },
    {
      name: "Tie Fighter",
    },
  ];

  beforeAll(() => {
    app = {
      get: jest.fn(),
    } as unknown as FastifyInstance;
    const httpclient = new HTTPClient("text/api", axios);
    mockedSwapiService = {
      starships: {
        all: jest.fn(),
      } as unknown as StarshipModel,
    } as unknown as SwapiService;
    swapiService = new SwapiService(httpclient);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("constuctor", () => {
    it("should set basepath, app, and swapiService", () => {
      jest
        .spyOn(StarshipsController.prototype, "routes")
        .mockImplementation(() => {});
      const startshipsController = new StarshipsController(
        "/starships",
        app,
        swapiService
      );
      expect(startshipsController.basePath).toBe("/starships");
      expect(startshipsController.app).toBeInstanceOf(Object);
      expect(startshipsController.swapi).toBeInstanceOf(SwapiService);
    });

    it("should call the routes() method", () => {
      jest
        .spyOn(StarshipsController.prototype, "routes")
        .mockImplementation(jest.fn());
      const startshipsController = new StarshipsController(
        "/starships",
        app,
        swapiService
      );
      expect(startshipsController.routes).toHaveBeenCalled();
    });
  });

  describe("routes", () => {
    it("should set the correct routes", () => {
      new StarshipsController("/starships", app, swapiService);
      expect(app.get).toHaveBeenNthCalledWith(
        1,
        "/starships",
        expect.any(Function)
      );
    });
  });

  describe("all", () => {
    it("should return starships", async () => {
      jest.spyOn(mockedSwapiService.starships, "all").mockResolvedValue({
        count: 10,
        prev: null,
        next: null,
        results: mockStarshipsListing as Array<IStarship>,
      });
      const startshipsController = new StarshipsController(
        "/starships",
        app,
        mockedSwapiService
      );
      const mockFastifyReply = { send: jest.fn() } as unknown as FastifyReply;
      await startshipsController.all({} as FastifyRequest, mockFastifyReply);
      expect(mockedSwapiService.starships.all).toHaveBeenCalled();
      expect(mockFastifyReply.send).toHaveBeenCalledWith(mockStarshipsListing);
    });
  });
});
