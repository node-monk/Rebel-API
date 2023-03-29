import { BaseModel } from "../BaseModel";
import { HTTPClient } from "../../../../common/httpClient/HttpClient";
import { IFilm } from "./IFilm";
import { ISwapiResultsResponse } from "../ISwapiResultsResponse";

export class FilmModel extends BaseModel<IFilm> {
  constructor(httpClient: HTTPClient) {
    super("/films", httpClient);
  }

  async byName(name: string): Promise<ISwapiResultsResponse<IFilm>> {
    const response = await this.httpClient.get<ISwapiResultsResponse<IFilm>>(
      `${this.basePath}/?search=${name}`
    );
    return response.records;
  }
}
