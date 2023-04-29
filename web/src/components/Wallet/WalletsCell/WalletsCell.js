import { Link, routes } from '@redwoodjs/router'

import Wallets from 'src/components/Wallet/Wallets'

export const QUERY = gql`
  query FindWallets {
    wallets {
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

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No wallets yet. '}
      <Link to={routes.newWallet()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ wallets, dashboard = false, priceUsd }) => {
  return <Wallets wallets={wallets} dashboard={dashboard} priceUsd={priceUsd} />
}
