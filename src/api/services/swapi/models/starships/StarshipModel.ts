import { BaseModel } from "../BaseModel";
import { HTTPClient } from "../../../../common/httpClient/HttpClient";
import { IStarship } from "./IStarship";

export class StarshipModel extends BaseModel<IStarship> {
  constructor(httpClient: HTTPClient) {
    super("/starships", httpClient);
  }
}
