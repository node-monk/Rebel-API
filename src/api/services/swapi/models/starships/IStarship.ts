export interface IStarship {
  cargo_capacity: string; // The maximum number of kilograms that this starship can transport.
  consumables: string; //The maximum length of time that this starship can provide consumables for its entire crew without having to resupply.
  cost_in_credits: string; // The cost of this starship new, in galactic credits.
  created: string; // the ISO 8601 date format of the time that this resource was created.
  crew: string; // The number of personnel needed to run or pilot this starship.
  edited: string; // the ISO 8601 date format of the time that this resource was edited.
  films: Array<string>; // An array of Film URL Resources that this starship has appeared in.
  hyperdrive_rating: string; // The class of this starships hyperdrive.
  length: string; // The length of this starship in meters.
  model: string; // The model or official name of this starship. Such as "T-65 X-wing" or "DS-1 Orbital Battle Station".
  MGLT: string; // The Maximum number of Megalights this starship can travel in a standard hour. A "Megalight" is a standard unit of distance and has never been defined before within the Star Wars universe. This figure is only really useful for measuring the difference in speed of starships. We can assume it is similar to AU, the distance between our Sun (Sol) and Earth.
  max_atmosphering_speed: string; // The maximum speed of this starship in the atmosphere. "N/A" if this starship is incapable of atmospheric flight.
  manufacturer: string; // The manufacturer of this starship. Comma separated if more than one.
  name: string; // The name of this starship. The common name, such as "Death Star".
  passengers: string; // The number of non-essential people this starship can transport.
  pilots: Array<string>; // An array of People URL Resources that this starship has been piloted by.
  starship_class: string; // The class of this starship, such as "Starfighter" or "Deep Space Mobile Battlestation"
  url: string; // the hypermedia URL of this resource.
}
