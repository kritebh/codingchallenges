const fs = require("fs/promises");

async function readFile(filePath) {
  let data = await fs.readFile(filePath, "utf-8");
  return data;
}

const calculateByte = (data) => {
  return Buffer.byteLength(data);
};

const calculateChar = (data) => {
  return data.length;
};

const calculateLine = (data) => {
  return data.split("\n").length;
};

const calculateWord = (data) => {
  return data.split(/\s+/).filter((word) => word !== "").length;
};

async function countStats(filePath) {
  let stats = {};
  let data = await readFile(filePath);

  stats.bytes = calculateByte(data);
  stats.words = calculateWord(data);
  stats.lines = calculateLine(data);
  stats.chars = calculateChar(data);

  return stats;
}

module.exports = {
  calculateLine,
  calculateWord,
  calculateByte,
  readFile,
  countStats,
  calculateChar,
};
