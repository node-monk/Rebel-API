import { HTTPClient } from "../../common/httpClient/HttpClient";
import { FilmModel } from "./models/films/FilmModel";
import { Models } from "./models/models";
import { PeopleModel } from "./models/people/PeopleModel";
import { PlanetModel } from "./models/planet/PlanetModel";
import { SpeciesModel } from "./models/species/SpeciesModel";
import { StarshipModel } from "./models/starships/StarshipModel";

export class SwapiService {
  films: FilmModel;
  planets: PlanetModel;
  species: SpeciesModel;
  starships: StarshipModel;
  people: PeopleModel;

  constructor(httpclient: HTTPClient) {
    this.films = new Models.FilmModel(httpclient);
    this.people = new Models.PeopleModel(httpclient);
    this.planets = new Models.PlanetModel(httpclient);
    this.species = new Models.SpeciesModel(httpclient);
    this.starships = new Models.StarshipModel(httpclient);
  }
}
