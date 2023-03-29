import { BaseController } from "../BaseController";
import { IPlanet } from "../../../../services/swapi/models/planet/IPlanet";
import { SwapiService } from "../../../../services/swapi/Swapi";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export class PlanetController extends BaseController<IPlanet> {
  constructor(
    basePath: string,
    app: FastifyInstance,
    swapiService: SwapiService
  ) {
    super(basePath, app, swapiService);
    this.routes();
  }

  routes() {
    this.app.get(`${this.basePath}`, this.all.bind(this));
  }

  async all(req: FastifyRequest, res: FastifyReply) {
    const records = await this.swapi.planets.all();
    res.send(records.results);
  }
}
