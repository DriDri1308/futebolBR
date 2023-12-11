import React from 'react';
import './App.css'; // Importe o estilo principal, se houver
import CartolaInfo from './CartolaInfo'; // Importe o componente CartolaInfo

const App = () => {
  return (
    <div className="app-container">
      {/* Conteúdo adicional ou outros componentes podem ser adicionados aqui */}
      <CartolaInfo />
    </div>
  );
};

export default App;