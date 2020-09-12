import React,{ useState, useEffect } from 'react'

function PokemonDetails( { pokemon } ) {
  return( 
    <div>
      <h2>Pokemon Details</h2>
      <div className="pokemon-details-container">
        <img 
        className="details-image" 
        alt={pokemon.name} 
        src={`https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`} 
        />
        <div class="details">
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

const PokemonById = () => {
  const [ pokemon, setPokemon ] = useState(null);

  useEffect(() => {
    const id = parsePokemonId();
    fetchPokemonFromApi(id);
  }, []);

  const parsePokemonId = () => {
    const pathname = window.location.pathname;
    return(pathname.match(/\d+/));
  }

  const fetchPokemonFromApi = (id) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(response => response.json())
      .then(pokeData => setPokemon(pokeData))     
  };

  return (
    <React.Fragment>
      { pokemon ? <PokemonDetails pokemon={pokemon} /> : <Loader /> }
    </React.Fragment>
 )
}

export default PokemonById;
