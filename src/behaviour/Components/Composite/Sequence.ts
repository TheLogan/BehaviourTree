import { Composite } from "./Composite";
import { states } from "../../Helpers/Enums";

export class Sequence extends Composite {

  getStatus() {
    for (const child of this.children) {
      let status = child.getStatus();
      if (status === states.fail) return states.fail;
      if (status === states.running) return states.running;
    }
    return states.success;
  }
}