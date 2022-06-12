import { cd } from "./cd.js";
import { createReadStream } from "fs";
import { errorHandler } from "./errors.js";

export const read = async (argsString, currentPath) => {
  try {
    const filePath = await cd(argsString, currentPath);
    const readable = createReadStream(filePath);

    readable.pipe(process.stdout);
  } catch (e) {
    errorHandler(e);
  }
};
