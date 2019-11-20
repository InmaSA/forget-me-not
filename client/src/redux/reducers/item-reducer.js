const initialState = {
  newItem:{}
}

export default function(state = initialState, action={}) {
  switch (action.type) {
      case 'NEW_ITEM':
          return {
            ...state,
            newItem: action.payload
          }
    default:
      return state
  }
}