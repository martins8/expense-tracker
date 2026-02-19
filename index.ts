#!/usr/bin/env node
import { Command } from "commander";
import {
  addExpense,
  listExpenses,
  deleteExpense,
  showSummary,
} from "./src/functions.js";
import {
  addValidator,
  deleteValidator,
  monthValidator,
} from "./src/validators.js";

const program = new Command();

program
  .name("expense-tracker")
  .description("A simple expense tracker CLI application")
  .version("1.0.0")
  .showHelpAfterError();

program
  .command("add")
  .description("Add a new expense")
  .requiredOption("-d, --description <description>", "Expense description")
  .requiredOption("-a, --amount <amount>", "Expense amount", parseFloat)
  .action((options) => {
    try {
      addValidator(options);
      const { description, amount } = options;
      addExpense(description, amount);
    } catch (error) {
      console.error(
        error instanceof Error ? error.message : "Error: Invalid input.",
      );
      process.exitCode = 1;
    }
  });

program
  .command("delete")
  .description("Delete an expense by ID")
  .requiredOption("-i, --id <id>", "Expense ID", parseInt)
  .action((option) => {
    try {
      deleteValidator(option.id);
      const id = option.id;
      deleteExpense(id);
    } catch (error) {
      console.error(
        error instanceof Error ? error.message : "Error: Invalid input.",
      );
      process.exitCode = 1;
    }
  });

program
  .command("list")
  .description("List all expenses")
  .action(() => {
    listExpenses();
  });

program
  .command("summary")
  .description("Show expense summary")
  .option("-m, --month <month>", "Filter by month (1-12)", parseInt)
  .action((option) => {
    try {
      if (option.month === undefined) {
        showSummary();
      } else {
        monthValidator(option.month);
        showSummary(option.month);
      }
    } catch (error) {
      console.error(
        error instanceof Error ? error.message : "Error: Invalid input.",
      );
      process.exitCode = 1;
    }
  });

program.parse(process.argv);
