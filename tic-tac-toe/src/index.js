import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  const className = "square" + (props.winningSquare ? " winner-square" : "");

  return (
    <button className={className} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return <Square
              key={i}
              value={this.props.squares[i]}
              onClick={() => this.props.handleClick(i)}
              winningSquare={(this.props.winningSquares.indexOf(i) > -1)}
            />;
  }

  render() {
    let boardRows = [];
    let ind = 0;

    for (var r = 0; r < 3; r++) {
      let children = [];

      for (var c = 0; c < 3; c++) {
        children.push(this.renderSquare(ind));
        ind++;
      }

      boardRows.push(
        <div className="board-row" children={children} key={r}></div>
      );
    }

    return (<div children={boardRows}></div>);
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
          squares: Array(9).fill(null),
          squareFilled: null
        }],
      xIsNext: true,
      stepNumber: 0,
      historyAsc: true
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([{ squares: squares, squareFilled: i }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  }

  toggleHistoryOrder() {
    this.setState({
      historyAsc: !this.state.historyAsc
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    let moves = history.map((step, move) => {
      const desc = move ?
        "Go to move #" +
          move +
          " (" + step.squareFilled % 3 + ", " + Math.floor(step.squareFilled / 3) + ")":
        "Go to game start";

      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>
            { move === this.state.stepNumber ? <b>{desc}</b> : desc }
          </button>
        </li>
      );
    });

    if (!this.state.historyAsc) {
      moves.reverse();
    }

    let status;
    let allSquaresFilled = true;
    current.squares.forEach((item, i) => {
      if (item === null) {
        allSquaresFilled = false;
      }
    });

    if (winner) {
      status = "Winner is : " + winner.player;
    } else if (allSquaresFilled) {
      status = "Draw!";
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} winningSquares={winner ? winner.winningSquares : []} handleClick={(i) => this.handleClick(i)}/>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <button onClick={() => { this.toggleHistoryOrder(); }}>History {this.state.historyAsc ? "Asc" : "Desc"}</button>
          <ul>{moves}</ul>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { player: squares[a], winningSquares: lines[i].slice() };
    }
  }
  return null;
}
