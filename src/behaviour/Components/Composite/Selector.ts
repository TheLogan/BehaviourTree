import { Composite } from "./Composite";
import { states } from "../../Helpers/Enums";

export class Selector extends Composite {
  getStatus() {
    for (const child of this.children) {
      let status = child.getStatus();
      if (status === states.success) return states.success;
      if (status === states.running) return states.running;
    }
    return states.fail;
  }
}