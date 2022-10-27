import { SearchFormContainer } from "./styles";
import {MagnifyingGlass} from 'phosphor-react'
import { useForm } from "react-hook-form";
import * as z from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import { useContext } from "react";
import { TransactionsContext } from "../../../../contexts/TransactionContext";

const searchFormSchema = z.object({
  query: z.string()
})

type SearchFormInputs = z.infer<typeof searchFormSchema>

export default function SearchForm() {
  const {getTransactions} = useContext(TransactionsContext)
  const {register, handleSubmit, formState: {isSubmitting}} = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema)
  })

  function handleSearchTransactions(data: SearchFormInputs) {

  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input type="text" placeholder="Buscar transações" {...register('query')}/>
      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  )
}