import React from 'react'
import CacheForm from './components/CacheForm';

import './App.css'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className='text-4xl font-bold'>LRU Cache Interface</h1>
        <CacheForm />
      </header>
    </div>
  );
}

export default App;
