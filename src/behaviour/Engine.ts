import { Root } from "./Components/Root";
import { Log } from "./Components/Actions/Log";
import { states } from "./Helpers/Enums";

export class Engine {
  root: Root | null = null;

  constructor() {
    this.start();
  }

  async start() {
    while (true) {
      if (this.root == null) return;
      let status = this.root.getStatus();
      if (status !== states.running) return;

      await new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 10);
      })
    }
  }
}