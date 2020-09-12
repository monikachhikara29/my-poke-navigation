import React from 'react';
import './App.css';
import PokemonData from './components/PokemonData';
import Route from './components/Route'
import BattlePage from './components/BattlePage';
import Header from './components/Header';
import PokemonById from './components/PokemonById'

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
