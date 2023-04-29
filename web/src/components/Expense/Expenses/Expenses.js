import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Expense/ExpensesCell'
import { timeTag, truncate } from 'src/lib/formatters'

const DELETE_EXPENSE_MUTATION = gql`
  mutation DeleteExpenseMutation($id: Int!) {
    deleteExpense(id: $id) {
      id
    }
  }
`

const ExpensesList = ({ expenses }) => {
  const [deleteExpense] = useMutation(DELETE_EXPENSE_MUTATION, {
    onCompleted: () => {
      toast.success('Expense deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete expense ' + id + '?')) {
      deleteExpense({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Amount</th>
            <th>Category</th>
            <th>User id</th>
            <th>Date</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td>{truncate(expense.id)}</td>
              <td>{truncate(expense.name)}</td>
              <td>{truncate(expense.amount)}</td>
              <td>{truncate(expense.category.name)}</td>
              <td>{truncate(expense.userId)}</td>
              <td>{timeTag(expense.date)}</td>
              <td>{timeTag(expense.createdAt)}</td>
              <td>{timeTag(expense.updatedAt)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.expense({ id: expense.id })}
                    title={'Show expense ' + expense.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editExpense({ id: expense.id })}
                    title={'Edit expense ' + expense.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete expense ' + expense.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(expense.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ExpensesList
