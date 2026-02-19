# Expense Tracker CLI

A simple command-line expense tracker application built with TypeScript and Node.js.

## Features

- ✅ Add expenses with description and amount
- ✅ List all expenses in a table format
- ✅ Delete expenses by ID
- ✅ View expense summary (total or filtered by month)
- ✅ Data persistence using JSON file storage
- ✅ Input validation for all commands

## Requirements

- Node.js (v18 or higher recommended)
- npm

## Installation

### For Development/Local Use

1. Clone the repository:

```bash
git clone <repository-url>
cd expense-tracker
```

2. Install dependencies:

```bash
npm install
```

3. Link the CLI globally:

```bash
npm link
```

Now you can use the `expense-tracker` command from anywhere in your terminal.

### Alternative: Run Without Global Installation

You can also run the CLI without installing globally:

```bash
# Using tsx directly
npx tsx index.ts <command> [options]

# Or using the start script
npm run start -- <command> [options]
```

## Usage

### Add an Expense

Add a new expense with a description and amount:

```bash
expense-tracker add --description "Lunch" --amount 20
expense-tracker add -d "Coffee" -a 5.50
```

**Validations:**

- Description is required and cannot be empty
- Amount must be a positive number greater than zero

### List All Expenses

Display all expenses in a table format:

```bash
expense-tracker list
```

Output example:

```
┌─────────┬────┬────────────┬─────────────┬────────┐
│ (index) │ id │    date    │ description │ amount │
├─────────┼────┼────────────┼─────────────┼────────┤
│    0    │ 1  │ 2/19/2026  │   Lunch     │   20   │
│    1    │ 2  │ 2/19/2026  │   Coffee    │  5.5   │
└─────────┴────┴────────────┴─────────────┴────────┘
```

### Delete an Expense

Remove an expense by its ID:

```bash
expense-tracker delete --id 1
expense-tracker delete -i 1
```

**Validations:**

- ID must be a valid positive integer
- Expense with the given ID must exist

### View Summary

Show total expenses for all time:

```bash
expense-tracker summary
```

Show total expenses for a specific month (1-12):

```bash
expense-tracker summary --month 2
expense-tracker summary -m 2
```

**Validations:**

- Month must be between 1 and 12
- Displays error if no expenses found for the specified month

### Show Help

Display available commands and options:

```bash
expense-tracker --help
expense-tracker add --help
```

### Show Version

```bash
expense-tracker --version
```

## Development

### Project Structure

```
expense-tracker/
├── index.ts              # CLI entry point and command definitions
├── src/
│   ├── functions.ts      # Core business logic
│   ├── storage.ts        # File I/O operations
│   ├── validators.ts     # Input validation logic
│   └── data.json         # Persistent data storage
├── dist/                 # Compiled JavaScript (generated)
├── package.json
├── tsconfig.json
└── README.md
```

### Available Scripts

- `npm run build` - Compile TypeScript to JavaScript in `dist/`
- `npm run clean` - Remove the `dist/` folder
- `npm run clean:build` - Clean and rebuild
- `npm run start` - Run the CLI without compilation (using tsx)
- `npm link` - Create global symlink for the `expense-tracker` command

### Important Notes

1. **Updating `dist/`**: After modifying TypeScript files, run `npm run build` to update the compiled output. The global command uses files from `dist/`, so changes won't take effect until you rebuild.

2. **Orphaned files**: If you delete `.ts` files, run `npm run clean:build` to remove old compiled files from `dist/`.

3. **Data storage**: All expenses are stored in `src/data.json`. This file is created automatically when you add your first expense.

## Data Format

Expenses are stored in JSON format:

```json
[
  {
    "id": 1,
    "date": "2/19/2026",
    "description": "Lunch",
    "amount": 20
  },
  {
    "id": 2,
    "date": "2/19/2026",
    "description": "Coffee",
    "amount": 5.5
  }
]
```

## Error Handling

The application provides clear error messages for common issues:

- Missing required options (description, amount, ID)
- Invalid data types (non-numeric amount or ID)
- Invalid values (negative amounts, months outside 1-12)
- Non-existent IDs when deleting
- Empty months when filtering summary

## License

ISC

## Project URL

This project is based on the [Expense Tracker Challenge](https://roadmap.sh/projects/expense-tracker) from roadmap.sh.
