import fastify, {
  FastifyInstance,
  FastifyRequest,
  FastifyReply,
} from "fastify";
import axios from "axios";

import { SwapiService } from "../../../../services/swapi/Swapi";
import { PeopleController, PeopleRequestGeneric } from "./PeopleController";
import { IPeople } from "../../../../services/swapi/models/people/IPeople";
import { HTTPClient } from "../../../../common/httpClient/HttpClient";
import { IStarship } from "../../../../services/swapi/models/starships/IStarship";
import { StarshipModel } from "../../../../services/swapi/models/starships/StarshipModel";
import { PeopleModel } from "../../../../services/swapi/models/people/PeopleModel";
jest.mock("axios");

describe("PeopleController", () => {
  let app: FastifyInstance;
  let swapiService: SwapiService;
  let mockedSwapiService: SwapiService;
  let mockPeopleListing = [
    {
      name: "Luke Skywalker",
    },
    {
      name: "Joel Legg",
    },
  ];

  beforeAll(() => {
    app = {
      get: jest.fn(),
    } as unknown as FastifyInstance;
    const httpclient = new HTTPClient("text/api", axios);
    mockedSwapiService = {
      people: {
        all: jest.fn(),
        byName: jest.fn(),
      } as unknown as PeopleModel,
      starships: {
        batch: jest.fn(),
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
        .spyOn(PeopleController.prototype, "routes")
        .mockImplementation(() => {});
      const peopleController = new PeopleController(
        "/people",
        app,
        swapiService
      );
      expect(peopleController.basePath).toBe("/people");
      expect(peopleController.app).toBeInstanceOf(Object);
      expect(peopleController.swapi).toBeInstanceOf(SwapiService);
    });

    it("should call the routes() method", () => {
      jest
        .spyOn(PeopleController.prototype, "routes")
        .mockImplementation(jest.fn());
      const peopleController = new PeopleController(
        "/people",
        app,
        swapiService
      );
      expect(peopleController.routes).toHaveBeenCalled();
    });
  });

  describe("routes", () => {
    it("should set the correct routes", () => {
      new PeopleController("/people", app, swapiService);
      expect(app.get).toHaveBeenNthCalledWith(
        1,
        "/people",
        expect.any(Function)
      );

      expect(app.get).toHaveBeenNthCalledWith(
        2,
        "/people/:name/starships",
        expect.any(Function)
      );
    });
  });

  describe("all", () => {
    it("should return people", async () => {
      jest.spyOn(mockedSwapiService.people, "all").mockResolvedValue({
        count: 10,
        prev: null,
        next: null,
        results: mockPeopleListing as Array<IPeople>,
      });
      const peopleController = new PeopleController(
        "/people",
        app,
        mockedSwapiService
      );
      const mockFastifyReply = { send: jest.fn() } as unknown as FastifyReply;
      await peopleController.all({} as FastifyRequest, mockFastifyReply);
      expect(mockedSwapiService.people.all).toHaveBeenCalled();
      expect(mockFastifyReply.send).toHaveBeenCalledWith(mockPeopleListing);
    });
  });

  describe("starships", () => {
    it("should return an array of Starships for the specified Person", async () => {
      const mockStarships = [
        { name: "X-Wing" },
        { name: "Tie Fighter" },
      ] as Array<IStarship>;

      const mockPerson = {
        starships: [
          "https://swapi.dev/api/starships/1/",
          "https://swapi.dev/api/starships/2/",
        ],
      } as IPeople;

      jest.spyOn(mockedSwapiService.people, "byName").mockResolvedValue({
        count: 2,
        next: null,
        prev: null,
        results: [mockPerson],
      });
      jest
        .spyOn(mockedSwapiService.starships, "batch")
        .mockResolvedValue(mockStarships);

      const peopleController = new PeopleController(
        "/people",
        app,
        mockedSwapiService
      );

      const mockFastifyReply = { send: jest.fn() } as unknown as FastifyReply;
      await peopleController.starships(
        {
          params: { name: "Joel Legg" },
        } as FastifyRequest<PeopleRequestGeneric>,
        mockFastifyReply
      );

      expect(mockedSwapiService.people.byName).toHaveBeenCalledWith(
        "Joel Legg"
      );
      expect(mockedSwapiService.starships.batch).toHaveBeenCalledWith(
        mockPerson.starships
      );
      expect(mockFastifyReply.send).toHaveBeenCalledWith(
        mockStarships.map((s) => ({
          name: s.name,
        }))
      );
    });
  });
});
