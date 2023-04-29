import { Link, routes } from '@redwoodjs/router'

import Currencies from 'src/components/Currency/Currencies'

export const QUERY = gql`
  query FindCurrencies {
    currencies {
      id
      name
      symbol
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No currencies yet. '}
      <Link to={routes.newCurrency()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ currencies }) => {
  return <Currencies currencies={currencies} />
}
