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
  transactions: TransactionsProps[];
  getTransactions: (query?: string) => Promise<void>
}

interface ProviderProps {
  children: ReactNode
}

export const TransactionsContext = createContext({} as ContextProps)

export const TransactionsProvider = ({children}: ProviderProps) => {
  const [transactions, setTransactions] = useState<TransactionsProps[]>([])
  console.log(transactions)

  async function getTransactions(query?: string) {
    const url = new URL('http://localhost:3333/transactions')

    if(query) {
      url.searchParams.append('q', query)
    }

    const response = await fetch(url)
    const data = await response.json();
    setTransactions(data)
  }

  useEffect(() => {
    getTransactions()
  },[])

  return (
    <TransactionsContext.Provider value={{
      transactions,
      getTransactions
    }}>
      {children}
    </TransactionsContext.Provider>
  )
}