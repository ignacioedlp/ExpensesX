import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

const DELETE_EXPENSE_MUTATION = gql`
  mutation DeleteExpenseMutation($id: Int!) {
    deleteExpense(id: $id) {
      id
    }
  }
`

const Expense = ({ expense }) => {
  const [deleteExpense] = useMutation(DELETE_EXPENSE_MUTATION, {
    onCompleted: () => {
      toast.success('Expense deleted')
      navigate(routes.expenses())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete expense ' + id + '?')) {
      deleteExpense({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Expense {expense.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{expense.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{expense.name}</td>
            </tr>
            <tr>
              <th>Amount</th>
              <td>{expense.amount}</td>
            </tr>
            <tr>
              <th>Category</th>
              <td>{expense.category.name}</td>
            </tr>
            <tr>
              <th>User id</th>
              <td>{expense.userId}</td>
            </tr>
            <tr>
              <th>Date</th>
              <td>{timeTag(expense.date)}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(expense.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(expense.updatedAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editExpense({ id: expense.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(expense.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Expense
