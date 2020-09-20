import Pokemon from '../apis/Pokemon';
import { RESET_POKEMONS, FETCH_POKEMONS, SET_PAGE, SET_PAGE_SIZE } from './constants/action-types';

export const setPokemons = (pageSize, offset) => async dispatch => {
  let pokemons = await Pokemon.all(pageSize, offset);
  dispatch({type: FETCH_POKEMONS, payload: pokemons });
}

export const resetPokemons = (pokemons=[]) => dispatch => {
  dispatch({type: RESET_POKEMONS, payload: pokemons });
}

export const setPage = (value) => dispatch => {
  dispatch({type: SET_PAGE, payload: value})
}

export const setPageSize = (value) => dispatch => {
  dispatch({type: SET_PAGE_SIZE, payload: value})
}
