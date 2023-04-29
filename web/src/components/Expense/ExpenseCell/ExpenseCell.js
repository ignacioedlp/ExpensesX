import Expense from 'src/components/Expense/Expense'

export const QUERY = gql`
  query FindExpenseById($id: Int!) {
    expense: expense(id: $id) {
      id
      name
      amount
      category {
        name
        id
      }
      userId
      date
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Expense not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ expense }) => {
  return <Expense expense={expense} />
}
