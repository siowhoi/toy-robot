import Obstacle from "./object";
import { Result } from "./result";

export enum Directions {
  NORTH,
  EAST,
  SOUTH,
  WEST,
}

export default class Robot {
  public isPlaced: boolean = false;
  public direction: Directions = Directions.EAST;
  public xPosition: number = 0;
  public yPosition: number = 0;

  public place(xPosition: number, yPosition: number, direction: Directions) {
    this.xPosition = xPosition;
    this.yPosition = yPosition;
    this.direction = direction;
    this.isPlaced = true;
  }

  public left() {
    switch (this.direction) {
      case Directions.NORTH:
        this.direction = Directions.WEST;
        break;
      case Directions.WEST:
        this.direction = Directions.SOUTH;
        break;
      case Directions.SOUTH:
        this.direction = Directions.EAST;
        break;
      case Directions.EAST:
        this.direction = Directions.NORTH;
        break;
    }
  }

  public right() {
    switch (this.direction) {
      case Directions.NORTH:
        this.direction = Directions.EAST;
        break;
      case Directions.EAST:
        this.direction = Directions.SOUTH;
        break;
      case Directions.SOUTH:
        this.direction = Directions.WEST;
        break;
      case Directions.WEST:
        this.direction = Directions.NORTH;
        break;
    }
  }

  public move(): boolean {
    const result: Result = this.getMove([]);
    if (result.isValid) {
      this.xPosition = result.newXPosition;
      this.yPosition = result.newYPosition;
    }
    return result.isValid;
  }

  public getMove(obstacles: Obstacle[]): Result {
    let newXPosition = this.xPosition;
    let newYPosition = this.yPosition;
    let isValid: boolean = true;

    switch (this.direction) {
      case Directions.NORTH:
        ++newYPosition;
        break;
      case Directions.EAST:
        ++newXPosition;
        break;
      case Directions.SOUTH:
        --newYPosition;
        break;
      case Directions.WEST:
        --newXPosition;
        break;
      default:
        isValid = false;
    }

    if (!this.isValidPosition(newXPosition, newYPosition)) {
      isValid = false;
    }

    for (const obs in obstacles) {
    }

    const result: Result = {
      isValid,
      newXPosition,
      newYPosition,
    };

    return result;
  }

  public report() {
    return `${this.xPosition}, ${this.yPosition}, ${
      Directions[this.direction]
    }`;
  }

  public isValidPosition(xPosition: number, yPosition: number): boolean {
    const xLowerBoundary = 0;
    const yLowerBoundary = 0;
    const xUpperBoundary = 5;
    const yUpperBoundary = 5;

    if (xLowerBoundary <= xPosition && xPosition <= xUpperBoundary) {
      return true;
    }

    if (yLowerBoundary <= yPosition && yPosition >= yUpperBoundary) {
      return true;
    }

    return false;
  }
}
