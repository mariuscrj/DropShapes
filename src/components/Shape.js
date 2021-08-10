import { Container, Graphics } from "pixi.js";

export default class Shape extends Container {
  constructor(x = Math.floor(Math.random() * 761), y = -40) {
    super();
    this.draw(x, y);
  }

  draw(x, y) {
    const g = new Graphics();
    g.clear();
    g.beginFill(0xff3300);
    g.drawRect(x, y, 40, 40);
    g.endFill();
    g.interactive = true;
    g.buttonMode = true;
    g.click = () => {
      g.destroy();
    }
    this.addChild(g);
  }

  destroy() {
    this.children[0].destroy();
  }
}