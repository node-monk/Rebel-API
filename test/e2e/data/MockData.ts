const SwapiData: Map<string, any> = new Map();

SwapiData.set("/people/?search=Luke Skywalker", {
  count: 1,
  next: null,
  prev: null,
  results: [
    {
      name: "Luke Skywalker",
      starships: ["/starships/1", "/starships/2"],
    },
  ],
});

SwapiData.set("/starships/1", {
  name: "X-Wing",
});

SwapiData.set("/starships/2", {
  name: "Awesome Ship 2",
});

SwapiData.set("/films/?search=The Phantom Menace", {
  count: 1,
  next: null,
  prev: null,
  results: [
    {
      species: ["/species/1", "/species/2", "/species/3"],
    },
  ],
});

SwapiData.set("/species/1", {
  name: "Human",
  classification: "mammal",
});

SwapiData.set("/species/2", {
  name: "Dragon",
  classification: "lizard",
});

SwapiData.set("/species/3", {
  name: "Anaconda",
  classification: "snake",
});

SwapiData.set("/planets", {
  count: 2,
  prev: null,
  next: "/planets/?page=2",
  results: [
    {
      name: "YodaPlanet",
      population: 100,
    },
    {
      name: "LukePLanet",
      population: 200,
    },
  ],
});

SwapiData.set("/planets/?page=2", {
  count: 2,
  prev: "/planets",
  next: "/planets/?page=3",
  results: [
    {
      name: "SythPlanet",
      population: 500,
    },
    {
      name: "VaderPLanet",
      population: 400,
    },
  ],
});

SwapiData.set("/planets/?page=3", {
  count: 2,
  prev: "/planets/?page=2",
  next: null,
  results: [
    {
      name: "GothPlanet",
      population: 244,
    },
    {
      name: "KinderPlanet",
      population: 9000,
    },
  ],
});

export { SwapiData };
