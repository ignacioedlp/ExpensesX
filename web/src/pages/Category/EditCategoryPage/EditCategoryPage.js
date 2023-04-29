import EditCategoryCell from 'src/components/Category/EditCategoryCell'
import { useQuery } from '@redwoodjs/web'

const CURRENCIES = gql`
  query Currencies {
    currencies {
      id
      name
    }
  }
`

const EditCategoryPage = ({ id }) => {

  const { data } = useQuery(CURRENCIES)

  return <EditCategoryCell id={id} currencies={data?.currencies} />
}

export default EditCategoryPage
