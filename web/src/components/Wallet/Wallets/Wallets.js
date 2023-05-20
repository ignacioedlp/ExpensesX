import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Wallet/WalletsCell'
import { timeTag, truncate } from 'src/lib/formatters'
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

const DELETE_WALLET_MUTATION = gql`
  mutation DeleteWalletMutation($id: Int!) {
    deleteWallet(id: $id) {
      id
    }
  }
`

const walletListAdmin = ({ wallets }) => {
  const [deleteWallet] = useMutation(DELETE_WALLET_MUTATION, {
    onCompleted: () => {
      toast.success('Wallet deleted')
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
    if (confirm('Are you sure you want to delete wallet ' + id + '?')) {
      deleteWallet({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Amount</th>
            <th>User id</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {wallets.map((wallet) => (
            <tr key={wallet.id}>
              <td>{truncate(wallet.id)}</td>
              <td>{truncate(wallet.title)}</td>
              <td>{truncate(wallet.amount)}</td>
              <td>{truncate(wallet.userId)}</td>
              <td>{timeTag(wallet.createdAt)}</td>
              <td>{timeTag(wallet.updatedAt)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.wallet({ id: wallet.id })}
                    title={'Show wallet ' + wallet.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editWallet({ id: wallet.id })}
                    title={'Edit wallet ' + wallet.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete wallet ' + wallet.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(wallet.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const walletDashboard = ({ wallets, priceUsd }) => {
  const [deleteWallet] = useMutation(DELETE_WALLET_MUTATION, {
    onCompleted: () => {
      toast.success('Wallet deleted')
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
    if (confirm('Are you sure you want to delete wallet ' + id + '?')) {
      deleteWallet({ variables: { id } })
    }
  }

  const totalWallet = wallets.reduce((total, wallet) => total + wallet.amount, 0)

  return (
    <body class="flex items-center justify-center text-gray-800">
      <div class="grid lg:grid-cols-3 md:grid-cols-2 gap-6 w-full max-w-6xl">
        {wallets.map((wallet) => (
          <div class="flex items-center p-4 rounded shadow-lg bg-[#2B2C31] gap-2" key={wallet.id}>
            <div class="flex flex-shrink-0 items-center justify-center bg-green-200 h-16 w-16 rounded">
              {/* crea un svg de $ */}
              <svg class="w-6 h-6 fill-current text-green-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                {/* crea un path de $ */}
                <path fill-rule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414
                1.414L11 5.414V15a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="flex-grow flex flex-col ml-4 gap-1">
              <span class="text-xl font-bold text-white">{wallet.title}</span>
              <span class="text-xl font-bold  text-white">${(parseFloat(wallet.amount)).toLocaleString('en-US')} USD</span>
              <div class="flex items-center justify-between">
                <span class="text-white">${(parseFloat(wallet.amount * (priceUsd ? priceUsd : 1))).toLocaleString('en-US')} ARS</span>
              </div>
            </div>
          </div>
        ))}
        <div class="flex items-center p-4 bg-[#2B2C31] rounded shadow-lg">
          <div class="flex flex-shrink-0 items-center justify-center bg-green-200 h-16 w-16 rounded">
            <svg class="w-6 h-6 fill-current text-green-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="flex-grow flex flex-col ml-4">
            <span class="text-xl font-bold text-white ">Total</span>
            <span class="text-xl font-bold   text-white   ">${(parseFloat(totalWallet)).toLocaleString('en-US')} USD</span>
            <div class="flex items-center justify-between">
              <span class=" text-white">${(parseFloat(totalWallet * (priceUsd ? priceUsd : 1))).toLocaleString('en-US')} ARS</span>
            </div>
          </div>
        </div>
      </div>

    </body>
    // <div className="rw-segment rw-table-wrapper-responsive">
    //   <table className="rw-table">
    //     <thead>
    //       <tr>
    //         <th>Id</th>
    //         <th>Title</th>
    //         <th>Amount</th>
    //         <th>User id</th>
    //         <th>Created at</th>
    //         <th>Updated at</th>
    //         <th>&nbsp;</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {wallets.map((wallet) => (
    //         <tr key={wallet.id}>
    //           <td>{truncate(wallet.id)}</td>
    //           <td>{truncate(wallet.title)}</td>
    //           <td>{truncate(wallet.amount) * priceUsd}</td>
    //           <td>{truncate(wallet.userId)}</td>
    //           <td>{timeTag(wallet.createdAt)}</td>
    //           <td>{timeTag(wallet.updatedAt)}</td>
    //           <td>
    //             <nav className="rw-table-actions">
    //               <Link
    //                 to={routes.wallet({ id: wallet.id })}
    //                 title={'Show wallet ' + wallet.id + ' detail'}
    //                 className="rw-button rw-button-small"
    //               >
    //                 Show
    //               </Link>
    //               <Link
    //                 to={routes.editWallet({ id: wallet.id })}
    //                 title={'Edit wallet ' + wallet.id}
    //                 className="rw-button rw-button-small rw-button-blue"
    //               >
    //                 Edit
    //               </Link>
    //               <button
    //                 type="button"
    //                 title={'Delete wallet ' + wallet.id}
    //                 className="rw-button rw-button-small rw-button-red"
    //                 onClick={() => onDeleteClick(wallet.id)}
    //               >
    //                 Delete
    //               </button>
    //             </nav>
    //           </td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>
  )
}


const WalletsList = ({ wallets, dashboard = false, priceUsd }) => {
  return (dashboard ? walletDashboard({ wallets, priceUsd }) : walletListAdmin({ wallets }))
}

export default WalletsList
