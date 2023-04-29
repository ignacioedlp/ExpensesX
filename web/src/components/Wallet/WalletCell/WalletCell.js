import Wallet from 'src/components/Wallet/Wallet'

export const QUERY = gql`
  query FindWalletById($id: Int!) {
    wallet: wallet(id: $id) {
      id
      title
      amount
      userId
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Wallet not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ wallet }) => {
  return <Wallet wallet={wallet} />
}
