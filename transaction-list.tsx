"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Transaction } from "./types"

interface TransactionListProps {
  transactions: Transaction[]
}

export default function TransactionList({ transactions }: TransactionListProps) {
  return (
    <div className="rounded-xl overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gradient-to-r from-purple-600/10 to-indigo-600/10 dark:from-purple-600/20 dark:to-indigo-600/20">
            <TableHead>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <AnimatePresence>
            {transactions.map((transaction, index) => (
              <motion.tr
                key={transaction.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                className="group hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors duration-200"
              >
                <TableCell className="font-medium">{transaction.date}</TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell className="capitalize">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 group-hover:bg-white dark:group-hover:bg-gray-700 transition-colors duration-200">
                    {transaction.category.replace("_", " ")}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                      {transaction.type === "income" ? (
                        <ArrowUpIcon className="w-4 h-4 text-green-600 dark:text-green-400" />
                      ) : (
                        <ArrowDownIcon className="w-4 h-4 text-red-600 dark:text-red-400" />
                      )}
                    </motion.div>
                    {transaction.type}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <span
                    className={`font-bold ${
                      transaction.type === "income"
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    ₹{transaction.amount.toFixed(2)}
                  </span>
                </TableCell>
              </motion.tr>
            ))}
          </AnimatePresence>
        </TableBody>
      </Table>
    </div>
  )
}

