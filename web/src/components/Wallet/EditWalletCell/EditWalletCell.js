import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import WalletForm from 'src/components/Wallet/WalletForm'

export const QUERY = gql`
  query EditWalletById($id: Int!) {
    wallet: wallet(id: $id) {
      id
      title
      amount
      createdAt
      updatedAt
    }
  }
`
const UPDATE_WALLET_MUTATION = gql`
  mutation UpdateWalletMutation($id: Int!, $input: UpdateWalletInput!) {
    updateWallet(id: $id, input: $input) {
      id
      title
      amount
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ wallet }) => {
  const [updateWallet, { loading, error }] = useMutation(
    UPDATE_WALLET_MUTATION,
    {
      onCompleted: () => {
        toast.success('Wallet updated')
        navigate(routes.wallets())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateWallet({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Wallet {wallet?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <WalletForm
          wallet={wallet}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
