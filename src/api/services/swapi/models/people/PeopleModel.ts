import { BaseModel } from "../BaseModel";
import { HTTPClient } from "../../../../common/httpClient/HttpClient";
import { IPeople } from "./IPeople";
import { ISwapiResultsResponse } from "../ISwapiResultsResponse";

export class PeopleModel extends BaseModel<IPeople> {
  constructor(httpClient: HTTPClient) {
    super("/people", httpClient);
  }

  async byName(name: string): Promise<ISwapiResultsResponse<IPeople>> {
    const response = await this.httpClient.get<ISwapiResultsResponse<IPeople>>(
      `${this.basePath}/?search=${name}`
    );
    return response.records;
  }
}
