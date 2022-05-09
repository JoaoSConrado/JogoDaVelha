import { useState } from 'react';
import { useEffect } from 'react';
import './App.css';
import swal from 'sweetalert';


type Players = "O" | "X"

var placarX = 0;
var placarO = 0;
var placarEmpate = 0;


swal(" JOGO DA VELHA ", "🥇 GANHA QUEM FIZER 10 PONTOS PRIMEIRO 🥇");
function App() {
  const [turn, setTurn] = useState<Players>("O")
  const [winner, setWinner] = useState<Players | null>(null)
  const [draw, setDraw] = useState<boolean | null>(null)
  const [marks, setMarks] = useState<{ [key: string]: Players }>({})
  const GameOver = !!winner || !!draw;



  const getSquares = () => {
    return new Array(9).fill(true);
  }

  const play = (index: number) => {

    if (marks[index] || GameOver) {
      return;
    }

    setMarks(prev => ({ ...prev, [index]: turn }))
    setTurn(prev => prev === "O" ? "X" : "O")
  }

  const getCellPlayer = (index: number) => {
    if (!marks[index]) {
      return;
    }

    return marks[index];
  };


  const getWinner = () => {
    const victoryLines = [

      // HORIZONTAL
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],

      // VERTICAL
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],

      // DIAGONAL
      [0, 4, 8],
      [2, 4, 6],



    ];

    for (const line of victoryLines) {
      const [a, b, c] = line;

      if (marks[a] && marks[a] === marks[b] && marks[a] === marks[c]) {
        return marks[a];
      }


    }
  };

  if (winner == "X") {
    placarX++
  };
  if (winner == "O") {
    placarO++
  };
  if (draw) {
    placarEmpate++
  }

  if (placarX >= 10) {
    swal({
      title: "PARABENS!",
      text: ' 🏆 O JOGADOR "X" VENCEU 🏆',
      icon: "success",
    });

    placarX = 0
    placarO = 0
    placarEmpate = 0
  }
  if (placarO >= 10) {
    swal({
      title: "PARABENS!",
      text: ' 🏆 O JOGADOR "O" VENCEU 🏆',
      icon: "success",

    });
    placarX = 0
    placarO = 0
    placarEmpate = 0
  }

  const reset = () => {
    setTurn(marks[0] == "O" ? "X" : "O");
    setMarks({});
    setWinner(null);
    setDraw(null);


  }


  useEffect(() => {
    const winner = getWinner()

    if (winner) {
      setWinner(winner)
      localStorage.setItem("1", winner);
    } else {
      if (Object.keys(marks).length === 9) {
        setDraw(true)
      }
    }
  }, [marks])





  return (

    <div className="container">
      {winner && <h1 className='winnerMensagem'> <span className={winner}> {winner}</span> Ganhou</h1>}

      {draw && <h1>Empate</h1>}


      {!GameOver && <p className='winnerMensagem'> É a vez de <span className={turn}> {turn}</span></p>}

      <div className={`board ${GameOver ? "gameOver" : null}`}>
        {getSquares().map((_, i) => (
          <div className={`cell ${getCellPlayer(i)}`} onClick={() => play(i)}>
            {marks[i]}
          </div>))}

      </div>

      {GameOver && <button onClick={reset}>Jogar Novamente ⟳ </button>}


      <div className='localStorage'>
        {localStorage.getItem("1") && <h5> ULTIMO GANHADOR: <span> {localStorage.getItem("1")}</span> </h5>}

        {<h5> <span className='Pontos'>PONTOS: </span> <span className='colorO'>O:</span> {placarO} | <span className='colorX'>X:</span> {placarX} | <span className='colorEmpate'>E:</span> {placarEmpate}</h5>}

      </div>

    </div >


  )



}


export default App;






