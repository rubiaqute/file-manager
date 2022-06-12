import * as fs from "fs";
import path from "path";
import { cd } from "./cd.js";
import { errorHandler, OperationFailedError } from "./errors.js";

export const move = async (argsString, currentPath) => {
  try {
    const [pathFile, pathFolder] = argsString.split(" ");

    if (pathFile && pathFolder) {
      const pathFileOLd = await cd(pathFile, currentPath);
      const pathFolderDestination = await cd(pathFolder, currentPath);
      const pathFileNew = path.resolve(
        pathFolderDestination,
        path.basename(pathFileOLd)
      );
      fs.access(pathFileNew, async (err) => {
        if (err) {
          await fs.promises.copyFile(pathFileOLd, pathFileNew);
          fs.unlink(pathFileOLd, () => {});
        } else console.log("Operation failed");
      });
    } else throw new OperationFailedError();
  } catch (e) {
    errorHandler(e);
  }
};
