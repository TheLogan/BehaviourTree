import { states } from "../Helpers/Enums";
const uuidv1 = require('uuid/v1');

export class Component {
  Id: string = '';
  label: string = '';
  htmlPosX: number = 0;
  htmlPosY: number = 0;
  protected status: states = states.running;

  parent: Component | null | undefined;
  children: Component | Component[] | null | undefined;

  getStatus() {
    return this.status;
  }

  constructor(label: string) {
    this.label = label;
    this.Id = uuidv1();
  }
}