import { Body } from "./body";
import { Vector2 } from "../vector";

export class Planet extends Body{
  element: HTMLDivElement
  spaceScale: number
  sizeScale: number

  constructor(pos: Vector2, mass: number, velocity: Vector2){
    super(pos, mass, velocity);
    
    this.spaceScale = 1/5;
    this.sizeScale = 50;
    this.element = document.createElement("div");
    this.element.setAttribute("class", "body");

    document.getElementById("app")?.appendChild(this.element);
  }

  draw(basis: Vector2, offset: Vector2, windowSize: Vector2){
    const drawSize = this.mass * this.sizeScale * this.spaceScale;
    const drawPos = Vector2
      .reduce(this.position, basis)
      .stretch(this.spaceScale)
      .add(offset)
      .reduce(new Vector2(drawSize, drawSize).stretch(1/2));

    if(
      drawPos.x < 0 
      || drawPos.x >= windowSize.x
      || drawPos.y < 0
      || drawPos.y >= windowSize.y
    ){
      this.element.style.setProperty("display", "none");
      return;
    }else{
      this.element.style.setProperty("display", "block");
    }

    this.element.style.setProperty("--x", `${drawPos.x}px`);
    this.element.style.setProperty("--y", `${drawPos.y}px`);
    this.element.style.setProperty("--size", `${Math.max(drawSize, 5)}px`);
  }

  static init(){}
}