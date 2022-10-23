import Header from "../../components/Header/Header";
import Summary from "../../components/Summary/Summary";
import SearchForm from "./components/SearchForm/SearchForm";
import { PriceHighlight, TransactionsContainer, TransactionTable } from "./styles";

export default function Transactions() {
  return (
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />
        <TransactionTable>
          <tbody>
            <tr>
              <td width="50%">Desenvolvimento de site</td>
              <td>
              <PriceHighlight variant="income">
                preçlo
                </PriceHighlight>
                </td>
              <td>Venda</td>
              <td>13/04/2022</td>
            </tr>
            <tr>
              <td width="50%">Desenvolvimento de site</td>
              <td>
              <PriceHighlight variant="outcome">
                preçlo
                </PriceHighlight>
                </td>
              <td>Venda</td>
              <td>13/04/2022</td>
            </tr>
          </tbody>
        </TransactionTable>
      </TransactionsContainer>
    </div>
  )
}