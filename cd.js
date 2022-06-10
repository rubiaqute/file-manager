import * as fs from "fs";
import * as path from "path";
import { OperationFailedError } from "./errors.js";

export const cd = async (string, currentPath) => {
  const pathName = string.slice(3);

  if (pathName && path.isAbsolute(pathName)) {
    const result = path.resolve(pathName);

    return await new Promise((resolve, reject) => {
      fs.access(result, (error) => {
        if (error) reject(new OperationFailedError());
        else resolve(result);
      });
    });
  }

  if (pathName && !path.isAbsolute(pathName)) {
    const result = path.resolve(currentPath, pathName);

    return await new Promise((resolve, reject) => {
      fs.access(result, (error) => {
        if (error) reject(new OperationFailedError());
        else resolve(result);
      });
    });
  }
  throw new OperationFailedError();
};
