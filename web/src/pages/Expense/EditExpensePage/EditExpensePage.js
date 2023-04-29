import EditExpenseCell from 'src/components/Expense/EditExpenseCell'
import { useQuery } from '@redwoodjs/web'

const CATEGORIES = gql`
  query Categories {
    categories {
      id
      name
    }
  }
`

const EditExpensePage = ({ id }) => {
  const { data } = useQuery(CATEGORIES)
  return <EditExpenseCell id={id} categories={data?.categories} />
}

export default EditExpensePage
