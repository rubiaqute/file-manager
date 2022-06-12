import path from "path";
import * as fs from "fs";
import { cd } from "./cd.js";
import { errorHandler, OperationFailedError } from "./errors.js";
import { createBrotliDecompress } from "zlib";
import { createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream";

export const decompress = async (argsString, currentPath) => {
  try {
    const [pathFile, pathFolder] = argsString.split(" ");

    if (pathFile && pathFolder) {
      const pathFileOLd = await cd(pathFile, currentPath);
      const pathFolderDestination = await cd(pathFolder, currentPath);
      const pathFileNew = path.resolve(
        pathFolderDestination,
        path.basename(pathFileOLd).slice(0, -3)
      );
      console.log(pathFileNew);
      fs.access(pathFileNew, async (err) => {
        if (err) {
          const readable = createReadStream(pathFileOLd);
          const writable = createWriteStream(pathFileNew);
          const brotli = createBrotliDecompress();

          pipeline(readable, brotli, writable, (error) => {});
        } else console.log("Operation failed");
      });
    } else throw new OperationFailedError();
  } catch (e) {
    errorHandler(e);
  }
};
