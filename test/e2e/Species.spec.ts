import fastify, { FastifyInstance, FastifyListenOptions } from "fastify";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import supertest from "supertest";

import { RebelAPI, IAPIServices } from "../../src/api/versions/v1/RebelAPI";
import { HTTPClient } from "../../src/api/common/httpClient/HttpClient";
import { Controllers } from "../../src/api/versions/v1/controllers/controllers";
import { Services } from "../../src/api/services/services";
import { SwapiData } from "./data/MockData";

const axiosMock = new AxiosMockAdapter(axios);

const FAKE_SWAPI_URI = "http://fakeuri";
const API_PORT = 4444;
const API_HOST = `http://localhost:${API_PORT}`;
const API_BASE_PATH = `/api/v1`;
const API_URI = API_BASE_PATH;

axiosMock
  .onGet(`${FAKE_SWAPI_URI}/films/?search=The Phantom Menace`)
  .reply(200, SwapiData.get("/films/?search=The Phantom Menace"));

axiosMock
  .onGet(`${FAKE_SWAPI_URI}/films/?search=The Gremlin Menace`)
  .reply(404, {
    count: 0,
    next: null,
    prev: null,
    results: [],
  });

axiosMock.onGet(`/species/1`).reply(200, SwapiData.get("/species/1"));
axiosMock.onGet(`/species/2`).reply(200, SwapiData.get("/species/2"));
axiosMock.onGet(`/species/3`).reply(200, SwapiData.get("/species/3"));

axiosMock
  .onGet(`${FAKE_SWAPI_URI}/planets`)
  .reply(200, SwapiData.get("/planets"));
axiosMock
  .onGet(`${FAKE_SWAPI_URI}/planets/?page=2`)
  .reply(200, SwapiData.get("/planets/?page=2"));
axiosMock
  .onGet(`${FAKE_SWAPI_URI}/planets/?page=3`)
  .reply(200, SwapiData.get("/planets/?page=3"));

let app: FastifyInstance;

describe("Species Classification by Episode", () => {
  beforeEach(async () => {
    app = fastify({ logger: true });
    const apiServices: IAPIServices = {
      swapiService: new Services.SwapiService(
        new HTTPClient(FAKE_SWAPI_URI, axios)
      ),
    };
    new RebelAPI(API_BASE_PATH, app, apiServices, Controllers);
    const appOptions: FastifyListenOptions = {
      port: Number(API_PORT),
    };
    await app.listen(appOptions);
  });

  afterEach(() => {
    app.close();
  });

  it("should return 404 if Episode not found", async () => {
    await app.ready();

    const response = await supertest(app.server)
      .get(`${API_URI}/episodes/7/species`)
      .expect(404);
  });

  it("should return list of Species Classifications belonging to Episode", async () => {
    await app.ready();

    const response = await supertest(app.server)
      .get(`${API_URI}/episodes/1/species`)
      .expect(200);

    expect(response.body).toEqual([
      {
        name: "Human",
        classification: "mammal",
      },
      {
        name: "Dragon",
        classification: "lizard",
      },
      {
        name: "Anaconda",
        classification: "snake",
      },
    ]);
  });
});
