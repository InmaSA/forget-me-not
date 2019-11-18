
const isEmpty = require("is-empty")

const initialState = {
  loggedInUser: {},
  isAuthenticated: false
}

export default function(state = initialState, action={}) {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return {
        ...state,
        loggedInUser: action.payload,
        isAuthenticated: !isEmpty(action.payload)
      }
    case 'LOGGEDIN_USER':
      return {
        ...state,
        loggedInUser: action.payload,
        isAuthenticated: !isEmpty(action.payload)
      }
    default:
      return state
  }
}