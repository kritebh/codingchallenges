const fs = require("fs");

function calculateByte(file, logFile) {
  let fileStats = fs.statSync(file);
  process.stdout.write(
    fileStats.size.toString() + " " + (logFile === true ? file : "")
  );
}

function calculateLine(file, logFile) {
  let count = 0;

  fs.readFile(file, (err, data) => {
    if (err) {
      console.error(err);
    } else {
      data.forEach((d) => {
        if (d === 10) {
          count++;
        }
      });
      process.stdout.write(
        count.toString() + " " + (logFile === true ? file : "")
      );
    }
  });
}

function calculateWord(file, logFile) {
  fs.readFile(file, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const words = data.split(/\s+/); // This regex splits by whitespace (space, tab, newline, etc.)

      // Remove empty strings from the array (e.g., due to multiple spaces)
      const nonEmptyWords = words.filter((word) => word.trim() !== "");

      // Calculate the number of words
      const wordCount = nonEmptyWords.length;
      process.stdout.write(
        wordCount.toString() + " " + (logFile === true ? file : "")
      );
    }
  });
}

function calculateChar(file, logFile) {
  fs.readFile(file, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      process.stdout.write(
        data.length.toString() + " " + (logFile === true ? file : "")
      );
    }
  });
}

// function calculateFromString(inputData, flag) {
//   let bytes = 0;
//   let lines = 0;
//   let buffer = Buffer.from(inputData, "utf-8");
//   if (flag === "c") {
//     bytes = buffer.length;
//     // bytes = Buffer.byteLength(inputData);
//     return { bytes };
//   }

//   buffer.forEach((ch) => {
//     if (ch === 10) {
//       lines++;
//     }
//   });
//   if (flag === "l") {
//     return { lines };
//   }

//   let words = 0;
//   let character = 0;
//   linesList.forEach((line) => {
//     let splittedArray = line.split(" ");
//     splittedArray.forEach((w) => {
//       if (w.length > 0) {
//         words++;
//         character = character + w.length;
//       }
//     });
//     character += splittedArray.length - 1;
//   });

//   return {
//     lines,
//     words,
//     character,
//     bytes,
//   };
// }

module.exports = {
  calculateLine,
  calculateWord,
  calculateByte,
  calculateChar,
  // calculateFromString,
};
