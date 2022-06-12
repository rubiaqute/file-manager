import { cd } from "./cd.js";
import * as fs from "fs";
import { errorHandler } from "./errors.js";

export const remove = async (argsString, currentPath) => {
  try {
    const filePath = await cd(argsString, currentPath);
    fs.unlink(filePath, () => {});
  } catch (e) {
    errorHandler(e);
  }
};
