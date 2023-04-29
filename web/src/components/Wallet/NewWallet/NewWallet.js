import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { useAuth } from 'src/auth'
import WalletForm from 'src/components/Wallet/WalletForm'

const CREATE_WALLET_MUTATION = gql`
  mutation CreateWalletMutation($input: CreateWalletInput!) {
    createWallet(input: $input) {
      id
    }
  }
`

const NewWallet = () => {
  const [createWallet, { loading, error }] = useMutation(
    CREATE_WALLET_MUTATION,
    {
      onCompleted: () => {
        toast.success('Wallet created')
        navigate(routes.wallets())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const { currentUser } = useAuth()

  const onSave = (input) => {
    createWallet({ variables: { input: { ...input, userId: currentUser.id } } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Wallet</h2>
      </header>
      <div className="rw-segment-main">
        <WalletForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewWallet
