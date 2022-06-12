import * as os from "os";
import { up } from "./up.js";
import { cd } from "./cd.js";
import { ls } from "./ls.js";
import { rn } from "./rn.js";
import { read } from "./read.js";
import { add } from "./add.js";
import { copy } from "./copy.js";
import { move } from "./move.js";
import { remove } from "./remove.js";
import { hash } from "./hash.js";
import { compress } from "./compress.js";
import { osSystem } from "./os.js";
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
        if (action.startsWith("cd ")) {
          const pathName = action.slice(3);
          const newPath = await cd(pathName, currentPath);
          if (newPath) currentPath = newPath;
          break;
        }
        if (action.startsWith("rn ")) {
          const argsString = action.slice(3);
          rn(argsString, currentPath);
          break;
        }
        if (action.startsWith("os ")) {
          const argsString = action.slice(3);
          osSystem(argsString);
          break;
        }
        if (action.startsWith("cat ")) {
          const argsString = action.slice(4);
          read(argsString, currentPath);
          break;
        }
        if (action.startsWith("add ")) {
          const argsString = action.slice(4);
          add(argsString, currentPath);
          break;
        }
        if (action.startsWith("cp ")) {
          const argsString = action.slice(3);
          copy(argsString, currentPath);
          break;
        }
        if (action.startsWith("mv ")) {
          const argsString = action.slice(3);
          move(argsString, currentPath);
          break;
        }
        if (action.startsWith("rm ")) {
          const argsString = action.slice(3);
          remove(argsString, currentPath);
          break;
        }
        if (action.startsWith("hash ")) {
          const argsString = action.slice(5);
          hash(argsString, currentPath);
          break;
        }
        if (action.startsWith("compress ")) {
          const argsString = action.slice(9);
          compress(argsString, currentPath);
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
