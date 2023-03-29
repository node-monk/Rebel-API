import { BaseModel } from "../BaseModel";
import { HTTPClient } from "../../../../common/httpClient/HttpClient";
import { IPlanet } from "./IPlanet";

export class PlanetModel extends BaseModel<IPlanet> {
  constructor(httpClient: HTTPClient) {
    super("/planets", httpClient);
  }
}
