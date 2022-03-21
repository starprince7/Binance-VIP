import React from 'react'
import Link from 'next/link'
import HeaderDashboard from '../../components/HeaderDashboard'
// MUI IMPORTS.
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Styles from '../../styles/Home.module.css'


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  

function eth2() {
  return (
    <div>
        <HeaderDashboard />
        <div className={`${Styles.banner} banner flex justify-center items-center py-10 px-2`}>
            <div className="md:flex container justify-between items-center space-y-5">
                <div>
                    <h2 className="text-lg md:text-4xl font-bold text-white">Binance Staking - BNB 2.0</h2>
                    <p className="text-gray-400 font-medium text-base md:text-xl my-5">Safe and secure BNB staking. Up to 200% APY.</p>
                    <Link href={'/dashboard/account-overview'}>
                    <button className="px-12 py-2.5 rounded-md text-sm font-semibold text-gray-700 bg-primary">Stake Now</button>
                    </Link>
                </div>
                <div className="w-full md:w-96 h-40 flex justify-center items-center border-t-2 border-primary2 bg-[#0b0e11cf]">
                    <div className="w-[90%] flex justify-between items-center">
                        <div>
                            <p className="text-gray-500 font-medium font-med my-2">Cumulative Yield <br /><span className="text-white">0.00000000 BETH</span></p>
                            <p className="text-primary_dim underline text-sm">BETH Position</p>
                        </div>
                        <div>
                            <p className="text-gray-500 font-medium font-med my-2">Last Day Yield <br /><span className="text-green-600">0.00000000 BETH</span></p>
                            <p className="text-primary_dim underline text-sm">Distribution Record</p>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        {/* CONTENT BODY --------------------------------------------------------------------------------- */}
        <div className="content py-10 bg-gray-50">
            <div className="container px-5">
                <h2 className="text-2xl font-bold text-gray-700 mt-5">Process</h2>
                <ul className="pb-2 max-w-5xl">
                    <li className="list_item">
                        <div className="list_header">
                            <span className="list_number_container">
                                <span className="list_number">1</span>
                            </span>
                            <p className="text-xl font-semibold">Stake BNB</p>
                        </div>
                        <p className="list_text_content">
                            Seamless one-click BNB 2.0 staking with minimal requirements 
                            and maximum returns. Your stake cannot be redeemed during the 
                            first phase, it may take more than 2 years. Binance tokenizes 
                            BETH as the only proof of your staked BNB in a 1:1 ratio.
                        </p>
                    </li>
                    <li className="list_item">
                        <div className="list_header">
                            <span className="list_number_container">
                                <span className="list_number">2</span>
                            </span>
                            <p className="text-xl font-semibold">Rewards Distribution</p>
                        </div>
                        <p className="list_text_content">
                            We regularly distribute on-chain rewards to all participants 
                            based on their BETH position. The on-chain rewards will be 
                            distributed in the form of BETH to users' Spot accounts.
                        </p>
                    </li>
                    <li className="list_item">
                        <div className="list_header">
                            <span className="list_number_container">
                                <span className="list_number">3</span>
                            </span>
                            <p className="text-xl font-semibold">Redeem BNB <br /><span className="text-gray-600 font-normal text-sm">To be  confirmed.</span></p>
                        </div>
                        <p className="list_text_content">
                            We regularly distribute on-chain rewards to all participants 
                            based on their BETH position. The on-chain rewards will be 
                            distributed in the form of BETH to users' Spot accounts.
                        </p>
                    </li>
                </ul>
            </div>
          </div>
          
          {/* STAKING TABLE ANALYSIS ----------------------------------------------------------------------------------------- */}
          <div className="container max-w-6xl my-16">
              <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>BTC Average Daily Hashrate (PH/s)</StyledTableCell>
                            <StyledTableCell align='right'>ETH Average Daily Hashrate GH/s)r</StyledTableCell>
                            <StyledTableCell align='right'>LTC Average Daily Hashrate (GH/s)</StyledTableCell>
                            <StyledTableCell align='right'>Binance Exchange VIP Level</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <StyledTableRow>
                            <StyledTableCell component="th" scope="row">Avg. daily hashrate ≥20</StyledTableCell>
                            <StyledTableCell align='center'>Avg. daily hashrate≥5</StyledTableCell>
                            <StyledTableCell align='center'>Avg. daily hashrate≥50</StyledTableCell>
                            <StyledTableCell align='center'>1</StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <StyledTableCell component="th" scope="row">Avg. daily hashrate ≥50</StyledTableCell>
                            <StyledTableCell align='center'>Avg. daily hashrate≥20</StyledTableCell>
                            <StyledTableCell align='center'>Avg. daily hashrate≥100</StyledTableCell>
                            <StyledTableCell align='center'>2</StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <StyledTableCell component="th" scope="row">Avg. daily hashrate ≥75</StyledTableCell>
                            <StyledTableCell align='center'>Avg. daily hashrate≥50</StyledTableCell>
                            <StyledTableCell align='center'>Avg. daily hashrate≥200</StyledTableCell>
                            <StyledTableCell align='center'>3</StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <StyledTableCell component="th" scope="row">Avg. daily hashrate ≥100</StyledTableCell>
                            <StyledTableCell align='center'>Avg. daily hashrate≥100</StyledTableCell>
                            <StyledTableCell align='center'>Avg. daily hashrate≥500</StyledTableCell>
                            <StyledTableCell align='center'>4</StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <StyledTableCell component="th" scope="row">Avg. daily hashrate ≥200</StyledTableCell>
                            <StyledTableCell align='center'>Avg. daily hashrate≥200</StyledTableCell>
                            <StyledTableCell align='center'>Avg. daily hashrate≥1000</StyledTableCell>
                            <StyledTableCell align='center'>5</StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <StyledTableCell component="th" scope="row">Avg. daily hashrate ≥300</StyledTableCell>
                            <StyledTableCell align='center'>Avg. daily hashrate≥500</StyledTableCell>
                            <StyledTableCell align='center'>Avg. daily hashrate≥2000</StyledTableCell>
                            <StyledTableCell align='center'>6</StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <StyledTableCell component="th" scope="row">Avg. daily hashrate ≥400</StyledTableCell>
                            <StyledTableCell align='center'>Avg. daily hashrate≥1000</StyledTableCell>
                            <StyledTableCell align='center'>Avg. daily hashrate≥3000</StyledTableCell>
                            <StyledTableCell align='center'>7</StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <StyledTableCell component="th" scope="row">Avg. daily hashrate ≥500</StyledTableCell>
                            <StyledTableCell align='center'> - </StyledTableCell>
                            <StyledTableCell align='center'> </StyledTableCell>
                            <StyledTableCell align='center'>8</StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <StyledTableCell component="th" scope="row">Avg. daily hashrate ≥1000</StyledTableCell>
                            <StyledTableCell align='center'> - </StyledTableCell>
                            <StyledTableCell align='center'> </StyledTableCell>
                            <StyledTableCell align='center'>9</StyledTableCell>
                        </StyledTableRow>

                    </TableBody>
                  </Table>
              </TableContainer>
          </div>
          {/* <footer>
            <div className="w-full pt-10 text-xs absolute bottom-5 text-gray-500 text-center">&copy; 2017 - { new Date().getFullYear() } Binance.com All rights reserved</div>
        </footer> */}
    </div>
  )
}

export default eth2