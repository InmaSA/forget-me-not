const initialState = {
  allLists: []

}

export default function(state = initialState, action={}) {
  switch (action.type) {
    case 'GET_USER_LISTS':
      return {
        ...state,
        allLists: action.payload,
      }
    default:
      return state
  }
}