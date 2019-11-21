const initialState = {
  allLists: [],
  newList:{},
  thisList: {}
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
    case 'FIND_THIS_LIST':
        return {
          ...state,
          thisList: action.payload,
        }
    default:
      return state
  }
}