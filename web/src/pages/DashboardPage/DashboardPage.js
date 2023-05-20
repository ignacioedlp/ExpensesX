import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { useEffect, useState } from 'react'
import WalletsCell from 'src/components/Wallet/WalletsCell'
import CategoriesCell from 'src/components/Category/CategoriesCell'
import { SelectBox, SelectBoxItem, Card, Metric, Title } from "@tremor/react";
import { CurrencyDollarIcon } from "@heroicons/react/outline";
import Navbar from 'src/components/Navbar/Navbar'
import GraphAreaCustom from 'src/components/GraphAreaCustom/GraphAreaCustom'
import GraphBarCustom from 'src/components/GraphBarCustom/GraphBarCustom'
import GraphPieCustom from 'src/components/GraphPieCustom/GraphPieCustom'

import { useQuery } from '@redwoodjs/web'
import ExpensesCell from 'src/components/Expense/ExpensesCell'

const CATEGORIES = gql`
  query Categories {
    categories {
      id
      name
      totalForMonth
      color
    }
  }
`

const DashboardPage = () => {

  const [priceUsds, setPriceUsds] = useState(null)
  const [priceUsd, setPriceUsd] = useState(null)
  const { data } = useQuery(CATEGORIES)

  useEffect(() => {
    const fetchPriceUsds = async () => {
      const response = await fetch(
        'https://www.dolarsi.com/api/api.php?type=valoresprincipales'
      )
      const data = await response.json()
      let prices = data.map((item) => {
        return {
          id: item.casa.agencia,
          name: item.casa.nombre,
          price: parseFloat(item.casa.venta.replace(',', '.'))
        }
      });
      setPriceUsds(prices)
    }
    fetchPriceUsds()
  }, [])


  return (
    <>
      <MetaTags title="Dashboard" description="Dashboard page" />

      <div className='w-full flex bg-[#ffffff]'>
        <Navbar />
        <div className='flex flex-col justify-start items-center gap-5 w-full p-4 text-black'>
          <div className='flex flex-col items-center justify-start w-full p-4 gap-5'>
            <div className='w-full flex justify-between items-center px-4 p-6'>
              <Metric className='text-4xl font-bold hidden md:block'>Dashboard</Metric>
              <Metric className='text-4xl font-bold md:hidden'>Board</Metric>
              <div className="relative w-1/2 md:w-72">
                {priceUsds != null && (
                  <SelectBox
                    onValueChange={(value) => setPriceUsd(priceUsds.find((item) => item.id == value))}
                    defaultValue="1"
                  >
                    {priceUsds.map((item) => (
                      <SelectBoxItem value={item?.id} text={`${item?.name} ${Math.round(item?.price)}$`} icon={CurrencyDollarIcon} />
                    ))}
                  </SelectBox>
                )}
              </div>
            </div>
            <div className='justify-center items-center gap-3 md:hidden flex'>
              <Link
                to={routes.dashboard()}
                className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                </svg>


                <span
                  className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100"
                >
                  Dashboard
                </span>
              </Link>
              <Link
                to={routes.expenses()}
                className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                </svg>


                <span
                  className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100"
                >
                  Expenses
                </span>
              </Link>
              <Link
                to={routes.categories()}
                className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z" />
                </svg>



                <span
                  className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100"
                >
                  Categories
                </span>
              </Link>
              <Link
                to={routes.wallets()}
                className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
                </svg>

                <span
                  className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100"
                >
                  Wallets
                </span>
              </Link>
            </div>
          </div>
          <Card className="space-y-3">
            <Title>Wallets</Title>
            <WalletsCell dashboard={true} priceUsd={priceUsd?.price} />
          </Card>
          <div className='flex-col flex lg:flex-row w-full gap-2 justify-between'>
            <Card className='space-y-3'>
              <Title>Expenses</Title>
              <CategoriesCell dashboard={true} />
            </Card>
            <GraphPieCustom data={data?.categories} />
          </div>
          <div className='flex-col flex lg:flex-row w-full gap-2 justify-between '>
            <GraphAreaCustom data={data?.categories} />
            <GraphBarCustom data={data?.categories} />
          </div>
          <div className='flex-col flex lg:flex-row w-full gap-2 justify-between'>
            <ExpensesCell dashboard={true} />
          </div>
        </div>
      </div>
    </>
  )
}

export default DashboardPage
