# Rebel Alliance Intelligence Network

A long time ago in a galaxy far, far away, the Rebel Alliance stood against the might of the Galactic Empire, fighting for freedom and the hope of a better future. While the Empire possessed overwhelming military power and technological superiority, the Rebels relied on cunning tactics and their unwavering spirit to wage their war for liberation. However, victory was never guaranteed, and the Rebels knew that they needed every advantage they could get to defeat the Empire. That's where the Rebel Alliance database comes in. With access to the latest intelligence, strategy, and tactics used by the Rebels, this database holds the key to finding out how to beat the Empire once and for all. Join us on a journey to unlock the secrets of the Rebel Alliance database and discover the path to victory against the Galactic Empire.

## Installation

Embark on your journey by cloning this repository and then proceeding with the installation of the necessary packages. May the Force be with you.

```
git clone git@github.com:node-monk/Rebel-API.git
cd Rebel-API
npm ci
```

## Usage

Fast access to Rebel Alliance Intelligence is crucial for quick decision-making. To quickly start using the Rebel API, use the following command:

```
npm start
```

### Starships by Person

Effective strategic planning requires a comprehensive understanding of available personnel and their respective abilities to operate Starships. To acquire this information, the following API endpoint can be utilized.

```
http://localhost:3333/api/v1/people/[Person Name]/starships
```

### Paremeters

_Person Name_ -- Any of the registered actors involved on the Strategy. For example "Luke Skywalker"

```
http://localhost:3333/api/v1/people/Luke Skywalker/starships
```

### Response

```
{
  "name": "X-wing",
  "model": "T-65 X-wing",
  "manufacturer": "Incom Corporation",
  "cost_in_credits": "149999",
  "length": "12.5",
  "max_atmosphering_speed": "1050",
  "crew": "1",
  "passengers": "0",
  "cargo_capacity": "110",
  "consumables": "1 week",
  "hyperdrive_rating": "1.0",
  "MGLT": "100",
  "starship_class": "Starfighter",
  "pilots": [
    "https://swapi.dev/api/people/1/",
    "https://swapi.dev/api/people/9/",
    "https://swapi.dev/api/people/18/",
    "https://swapi.dev/api/people/19/"
  ],
  "films": [
    "https://swapi.dev/api/films/1/",
    "https://swapi.dev/api/films/2/",
    "https://swapi.dev/api/films/3/"
  ],
  "created": "2014-12-12T11:19:05.340000Z",
  "edited": "2014-12-20T21:23:49.886000Z",
  "url": "https://swapi.dev/api/starships/12/"
}
```

- _name_ string -- The name of this starship. The common name, such as "Death Star".
- _model_ string -- The model or official name of this starship. Such as "T-65 X-wing" or "DS-1 Orbital Battle Station".
- _starship_class_ string -- The class of this starship, such as "Starfighter" or "Deep Space Mobile Battlestation"
- _manufacturer_ string -- The manufacturer of this starship. Comma separated if more than one.
- _cost_in_credits_ string -- The cost of this starship new, in galactic credits.
- _length_ string -- The length of this starship in meters.
- _crew_ string -- The number of personnel needed to run or pilot this starship.
- _passengers_ string -- The number of non-essential people this starship can transport.
- _max_atmosphering_speed_ string -- The maximum speed of this starship in the atmosphere. "N/A" if this starship is incapable of atmospheric flight.
- _hyperdrive_rating_ string -- The class of this starships hyperdrive.
- _MGLT_ string -- The Maximum number of Megalights this starship can travel in a standard hour. A "Megalight" is a standard unit of distance and has never been defined before within the Star Wars universe. This figure is only really useful for measuring the difference in speed of starships. We can assume it is similar to AU, the distance between our Sun (Sol) and Earth.
- _cargo_capacity_ string -- The maximum number of kilograms that this starship can transport.
  consumables \*string
  The maximum length of time that this starship can provide consumables for its entire crew without having to resupply.
- _films_ array -- An array of Film URL Resources that this starship has appeared in.
- _pilots_ array -- An array of People URL Resources that this starship has been piloted by.
- _url_ string -- the hypermedia URL of this resource.
- _created_ string -- the ISO 8601 date format of the time that this resource was created.
- _edited_ string -- the ISO 8601 date format of the time that this resource was edited.

### Species Classification by Episode

Having knowledge of the species present in an episode can be crucial in planning successful attacks against the Empire. Certain species can be provoked into action by precise and low-powered laser shots or by provocation from daring flybys in starships. To gain this vital intelligence, it is important to carefully analyze the episode and identify the species involved.

The following Endpoint provides species classifications per Episode

```
http://localhost:3333/api/v1/episodes/[Episode Number 1-6]/species
```

### Response

```
[
 {
    "name": "Human",
    "classification": "mammal"
  },
  ...
]
```

- _name_ string -- The name of this species.
- _classification_ -- The classification of this species, such as "mammal" or "reptile".

## Population Totals

Knowing the total population of the galaxy's inhabitants is vital intel in the fight against the Empire. With this information, we can strategize and mobilize our forces to better protect and defend the innocent beings from the Empire's tyranny. It also helps us understand the resources we need to allocate and the tactics we need to employ to effectively counter the Empire's attacks. May the Force be with us in this fight.

To quickly get the current Galaxy population total, send this request
NOTE: This request takes a but longer since it has to aggregate over pages of data to calculate the total population across planets

```
http://localhost:3333/api/v1/planets/total-population
```

### Response

```
{
    total:1999999900
}
```

## Conclusion

The Rebel Alliance's fight against the Empire is far from over. However, with the Rebel API at their disposal, the Alliance can now harness the power of information and more rapidly integrate it into their strategic operations. With this new advantage, the Alliance is better equipped to plan their attacks and make strategic decisions that will ultimately lead to victory against the Empire.

## NERD Stuff

### Running Test

Two types of test are provided -- unit & e2e

The unit test are located in the same directory as the file they are testing. To run the unit test

```
npm run test-unit
```

### E2E Testing

End To End Testing is also provided to test out the
complete data flow using Mocked data. To run the E2E Test

```
npm run test-e2e
```

Project created by Michael Watson 2023
