import React, { useState } from 'react';

function PokemonInput(props) {
  return(
    <div>
      <input placeholder="Search..." value={props.pokemon.name} onChange={(e) => props.handleChange(e, props.pokemonKey)} ></input>
      <button disabled={props.pokemon.disabled} onClick={(e) => props.showDetails(props.pokemon.name, props.pokemonKey)}  >Submit</button>
      <br />
      <br />
    </div>
  )
}

function PokemonCard(props) {
  const { stats } = props.pokemon.details;
  return(
    <div className="battlecard" >
      <img className="battleimage" alt={props.pokemon.name} src={`https://pokeres.bastionbot.org/images/pokemon/${props.details.id}.png`} />
      <p>#{props.details.id}</p>
      <h4>{props.pokemon.name}</h4>
      {stats.map((statdetails) =>  <p>{statdetails.stat.name} - {statdetails.base_stat}</p>)}
    </div>
  )
}

const BattlePage = () => {
  const [ pokemon1, setPokemon1 ] = useState({});
  const [ pokemon2, setPokemon2 ] = useState({});
  
  const evaluateResult = () => {
    const pokemon1Stats = pokemon1.details.stats;
    const pokemon2Stats = pokemon2.details.stats;

    for(let i = 0; i < pokemon1Stats.length; i++) {
      if ( pokemon1Stats[i].base_stat > pokemon2Stats[i].base_stat ) pokemon1.wins += 1
      if (pokemon2Stats[i].base_stat === pokemon1Stats[i].base_stat ) {
        pokemon1.wins += 1
        pokemon2.wins += 1
      }
    };
    pokemon2.wins += (pokemon1Stats.length - pokemon1.wins);

    setPokemon1({...pokemon1});
    setPokemon2({...pokemon2});
  }

  const handleChange = (e, pokemon) => {
    if (e.target.value) {
      if (pokemon === 'pokemon1' ){
        setPokemon1({...pokemon1, name: e.target.value, disabled: false, wins: 0});
      }else {
        setPokemon2({...pokemon2, name: e.target.value, disabled: false, wins: 0});
      }
    } 
  }

  const showDetails = (name, pokemon) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(response => response.json())
      .then(details => {
        if(pokemon === 'pokemon1'){
          setPokemon1({...pokemon1, details: details })
        }else {
          setPokemon2({...pokemon2, details: details})
        }
      })
  }

  const renderPokemonForm = (pokemon, pokemonKey) => {
    return( pokemon.details ?
      <PokemonCard  pokemon={pokemon} details={pokemon.details}/>
    :
      <PokemonInput  pokemon={pokemon} pokemonKey={pokemonKey} handleChange={handleChange} showDetails={showDetails}/>
    )
  }
  function getWinner() {
    if( pokemon1.wins > pokemon2.wins) return pokemon1
    else return pokemon2
  }

  function getLoser() {
    if( pokemon1.wins > pokemon2.wins) return pokemon2
    else return pokemon1
  }
  function renderWinner() {
    if (pokemon1.wins || pokemon2.wins){
      if(pokemon1.wins === pokemon2.wins) return <p>It's a tie</p>
      return(
        <div>
          <p>Winner: { getWinner().name }</p>
          <p>Loser:  { getLoser().name }</p>
        </div>
      )
    }
  }
  return(
    <div>
      <p>Let the battle begin...</p>
      { renderWinner() }
      <div className="battle-container">
        {renderPokemonForm(pokemon1, 'pokemon1')}
        {renderPokemonForm(pokemon2, 'pokemon2')}
      </div>
      <br />
      <button className="button" onClick={evaluateResult}>Battle</button>
      <br />
      <br />
      {/* <button className="button" onClick={handleBattle}>Back</button> */}
    </div>
  )
}

export default BattlePage;

// export default class BattlePage extends React.Component {
//   state = {
//     pokemon1: {
//       name: null,
//       disabled: true,
//       details: null,
//       wins: 0,
//     },
//     pokemon2: {
//       name: null,
//       disabled: true,
//       details: null,
//       wins: 0,
//     },
//     winner: null,
//     looser: null,
//     tie: false,
//   }

//   evaluateResult = () => {
//     let { pokemon1, pokemon2 } = this.state;
//     const pokemon1Stats = pokemon1.details.stats;
//     const pokemon2Stats = pokemon2.details.stats;

//     for(let i = 0; i < pokemon1Stats.length; i++) {
//       if ( pokemon1Stats[i].base_stat > pokemon2Stats[i].base_stat ) pokemon1.wins += 1
//       if (pokemon2Stats[i].base_stat === pokemon1Stats[i].base_stat ) {
//         pokemon1.wins += 1
//         pokemon2.wins += 1
//       }
//     };
//     pokemon2.wins += (pokemon1Stats.length - pokemon1.wins);

//     this.setState( { pokemon1: { ...pokemon1 }, pokemon2: {  ...pokemon2 } } );
//   }

//   handleChange = (e, pokemon) => {
//     let name = e.target.value
//     if (name) {
//       this.setState( { [pokemon]: { name: name, disabled: false, details: null, wins: 0}})
//     } else {
//       this.setState( { [pokemon]: { name: null, disabled: true, details: null, wins: 0 }})
//     }
//   }

//   showDetails = (name, pokemon) => {
//     fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
//       .then(response => response.json())
//       .then(details => this.setState( { [pokemon]: {...this.state[pokemon], details: details }} ))
//   }

//   renderPokemonForm = (pokemon, pokemonKey) => {
//     return( pokemon.details ?
//       <PokemonCard  pokemon={pokemon} details={pokemon.details}/>
//     :
//       <PokemonInput  pokemon={pokemon} pokemonKey={pokemonKey} handleChange={this.handleChange} showDetails={this.showDetails}/>
//     )
//   }

//   getWinner() {
//     const { pokemon1, pokemon2 } = this.state
//     if( pokemon1.wins > pokemon2.wins) return pokemon1
//     else return pokemon2
//   }

//   getLoser() {
//     const { pokemon1, pokemon2 } = this.state
//     if( pokemon1.wins > pokemon2.wins) return pokemon2
//     else return pokemon1
//   }

//   renderWinner() {
//     const { pokemon1, pokemon2 } = this.state
//     if (pokemon1.wins || pokemon2.wins){
//       if(pokemon1.wins === pokemon2.wins) return <p>It's a tie</p>
//       return(
//         <div>
//           <p>Winner: { this.getWinner().name }</p>
//           <p>Loser:  { this.getLoser().name }</p>
//         </div>
//       )
//     }
//   }


//   render() {
//     const { pokemon1, pokemon2 } = this.state;
//     return(
//       <div>
//         <p>Let the battle begin...</p>
//         { this.renderWinner() }
//         <div className="battle-container">
//           {this.renderPokemonForm(pokemon1, 'pokemon1')}
//           {this.renderPokemonForm(pokemon2, 'pokemon2')}
//         </div>
//         <br />
//         <button className="button" onClick={this.evaluateResult}>Battle</button>
//         <br />
//         <br />
//         <button className="button" onClick={this.props.handleBattle}>Back</button>
//       </div>
//     )
//   }
// }