import React, {Component} from 'react'
import Board from './Board';


function calculateWinner(squares) {
    console.log("Squares", squares);
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
        if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
            return squares[a];
        }
    }

    return null;
}

function calculateAiMove(squares) {
    let moveDone = false;
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
        if (squares[a] === 'O' && squares[b] === 'O' && squares[c] === null) {
            squares[c] = 'O'
            moveDone = true;
            break;
        } else if (squares[a] === 'O' && squares[c] === 'O' && squares[b] === null) {
            squares[b] = 'O'
            moveDone = true;
            break;
        } else if (squares[c] === 'O' && squares[b] === 'O' && squares[a] === null) {
            squares[a] = 'O'
            moveDone = true;
            break;
        }
        if (moveDone == false) {
          if (squares[a] === 'X' && squares[b] === 'X' && squares[c] === null) {
              squares[c] = 'O'
              moveDone = true;
              break;
          } else if (squares[a] === 'X' && squares[c] === 'X' && squares[b] === null) {
              squares[b] = 'O'
              moveDone = true;
              break;
          } else if (squares[c] === 'X' && squares[b] === 'X' && squares[a] === null) {
              squares[a] = 'O'
              moveDone = true;
              break;
        }
      }
    }

    let emptySquares = [];
    if (moveDone === false) {
        for (let i = 0; i < squares.length; i++) {
            if (squares[i] === null) {
              emptySquares.push(i);
            } else if (squares[i] && squares[i + 1] === 'O') {
              if (squares[i + 2 === null]) {
                squares[i + 2] = 'O';
                break;
              }
            } else if (squares[i] && squares[i + 2] === 'O') {
              if(squares[i + 1] === null ) {
                squares[i + 1] = 'O';
                break;
              }
            }
        }
        squares[emptySquares[Math.floor(Math.random() * emptySquares.length)]] = 'O';
    }
    return squares;
}

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            xIsNext: true,
            stepNumber: 0,
            history: [
                {squares: Array(9).fill(null)}
            ]
        }
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        })
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        let squares = current.squares.slice();
        let winner = calculateWinner(squares);
        // console.log(winner);
        if (winner) {
            return;
        }
        squares[i] = 'X';
         winner = calculateWinner(squares);
        console.log(winner)
        if (!winner) {
            squares = calculateAiMove(squares);
        }
        this.setState({
            history: history.concat({
                squares: squares
            }),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        const moves = history.map((step, move) => {
        const desc = move ? 'Go to #' + move : 'Start the Game';
        return (
          <li key={move}>
            <button onClick={() => {
                this.jumpTo(move)
              }}>
                  {desc}
            </button>
          </li>
      )
  });
        let status;
        if (winner) {
            status = 'Winner is ' + winner;
        } else {
            status = 'Next Player is ' + (this.state.xIsNext ? 'X' : 'O');
        }


        return (
            <div className="game">
                <div className="game-board">
                    <Board onClick={(i) => this.handleClick(i)}
                           squares={current.squares}/>
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ul>{moves}</ul>
                </div>

            </div>
        )
    }
}

export default Game;
