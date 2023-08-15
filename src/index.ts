import * as process from "process";
import { createInterface, ReadLineOptions } from "readline";
import Controller from "./controller";
const controller = new Controller();

const rlOptions: ReadLineOptions = {
  input: process.stdin,
  output: process.stdout,
  terminal: false,
};

process.stdout.write(
  "Valid commands: \n PLACE x, y, f (where f = NORTH, SOUTH, EAST or WEST) \n LEFT \n RIGHT \n MOVE \n REPORT \n",
);

const rl = createInterface(rlOptions);

rl.prompt(true);

rl.on("line", (input: string) => {
  controller.execute(input);
  rl.prompt(true);
});
