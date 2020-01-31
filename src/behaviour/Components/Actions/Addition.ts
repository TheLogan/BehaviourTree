import { Action } from "./Action";
import { states } from "../../Helpers/Enums";

export class Addition extends Action {
  public a?: number;
  public b?: number;
  // public callback;

  getStatus() {
    if (!this.a || !this.b) return states.fail;
    // callback(a + b);
    return states.success;
  }

}