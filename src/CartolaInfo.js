import React, { useState, useEffect } from 'react';
import './CartolaInfo.css';
import fallbackImage from './imagens/icon.webp';

const CartolaInfo = () => {
  const [atletas, setAtletas] = useState([]);
  const [erro, setErro] = useState(null);
  const atletasPorPagina = 6;
  const [paginaAtual, setPaginaAtual] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.cartola.globo.com/atletas/mercado');
        const data = await response.json();
        setAtletas(data.atletas);
      } catch (error) {
        setErro('Erro ao obter os dados dos atletas');
      }
    };

    fetchData();
  }, []);

  const handleImageError = (event) => {
    event.target.src = fallbackImage;
  };

  const indiceInicio = (paginaAtual - 1) * atletasPorPagina;
  const indiceFim = paginaAtual * atletasPorPagina;
  const atletasPaginaAtual = atletas.slice(indiceInicio, indiceFim);

  const handleSearch = () => {
    // Lógica de pesquisa
    alert('Implemente sua lógica de pesquisa aqui!');
  };

  return (
    <div className="cartola-info-container">
      <h1>ATLETAS E TÉCNICOS DO BRASIL</h1>

      {erro ? (
        <p>{erro}</p>
      ) : (
        <div className="cards-container">
          {atletasPaginaAtual.map((atleta) => (
            <div key={atleta.atleta_id} className="card">
              <img
                src={atleta.foto.replace('FORMATO', '140x140')}
                alt={atleta.nome}
                onError={handleImageError}
              />
              <p>{atleta.nome}</p>
              <p>Apelido: {atleta.apelido}</p>
            </div>
          ))}
        </div>
      )}

      <div className="botoes-container">
        <button className="botao" onClick={() => setPaginaAtual(paginaAtual - 1)}>
          Página Anterior
        </button>
        <span>Página {paginaAtual}</span>
        <button className="botao" onClick={() => setPaginaAtual(paginaAtual + 1)}>
          Próxima Página
        </button>
      </div>

      <div className="rodape-container">
        <ul className="lista-times">
          <li>Brasileirão 2023: América-MG, Athletico-PR, Atlético-MG, Bahia, Botafogo, Corinthians, Coritiba, Cruzeiro, Cuiabá, Flamengo, Fluminense, Fortaleza, Goiás, Grêmio, Internacional, Palmeiras, Bragantino, Santos, São Paulo, Vasco da Gama</li>
        </ul>
      </div>

      <div className="barra-pesquisa">
        <input type="text" placeholder="Pesquisar por letra" />
        <button onClick={handleSearch}>Pesquisar</button>
      </div>
    </div>
  );
};

export default CartolaInfo;