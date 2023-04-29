import NewCategory from 'src/components/Category/NewCategory'
import { useQuery } from '@redwoodjs/web'

const CURRENCIES = gql`
  query Currencies {
    currencies {
      id
      name
    }
  }
`

const NewCategoryPage = () => {
  const { data } = useQuery(CURRENCIES)

  return <NewCategory currencies={data?.currencies } />
}

export default NewCategoryPage
