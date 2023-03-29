import { FastifyInstance } from "fastify";
import { Controllers } from "./controllers/controllers";
import { SwapiService } from "../../services/swapi/Swapi";
import { RebelAPI } from "./RebelAPI";
import { FilmController } from "./controllers/films/FilmController";

describe("RebelAPI", () => {
  let basePath: string;
  let app: FastifyInstance;
  let swapiService: SwapiService;
  let controllers: typeof Controllers;

  beforeEach(() => {
    basePath = "/test";
    app = { get: jest.fn() } as unknown as FastifyInstance;
    swapiService = {} as SwapiService;
    controllers = Controllers;
  });

  describe("constructor", () => {
    it("should set the basePath, app, swapiService, and controllers properties", () => {
      const api = new RebelAPI(basePath, app, { swapiService }, controllers);

      expect(api.basePath).toBe(basePath);
      expect(api.app).toBe(app);
      expect(api.swapiService).toBe(swapiService);
      expect(api.controllers).toBe(controllers);
    });

    it("should call the setupAPIRoutes method and log a success message", () => {
      const mockFn = jest.spyOn(RebelAPI.prototype, "setupAPIRoutes");
      new RebelAPI(basePath, app, { swapiService }, controllers);
      expect(mockFn).toHaveBeenCalled();
    });
  });

  describe("setupAPIRoutes", () => {
    it("should create instances of all controllers and call their constructor methods", () => {
      const FilmClass = jest.fn();
      const PlanetClass = jest.fn();
      const SpeciesClass = jest.fn();
      const StarshipsClass = jest.fn();
      const PeopleClass = jest.fn();

      new RebelAPI(basePath, app, { swapiService }, {
        Films: FilmClass,
        Planets: PlanetClass,
        Species: SpeciesClass,
        Starships: StarshipsClass,
        People: PeopleClass,
      } as unknown as typeof controllers);

      expect(FilmClass).toHaveBeenCalledWith(
        `${basePath}/episodes`,
        app,
        swapiService
      );
      expect(PlanetClass).toHaveBeenCalledWith(
        `${basePath}/planets`,
        app,
        swapiService
      );
      expect(SpeciesClass).toHaveBeenCalledWith(
        `${basePath}/species`,
        app,
        swapiService
      );
      expect(StarshipsClass).toHaveBeenCalledWith(
        `${basePath}/starships`,
        app,
        swapiService
      );
      expect(PeopleClass).toHaveBeenCalledWith(
        `${basePath}/people`,
        app,
        swapiService
      );
    });
  });
});
