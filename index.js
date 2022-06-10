import * as os from "os";
import { up } from "./up.js";
import { cd } from "./cd.js";
import { ls } from "./ls.js";
import { errorHandler } from "./errors.js";
const { stdin, stdout } = process;

// const user = process.argv.slice(3).split("=")[argv.length - 1];
let currentPath = os.homedir();
const user = process.argv.slice(process.argv.length - 1)[0].split("=")[1];

process.stdout.write(`Welcome to the File Manager, ${user}!\n`);
console.log(`You are currently in ${currentPath}`);
stdin.on("data", async (comand) => {
  try {
    const action = comand.toString().trim();
    // console.log(process.cwd());
    switch (action) {
      case "up": {
        currentPath = up(currentPath);
        break;
      }
      case "ls": {
        ls(currentPath);
        break;
      }
      default: {
        if (action.startsWith("cd")) {
          const newPath = await cd(action, currentPath);
          if (newPath) currentPath = newPath;
          break;
        }
        console.log("Invalid input");
        break;
      }
    }
  } catch (e) {
    errorHandler(e);
  } finally {
    console.log(`You are currently in ${currentPath}`);
  }
});

process.on("SIGINT", () => {
  process.stdout.write(`\nThank you for using File Manager, ${user}!`);
  process.exit();
});
