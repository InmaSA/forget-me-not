const initialState = {
  allLists: [],
  newList:{}
}

export default function(state = initialState, action={}) {
  switch (action.type) {
    case 'GET_USER_LISTS':
      return {
        ...state,
        allLists: action.payload,
      }
      case 'NEW_LIST':
          return {
            ...state,
            newList: action.payload,
          }
    default:
      return state
  }
}