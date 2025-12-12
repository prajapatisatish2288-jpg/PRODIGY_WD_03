(function () {
  const WINNING_COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  class Game {
    constructor() {
      this.board = Array(9).fill(null);
      this.currentPlayer = 'X';
      this.mode = 'pvp';
      this.isOver = false;
      this.listeners = new Set();
      this.score = { X: 0, O: 0, draws: 0 };
    }

    subscribe(listener) {
      this.listeners.add(listener);
      listener(this.getSnapshot());
      return () => this.listeners.delete(listener);
    }

    notify() {
      const snapshot = this.getSnapshot();
      this.listeners.forEach((listener) => listener(snapshot));
    }

    getSnapshot() {
      return {
        board: [...this.board],
        currentPlayer: this.currentPlayer,
        mode: this.mode,
        isOver: this.isOver,
        winnerInfo: this.getWinnerInfo(),
        score: { ...this.score },
      };
    }

    setMode(mode) {
      if (mode !== this.mode) {
        this.mode = mode;
        this.reset();
      }
    }

    reset() {
      this.board = Array(9).fill(null);
      this.currentPlayer = 'X';
      this.isOver = false;
      this.notify();
    }

    makeMove(index) {
      if (this.isOver || this.board[index]) {
        return;
      }

      this.board[index] = this.currentPlayer;
      const winnerInfo = this.getWinnerInfo();

      if (winnerInfo) {
        this.isOver = true;
        this.score[winnerInfo.winner] += 1;
      } else if (this.board.every(Boolean)) {
        this.isOver = true;
        this.score.draws += 1;
      } else {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
      }

      this.notify();

      if (
        this.mode === 'pvai' &&
        this.currentPlayer === 'O' &&
        !this.isOver
      ) {
        window.requestAnimationFrame(() => this.makeAIMove());
      }
    }

    makeAIMove() {
      const aiMove = window.TicTacToeAI.getBestMove(
        [...this.board],
        'O',
        'X'
      );
      if (aiMove != null) {
        this.makeMove(aiMove);
      }
    }

    getWinnerInfo() {
      for (const combo of WINNING_COMBOS) {
        const [a, b, c] = combo;
        if (
          this.board[a] &&
          this.board[a] === this.board[b] &&
          this.board[a] === this.board[c]
        ) {
          return { winner: this.board[a], combo };
        }
      }
      return null;
    }
  }

  window.TicTacToeGame = new Game();
})();


