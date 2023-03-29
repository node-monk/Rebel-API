import { BaseModel } from "../BaseModel";
import { HTTPClient } from "../../../../common/httpClient/HttpClient";
import { ISpecies } from "./ISpecies";

export class SpeciesModel extends BaseModel<ISpecies> {
  constructor(httpClient: HTTPClient) {
    super("/species", httpClient);
  }
}
