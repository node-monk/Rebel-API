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
const API_PORT = 4545;
const API_HOST = `http://localhost:${API_PORT}`;
const API_BASE_PATH = `/api/v1`;
const API_URI = API_BASE_PATH;

axiosMock
  .onGet(`${FAKE_SWAPI_URI}/people/?search=Luke Skywalker`)
  .reply(200, SwapiData.get("/people/?search=Luke Skywalker"));

axiosMock.onGet(`${FAKE_SWAPI_URI}/people/?search=Duke Skywalker`).reply(200, {
  count: 0,
  prev: null,
  next: null,
  results: [],
});

axiosMock.onGet(`/starships/1`).reply(200, SwapiData.get("/starships/1"));
axiosMock.onGet(`/starships/2`).reply(200, SwapiData.get("/starships/2"));

let app: FastifyInstance;

describe("Starships by Person", () => {
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

  it("should return 404 if person not found", async () => {
    await app.ready();

    const response = await supertest(app.server)
      .get(`${API_URI}/people/Duke Skywalker/starships`)
      .expect(404);
  });

  it("should return list of starships belonging to Person", async () => {
    await app.ready();

    const response = await supertest(app.server)
      .get(`${API_URI}/people/Luke Skywalker/starships`)
      .expect(200);

    expect(response.body).toEqual([
      {
        name: "X-Wing",
      },
      {
        name: "Awesome Ship 2",
      },
    ]);
  });
});
