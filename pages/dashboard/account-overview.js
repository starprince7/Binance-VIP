import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import CurrencyFormat from 'react-currency-format'
import { useDispatch, useSelector } from 'react-redux'
import { SparklesIcon } from "@heroicons/react/solid"
import Loader from '../../components/loader'
import { setLoading } from '../../redux/APP_STATE/actions'
import HeaderDashboard from '../../components/HeaderDashboard'
import SideBar from '../../components/SideBar'
// MUI IMPORTS
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function AccountOverview() {
  const user = useSelector(state => state.APP_STATE.user )
  const [crypto_data, setCryptoData] = useState([])
  const [bitcoin, setBitcoin] = useState(null)
  const dispatch = useDispatch()

    // FETCH SELECT CRYPTO PRICE DATA!
  useEffect(() => {
      fetchCrypto()
  }, [])
  
  useEffect(() => {
    if (crypto_data.length !== 0) {
        const BTC = crypto_data?.find(coin => coin.USD.FROMSYMBOL === 'BTC')
        console.log('Check crypto', crypto_data)
        console.log('Check BTC', BTC)
        const amount_of_btc = (user?.wallet / BTC.USD.PRICE)
        setBitcoin(amount_of_btc)
    }
  }, [crypto_data])
  
  useEffect(() => {
    if (crypto_data.length !== 0) {
      dispatch(setLoading(false))
      }
    }, [crypto_data])
  
    const fetchCrypto = async () => {
      dispatch(setLoading(true))
      let url =
        'https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,BNB,USDT,SOL,BUSD,DOT&tsyms=USD&api_key=6678daddd45a7654b3fe9a21f6bb053d24e41c25a824c315bed0a257b5ca650a'

        try {
            const res = await axios.get(url)
            const { BNB, BTC, ETH, SOL, USDT, BUSD, DOT } = res.data.RAW
            let crypto_data = [BTC, ETH, USDT, BNB, BUSD, SOL, DOT]
            
            setCryptoData(crypto_data)
            
        } catch (e) {
          dispatch(setLoading(false))
            console.log('ERR Fetching crypto data & prices...', e)
        }
    }

  return (
    <div id="wrapper" className='text-sm font-ibm_plex text-gray-800 h-[100vh]'>
      <Loader />
      <Head>
        <title>Dashboard - Binance - Overview</title>
        <meta name="description" content="To secure your account, please complete the following verification." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderDashboard />
      {/* DASHBOARD CONTENT SECTION ---------------------------------------------------------------------------------------------------------- */}
      <div className="flex items-start">
        {/* SIDE BAR COMPONENT START -------------------------------------------------------------- */}
        <div className='hidden md:block w-72 text-gray-500 font-semibold h-auto'>
          <SideBar />
        </div>
        {/* SIDE BAR COMPONENT-END  -------------------------------------------------------------- */}
        <div className='border w-full h-full text-gray-700'>
          <header>
            <div className="md:flex justify-between space-y-5 md:items-end pt-1 pb-5 bg-gray-50 px-5 md:pl-5 md:pr-10">
              <div className='text-2xl md:text-3xl text-gray-900 font-semibold'>Fiat and Spot <img src="/binance-diamond-logo.svg" alt="icon" className='h-5 mr-1 text-primary2 inline-block' /></div>
              <div className='space-x-4'>
                <Link href="/dashboard/deposit"><button className='btn bg-primary2'>Deposit</button></Link>
                <Link href="#"><button className='btn'>Withdraw</button></Link>
                <Link href="#"><button className='btn inline-block'>Connect Wallet</button></Link>
              </div>
            </div>
          </header>
          <div className="my-5 px-5 md:pl-5 md:pr-10 space-y-10 2xl:flex 2xl:justify-between 2xl:items-center">
            <div>
              <p className="text-sm mb-3 text-gray-700">Fiat and Spot balance</p>
              <div className='text-2xl sm:text-xl font-medium'><span className="inline-block">
                  <CurrencyFormat
                  renderText={(value) => (
                      <>
                      <p>
                          <span>{value} BTC</span>
                      </p>
                      </>
                  )}
                  value={bitcoin ? bitcoin : 0}
                  decimalScale={8}
                  fixedDecimalScale={true}
                  thousandSeparator={true}
                  displayType={"text"}
                  
                />
                </span> <span className="text-gray-400">≈
                 <span className="inline-block">
                  <CurrencyFormat
                  renderText={(value) => (
                      <>
                      <p>
                          <span>{value}</span>
                      </p>
                      </>
                  )}
                  value={user ? user.wallet : 0}
                  decimalScale={2}
                  fixedDecimalScale={true}
                  thousandSeparator={true}
                  displayType={"text"}
                  prefix={"$"}
                />
                </span>
              </span></div>
            </div>
            <div className="flex justify-between 2xl:space-x-20 items-center">
              <div>
                <span className="block mb-2 text-xs md:text-sm">Spot balance</span>
                <div className="font-semibold text-gray-800 text-base md:text-xl">0.00234658 BTC</div>
                <span className="block text-gray-400">≈ $95.59</span>
              </div>
              <div>
                <span className="block mb-2 text-xs md:text-sm text-gray-500">Fiat balance</span>
                <div className="font-semibold text-gray-800 text-base md:text-xl">0.00234658 BTC</div>
                <span className="block text-gray-400">≈ $0.000000</span>
              </div>
              <div>
                <span className="block mb-2 text-xs md:text-sm text-gray-500">Yesterday'S PNL</span>
                <div className="text-base md:text-xl text-green-600 font-semibold">+$3.27</div>
                <span className="block text-green-400 text-400">+3.47%</span>
              </div>
            </div>
          </div>

          <div className="w-full px-5">
            <div className="divider"></div>
          </div>

          <div className="Table px-5">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead className='bg-gray-50'>
                  <TableRow>
                    <TableCell align="left" text="sm"><span className="table_header">Coin</span></TableCell>
                    <TableCell align="left" text="sm"><span className="table_header">Price</span></TableCell>
                    <TableCell align="center" text="sm"><span className="table_header">Change</span></TableCell>
                    <TableCell align="center" text="sm"><span className="table_header">Action</span></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {crypto_data.length !== 0 && crypto_data.map((coin) => (
                    <TableRow
                      key={coin.USD.FROMSYMBOL}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        <span className="flex items-center space-x-3">
                          <img className="mr-2 w-3 md:w-10" src={`https://www.cryptocompare.com/${coin.USD.IMAGEURL}`} /> {coin.USD.FROMSYMBOL}
                        </span>
                      </TableCell>
                      <TableCell align="left">
                        <CurrencyFormat
                            renderText={(value) => (
                                <>
                                    <span className='text-gray-700'>{value}</span>
                                </>
                            )}
                            value={coin.USD.PRICE}
                            decimalScale={2}
                            fixedDecimalScale={true}
                            thousandSeparator={true}
                            displayType={"text"}
                            prefix={"$"}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <CurrencyFormat
                            renderText={(value) => (
                                <>
                                    <span className={`${Math.sign(Number(coin.USD.CHANGEPCTHOUR)) === -1 ||
                                        Math.sign(Number(coin.USD.CHANGEPCTHOUR)) === 0  ? 'text-red-500' : 'text-green-500'}`}>
                                    { value }%</span>
                                </>
                            )}
                            value={coin.USD.CHANGEPCTHOUR}
                            decimalScale={2}
                            fixedDecimalScale={true}
                            thousandSeparator={true}
                            displayType={"text"}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <div className="flex space-x-2 md:space-x-4 justify-center items-center">
                          <button className="text-sm font-semibold text-primary_dim">Deposit</button>
                          <button className="text-sm font-semibold text-primary_dim">Withdraw</button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
