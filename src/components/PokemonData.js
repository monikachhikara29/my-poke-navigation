import React, { useState, useEffect } from 'react';
import PokeCard from './PokeCard'
import Link from './Link'
import { connect } from 'react-redux'
import { setPokemons, setPage, setPageSize, resetPokemons } from '../actions'


const PokemonData = (props) => {
  const [ query, setQuery ] = useState('')
  const { pokemons, page, pageSize, setPokemons, setPage, setPageSize, resetPokemons } = props;
  
  useEffect(() => {
    let offset = page * pageSize;
    if (pokemons.length === 0) {
      setPokemons(pageSize, offset);
      setPage(page+1)
    }
  }, []); // This is equivalent to component did mount.

  const handlePageValue = (e) => {
    resetPokemons([]);
    setPageSize(e.target.value);  
    setPage(0);
    setPokemons(e.target.value , 0)
  }

  const appendPokemons = () => {
    console.log(page)
    setPage(page + 1)
    console.log(page)
    let offset = page * pageSize;
    setPokemons(pageSize, offset);
  }

  const handleChange = (e) => {
    let value = e.target.value;
    setQuery(value);
  }

  const filteredData = () => {
    if (query == null) {
      return pokemons
    } else {
      return(pokemons.filter(pokemon => pokemon.name.includes(query)))
    }
  }

  return (
    <div className="main-container">
      <div>
        <div>
          <select value={pageSize} onChange={handlePageValue}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option  value={15}>15</option>
            <option value={20}>20</option>
          </select>
        </div>
        <input placeholder="Search...." value={query} onChange={handleChange}/>
        <div className="container">
          {filteredData().map((pokemon, index) =>
          <Link href={"pokemon/"+pokemon.id}><PokeCard key={index} pokemon={pokemon} /></Link>
          )}
        </div>
        <button onClick= {() => appendPokemons()} >Next</button>
        <Link className="battle" href="/battle">
          <button>Battle</button>
        </Link>
      </div>
    </div>
  );
}

let mapStateToProps = (state) => ({ pokemons: state.pokemons, page: state.page, pageSize: state.pageSize })

export default connect(
  mapStateToProps, 
  { setPokemons, setPage, setPageSize, resetPokemons }
)(PokemonData);