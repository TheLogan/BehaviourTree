import { Action } from "./Action";
import { states } from "../../Helpers/Enums";

export class Log extends Action {

  getStatus() {
    console.log('hello world');
    return states.success;
  }
}