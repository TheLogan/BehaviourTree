import { Component } from "../Component";

export class Decorator extends Component {
  parent: Component | null = null;
  children: Component | null = null;
}