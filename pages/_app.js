import '../styles/globals.css'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Provider } from 'react-redux'
import store from '../redux/store'
import Loader from '../components/loader'
import MessageModal from '../components/MessageModal'
import ConnectWalletModal from '../components/ConnectWalletModal'

function MyApp({ Component, pageProps }) {
  const user = store.getState().APP_STATE.user
  const router = useRouter()
  // useEffect(() => {
  //   if(!user) router.push('/')
  // }, [user])
  return <Provider store={store}>
    <Loader />
    <MessageModal />
    <ConnectWalletModal />
    <Component {...pageProps} />
  </Provider>
}

export default MyApp
