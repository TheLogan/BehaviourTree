import { Composite } from "./Composite";
import { states } from "../../Helpers/Enums";

export class ParallelSequence extends Composite {

  getStatus() {
    let failures = 0;
    let runnings = 0;

    for (const child of this.children) {
      let status = child.getStatus();
      switch (status) {
        case states.fail:
          failures++;
          break;
        case states.running:
          runnings++;
          break;
      }
    }
    if (failures > 0) return states.fail;
    if (runnings > 0) return states.running;
    return states.success;
  }
}