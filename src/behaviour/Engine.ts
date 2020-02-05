import { Root } from "./Components/Root";
import { states } from "./Helpers/Enums";

export class Engine {
  root: Root | null = null;
  running: boolean = false;

  constructor() {
    this.start();
  }

  stop() {
    this.running = false;
  }

  async start() {
    this.running = true;
    while (this.running) {
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