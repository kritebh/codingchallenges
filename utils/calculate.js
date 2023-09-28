const fs = require("fs");
const readline = require("readline");

function calculateByte(file, logFile) {
  let fileStats = fs.statSync(file);
  process.stdout.write(
    fileStats.size.toString() + " " + (logFile === true ? file : "")
  );
}

function createReadLineInterface(file) {
  let readStream = fs.createReadStream(file, "utf-8");

  let rl = readline.createInterface({ input: readStream, crlfDelay: Infinity });
  return rl;
}

function calculateLine(file, logFile) {
  let count = 0;
  // let stream = fs.createReadStream(file);
  // stream.on("data", (chunk) => {
  //   for (i = 0; i < chunk.length; ++i) {
  //     if (chunk[i] == 10) {
  //       count++;
  //     }
  //   }
  // });

  // stream.on("end", () => {
  //   process.stdout.write(
  //     count.toString() + " " + (logFile === true ? file : "")
  //   );
  // });
  let rl = createReadLineInterface(file);

  rl.on("line", (l) => {
    count++;
  });

  rl.on("close", () => {
    process.stdout.write(
      count.toString() + " " + (logFile === true ? file : "")
    );
  });
}

function calculateWord(file, logFile) {
  let rl = createReadLineInterface(file);
  let i = 0;
  rl.on("line", (l) => {
    let splittedArray = l.split(" ");
    splittedArray.forEach((w) => {
      if (w.length > 0) {
        i++;
      }
    });
  });

  rl.on("close", () => {
    process.stdout.write(i.toString() + " " + (logFile === true ? file : ""));
  });
}

function calculateChar(file, logFile) {
  let rl = createReadLineInterface(file);
  let i = 0;
  rl.on("line", (l) => {
    let splittedArray = l.split(" ");
    splittedArray.forEach((w) => {
      i = i + w.length;
    });
    i += splittedArray.length - 1; //include space
  });

  rl.on("close", () => {
    process.stdout.write(i.toString() + (logFile === true ? file : ""));
  });
}

function calculateFromString(inputData, flag) {
  let bytes = 0;
  let lines = 0;
  let buffer = Buffer.from(inputData, "utf-8");
  if (flag === "c") {
    bytes = buffer.length;
    return { bytes };
  }

  buffer.forEach((ch) => {
    if (ch === 10) {
      lines++;
    }
  });
  if (flag === "l") {
    return { lines };
  }

  let linesList = inputData.split("\n");
  linesList = linesList.filter((line) => {
    return line !== "" ? true : false;
  });
  // if (flag === "l") {
  //   return { lines: linesList.length };
  // }

  let words = 0;
  let character = 0;
  linesList.forEach((line) => {
    let splittedArray = line.split(" ");
    splittedArray.forEach((w) => {
      if (w.length > 0) {
        words++;
        character = character + w.length;
      }
    });
    character += splittedArray.length - 1;
  });

  return {
    lines,
    words,
    character,
    bytes,
  };
}

module.exports = {
  calculateLine,
  calculateWord,
  calculateByte,
  calculateChar,
  calculateFromString,
};
