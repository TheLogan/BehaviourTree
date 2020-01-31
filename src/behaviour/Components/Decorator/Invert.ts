import { Decorator } from "./Decorator";
import { states } from "../../Helpers/Enums";

export class Invert extends Decorator {
  getStatus() {
    if (this.status === states.success) return states.fail
    if (this.status === states.fail) return states.success
    return this.status;
  }
}