import {
  FastifyInstance,
  FastifyRequest,
  FastifyReply,
  RequestGenericInterface,
} from "fastify";
import { SwapiService } from "../../../services/swapi/Swapi";

export abstract class BaseController<T> {
  basePath: string;
  app: FastifyInstance;
  swapi: SwapiService;
  constructor(basePath: string, app: FastifyInstance, swapi: SwapiService) {
    this.app = app;
    this.basePath = basePath;
    this.swapi = swapi;
  }
  abstract all(req: FastifyRequest, res: FastifyReply): void;
}
