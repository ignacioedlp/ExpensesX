import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import CurrencyForm from 'src/components/Currency/CurrencyForm'

const CREATE_CURRENCY_MUTATION = gql`
  mutation CreateCurrencyMutation($input: CreateCurrencyInput!) {
    createCurrency(input: $input) {
      id
    }
  }
`

const NewCurrency = () => {
  const [createCurrency, { loading, error }] = useMutation(
    CREATE_CURRENCY_MUTATION,
    {
      onCompleted: () => {
        toast.success('Currency created')
        navigate(routes.currencies())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createCurrency({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Currency</h2>
      </header>
      <div className="rw-segment-main">
        <CurrencyForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewCurrency
