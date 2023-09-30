#!/usr/bin/env node
const minimist = require("minimist");
const arg = minimist(process.argv.slice(2));
const fs = require("fs/promises");

const {
  calculateByte,
  calculateLine,
  calculateWord,
  countStats,
} = require("../utils/utils.js");

let keys = Object.keys(arg);
let flag = "_";
keys.forEach((k) => (k !== "_" ? (flag = k) : ""));

/*
-c => calculate bytes
-w => calculate words
-l => calculate lines
-m => calculate character
*/
async function init() {
  //only file path received
  if (keys.length === 1 && arg._.length === 1) {
    let filePath = arg._.at(0);
    let stats = await countStats(filePath);
    process.stdout.write(
      stats.bytes.toString() +
        " " +
        stats.lines.toString() +
        " " +
        stats.words.toString() +
        " " +
        filePath
    );
  } else if (keys.length === 2 && arg._.length === 0) {
    if (typeof arg[flag] === "string") {
      let filePath = arg[flag];
      let stats = await countStats(filePath);
      if (flag === "c") {
        process.stdout.write(stats.bytes.toString() + " " + filePath);
      } else if (flag === "l") {
        process.stdout.write(stats.lines.toString() + " " + filePath);
      } else if (flag === "w") {
        process.stdout.write(stats.words.toString() + " " + filePath);
      } else if (flag === "m") {
        process.stdout.write(stats.chars.toString() + " " + filePath);
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
          process.stdout.write(calculateByte(inputData).toString());
        } else if (flag === "l") {
          process.stdout.write(calculateLine(inputData).toString());
        } else if (flag === "w") {
          process.stdout.write(calculateWord(inputData).toString());
        } else if (flag === "m") {
          process.stdout.write(calculateByte(inputData).toString());
        }
      });
    }
  } else {
    //edge case "ccwc -l"
    console.log("Usage : ccwc -l file.txt \nOptions : -c -l -w -m");
  }
}
init();
