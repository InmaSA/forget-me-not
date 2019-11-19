import { combineReducers } from 'redux'

import authReducer from './auth-reducer'
import errorReducer from './error-reducer'
import listReducer from './list-reducer'

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  lists: listReducer
})