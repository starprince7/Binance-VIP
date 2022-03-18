import { useState } from 'react'
import { useSelector } from 'react-redux'
import { UserCircleIcon, BellIcon, MenuIcon } from "@heroicons/react/solid"
// import { makeStyles } from '@mui/styles';
import Drawer from '@mui/material/Drawer';
import CloseRounded from '@mui/icons-material/CloseRounded'
import MenuRounded from '@mui/icons-material/MenuRounded'
import SideBar from './SideBar'

const drawerWidth = 240
// const useStyles = makeStyles({
//   root: {
//     background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
//     border: 0,
//     borderRadius: 3,
//     boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
//     color: 'white',
//     height: 48,
//     padding: '0 30px',
//     },
//     drawer: {
//         width: drawerWidth
//     },
//     drawPaper: {
//         width: drawerWidth
//     }
// });


function HeaderDashboard() {
    const user = useSelector(state => state.APP_STATE.user)
    const [isOpen, setDrawerOpen] = useState(false)

  return (
    <header>
        <div className='flex justify-between items-center px-5 py-5 bg-black w-full text-gray-400'>
            <div>
                <div id="Brand-logo" className='block'>
                    <img src="/binance-logo.svg" alt="Brand-logo" className='h-6 mr-1 inline-block' />
                    <span className="inline-block text-xs md:text-sm font-bold text-gray-300">VIP</span>
                </div>
            </div>
              <div className='hidden md:block '>
                    <div className='text-gray-100 md:flex justify-evenly items-center md:space-x-5 font-semibold'>
                        <a href='#'><div>Markets</div></a>
                        <div className='relative'>
                            <BellIcon className='h-5' />
                            { user?.notifications && (<span className="absolute top-[-8px] right-[-7px] z-20 bg-red-500 px-0.5 text-xs rounded-full">12</span>) }
                        </div>
                        <div>
                            English | USD
                        </div>
                        <div>
                            <UserCircleIcon className='h-5 text-gray-300 inline mr-1' />
                          <span className="inline-block">{ user?.email }</span>
                        </div>
                    </div>
              </div>
            <div className="p-0.5 md:hidden" onClick={() => setDrawerOpen(true)}>
                <MenuIcon  className='h-6 text-white font-extrabold'/>
            </div>
        </div>
        <Drawer
              anchor='right'
              open={isOpen}
        >
            <div className="w-[80vw] h-full bg-[#ffffff] text-gray-500">
                <div className="text-right text-gray-500 font-bold h-14 w-full px-5 pt-5">
                    <CloseRounded onClick={() => setDrawerOpen(false)} className="cursor-pointer" />  
                </div>
                <div className="border-b pb-4 mb-2 w-full px-5 text-gray-400 font-semibold">
                    <UserCircleIcon className='h-8 text-gray-300 inline mr-1' />
                    <span className="inline-block">{ user?.email }</span>
                </div>
                <SideBar />
            </div>
        </Drawer>
    </header>
  )
}

export default HeaderDashboard