import { } from 'react'
import Link from 'next/link'
import { SparklesIcon } from "@heroicons/react/solid"
import GridViewRounded from '@mui/icons-material/GridViewRounded'
import PaymentsRounded from '@mui/icons-material/PaymentsRounded'
import AccountBalanceRounded from '@mui/icons-material/AccountBalanceRounded'
import CloudCircleRounded from '@mui/icons-material/CloudCircleRounded'
import JoinRightRounded from '@mui/icons-material/JoinRightRounded'
import CurrencyExchangeRounded from '@mui/icons-material/CurrencyExchangeRounded'
import { setWalletConnectDisplay } from '../redux/APP_STATE/actions'
import { useSelector, useDispatch } from 'react-redux'

function SideBar() {
  const dispatch = useDispatch()

  const openWalletConnect = () => {
    dispatch(setWalletConnectDisplay(true))
  }

  return (
    <div>
        <ul>
            <li className="link_tab">
                <Link href="/dashboard/account-overview">
                  <a className='anchor_link'>
                    <GridViewRounded className="sidebar_icon" />
                    <p>Overview</p>
                  </a>
                </Link>
            </li>
            <li className="link_tab">
                <Link href={'/dashboard/deposit'}>
                  <a className='anchor_link'>
                    <PaymentsRounded className="sidebar_icon" />
                    <p>Deposit</p>
                  </a>
                </Link>
            </li>
            <li className="link_tab">
                <Link href="/dashboard/withdrawal">
                  <a className='anchor_link'>
                    <AccountBalanceRounded className="sidebar_icon" />
                    <p>Withdraw</p>
                  </a>
                </Link>
            </li>
            <li className="link_tab">
                <Link href="/dashboard/deposit">
                  <a className='anchor_link'>
                    <CurrencyExchangeRounded className="sidebar_icon" />
                    <p>Staking</p>
                  </a>
                </Link>
            </li>
            <li className="link_tab">
                <Link href="#">
                  <a className='anchor_link' onClick={ openWalletConnect }>
                    <JoinRightRounded className="sidebar_icon" />
                    <p>Wallet Connect</p>
                  </a>
                </Link>
            </li>
        </ul>
    </div>
  )
}


export default SideBar