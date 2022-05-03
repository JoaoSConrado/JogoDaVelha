
import React from 'react';
import { useState, useEffect } from 'react';
import './JogoDaVelha.css';


function JogoDaVelha() {
  const emptyBorda = Array(9).fill("");

  const [borda, setBorda] = useState(emptyBorda);
  const [Jogador, setJogador] = useState("X");
  const [Venceu, setVenceu] = useState(null);

  const click = (index) => {
    if (Venceu) {
      console.log("Jogo Finalizado");
      return null;
    }

    if (borda[index] !== "") {
      console.log("Posição Ocupada");
      return null;
    }
    setBorda(borda.map((item, itemIndex) => itemIndex === index ? Jogador : item));

    setJogador(Jogador === "X" ? "O" : "X")
  }

  const verificadorWin = () => {
    const possibilidadesWin = [
      [borda[0], borda[1], borda[2]],
      [borda[3], borda[4], borda[5]],
      [borda[6], borda[7], borda[8]],
      [borda[0], borda[3], borda[6]],
      [borda[1], borda[4], borda[7]],
      [borda[2], borda[5], borda[8]],
      [borda[0], borda[4], borda[8]],
      [borda[2], borda[4], borda[6]],
    ];

    possibilidadesWin.forEach(quadrados => {
      if (quadrados.every(quadardo => quadardo === "O")) setVenceu("O");
      if (quadrados.every(quadardo => quadardo === "X")) setVenceu("X");
    });

    empate();
  }

  const empate = () => {
    if (borda.every(item => item !== "")) {
      setVenceu("E");
    }
  }

  useEffect(verificadorWin, [borda]);

  const Recomecar = () => {
    setJogador("O");
    setBorda(emptyBorda);
    setVenceu(null);
  }

  return (
    <main>
      <h1 className='titulo'>Jogo Da Velha</h1>

      <div className={`borda ${Venceu ? "Fim" : ""}`}>

        {borda.map((item, index) => (
          <div key={index} className={`quadrado ${item}`}
            onClick={() => click(index)}
          >

            {item}
          </div>
        ))}


      </div>

      {Venceu &&
        <footer>
          {Venceu == "E" ?
            <h2 className='MsgVencedor'>
              <span className={Venceu}> Empatou! </span>
            </h2>
            :
            <h2 className='MsgVencedor'>
              <span className={Venceu}> {Venceu} </span> venceu!
            </h2>
          }
          <button onClick={Recomecar}>Recomeçar o Jogo!</button>
        </footer>
      }
    </main>


  );
}

export default JogoDaVelha;
