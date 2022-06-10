import * as fs from "fs";
import { OperationFailedError } from "./errors.js";

export const ls = (currentPath) => {
  fs.access(currentPath, (err) => {
    if (err) throw new OperationFailedError();

    fs.readdir(currentPath, { withFileTypes: true }, (error, files) => {
      const fileNames = files.map((file) => file.name);
      console.log(fileNames);
    });
  });
};
