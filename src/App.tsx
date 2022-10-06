import React, { useState, useEffect } from 'react';

import './App.css';

import { BuscaCaracolesContainer } from './components/buscaCaracoles/buscaCaracolesContainer';
import { SnailWraper } from './components/buscaCaracoles/snailWraper';

function App() {

  return (
    <div>
      <SnailWraper />
    </div>
  );
}

export default App;
