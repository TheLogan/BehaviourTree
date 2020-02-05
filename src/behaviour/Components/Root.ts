import { Component } from "./Component";
import { states } from "../Helpers/Enums";

export class Root extends Component {
  parent: undefined;
  children: Component | null = null;

  getStatus() {
    return this.children?.getStatus() || states.fail;
  }
}