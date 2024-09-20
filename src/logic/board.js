import { WINNER_COMBOS } from "../constants.js";
export const checkWinner = (boardToCheck) => {
  // recorremos todos los combos para ver si 'x' u 'o' gana
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo;
    if (
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ) {
      return boardToCheck[a];
    }
  }
  // si no hay ganador
  return null;
};

export const checkEndGame= (newBorad) => {
  return newBorad.every((square) => square !== null)
}