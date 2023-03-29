import { BaseController } from "../BaseController";
import { SwapiService } from "../../../../services/swapi/Swapi";
import {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  RequestGenericInterface,
} from "fastify";
import { IPeople } from "../../../../services/swapi/models/people/IPeople";

export interface PeopleRequestGeneric extends RequestGenericInterface {
  Params: {
    name: string;
  };
}

export class PeopleController extends BaseController<IPeople> {
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
    this.app.get<PeopleRequestGeneric>(
      `${this.basePath}/:name/starships`,
      this.starships.bind(this)
    );
  }

  async all(req: FastifyRequest, res: FastifyReply) {
    const records = await this.swapi.people.all();
    res.send(records.results);
  }

  async starships(
    req: FastifyRequest<PeopleRequestGeneric>,
    res: FastifyReply
  ) {
    /**
     * Find the person, then retrieve data for each of the
     * persons starships
     */
    const name = req.params.name;
    const personResults = await this.swapi.people.byName(name);
    const person = personResults.results[0];

    if (person == null) {
      return res.status(404).send();
    }
    const starships = await this.swapi.starships.batch(person.starships);
    res.send(starships);
  }
}
