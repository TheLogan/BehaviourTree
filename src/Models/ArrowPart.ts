export class ArrowPart {
  compId: string;
  type: 'top' | 'bottom' | undefined;

  constructor(val: Partial<ArrowPart>) {
    this.compId = val.compId || '';
    this.type = val.type;
  }
}