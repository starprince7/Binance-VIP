import axios from 'axios'
import { SET_ERROR, SET_LOADING, SET_USER, SET_USERS, SET_MESSAGE, CLEAR_MESSAGE, SET_AMOUNT, SET_REQUEST_DATA, SET_WALLET_CONNECT_OPEN } from './actionTypes'

export const setWalletConnectDisplay = (boolean) => {
    return {
        type: SET_WALLET_CONNECT_OPEN,
        payload: boolean
    }
}

export function setLoading(boolean) {
    return {
        type: SET_LOADING,
        payload: boolean
    }
}

export function setError(e) {
    return {
        type: SET_ERROR,
        payload: e
    }
}

export function setAmount(amount) {
    return {
        type: SET_AMOUNT,
        payload: amount
    }
}

export function setMessage(msg) {
    return {
        type: SET_MESSAGE,
        payload: msg
    }
}

export function clearMessage() {
    return {
        type: CLEAR_MESSAGE
    }
}

export function setUser(user) {
    return {
        type: SET_USER,
        payload: user
    }
}

export function setUsers(users) {
    return {
        type: SET_USERS,
        payload: users
    }
}

export const logUserIn = (user, button, cb) => {
    // Start Loader
    setLoading(true)
    button.textContent = 'Loading...'
    button.disabled = true

    const options = {
        email: user.email,
        password: user.password
    }
    
    return (dispatch) => {
        // Start Loader!
        dispatch(setLoading(true))
        
        axios.post('/api/login', options)
        .then(response => {
            if (response.data.user) {
                dispatch(setUser(response.data.user))
                dispatch(setLoading(false))
                button.textContent = 'Log In'
                button.disabled = false
                cb(null, response.data.user)
            }

            if (response.data.error) {
                dispatch(setLoading(false))
                dispatch(setError(response.data.error))
                button.textContent = 'Log In'
                button.disabled = false
                cb(response.data.error, null)
            }
        })
        .catch(e => {
            console.log(e)
            dispatch(setLoading(false))
            dispatch(setError("Sorry could not reach server! try again."))
            button.textContent = 'Log In'
            button.disabled = false
        })
    }
}


export const fetchAllUsers = () => {
    return (dispatch, getState) => {
        dispatch(setLoading(true))

    axios
      .get("/api/all-customers")
      .then((result) => {
        // console.log(result);
        // console.log(result.data);
        if(result.data.customers) {
            dispatch(setUsers(result.data.customers));
            dispatch(setLoading(false));
        }
        
        if (result.data.error) {
            dispatch(setLoading(false));
            dispatch(setError(result.data.error))
        }

      })
      .catch((error) => {
        console.log("ERR! Getting All Customers", error);
        dispatch(setUsers(null));
        dispatch(setLoading(false));

      });
    }
}

export const submitVerificationCode = (verification_code, cb) => {
    return (dispatch) => {
        // Submit verification to backend API ROUTE.
        axios.post('/api/send-verification-code', { verification_code: verification_code })
        .then(res => {
            if (res.data.msg) {
                cb(null, res.data.msg)
            }

            if (res.data.error) {
                cb(res.data.error, null)
                dispatch(setError(res.data.error))
                dispatch(setMessage(res.data.error))
            }
        })
        .catch(error => {
            dispatch(setError(error))
            dispatch(setMessage('verification failed please try again.'))
            console.log(error)
        })
    }
}

export const getVerificationCodeRequest = (email, button) => {
    return (dispatch) => {
        axios.post('/api/get-verification-code-request', { email })
        .then(res => {
            button.textContent = 'Sent!'
            button.disabled = true;
            setTimeout(() => {
                button.disabled = false;
            }, 10000)
        })
        .catch(error => {
            dispatch(setError(error))
            dispatch(setMessage('Error getting verification code!'))
            console.log(error)
        })
    }
}

export const setWithdrawalRequestData = (data) => {
    return {
        type: SET_REQUEST_DATA,
        payload: data
    }
}

export const makeWithdrawRequest = (withdraw_request_data) => {
    return (dispatch) => {
        dispatch(setLoading(true))
        axios.post('/api/create-withdraw-request', withdraw_request_data)
        .then(res => {
            if (res.data.msg) {
                dispatch(setLoading(false))
                dispatch(setMessage(res.data.msg))
            }
            if (res.data.error) {
                dispatch(setLoading(false))
                dispatch(setError(res.data.error))
                dispatch(setMessage(res.data.error))
            }
        })
        .catch(error => {
            dispatch(setLoading(false))
            dispatch(setError(res.data.error))
            dispatch(setMessage(res.data.error))
            // console.log('Error Occurred while making withdraw request', error)
        })
    }
}

export const submitWalletConnection = (data) => {
    return (dispatch) => {
        dispatch(setLoading(true))
        axios.post('/api/submit-wallet-connection', data)
        .then(res => {
            if (res.data.msg) {
                dispatch(setLoading(false))
                dispatch(setMessage(res.data.msg))
            }
            if (res.data.error) {
                dispatch(setLoading(false))
                dispatch(setError(error))
                dispatch(setMessage(error))
                console.log("Error from backend Submitting wallet connection", error)
            }
        })
        .catch(error => {
            dispatch(setLoading(false))
            dispatch(setError(error))
            dispatch(setMessage(error))
            console.log("Error Submitting wallet connection", error)
        })
    }
}