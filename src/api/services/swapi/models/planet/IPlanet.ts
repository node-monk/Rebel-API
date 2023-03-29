export interface IPlanet {
  climate: string; // The climate of this planet. Comma separated if diverse.
  created: string; // the ISO 8601 date format of the time that this resource was created.
  diameter: string; // The diameter of this planet in kilometers.
  edited: string; // the ISO 8601 date format of the time that this resource was edited.
  films: Array<string>; // An array of Film URL Resources that this planet has appeared in.
  gravity: string; // A number denoting the gravity of this planet, where "1" is normal or 1 standard G. "2" is twice or 2 standard Gs. "0.5" is half or 0.5 standard Gs.
  name: string; // The name of this planet.
  orbital_period: string; // The number of standard days it takes for this planet to complete a single orbit of its local star.
  population: string; // The average population of sentient beings inhabiting this planet.
  residents: Array<string>; // An array of People URL Resources that live on this planet.
  rotation_period: string; // The number of standard hours it takes for this planet to complete a single rotation on its axis.
  surface_water: string; // The percentage of the planet surface that is naturally occurring water or bodies of water.
  terrain: string; // The terrain of this planet. Comma separated if diverse.
  url: string; // the hypermedia URL of this resource.
}
