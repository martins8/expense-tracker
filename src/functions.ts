import { loadData, saveData } from "./storage.js";
import { hasMonthValidator } from "./validators.js";

export interface Expense {
  id?: number;
  date?: string; // ISO format date string
  description: string;
  amount: number;
}

export function addExpense(description: string, amount: number) {
  const expense: Expense = {
    id: getNextId(),
    date: new Date().toLocaleDateString("en-US"),
    description,
    amount,
  };
  saveData([...loadData(), expense]);
  console.log(
    `Adding expense: ${description} - $${amount} (ID: ${expense.id})`,
  );
}

export function deleteExpense(id: number) {
  const expenses = loadData();
  const hasId = expenses.find((expense) => expense.id === id);
  if (!hasId) {
    console.error(`Error: No expense found with ID ${id}.`);
    return;
  }
  const updatedExpenses = expenses.filter((expenses) => expenses.id !== id);
  saveData(updatedExpenses);
  console.log(`Deleted expense with ID ${id}.`);
}

export function listExpenses() {
  const expenses = loadData();
  console.table(expenses, ["id", "date", "description", "amount"]);
}

export function showSummary(month?: number) {
  const expenses = loadData();
  if (month) {
    hasMonthValidator(expenses, month);
    const monthName = getMonthName(month);
    const filtered = expenses.filter((expense) => {
      const expenseMonth = new Date(expense.date || "").getMonth() + 1;
      return expenseMonth === month;
    });
    const total = filtered.reduce((sum, expense) => sum + expense.amount, 0);
    return console.log(`Total expenses for ${monthName}: $${total}`);
  }
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  console.log(`Total expenses: $${total}`);
}

//====================== HELPER FUNCTIONS ===============================
function getNextId(): number {
  const data = loadData();
  if (data.length === 0) {
    return 1;
  }
  return Math.max(...data.map((expense: Expense) => expense.id || 0)) + 1;
}

function getMonthName(month: number): string {
  const date = new Date(2000, month - 1, 1);
  return date.toLocaleString("en-US", { month: "long" });
}
