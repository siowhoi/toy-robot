import * as process from "process";
import Obstacle from "./object";
import Robot from "./robot";
import { Directions } from "./robot";

enum Commands {
  PLACE,
  LEFT,
  RIGHT,
  MOVE,
  REPORT,
  PLACE_OBJECT,
}

export default class Controller {
  private robot: Robot = new Robot();
  private Obstacles: Obstacle[] = [];

  public execute(input: string): void {
    try {
      const command: string = input.toUpperCase();

      if (command.includes(Commands[Commands.PLACE])) {
        const remainingCommands: string = command.slice(
          Commands[Commands.PLACE].length,
          input.length,
        );
        const delimiter = ",";
        const words = remainingCommands.split(delimiter);
        const xPosition: number = parseInt(words[0].trim());
        const yPosition: number = parseInt(words[1].trim());

        if (!Object.values(Directions).includes(words[2].trim())) {
          process.stdout.write("Command ignored - invalid direction \n");
          return;
        }

        const direction: Directions = (Directions as any)[words[2].trim()];

        if (!this.robot.isValidPosition(xPosition, yPosition)) {
          process.stdout.write("Command ignored - out of bounds \n");
          return;
        }

        this.robot.place(xPosition, yPosition, direction);
      } else if (!this.robot.isPlaced) {
        process.stdout.write("Command ignored - robot not placed yet \n");
        return;
      } else {
        switch (command) {
          case Commands[Commands.LEFT]:
            this.robot.left();
            break;
          case Commands[Commands.RIGHT]:
            this.robot.right();
            break;
          case Commands[Commands.MOVE]:
            const obj_position_result_move = this.robot.getMove(this.Obstacles);
            if (obj_position_result_move.isValid) {
            }
            const isSuccess = this.robot.move();
            if (!isSuccess) {
              process.stdout.write("Command ignored - out of bounds \n");
            }
            break;
          case Commands[Commands.REPORT]:
            process.stdout.write(this.robot.report() + "\n");
            break;
          case Commands[Commands.PLACE_OBJECT]:
            const obj_position_result_place_obj = this.robot.getMove(
              this.Obstacles,
            );
            if (obj_position_result_place_obj.isValid) {
              this.Obstacles.push(
                new Obstacle(
                  obj_position_result_place_obj.newXPosition,
                  obj_position_result_place_obj.newYPosition,
                ),
              );
            } else {
              process.stdout.write("Command ignored - out of bounds \n");
            }
            break;
          default:
            process.stdout.write("Invalid command \n");
        }
      }
    } catch (e) {
      process.stdout.write("Invalid command \n");
    }
  }
}
