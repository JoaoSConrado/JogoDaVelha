import { useState } from 'react'
import { useEffect } from 'react'
import logo from './logo.svg'
import './App.css'

type Players = "O" | "X"

function App() {

  const [turn, setTurn] = useState<Players>("O")
  const [winner, setWinner] = useState<Players | null>(null)
  const [draw, setDraw] = useState<boolean | null>(null)
  const [marks, setMarks] = useState<{ [key: string]: Players }>({})
  const GameOver = !!winner || !!draw;

  console.log(marks);

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

      {GameOver && <button onClick={reset}>Jogar Novamente</button>}

    </div >

  )
}

export default App
