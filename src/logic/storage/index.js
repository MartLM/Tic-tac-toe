export const saveGameToStorage = ({board, turn}) => {
  console.log(typeof JSON.stringify(board))
  console.log(JSON.stringify(board))
  console.log(typeof JSON.parse(window.localStorage.getItem('board')))
  console.log(JSON.parse(window.localStorage.getItem('board')))
  window.localStorage.setItem('board', JSON.stringify(board));
  window.localStorage.setItem('turn', turn);

}

export const resetGameStorage = () => {
  window.localStorage.removeItem('board')
  window.localStorage.removeItem('turn')
}