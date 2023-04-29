import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

const DELETE_CURRENCY_MUTATION = gql`
  mutation DeleteCurrencyMutation($id: Int!) {
    deleteCurrency(id: $id) {
      id
    }
  }
`

const Currency = ({ currency }) => {
  const [deleteCurrency] = useMutation(DELETE_CURRENCY_MUTATION, {
    onCompleted: () => {
      toast.success('Currency deleted')
      navigate(routes.currencies())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete currency ' + id + '?')) {
      deleteCurrency({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Currency {currency.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{currency.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{currency.name}</td>
            </tr>
            <tr>
              <th>Symbol</th>
              <td>{currency.symbol}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(currency.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(currency.updatedAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editCurrency({ id: currency.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(currency.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Currency
