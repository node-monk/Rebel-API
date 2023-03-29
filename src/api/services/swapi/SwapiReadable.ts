import { Readable, ReadableOptions } from "stream";

export class SwapiReadable extends Readable {
  startUrl: string;
  constructor(options: ReadableOptions, startUrl: string) {
    super(options);
    this.startUrl = startUrl;
  }

  _read(size: number): void {}
}
