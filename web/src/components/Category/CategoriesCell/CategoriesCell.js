import { Link, routes } from '@redwoodjs/router'
import { transformData } from 'src/lib/expensesMonth'
import Categories from 'src/components/Category/Categories'

export const QUERY = gql`
  query FindCategories {
    categories {
      id
      name
      createdAt
      updatedAt
      currency {
        id
        name
        symbol
      }
      totalExpenses
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No categories yet. '}
      <Link to={routes.newCategory()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ categories, dashboard = false }) => {
  return <Categories categories={categories} dashboard={dashboard} />
}
