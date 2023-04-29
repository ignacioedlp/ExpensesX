import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { useAuth } from 'src/auth'
import CategoryForm from 'src/components/Category/CategoryForm'

const CREATE_CATEGORY_MUTATION = gql`
  mutation CreateCategoryMutation($input: CreateCategoryInput!) {
    createCategory(input: $input) {
      id
    }
  }
`

const NewCategory = ({ currencies }) => {
  const [createCategory, { loading, error }] = useMutation(
    CREATE_CATEGORY_MUTATION,
    {
      onCompleted: () => {
        toast.success('Category created')
        navigate(routes.categories())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const { currentUser } = useAuth()

  const onSave = (input) => {
    createCategory({ variables: { input: { ...input, userId: currentUser.id } } })
  }


  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Category</h2>
      </header>
      <div className="rw-segment-main">
        <CategoryForm onSave={onSave} loading={loading} error={error} currencies={currencies} />
      </div>
    </div>
  )
}

export default NewCategory
