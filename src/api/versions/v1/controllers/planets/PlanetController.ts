import { BaseController } from "../BaseController";
import { IPlanet } from "../../../../services/swapi/models/planet/IPlanet";
import { SwapiService } from "../../../../services/swapi/Swapi";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { pipeline } from "stream/promises";
import { Writable } from "stream";

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
    this.app.get(
      `${this.basePath}/total-population`,
      this.totalPopulation.bind(this)
    );
  }

  async all(req: FastifyRequest, res: FastifyReply) {
    const records = await this.swapi.planets.all();
    res.send(records.results);
  }

  async totalPopulation(req: FastifyRequest, res: FastifyReply) {
    const planetReadableStream = this.swapi.planets.readableStream<IPlanet>();
    let total = 0;
    const aggStream = new Writable({
      objectMode: true,
      write(chunk: IPlanet, encoding, done) {
        if (!isNaN(Number(chunk.population))) {
          total += Number(chunk.population);
        }
        done();
      },
    });
    await pipeline(planetReadableStream, aggStream);
    return { total };
  }
}
