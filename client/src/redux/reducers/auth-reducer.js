// import {
//   SET_CURRENT_USER,
//   // USER_LOADING
// } from '../actions/types'

const isEmpty = require("is-empty")

const initialState = {
  loggedInUser: {},
  isAuthenticated: false
  // loading: false
}

export default function(state = initialState, action={}) {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      // alert('hey')
      // console.log(action.payload)
      return {
        ...state,
        loggedInUser: action.payload,
        isAuthenticated: !isEmpty(action.payload)
      }
    // case USER_LOADING:
    //   return {
    //     ...state,
    //     loading: true
    //   }
    default:
      return state
  }
}