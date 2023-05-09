import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { useEffect, useState } from 'react'
import WalletsCell from 'src/components/Wallet/WalletsCell'
import CategoriesCell from 'src/components/Category/CategoriesCell'
// import ExpensesLinearGraph from 'src/components/ExpensesLinearGraph/ExpensesLinearGraph'
import Navbar from 'src/components/Navbar/Navbar'
import GraphAreaCustom from 'src/components/GraphAreaCustom/GraphAreaCustom'
import GraphBarCustom from 'src/components/GraphBarCustom/GraphBarCustom'
import GraphPieCustom from 'src/components/GraphPieCustom/GraphPieCustom'

import { useQuery } from '@redwoodjs/web'

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

      <div className='w-full flex bg-[#201F25]'>
        <Navbar />
        <div className='flex flex-col justify-start items-center gap-5 w-full p-4 text-white'>
          <div className='w-full flex justify-between items-center px-4 p-6'>
            <h2 className='text-4xl font-bold hidden md:block'>Dashboard</h2>
            <h2 className='text-4xl font-bold md:hidden'>Board</h2>
            <div className="relative w-1/2 md:w-72">
              {priceUsds != null && (
                <select
                  className="block appearance-none w-full bg-transparent border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                  onChange={(e) => {
                    setPriceUsd(priceUsds.find((item) => item.id == e.target.value))
                  }}
                  style={{ background: "transparent" }}  // Fondo Transparente
                >
                  {priceUsds.map((item) => (
                    <option key={item?.name} value={item?.id} className="bg-transparent">
                      {item?.name}
                    </option>
                  ))}
                </select>
              )}
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path
                    d="M9.29289 12.2929C9.68342 12.6834 10.3166 12.6834 10.7071 12.2929L14.7071 8.29289C15.0976 7.90237 15.0976 7.2692 14.7071 6.87868C14.3166 6.48815 13.6834 6.48815 13.2929 6.87868L10 10.1716L6.70711 6.87868C6.31658 6.48815 5.68342 6.48815 5.29289 6.87868C4.90237 7.2692 4.90237 7.90237 5.29289 8.29289L9.29289 12.2929ZM9.5 2C13.0899 2 16 4.91015 16 8.5C16 12.0899 13.0899 15 9.5 15C5.91015 15 3 12.0899 3 8.5C3 4.91015 5.91015 2 9.5 2Z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className='flex flex-col justify-start items-center md:items-start w-full px-4 rounded-sm border py-4'>
            <h3 className='text-2xl font-bold mb-4'>Wallets</h3>
            <WalletsCell dashboard={true} priceUsd={priceUsd?.price} />
          </div>
          <div className='flex-col flex lg:flex-row w-full gap-2 justify-between'>
            <div className='flex flex-col justify-start items-center md:items-start w-full px-4 rounded-sm border py-4'>
              <h3 className='text-2xl font-bold mb-4'>Expenses</h3>
              <CategoriesCell dashboard={true} />
            </div>
            <GraphPieCustom data={data?.categories} />
          </div>
          <div className='flex-col flex lg:flex-row w-full gap-2 justify-between '>
            <GraphAreaCustom data={data?.categories} />
            <GraphBarCustom data={data?.categories} />
          </div>
        </div>
      </div>
    </>
  )
}

export default DashboardPage
