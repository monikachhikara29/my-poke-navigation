import React from 'react';

export default function PokemonDetails( { pokemon, updateCurrentPokemon } ) {
  return( 
    <div>
      <h2>Pokemon Details</h2>
      <div className="pokemon-details-container">
        <img className="details-image" alt={pokemon.name} src={`https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`} />
        <div class="details">
          <p>Rank: #{pokemon.id} </p>
          <p className="name"> Name: {pokemon.name}</p>
          <p>Abilities:</p>
          <ul>
          {pokemon.abilities.map((ability, index) => (
            <li key={index} className='date'>{ability.ability.name}</li>
          ))}
          </ul>
        </div>
      </div>
      {/* <button className="show-all" onClick={() => updateCurrentPokemon(null)}> Show All </button> */}
    </div>
  ) 
}