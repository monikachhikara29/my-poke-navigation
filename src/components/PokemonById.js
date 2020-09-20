import React,{ useState, useEffect } from 'react'
import { connect } from 'react-redux';

function PokemonDetails({ pokemon }) {
  return( 
    <div>
      <h2>Pokemon Details</h2>
      <div className="pokemon-details-container">
        <img 
        className="details-image" 
        alt={pokemon.name} 
        src={`https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`} 
        />
        <div className="details">
          <p>Rank: #{pokemon.id} </p>
          <p className="name">
            Name: {pokemon.name}
          </p>
          <p>Abilities:</p>
          <ul>
          {pokemon.abilities.map((ability, index) => (
            <li key={index} className='date'>{ability.ability.name}</li>
          ))}
          </ul>
        </div>
      </div>
    </div>
  ) 
}

const Loader = function() {
  return(
    <div>I am a Rider, Provider and a loader.</div>
  )
}

const PokemonById = (props) => {
  const [ selectedPokemon, setSelectedPokemon ] = useState(null);
  const { pokemons } = props;

  useEffect(() => {
    const id = parsePokemonId();
    if(pokemons[id-1]){
      setSelectedPokemon(pokemons[id-1]);
    }else {
      fetchPokemonFromApi(id);
    }
  }, []);

  const parsePokemonId = () => {
    const pathname = window.location.pathname;
    return pathname.match(/\d+/);
  }
  

  const fetchPokemonFromApi = (id) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(response => response.json())
      .then(pokeData => setSelectedPokemon(pokeData))     
  };

  return (
    <React.Fragment>
      { selectedPokemon ? <PokemonDetails pokemon={selectedPokemon} /> : <Loader /> }
    </React.Fragment>
 )
}

let mapStateToProps = (state) => ({ pokemons: state.pokemons, selectedPokemon: state.selectedPokemon })

export default connect(
  mapStateToProps, 
  null
)(PokemonById);
