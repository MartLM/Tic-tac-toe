import { useState } from "react";
import { Square } from "./components/Square.jsx";
import { TURNS } from "./constants.js";
import { checkWinner, checkEndGame } from "./logic/board.js";
import { WinnerModal } from "./components/WinnerModal.jsx";
import { saveGameToStorage, resetGameStorage } from "./logic/storage/index.js";

export default function App() {
  const [board, setBoard] = useState(() => {
    //obtener el tablero del storage
    const boardStorage = window.localStorage.getItem("board");

    // verifica si hay un tablero guardado
    return boardStorage ? JSON.parse(boardStorage) : Array(9).fill(null);
  });

  const [turn, setTurn] = useState(() => {
    //obtener el turno del storage
    const turnStorage = window.localStorage.getItem("turn");

    //verifica si hay un turno guardado
    return turnStorage ?? TURNS.X;
  });

  const [winner, setWinner] = useState(null);

  const resetGame = () => {
    //reiniciar el tablero
    setBoard(Array(9).fill(null));

    //reiniciar el turno
    setTurn(TURNS.X);

    //reiniciar el ganador
    setWinner(null);

    //limpiar el storage
    resetGameStorage();
  };
  const updateBoard = (index) => {
    //comprobacion si la casilla ya tiene un valor
    if (board[index] || winner) return;

    //actualizar el tablero
    const newBorad = [...board];
    newBorad[index] = turn;
    setBoard(newBorad);

    //cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    //guardar partida
    saveGameToStorage({ board: newBorad, turn: newTurn });

    //comprobar si hay ganador
    const newWinner = checkWinner(newBorad);
    if (newWinner) {
      setWinner(newWinner);
    } else if (checkEndGame(newBorad)) {
      setWinner(false);
    }
  };


  return (
    <main className="board">
      <h1>TIC TAC TOE</h1>

      <button onClick={resetGame}>Resetar juego</button>

      <section className="game">
        {board.map((valor, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {valor}
            </Square>
          );
        })}
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  );
}
