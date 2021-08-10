  
import React from 'react';
import Canvas from './components/Canvas';
import './App.css';
import './css/hero.css';

class App extends React.Component {
  render() {
    return(
      <section className="hero">
        <div className="hero__container">
          <Canvas/>
        </div>
      </section>
    );
  }
}

export default App