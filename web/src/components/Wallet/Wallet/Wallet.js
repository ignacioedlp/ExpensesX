import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

const DELETE_WALLET_MUTATION = gql`
  mutation DeleteWalletMutation($id: Int!) {
    deleteWallet(id: $id) {
      id
    }
  }
`

const Wallet = ({ wallet }) => {
  const [deleteWallet] = useMutation(DELETE_WALLET_MUTATION, {
    onCompleted: () => {
      toast.success('Wallet deleted')
      navigate(routes.wallets())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete wallet ' + id + '?')) {
      deleteWallet({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Wallet {wallet.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{wallet.id}</td>
            </tr>
            <tr>
              <th>Title</th>
              <td>{wallet.title}</td>
            </tr>
            <tr>
              <th>Amount</th>
              <td>{wallet.amount}</td>
            </tr>
            <tr>
              <th>User id</th>
              <td>{wallet.userId}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(wallet.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(wallet.updatedAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editWallet({ id: wallet.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(wallet.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Wallet
