import { useEffect, useState } from 'react'

import './App.css'

function App() {
  const [matrix, setMatrix] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(true);
  const [win, setWin] = useState(null)
  const handleTurn = (e) => {
    // console.log(e.target.id)
    const dummy=[...matrix];
    dummy[e.target.id] = turn ? 'X':'O';
    setMatrix(dummy)
    setTurn((prev) => !prev);
  }
  const handleWin = () => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (matrix[a] && matrix[a] === matrix[b] && matrix[a] === matrix[c]) {
        setWin(matrix[a]);
      }
    }
  }
  const handleReset=()=>{
     setMatrix(Array(9).fill(null));
     setTurn(true);
     setWin(null);
  }
  useEffect(() => {
    handleWin()
  }, [matrix])
  return (
    <>
      <div className='game'>
        <p id='head'>Tic  &nbsp; Tac &nbsp; Toe</p>
        <div className='board'>
          {
            matrix.map((item, index) => {
              return (
                <div
                  key={index}
                  id={index}
                  className='box'
                  onClick={handleTurn}
                >
                  {item}
                </div>
              )
            })
          }
        </div> <br />
        <button onClick={handleReset} >Reset</button>
        <p className='result'>Next player:  <span>{turn ? 'X' : 'O'}</span> </p>
        {win&& <p className='result'>Player <span>{win}</span> has won !</p>}
      </div>


    </>
  )
}

export default App
