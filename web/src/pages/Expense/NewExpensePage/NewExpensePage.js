import NewExpense from 'src/components/Expense/NewExpense'
import { useQuery } from '@redwoodjs/web'

const CATEGORIES = gql`
  query Categories {
    categories {
      id
      name
    }
  }
`

const NewExpensePage = () => {
  const { data } = useQuery(CATEGORIES)

  return <NewExpense categories={data?.categories} />
}

export default NewExpensePage
