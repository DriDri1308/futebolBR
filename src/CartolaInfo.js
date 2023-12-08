import React, { useState, useEffect } from 'react';
import './CartolaInfo.css';
import fundoCartola from './imagens/wepik-export-20231202001648CjQr.jpeg';

const CartolaInfo = () => {
  const [atletas, setAtletas] = useState([]);
  const [erro, setErro] = useState(null);
  const atletasPorPagina = 8;
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [result,setresult] = useState({})
  const [query,setquery] = useState('')

  useEffect(() => {
    const obterInfoAtletas = async () => {
      try {
        const responseAtletas = await fetch('https://api.cartola.globo.com/atletas/mercado');

        if (!responseAtletas.ok) {
          throw new Error(`Erro na solicitação: ${responseAtletas.status}`);
        }

        const data = await responseAtletas.json();
        setAtletas(data.atletas);
      } catch (error) {
        console.error('Erro ao obter informações dos atletas:', error.message);
        setErro('Erro ao obter informações dos atletas. Por favor, tente novamente mais tarde.');
      }
    };
    
  
    obterInfoAtletas();
   
    
  }, []);
 

  const indiceInicio = (paginaAtual - 1) * atletasPorPagina;
  const indiceFim = paginaAtual * atletasPorPagina;
  const atletasPaginaAtual = atletas.slice(indiceInicio, indiceFim);
  
  return (
    <div className="cartola-info-container" style={{ backgroundImage: `url(${fundoCartola})` }}>
      <h1 className="titulo">ATLETAS E TÉCNICOS DO BRASIL</h1>
      
      {erro ? (
        <p>{erro}</p>
      ) : (
        <div className="cards-container">
          {atletasPaginaAtual.map((atleta) => (
            <div key={atleta.atleta_id} className="card">
              <div className="card-imagem"
                   style={{
                     backgroundImage: `url('${process.env.PUBLIC_URL ? process.env.PUBLIC_URL + '/' : ''}${atleta.imagem || 'caminho-padrao-sem-imagem.jpg'}')`,
                   }}>
              </div>
              <div className="card-conteudo">
                <p><strong>Nome:</strong> {atleta.nome || 'Nome não disponível'}</p>
                <p><strong>Apelido:</strong> {atleta.apelido || 'Apelido não disponível'}</p>
                <p><strong>Posição:</strong> {atleta.posicao || 'Posição não disponível'}</p>
                {/* Adicione mais informações do atleta conforme necessário */}
              </div>
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

      <p className="rodape"> Times do Campeonato Brasieliro: América-MG,
Athletico-PR,
Atlético-MG,
Bahia,
Botafogo,
Corinthians,
Coritiba,
Cruzeiro,
Cuiabá,
Flamengo,
Fluminense,
Fortaleza,
Goiás,
Grêmio,
Internacional,
Palmeiras,
Bragantino,
Santos,
São Paulo,
Vasco da Gama.</p>
    </div>
  );
};

export default CartolaInfo;