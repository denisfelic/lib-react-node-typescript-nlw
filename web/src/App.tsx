import React, { useState } from 'react';
import './App.css';
import Header from './Header';


function App() {
  //Desestruturação para pegar os dois indicês do Array.
  const [count, setCount] = useState(0);  //Return array[valor do estado, função para atualizar];

  return (
    <div>
      <Header title={`O próximo valor sera: ${(count+1)}`} />

      <p>{count}</p>
      <button onClick={contIncrement} >Incrementar</button>
    </div>
  );

  function contIncrement() {
    setCount(count+1);
  }
};


export default App;
