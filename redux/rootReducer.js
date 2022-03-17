import { combineReducers } from 'redux'
import appReducer from './APP_STATE/Reducer'

const rootReducer = combineReducers({ APP_STATE: appReducer })

export default rootReducer;