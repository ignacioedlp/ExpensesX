import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Expense/ExpensesCell'
import { timeTag, truncate } from 'src/lib/formatters'
import moment from 'moment';
import { StatusOnlineIcon } from "@heroicons/react/outline";
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

import {
  Flex,
  Dropdown,
  DropdownItem,
  Bold,
  BarList,
} from "@tremor/react";


import { JSXElementConstructor, useEffect, useState } from "react";

const categories = [
  { key: 5, name: "5 last" },
  { key: 10, name: "10 last" },
  { key: 20, name: "20 last" },
];

const DELETE_EXPENSE_MUTATION = gql`
  mutation DeleteExpenseMutation($id: Int!) {
    deleteExpense(id: $id) {
      id
    }
  }
`

const filterByCategory = (category, data) =>
  category === 20 ? data : data.slice(0, category)

export const LastTransactions = ({ expenses }) => {
  const [selectedCategory, setSelectedCategory] = useState(5);
  const [filteredData, setFilteredData] = useState(null);

  useEffect(() => {
    setFilteredData(filterByCategory(selectedCategory, expenses));
  }, [selectedCategory]);

  return (
    <Card className="w-full mx-auto">
      <Flex className="space-x-8">
        <Title>Last expenses</Title>
        <Dropdown
          onValueChange={(value) => setSelectedCategory(value)}
          placeholder="Source Selection"
          className="max-w-xs"
        >
          {categories.map((category) => (
            <DropdownItem
              key={category.key}
              value={category.key}
              text={category.name}
            />
          ))}
        </Dropdown>
      </Flex>
      <Table className="mt-5">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Amount</TableHeaderCell>
            <TableHeaderCell>Category</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expenses && filteredData?.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>
                <Text>{item.amount} $</Text>
              </TableCell>
              <TableCell>
                <Badge color="emerald">
                  {item.category.name}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

    </Card>
  );
}

export const ExpensesAdminList = ({ expenses }) => {
  const [deleteExpense] = useMutation(DELETE_EXPENSE_MUTATION, {
    onCompleted: () => {
      toast.success('Expense deleted')
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
    if (confirm('Are you sure you want to delete expense ' + id + '?')) {
      deleteExpense({ variables: { id } })
    }
  }

  return (
    <Card>
      <Title>Expenses</Title>
      <Table className="mt-5">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Amount</TableHeaderCell>
            <TableHeaderCell>Date</TableHeaderCell>
            <TableHeaderCell>Category</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expenses.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>
                <Text>{item.amount} $</Text>
              </TableCell>
              <TableCell>
                <Text>{moment(item.date).format('DD-MM-YYYY HH:mm')}</Text>
              </TableCell>
              <TableCell>
                <Badge color="emerald">
                  {item.category.name}
                </Badge>
              </TableCell>
              <TableCell>
                <nav className="rw-table-actions space-x-2">
                  <Button size="xs">
                    <Link
                      to={routes.expense({ id: item.id })}
                      title={'Show expense ' + item.id + ' detail'}
                    >
                      Show
                    </Link>
                  </Button>
                  <Button size="xs" color={"yellow"} >
                    <Link
                      to={routes.editExpense({ id: item.id })}
                      title={'Edit expense ' + item.id}
                    >
                      Edit
                    </Link>
                  </Button>
                  <Button size="xs" color={"red"}>
                    <Link
                      type="button"
                      title={'Delete expense ' + item.id}
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

const ExpensesList = ({ expenses, dashboard = false }) => {
  return dashboard ? (<LastTransactions expenses={expenses} />) : (<ExpensesAdminList expenses={expenses} />)
}

export default ExpensesList
