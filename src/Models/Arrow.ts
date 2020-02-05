export class Arrow {
  startId: string;
  endId: string

  constructor(val: Partial<Arrow>) {
    this.startId = val.startId || '';
    this.endId = val.endId || '';
  }
}