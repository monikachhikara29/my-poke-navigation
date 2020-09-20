import { SET_PAGE } from '../actions/constants/action-types'

export default (state = 0, action ) => {
  console.log(action)
  switch (action.type) {
    case SET_PAGE :
      return action.payload
    default: 
      return state;
  }
}