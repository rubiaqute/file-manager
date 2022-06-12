import * as fs from "fs";
import { errorHandler, OperationFailedError } from "./errors.js";

export const ls = (currentPath) => {
  try {
    fs.access(currentPath, (err) => {
      if (err) throw new OperationFailedError();

      fs.readdir(currentPath, { withFileTypes: true }, (error, files) => {
        try {
          const fileNames = files.map((file) => file.name);
          console.log(fileNames || "Nothing to show");
        } catch (e) {
          errorHandler(e);
        }
      });
    });
  } catch (e) {
    errorHandler(e);
  }
};
