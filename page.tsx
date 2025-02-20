"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import AddTransactionDialog from "./add-transaction-dialog"
import TransactionList from "./transaction-list"
import type { Transaction } from "./types"

export default function MoneyManager() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 1,
      description: "Salary",
      amount: 5000,
      type: "income",
      category: "salary",
      date: "2024-02-20",
    },
    {
      id: 2,
      description: "Rent",
      amount: 1500,
      type: "expense",
      category: "housing",
      date: "2024-02-19",
    },
    {
      id: 3,
      description: "Groceries",
      amount: 200,
      type: "expense",
      category: "food",
      date: "2024-02-18",
    },
  ])

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const addTransaction = (transaction: Omit<Transaction, "id">) => {
    setTransactions([
      ...transactions,
      {
        ...transaction,
        id: transactions.length + 1,
      },
    ])
  }

  const totalIncome = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)

  const totalExpenses = transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)

  const balance = totalIncome - totalExpenses

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="container mx-auto p-4 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center"
        >
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
            Money Manager
          </h1>
          <Button
            onClick={() => setIsDialogOpen(true)}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Transaction
          </Button>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <Card className="backdrop-blur-md bg-white/50 dark:bg-gray-800/50 border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <motion.div
                  className="text-3xl font-bold"
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  ₹{balance.toFixed(2)}
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <Card className="backdrop-blur-md bg-white/50 dark:bg-gray-800/50 border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Income</CardTitle>
              </CardHeader>
              <CardContent>
                <motion.div
                  className="text-3xl font-bold text-green-600 dark:text-green-400"
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  ₹{totalIncome.toFixed(2)}
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <Card className="backdrop-blur-md bg-white/50 dark:bg-gray-800/50 border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Expenses</CardTitle>
              </CardHeader>
              <CardContent>
                <motion.div
                  className="text-3xl font-bold text-red-600 dark:text-red-400"
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  ₹{totalExpenses.toFixed(2)}
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="backdrop-blur-md bg-white/50 dark:bg-gray-800/50 rounded-xl shadow-xl"
        >
          <TransactionList transactions={transactions} />
        </motion.div>

        <AddTransactionDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onSubmit={(data) => {
            addTransaction(data)
            setIsDialogOpen(false)
          }}
        />
      </div>
    </div>
  )
}

