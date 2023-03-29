import { BaseController } from "../BaseController";
import { SwapiService } from "../../../../services/swapi/Swapi";
import { ISpecies } from "../../../../services/swapi/models/species/ISpecies";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export class SpeciesController extends BaseController<ISpecies> {
  constructor(
    basePath: string,
    app: FastifyInstance,
    swapiService: SwapiService
  ) {
    super(basePath, app, swapiService);
    this.routes();
  }

  /**
   * Sets up subroutes
   */
  routes() {
    this.app.get(`${this.basePath}`, this.all.bind(this));
  }

  async all(req: FastifyRequest, res: FastifyReply) {
    const records = await this.swapi.species.all();
    res.send(records.results);
  }
}
