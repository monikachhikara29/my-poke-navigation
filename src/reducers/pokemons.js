import { FETCH_POKEMONS, RESET_POKEMONS } from '../actions/constants/action-types'

export default (state = [], action ) => {
  console.log(action)
  switch (action.type) {
    case FETCH_POKEMONS :
      return [...state, ...action.payload]
    case RESET_POKEMONS :
      return action.payload
    default: 
      return state;
  }
}