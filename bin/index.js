#!/usr/bin/env node
const minimist = require("minimist");
const arg = minimist(process.argv.slice(2));
const fs = require("fs");

const {
  calculateByte,
  calculateChar,
  calculateLine,
  calculateWord,
  calculateFromString,
} = require("../utils/calculate.js");

let keys = Object.keys(arg);
let flag = "_";
keys.forEach((k) => (k !== "_" ? (flag = k) : ""));

/*
-c => calculate bytes
-w => calculate words
-l => calculate lines
-m => calculate character
*/


if (keys.length === 1 && arg._.length === 1) {
  //only file path received
  let filePath = arg._.at(0);
  calculateByte(filePath);
  calculateLine(filePath);
  calculateWord(filePath, true);
} else if (keys.length === 2 && arg._.length === 0) {
  if (typeof arg[flag] === "string") {
    let filePath = arg[flag];
    if (flag === "c") {
      calculateByte(filePath, true);
    } else if (flag === "l") {
      calculateLine(filePath, true);
    } else if (flag === "w") {
      calculateWord(filePath, true);
    } else if (flag === "m") {
      calculateChar(filePath, true);
    }
  }

  //handle input from terminal
  if (typeof arg[flag] === "boolean") {
    process.stdin.setEncoding("utf-8");
    let inputData = "";

    process.stdin.on("data", (chunk) => {
      inputData += chunk;
    });

    process.stdin.on("end", () => {
      if (flag === "c") {
        console.log(calculateFromString(inputData, "c").bytes);
      } else if (flag === "l") {
        console.log(calculateFromString(inputData, "l").lines);
      } else if (flag === "w") {
        console.log(calculateFromString(inputData, "w").words);
      } else if (flag === "m") {
        console.log(calculateFromString(inputData, "m").character);
      } else {
        let { bytes, words, lines } = calculateFromString(inputData);
        console.log(bytes, words, lines);
      }
    });
  }
} else {
  //edge case "ccwc -l"
  console.log("Usage : ccwc -l file.txt \nOptions : -c -l -w -m");
}
