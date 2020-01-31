import { Component } from "./Component";
import { states } from "../Helpers/Enums";

export class Root extends Component {
  child: Component | null = null;

  getStatus() {
    return this.child?.getStatus() || states.fail;
  }
}