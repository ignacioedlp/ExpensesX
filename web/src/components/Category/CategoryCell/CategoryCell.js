import Category from 'src/components/Category/Category'

export const QUERY = gql`
  query FindCategoryById($id: Int!) {
    category: category(id: $id) {
      id
      name
      createdAt
      updatedAt
      color
      expenses {
        id
        name
        amount
        date
        category {
          name
        }
      }
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

export const Empty = () => <div>Category not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ category }) => {
  return <Category category={category} />
}
