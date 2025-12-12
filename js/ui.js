(function () {
  const game = window.TicTacToeGame;
  const cells = Array.from(document.querySelectorAll('.cell'));
  const statusMessage = document.getElementById('statusMessage');
  const restartBtn = document.getElementById('restartBtn');
  const modeButtons = Array.from(document.querySelectorAll('.mode-toggle__btn'));
  const scoreX = document.getElementById('scoreX');
  const scoreO = document.getElementById('scoreO');
  const scoreDraw = document.getElementById('scoreDraw');
  const themeToggle = document.getElementById('themeToggle');

  const state = {
    selectedMode: 'pvp',
    theme: localStorage.getItem('ttt-theme') || 'light',
  };

  document.documentElement.dataset.theme = state.theme;
  themeToggle.setAttribute('aria-pressed', String(state.theme === 'dark'));

  function renderBoard(board, winnerInfo) {
    cells.forEach((cell, index) => {
      cell.textContent = board[index] || '';
      cell.disabled = Boolean(board[index]) || game.isOver;
      cell.classList.toggle(
        'cell--winner',
        winnerInfo?.combo?.includes(index) ?? false
      );
    });
  }

  function renderStatus({ currentPlayer, isOver, winnerInfo, mode }) {
    if (winnerInfo) {
      statusMessage.textContent = `Player ${winnerInfo.winner} wins!`;
    } else if (isOver) {
      statusMessage.textContent = "It's a draw!";
    } else if (mode === 'pvai' && currentPlayer === 'O') {
      statusMessage.textContent = 'AI is thinking...';
    } else {
      statusMessage.textContent = `Player ${currentPlayer}'s turn`;
    }
  }

  function renderScore(score) {
    scoreX.textContent = score.X;
    scoreO.textContent = score.O;
    scoreDraw.textContent = score.draws;
  }

  function handleCellClick(event) {
    const index = Number(event.currentTarget.dataset.index);
    game.makeMove(index);
  }

  function handleRestart() {
    game.reset();
  }

  function handleModeChange(event) {
    const button = event.currentTarget;
    state.selectedMode = button.dataset.mode;
    modeButtons.forEach((btn) => btn.classList.toggle('is-active', btn === button));
    game.setMode(state.selectedMode);
  }

  function toggleTheme() {
    state.theme = state.theme === 'light' ? 'dark' : 'light';
    document.documentElement.dataset.theme = state.theme;
    themeToggle.setAttribute('aria-pressed', String(state.theme === 'dark'));
    localStorage.setItem('ttt-theme', state.theme);
  }

  // Event listeners
  cells.forEach((cell) => cell.addEventListener('click', handleCellClick));
  restartBtn.addEventListener('click', handleRestart);
  modeButtons.forEach((button) =>
    button.addEventListener('click', handleModeChange)
  );
  themeToggle.addEventListener('click', toggleTheme);

  // Subscribe to game state changes
  game.subscribe(({ board, winnerInfo, ...rest }) => {
    renderBoard(board, winnerInfo);
    renderStatus({ winnerInfo, ...rest });
    renderScore(rest.score);
  });
})();


