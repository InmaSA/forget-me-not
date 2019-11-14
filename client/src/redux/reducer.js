const initialState = {
  loggedinUser: {},
  lists: [],
  items: []
}


function reducer(state=initialState, action={}) {
  switch (action.type) {
    case 'GET_VALUES':
      return {
        ...state,
        serverValues: [...state.serverValues, action.payload]
      }
      default: return state
  }
}

export default reducer
