import { createContext, ReactNode, useEffect, useState } from 'react'
import { api } from '../lib/axios'

interface TransactionsProps {
  category: string
  createdAt: string
  description: string
  id: number
  price: number
  type: 'income' | 'outcome'
}

interface CreateTransactionProps {
  description: string
  price: number
  category: string
  type: 'income' | 'outcome'
}

interface ContextProps {
  transactions: TransactionsProps[]
  getTransactions: (query?: string) => Promise<void>
  createTransaction: (data: CreateTransactionProps) => Promise<void>
}

interface ProviderProps {
  children: ReactNode
}

export const TransactionsContext = createContext({} as ContextProps)

export const TransactionsProvider = ({ children }: ProviderProps) => {
  const [transactions, setTransactions] = useState<TransactionsProps[]>([])
  console.log(transactions)

  async function getTransactions(query?: string) {
    const response = await api.get('transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query,
      },
    })
    setTransactions(response.data)
  }

  async function createTransaction(data: CreateTransactionProps) {
    const { category, description, price, type } = data

    const response = await api.post('transactions', {
      category,
      description,
      price,
      type,
      createdAt: new Date(),
    })

    setTransactions((state) => [response.data, ...state])
  }

  useEffect(() => {
    getTransactions()
  }, [])

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        getTransactions,
        createTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
