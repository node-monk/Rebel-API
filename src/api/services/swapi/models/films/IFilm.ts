export interface IFilm {
  characters: Array<string>; // An array of people resource URLs that are in this film.
  created: string; // the ISO 8601 date format of the time that this resource was created.
  director: string; // The name of the director of this film.
  edited: string; // the ISO 8601 date format of the time that this resource was edited.
  episode_id: number; // The episode number of this film.
  opening_crawl: string; // The opening paragraphs at the beginning of this film.
  planets: Array<string>; // An array of planet resource URLs that are in this film.
  producer: string; // The name(s) of the producer(s) of this film. Comma separated.
  release_date: string; // The ISO 8601 date format of film release at original creator country.
  species: Array<string>; // An array of species resource URLs that are in this film.
  starships: Array<string>; // An array of starship resource URLs that are in this film.
  title: string; // The title of this film
  url: string; // the hypermedia URL of this resource.
  vehicles: Array<string>; // An array of vehicle resource URLs that are in this film.
}
