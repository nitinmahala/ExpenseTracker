export type TransactionType = "income" | "expense"

export type TransactionCategory =
  | "salary"
  | "investments"
  | "other_income"
  | "housing"
  | "transportation"
  | "food"
  | "utilities"
  | "healthcare"
  | "entertainment"
  | "other_expense"

export interface Transaction {
  id: number
  description: string
  amount: number
  type: TransactionType
  category: TransactionCategory
  date: string
}

