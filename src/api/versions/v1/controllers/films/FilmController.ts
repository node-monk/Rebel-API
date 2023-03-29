import { BaseController } from "../BaseController";
import { SwapiService } from "../../../../services/swapi/Swapi";
import {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  RequestGenericInterface,
} from "fastify";
import { IFilm } from "../../../../services/swapi/models/films/IFilm";

export interface FilmRequestGeneric extends RequestGenericInterface {
  Params: {
    episode: string;
  };
}

export class FilmController extends BaseController<IFilm> {
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
    this.app.get<FilmRequestGeneric>(
      `${this.basePath}/:episode/species`,
      this.species.bind(this)
    );
  }

  async all(req: FastifyRequest, res: FastifyReply) {
    const records = await this.swapi.films.all();
    res.send(records.results);
  }

  async species(req: FastifyRequest<FilmRequestGeneric>, res: FastifyReply) {
    const episodeNumber = Number(req.params.episode) - 1;

    const episodesMap = [
      "The Phantom Menace",
      "Attack of the Clones",
      "Revenge of the Sith",
      "A New Hope",
      "The Empire Strikes Back",
      "Return of the Jedi",
    ];

    const episode = episodesMap[episodeNumber];
    if (episode == null) {
      return res.status(404).send();
    }

    const filmResults = await this.swapi.films.byName(episode);
    const film = filmResults.results[0];
    if (film == null) {
      return res.status(404).send();
    }
    const filmSpecies = await this.swapi.species.batch(film.species);
    const classifications = filmSpecies.map((species) => ({
      name: species.name,
      classification: species.classification,
    }));
    res.send(classifications);
  }
}
