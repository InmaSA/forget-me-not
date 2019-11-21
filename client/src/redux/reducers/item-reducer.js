const initialState = {
  newItem:{},
  items: []
}

export default function(state = initialState, action={}) {
  switch (action.type) {
      case 'NEW_ITEM':
        return {
          ...state,
          newItem: action.payload
        }
      case 'GET_ITEMS_IN_LIST':
        return {
          ...state,
          items: action.payload  
        }   
    default:
      return state
  }
}