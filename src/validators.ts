import type { Expense } from "./functions.js";

export function addValidator(options: {
  description?: string;
  amount?: number;
}) {
  switch (true) {
    case options.description === undefined:
      throw new Error("Error: Description is required.");
    case options.description !== undefined && options.description.trim() === "":
      throw new Error("Error: Description must be a valid string.");
    case options.amount === undefined:
      throw new Error("Error: Amount is required.");
    case typeof options.amount !== "number" || Number.isNaN(options.amount):
      throw new Error("Error: Amount must be a valid number.");
    case options.amount !== undefined && options.amount <= 0:
      throw new Error("Error: Amount must be greater than zero.");
    default:
      break;
  }
}

export function deleteValidator(id: number) {
  if (Number.isNaN(id) || id <= 0) {
    throw new Error("Error: ID must be a valid positive integer.");
  }
}

export function hasMonthValidator(data: Expense[], month: number) {
  const hasMonth = data.some((expense) => {
    const expenseMonth = new Date(expense.date || "").getMonth() + 1;
    return expenseMonth === month;
  });
  if (!hasMonth) {
    throw new Error(`Error: No expenses found for month ${month}.`);
  }
}

export function monthValidator(month: number) {
  if (Number.isNaN(month) || month < 1 || month > 12) {
    throw new Error("Error: Month must be a valid integer between 1 and 12.");
  }
}
