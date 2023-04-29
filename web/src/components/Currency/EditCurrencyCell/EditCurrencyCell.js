import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import CurrencyForm from 'src/components/Currency/CurrencyForm'

export const QUERY = gql`
  query EditCurrencyById($id: Int!) {
    currency: currency(id: $id) {
      id
      name
      symbol
      createdAt
      updatedAt
    }
  }
`
const UPDATE_CURRENCY_MUTATION = gql`
  mutation UpdateCurrencyMutation($id: Int!, $input: UpdateCurrencyInput!) {
    updateCurrency(id: $id, input: $input) {
      id
      name
      symbol
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ currency }) => {
  const [updateCurrency, { loading, error }] = useMutation(
    UPDATE_CURRENCY_MUTATION,
    {
      onCompleted: () => {
        toast.success('Currency updated')
        navigate(routes.currencies())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateCurrency({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Currency {currency?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <CurrencyForm
          currency={currency}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
