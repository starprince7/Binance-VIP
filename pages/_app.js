import '../styles/globals.css'
import { Provider } from 'react-redux'
import store from '../redux/store'
import Loader from '../components/loader'
import MessageModal from '../components/MessageModal'

function MyApp({ Component, pageProps }) {
  return <Provider store={store}>
    <Loader />
    <MessageModal />
    <Component {...pageProps} />
  </Provider>
}

export default MyApp
