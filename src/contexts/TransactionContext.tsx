import { createContext, ReactNode, useEffect, useState } from "react";

interface TransactionsProps {
  category: string
  createdAt: string
  description: string
  id: number
  price: number
  type: 'income' | 'outcome'
}

interface ContextProps {
  transactions: TransactionsProps[]
}

interface ProviderProps {
  children: ReactNode
}

export const TransactionsContext = createContext({} as ContextProps)

export const TransactionsProvider = ({children}: ProviderProps) => {
  const [transactions, setTransactions] = useState<TransactionsProps[]>([])
  console.log(transactions)

  async function getTransactions() {
    const response = await fetch('http://localhost:3333/transactions')
    const data = await response.json();
    setTransactions(data)
  }

  useEffect(() => {
    getTransactions()
  },[])

  return (
    <TransactionsContext.Provider value={{
      transactions
    }}>
      {children}
    </TransactionsContext.Provider>
  )
}