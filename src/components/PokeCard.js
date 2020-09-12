import React from 'react'

export default function PokeCard({ pokemon, updateCurrentPokemon }) {
  return(
    <div className="pokecard">
      <img className="image" alt={pokemon.name} src={`https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`} />
      <p>#{pokemon.id}</p>
      <h5>{pokemon.name}</h5>
    </div>
  )
}
