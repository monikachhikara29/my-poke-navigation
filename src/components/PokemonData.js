import React, { useState, useEffect } from 'react';
import PokeCard from './PokeCard'


const PokemonData = () => {
  const [ pokemons, setPokemons ] = useState([]);
  const [ page, setPage ] = useState(0);
  const [ pageSize, setPageSize ] = useState(10);
  const [ query, setQuery ] = useState(null)

  const fetchPokemonFromApi = () => {
    let offset = page * pageSize;
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${pageSize}&offset=${offset}`)
      .then(response => response.json())
      .then(async allpokemon => {
        let promises = allpokemon.results.map(async(pokemon) => {
          return await fetchPokemonData(pokemon.url)
        });
        let newPokemons = await Promise.all(promises);
        setPokemons(pokemons => [...pokemons,...newPokemons]);
    });
  }

  useEffect(fetchPokemonFromApi, [page, pageSize]); // This is equivalent to component did mount.

  const handlePageValue = (e) => {
    setPokemons([]);
    setPage(0);
    setPageSize(e.target.value);    
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
  
  const fetchPokemonData = (url) => {
    return(
      fetch(url)
        .then(response => response.json())
        .then(pokedata => pokedata)
    )
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
          <PokeCard key={index} pokemon={pokemon} />
          )}
        </div>
        <button onClick= {() => setPage(page + 1)} >Next</button>
      </div>
    </div>
  );
}

export default PokemonData;

// export default class PokemonData extends React.Component {

//   state = {
//     pokemons: [],
//     page: 0,
//     value: '',
//     // currentPokemon: null,
//     pageSize: 10,
//   }
  
//   componentDidMount() {
//     this.fetchPokemonFromApi();
//   }

//   // updateCurrentPokemon = (pokemon) => {
//   //   this.setState( (prevState) => ({ currentPokemon: pokemon }) )
//   // }

//   handlePageValue = (e) => {
//     this.setState( { pageSize: e.target.value, page: 0, pokemons: [] }, this.fetchPokemonFromApi) 
//   }
//   handleChange = (e) => {
//     let value = e.target.value
//     this.setState({ query: value })
//   }

//   filteredData = () => {
//     if (this.state.query == null) {
//       return this.state.pokemons
//     } else {
//       return(this.state.pokemons.filter(pokemon => pokemon.name.includes(this.state.query)))
//     }
//   }

//   fetchPokemonFromApi = () => {
//     let offset = this.state.page * this.state.pageSize;
//     fetch(`https://pokeapi.co/api/v2/pokemon?limit=${this.state.pageSize}&offset=${offset}`)
//       .then(response => response.json())
//       .then(async allpokemon => {
//         let promises = allpokemon.results.map(async(pokemon) => {
//           return await this.fetchPokemonData(pokemon.url)
//         });
//         let pokemons = await Promise.all(promises);
//         this.setState({ pokemons: [...this.state.pokemons,...pokemons], page: this.state.page + 1 })
//     });
//   }

//   fetchPokemonData = (url) => {
//     return(
//       fetch(url)
//         .then(response => response.json())
//         .then(pokedata => pokedata)
//     )
//   }

//   render() {
//     const { query } = this.state;
//     return (
//       <div className="main-container">
//         {/* { currentPokemon && <PokemonDetails pokemon={currentPokemon} updateCurrentPokemon={this.updateCurrentPokemon} />} */}
//         <div>
//           <div>
//             <select value={this.state.pageSize} onChange={this.handlePageValue}>
//               <option value={5}>5</option>
//               <option value={10}>10</option>
//               <option  value={15}>15</option>
//               <option value={20}>20</option>
//             </select>
//           </div>
//           <input placeholder="Search...." value={query} onChange={this.handleChange}/>
//           <div className="container">
//             {this.filteredData().map((pokemon, index) =>
//             <PokeCard key={index} pokemon={pokemon} updateCurrentPokemon={this.updateCurrentPokemon}/>
//             )}
//           </div>
//           <button onClick= {() =>this.fetchPokemonFromApi()} >Next</button>
//         </div>
//       </div>
//     );
//   }
// }