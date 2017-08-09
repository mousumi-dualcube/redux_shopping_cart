import {
  ADD_TO_CART,
  CHECKOUT_REQUEST,
  CHECKOUT_FAILURE
} from '../constants/ActionTypes'

const initialState = {
  cartObject: [],
  addedIds: [],
  quantityById: {}
}

const cartObject = (state = initialState.cartObject, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      if (state.indexOf(action.productId) !== -1) {
        return state
      }

      state.map((element, index) => {
        if(element.id == action.productId) {          
          return {"id" : action.productId , "qty" : element.qty++ }
        } else {
          return {"id" : action.productId , "qty" :  1 }
        }
      })
      console.log(state)
      return [state]
      //return [ ...state,  {"id" : action.productId , "qty" :  1 } ]
    default:
      return state
  }
}


const addedIds = (state = initialState.addedIds, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      if (state.indexOf(action.productId) !== -1) {
        return state
      }
      return [ ...state, action.productId ]
    default:
      return state
  }
}

const quantityById = (state = initialState.quantityById, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const { productId } = action
      return { ...state,
        [productId]: (state[productId] || 0) + 1
      }
    default:
      return state
  }
}

export const getQuantity = (state, productId) =>
  state.quantityById[productId] || 0

export const getAddedIds = state => state.addedIds

const cart = (state = initialState, action) => {
  switch (action.type) {
    case CHECKOUT_REQUEST:
      return initialState
    case CHECKOUT_FAILURE:
      return action.cart
    default:
      return {
        addedIds: addedIds(state.addedIds, action),
        quantityById: quantityById(state.quantityById, action),
        cartObject: cartObject(state.cartObject, action)
      }
  }
}

export default cart
