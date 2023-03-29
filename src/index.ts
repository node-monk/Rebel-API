import fastify, { FastifyListenOptions } from "fastify";
import { IAPIServices, RebelAPI } from "./api/versions/v1/RebelAPI";
import consola from "consola";
import * as dotenv from "dotenv";
import { HTTPClient } from "./api/common/httpClient/HttpClient";
import axios from "axios";
import { Controllers } from "./api/versions/v1/controllers/controllers";
import { Services } from "./api/services/services";

dotenv.config();

try {
  // initialize App and API
  const app = fastify({ logger: true });

  const SWAPI_URI = process.env.SWAPI_URI;
  if (!SWAPI_URI) {
    throw new Error("SWAPI_URI required");
  }
  const apiServices: IAPIServices = {
    swapiService: new Services.SwapiService(new HTTPClient(SWAPI_URI, axios)),
  };
  new RebelAPI("/api/v1", app, apiServices, Controllers);

  // Make sure a proper port was provided
  const API_PORT = process.env.REBEL_API_PORT;
  if (API_PORT == null) {
    throw new Error("REBEL_API_PORT required to start API.");
  }

  if (isNaN(Number(API_PORT))) {
    throw new Error("Invalid port provided. Port must be a Number");
  }

  // Start listing for request
  const appOptions: FastifyListenOptions = {
    port: Number(API_PORT),
  };
  app.listen(appOptions);
  consola.info(
    `Access the Rebel API by going to http://localhost:${API_PORT}/api/v1/people`
  );
} catch (err) {
  consola.error(err);
}
