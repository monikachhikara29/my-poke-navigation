import React from 'react';
import '../App.css';
import PokemonData from './PokemonData';
import Route from './Route'
import BattlePage from './BattlePage';
import Header from './Header';
import PokemonById from './PokemonById'

class App extends React.Component {
  render() {
  return (
    <div>
      <Header />
      <Route exact path="/" component={PokemonData} />
      <Route exact path="/battle" component={BattlePage} />
      <Route path="/pokemon/" component={PokemonById} />
    </div>
  );
  }
}

export default App;
