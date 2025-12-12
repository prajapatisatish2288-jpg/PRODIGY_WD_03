(function () {
  const scoreMap = {
    O: 1,
    X: -1,
    draw: 0,
  };

  function evaluateBoard(board) {
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

    for (const [a, b, c] of lines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    if (board.every(Boolean)) {
      return 'draw';
    }

    return null;
  }

  function minimax(board, isMaximizing, aiPlayer, humanPlayer) {
    const state = evaluateBoard(board);
    if (state) {
      return scoreMap[state] ?? scoreMap.draw;
    }

    const currentPlayer = isMaximizing ? aiPlayer : humanPlayer;
    const bestScore = isMaximizing ? -Infinity : Infinity;
    let score = bestScore;

    for (let i = 0; i < board.length; i += 1) {
      if (!board[i]) {
        board[i] = currentPlayer;
        const nextScore = minimax(
          board,
          !isMaximizing,
          aiPlayer,
          humanPlayer
        );
        board[i] = null;

        if (isMaximizing) {
          score = Math.max(score, nextScore);
        } else {
          score = Math.min(score, nextScore);
        }
      }
    }

    return score;
  }

  function getBestMove(board, aiPlayer = 'O', humanPlayer = 'X') {
    let bestScore = -Infinity;
    let move = null;

    for (let i = 0; i < board.length; i += 1) {
      if (!board[i]) {
        board[i] = aiPlayer;
        const moveScore = minimax(board, false, aiPlayer, humanPlayer);
        board[i] = null;

        if (moveScore > bestScore) {
          bestScore = moveScore;
          move = i;
        }
      }
    }

    return move;
  }

  window.TicTacToeAI = {
    getBestMove,
  };
})();


