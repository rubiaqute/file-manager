import * as fs from "fs";
import path from "path";
import { cd } from "./cd.js";
import { errorHandler, OperationFailedError } from "./errors.js";

export const rn = async (argsString, currentPath) => {
  try {
    const [pathFile, fileName] = argsString.split(" ");

    if (pathFile && fileName) {
      const oldFilePath = await cd(pathFile, currentPath);
      const newFilePath = path.resolve(path.dirname(oldFilePath), fileName);
      fs.access(oldFilePath, (err) => {
        if (err) throw new OperationFailedError();
        fs.rename(oldFilePath, newFilePath, () => {});
      });
    } else throw new OperationFailedError();
  } catch (e) {
    errorHandler(e);
  }
};
