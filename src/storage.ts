import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import type { Expense } from "./functions.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, "data.json");

export function saveData(data: Expense[]) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}

export function loadData(): Expense[] {
  if (!fs.existsSync(DATA_FILE)) {
    return [];
  }
  const data = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(data) as Expense[];
}
