import { Link, routes } from '@redwoodjs/router'
import { useEffect } from 'react';

import Expenses, { LastTransactions } from 'src/components/Expense/Expenses'

export const QUERY = gql`
  query FindExpenses {
    expenses{
      id
      name
      amount
      category {
        id
        name
        color
      }
      userId
      date
      createdAt
      updatedAt
    }
  }
`;

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

export const Success = ({ expenses, dashboard = false }) => {
  return <Expenses expenses={expenses} dashboard={dashboard} />
}
