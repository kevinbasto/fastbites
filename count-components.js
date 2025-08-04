// count-components.js
const fs = require("fs");
const path = require("path");

const ROOT_FOLDER = path.join(__dirname, "src", "app");

let count = 0;

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      walk(fullPath);
    } else {
      if (file.endsWith(".component.ts")) {
        count++;
      }
    }
  }
}

// Inicia recorrido
walk(ROOT_FOLDER);

console.log(`Total .component.ts files: ${count}`);
