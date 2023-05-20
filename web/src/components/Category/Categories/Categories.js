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
  Grid,
  Metric,
  Badge,
  Flex,
  ProgressBar
} from "@tremor/react";
import { Button } from "@tremor/react";



const DELETE_CATEGORY_MUTATION = gql`
  mutation DeleteCategoryMutation($id: Int!) {
    deleteCategory(id: $id) {
      id
    }
  }
`

const calculatePercente = (data, item) => {
  // la suma de toda la data / item
  let total = data.reduce((a, c) => a + c.totalExpenses, 0);
  return parseFloat((item.totalExpenses / total) * 100).toFixed(2)

}

const CategoriesDashboard = ({ categories }) => {

  return (
    <Grid numColsSm={2} numColsLg={3} className="gap-6">
      {categories.map((item) => (
        <Card key={item.name}>
          <Text>{item.name}</Text>
          <Metric>${(parseFloat(item.totalExpenses)).toLocaleString('en-US')}</Metric>
          {/* agregar el porcentaje */}
          <Flex className="mt-4">
            <Text className="truncate">{`$${calculatePercente(categories, item)}% ($${parseFloat(item.totalExpenses).toLocaleString('en-US')})`}</Text>
            <Text>${Math.round(categories.reduce((a, c) => a + c.totalExpenses, 0)).toLocaleString('en-US')}</Text>
          </Flex>
          <ProgressBar
            percentageValue={calculatePercente(categories, item)}
            className="mt-2"
            color='violet'
          />
        </Card>
      ))}
    </Grid>
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
