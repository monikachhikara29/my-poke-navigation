import { SET_PAGE_SIZE } from '../actions/constants/action-types'

export default (state = 10, action ) => {
  switch (action.type) {
    case SET_PAGE_SIZE :
      return action.payload
    default: 
      return state;
  }
}