import { combineReducers } from 'redux';
import pokemons from "./pokemons"
import page from './page'
import pageSize from './pageSize';

export default combineReducers({
  pokemons,
  page,
  pageSize
});