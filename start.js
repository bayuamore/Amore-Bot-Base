const chalk = require("chalk");
const process = require("child_process");

let childP = require("child_process");
let ecFile = require("util");
let exec = ecFile(childP.exec).bind(childP);

function startUp(cmd) {
   return process(cmd, [], {
      stdio: ["inherit", "inherit", "inherit", "ipc"],
   });
}

startUp("bash");

console.log(chalk.green("Terminal Ready To Use!"));
