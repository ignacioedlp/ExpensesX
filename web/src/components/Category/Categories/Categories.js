import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Category/CategoriesCell'
import { timeTag, truncate } from 'src/lib/formatters'
import moment from 'moment';
import {
  Card,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text,
  Title,
  Badge,
} from "@tremor/react";
import { Button } from "@tremor/react";


const DELETE_CATEGORY_MUTATION = gql`
  mutation DeleteCategoryMutation($id: Int!) {
    deleteCategory(id: $id) {
      id
    }
  }
`

const CategoriesDashboard = ({ categories }) => {

  return (
    <div class="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
      {categories.map((category) => (

        <div class="flex flex-col justify-center px-4 py-4 border border-gray-300 rounded bg-[#2B2C31]">
          <div>
            <p class="text-2xl md:text-3xl font-semibold text-center text-white">{(parseFloat(category.totalExpenses)).toLocaleString('en-US')}$</p>
            <p class="text-lg text-center text-white">{category.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const CategoriesListAdmin = ({ categories }) => {
  const [deleteCategory] = useMutation(DELETE_CATEGORY_MUTATION, {
    onCompleted: () => {
      toast.success('Category deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete category ' + id + '?')) {
      deleteCategory({ variables: { id } })
    }
  }

  return (
    <Card>
      <Title>Categories</Title>
      <Table className="mt-5">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Date</TableHeaderCell>
            <TableHeaderCell>Category</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>
                <Text>{moment(item.date).format('DD-MM-YYYY HH:mm')}</Text>
              </TableCell>
              <TableCell>
                <Badge color="emerald">
                  {item.currency.name}
                </Badge>
              </TableCell>
              <TableCell>
                <nav className="rw-table-actions space-x-2">
                  <Button size="xs">
                    <Link
                      to={routes.category({ id: item.id })}
                      title={'Show category ' + item.id + ' detail'}
                    >
                      Show
                    </Link>
                  </Button>
                  <Button size="xs" color={"yellow"} >
                    <Link
                      to={routes.editCategory({ id: item.id })}
                      title={'Edit category ' + item.id}
                    >
                      Edit
                    </Link>
                  </Button>
                  <Button size="xs" color={"red"}>
                    <Link
                      type="button"
                      title={'Delete category ' + item.id}
                      onClick={() => onDeleteClick(item.id)}
                    >
                      Delete
                    </Link>
                  </Button>
                </nav>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}

const CategoriesList = ({ categories, dashboard = false }) => {
  return dashboard ? (<CategoriesDashboard categories={categories} />) : (<CategoriesListAdmin categories={categories} />)
}

export default CategoriesList
