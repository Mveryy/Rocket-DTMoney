import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Summary from "../../components/Summary/Summary";
import SearchForm from "./components/SearchForm/SearchForm";
import { PriceHighlight, TransactionsContainer, TransactionTable } from "./styles";

interface TransactionProps {
  category: string
  createdAt: string
  description: string
  id: number
  price: number
  type: 'income' | 'outcome'
}

export default function Transactions() {
  const [transactions, setTransactions] = useState<TransactionProps[]>([])
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
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />
        <TransactionTable>
          <tbody>
        {transactions?.map(transaction => {
          return (
            <tr key={transaction.id}>
              <td width="50%">{transaction.description}</td>
              <td>
              <PriceHighlight variant={transaction.type}>
                {transaction.price}
                </PriceHighlight>
                </td>
              <td>{transaction.category}</td>
              <td>{transaction.createdAt}</td>
            </tr>
          )
        })}
          </tbody>
        </TransactionTable>
      </TransactionsContainer>
    </div>
  )
}