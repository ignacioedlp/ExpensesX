import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Currency/CurrenciesCell'
import { timeTag, truncate } from 'src/lib/formatters'

const DELETE_CURRENCY_MUTATION = gql`
  mutation DeleteCurrencyMutation($id: Int!) {
    deleteCurrency(id: $id) {
      id
    }
  }
`

const CurrenciesList = ({ currencies }) => {
  const [deleteCurrency] = useMutation(DELETE_CURRENCY_MUTATION, {
    onCompleted: () => {
      toast.success('Currency deleted')
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
    if (confirm('Are you sure you want to delete currency ' + id + '?')) {
      deleteCurrency({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Symbol</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {currencies.map((currency) => (
            <tr key={currency.id}>
              <td>{truncate(currency.id)}</td>
              <td>{truncate(currency.name)}</td>
              <td>{truncate(currency.symbol)}</td>
              <td>{timeTag(currency.createdAt)}</td>
              <td>{timeTag(currency.updatedAt)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.currency({ id: currency.id })}
                    title={'Show currency ' + currency.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editCurrency({ id: currency.id })}
                    title={'Edit currency ' + currency.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete currency ' + currency.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(currency.id)}
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

export default CurrenciesList
