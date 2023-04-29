import Currency from 'src/components/Currency/Currency'

export const QUERY = gql`
  query FindCurrencyById($id: Int!) {
    currency: currency(id: $id) {
      id
      name
      symbol
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Currency not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ currency }) => {
  return <Currency currency={currency} />
}
