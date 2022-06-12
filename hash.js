import { cd } from "./cd.js";
import * as crypto from "crypto";
import { createReadStream } from "fs";
import { errorHandler } from "./errors.js";

export const hash = async (argsString, currentPath) => {
  try {
    const filePath = await cd(argsString, currentPath);
    const hash = crypto.createHash("sha256");
    const input = createReadStream(filePath);

    const result = await new Promise((resolve) => {
      input.on("readable", () => {
        const data = input.read();
        if (data) hash.update(data);
        else {
          resolve(hash.digest("hex"));
        }
      });
    });

    console.log(await result);
  } catch (e) {
    errorHandler(e);
  }
};
