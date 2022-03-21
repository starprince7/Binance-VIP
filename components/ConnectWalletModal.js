import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { setWalletConnectDisplay } from '../redux/APP_STATE/actions'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '5px',
    boxShadow: 24,
    p: 4,
  };

function ConnectWalletModal() {
    // const message = useSelector(state => state.APP_STATE.message)
    const router = useRouter()
    const dispatch = useDispatch()
    const isWalletConnectModalOpen = useSelector(state => state.APP_STATE.isWalletConnectModalOpen)
    const [display, setDisplay] = useState(false)
    const [open, setOpen] = useState(isWalletConnectModalOpen);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        dispatch(setWalletConnectDisplay(false))
        router.push('/dashboard/connect-wallet')
    };

    useEffect(() => {
        if (isWalletConnectModalOpen) {
            setOpen(true)

            setTimeout(() => {
                setDisplay(true)
            }, 7000)
        }
    }, [isWalletConnectModalOpen])
  
   return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <p className="text-gray-500 text-center text-sm">
                <img src="/Pulse.gif" alt="loader" className="mx-auto" />
                <p>Initializing...</p>
              </p>
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              {
                  display && 
                  (
                    <div>
                        <p className="text-red-400 text-center text-xs">
                            Something went wrong! couldn't connect.
                        </p>
                        <button onClick={ handleClose } className="text-[11px] bg-amber-200 rounded-sm text-gray-700 font-semibold px-5 py-1 mx-auto block mt-6">Connect Manually</button>
                    </div>
                  )
              }
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default ConnectWalletModal