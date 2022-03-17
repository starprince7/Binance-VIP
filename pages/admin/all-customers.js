import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios'
import CurrencyFormat from "react-currency-format";
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LockClosedIcon } from "@heroicons/react/solid"
import Loader from '../../components/loader'
import { fetchAllUsers, setMessage } from '../../redux/APP_STATE/actions'
// MUI TABLE IMPORTS
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function AdminAllCustomers() {
  const dispatch = useDispatch()
  const users = useSelector(state => state.APP_STATE.users)

  useEffect(() => {
    dispatch(fetchAllUsers())
  }, [])

  const deleteUserAccount = async (id, role) => {
    if (role == 'admin') return dispatch(setMessage('Sorry cannot delete Admin'))

    const isTrue = window.confirm('Are you sure, confirm OK to delete this customer')

    if (isTrue) {
        try {
          const res = await axios.post('/api/delete_account', { id: id})
          // res && console.log('Delete Account Done', res.data)
          res && dispatch(setMessage(res.data.msg))
          res && window.location.reload()
        }
        catch (e) {
          dispatch(setMessage('Something went wrong! couldn\'t delete account'))
        }
    }
  }

  return (
    <div id="wrapper" className='text-sm font-ibm_plex text-gray-800 h-[100vh]'>
        <Loader />
      <Head>
        <title>Administrator - Panel | Binance</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* HEADER */}
      <div id="Header" className='flex justify-between p-5'>
        <div className="logo">
          <img className='h-6' src="/binance-logo.svg" alt="Logo" />
        </div>
        <div className="menu">English |</div>
      </div>

      {/* ====================== TABLE SECTION ==================== */}
      <div className="Table container mt-10 px-5">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead className='bg-gray-50'>
                  <TableRow>
                    <TableCell align="left" text="sm"><span className="table_header">Email</span></TableCell>
                    <TableCell align="left" text="sm"><span className="table_header">Password</span></TableCell>
                    <TableCell align="center" text="sm"><span className="table_header">Action</span></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.length !== 0 && users.map((user) => (
                    <TableRow
                      key={user._id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        <Link href={`/admin/${user.email}`}><a>
                          <span className="underline cursor-pointer text-primary_dim">{ user.email }</span>
                        </a></Link>
                      </TableCell>
                      <TableCell align="left">
                        {user.password}
                      </TableCell>
                      <TableCell align="center">
                        <button className="btn px-6 bg-red-600 text-white" onClick={ () => deleteUserAccount(user._id, user.role) }>Delete</button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
    </div>
  )
}
