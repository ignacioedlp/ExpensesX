import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ExpenseForm from 'src/components/Expense/ExpenseForm'

export const QUERY = gql`
  query EditExpenseById($id: Int!) {
    expense: expense(id: $id) {
      id
      name
      amount
      category{
        id
        name
      }
      date
      createdAt
      updatedAt
    }
  }
`
const UPDATE_EXPENSE_MUTATION = gql`
  mutation UpdateExpenseMutation($id: Int!, $input: UpdateExpenseInput!) {
    updateExpense(id: $id, input: $input) {
      id
      name
      amount
      category{
        id
        name
      }
      date
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ expense, categories }) => {
  const [updateExpense, { loading, error }] = useMutation(
    UPDATE_EXPENSE_MUTATION,
    {
      onCompleted: () => {
        toast.success('Expense updated')
        navigate(routes.expenses())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateExpense({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Expense {expense?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <ExpenseForm
          expense={expense}
          onSave={onSave}
          error={error}
          loading={loading}
          categories={categories}
        />
      </div>
    </div>
  )
}
