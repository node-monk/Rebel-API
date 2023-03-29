import { FastifyInstance } from "fastify";
import { Controllers } from "./controllers/controllers";
import { SwapiService } from "../../services/swapi/Swapi";
import consola from "consola";

export interface IAPIServices {
  swapiService: SwapiService;
}

export class RebelAPI {
  basePath: string;
  app: FastifyInstance;
  swapiService: SwapiService;
  controllers: typeof Controllers;

  constructor(
    basePath: string,
    app: FastifyInstance,
    services: IAPIServices,
    controllers: typeof Controllers
  ) {
    this.basePath = basePath;
    this.app = app;
    this.swapiService = services.swapiService;
    this.controllers = controllers;

    this.setupAPIRoutes();
    consola.success("All Data services initiated");
  }

  setupAPIRoutes() {
    /**
     * Marry each routes with its respective Controllers. Each
     * Constroller then adds its own subroutes as its
     * instantiated
     */
    new this.controllers.Films(
      `${this.basePath}/episodes`,
      this.app,
      this.swapiService
    );

    new this.controllers.Planets(
      `${this.basePath}/planets`,
      this.app,
      this.swapiService
    );

    new this.controllers.Species(
      `${this.basePath}/species`,
      this.app,
      this.swapiService
    );

    new this.controllers.Starships(
      `${this.basePath}/starships`,
      this.app,
      this.swapiService
    );

    new this.controllers.People(
      `${this.basePath}/people`,
      this.app,
      this.swapiService
    );
  }
}
