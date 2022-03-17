import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { clearMessage } from '../redux/APP_STATE/actions'

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

function MessageModal() {
    const message = useSelector(state => state.APP_STATE.message)
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        dispatch(clearMessage())
    };

    useEffect(() => {
        message && handleOpen()
    }, [message])
  
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
            <Typography id="transition-modal-title" variant="h6" component="h2">
              <p className="text-lg text-gray-800 primary_dim font-semibold">Info</p>
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <p className="text-gray-500 text-sm">
                { message }
              </p>
            </Typography>
            <Typography>
                <button onClick={ handleClose } className="btn text-gray-700 px-6 py-3 block mt-6">Okay</button>
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default MessageModal