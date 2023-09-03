import { useState } from "react";

function Square({ num, value, onSquare }) {
  let result = num;
  if (value != null) {
    result = value;
  }
  return (
    <button className="square" onClick={onSquare}>
      {result}
    </button>
  );
}

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  function onSquare(i) {
    let player = "O";
    if (xIsNext) {
      player = "X";
    }
    setXIsNext(!xIsNext);
    const nextSquares = squares.slice();
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    nextSquares[i] = player;
    setSquares(nextSquares);
  }
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">
        <b>{status}</b>
      </div>
      <div className="board-row">
        <Square num="1" value={squares[0]} onSquare={() => onSquare(0)} />
        <Square num="2" value={squares[1]} onSquare={() => onSquare(1)} />
        <Square num="3" value={squares[2]} onSquare={() => onSquare(2)} />
      </div>
      <div className="board-row">
        <Square num="4" value={squares[3]} onSquare={() => onSquare(3)} />
        <Square num="5" value={squares[4]} onSquare={() => onSquare(4)} />
        <Square num="6" value={squares[5]} onSquare={() => onSquare(5)} />
      </div>
      <div className="board-row">
        <Square num="7" value={squares[6]} onSquare={() => onSquare(6)} />
        <Square num="8" value={squares[7]} onSquare={() => onSquare(7)} />
        <Square num="9" value={squares[8]} onSquare={() => onSquare(8)} />
      </div>
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
