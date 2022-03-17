import axios from 'axios'
import { SET_ERROR, SET_LOADING, SET_USER, SET_USERS, SET_MESSAGE, CLEAR_MESSAGE, SET_AMOUNT } from './actionTypes'

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
    console.log('Sign in user log at action js file', user)
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
            console.log(response.data)
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