import { SET_ERROR, SET_LOADING, SET_USER, SET_USERS, SET_MESSAGE, CLEAR_MESSAGE, SET_AMOUNT, SET_REQUEST_DATA, SET_WALLET_CONNECT_OPEN } from './actionTypes'

const initState = {
    user: null,
    users: [],
    isLoading: false,
    error: null,
    message: null,
    amount: null,
    request_data: null,
    isWalletConnectModalOpen: false
}

const appReducer = (state = initState, action) => {
    // console.log('Actions Came in:', action)
    switch(action.type) {
        case SET_ERROR : {
            return {
                ...state,
                error: action.payload
            }
        }
        case SET_USER : {
            return {
                ...state,
                user: action.payload
            }
        }
        case SET_USERS : {
            return {
                ...state,
                users: action.payload
            }
        }
        case SET_LOADING : {
            return {
                ...state,
                isLoading: action.payload
            }
        }
        case SET_MESSAGE : {
            return {
                ...state,
                message: action.payload
            }
        }
        case CLEAR_MESSAGE : {
            return {
                ...state,
                message: null
            }
        }
        case SET_AMOUNT : {
            return {
                ...state,
                amount: action.payload
            }
        }
        case SET_REQUEST_DATA : {
            return {
                ...state,
                request_data: action.payload
            }
        }
        case SET_WALLET_CONNECT_OPEN : {
            return {
                ...state,
                isWalletConnectModalOpen: action.payload
            }
        }
            
        default: return state;
    }
}

export default appReducer