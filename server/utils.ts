import { IncomingMessage } from "http";
const fs = require("fs");

function writeDataToFile(filename: string, content: string) {
  fs.writeFileSync( filename, JSON.stringify(content, null, " "),
    "utf-8",
    (err: Error) => {
      if (err) {
        console.log(err);
      }
    }
  );
}

function getPostData(req: IncomingMessage) {
  return new Promise((resolve, reject) => {
    try {
      let body = "";
      req.on("data", (chunk: string) => {
        body += chunk.toString();
      });
      req.on("end", () => {
        resolve(body);
      });
    } catch (error) {
      reject(error);
    }
  });
}
module.exports = { writeDataToFile, getPostData };
