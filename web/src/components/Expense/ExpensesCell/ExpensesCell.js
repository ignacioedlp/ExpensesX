import { Link, routes } from '@redwoodjs/router'

import Expenses from 'src/components/Expense/Expenses'

export const QUERY = gql`
  query FindExpenses {
    expenses {
      id
      name
      amount
      category{
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

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No expenses yet. '}
      <Link to={routes.newExpense()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ expenses }) => {
  return <Expenses expenses={expenses} />
}