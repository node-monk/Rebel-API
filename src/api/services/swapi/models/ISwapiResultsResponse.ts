type NullableString = string | null;

export interface ISwapiResultsResponse<T> {
  count: number;
  next: NullableString;
  prev: NullableString;
  results: Array<T>;
}
