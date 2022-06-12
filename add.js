import * as fs from "fs";
import path from "path";
import { errorHandler, OperationFailedError } from "./errors.js";

export const add = (filename, currentPath) => {
  try {
    fs.writeFile(
      path.resolve(currentPath, filename),
      "",
      { flag: "wx" },
      (error) => {
        if (error) console.log("Operation failed");
      }
    );
  } catch (e) {
    errorHandler(e);
  }
};
