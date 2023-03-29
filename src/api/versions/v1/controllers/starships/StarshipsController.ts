import { BaseController } from "../BaseController";
import { SwapiService } from "../../../../services/swapi/Swapi";
import { IStarship } from "../../../../services/swapi/models/starships/IStarship";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export class StarshipsController extends BaseController<IStarship> {
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
    const records = await this.swapi.starships.all();
    res.send(records.results);
  }
}
