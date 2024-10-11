import { useState, useEffect } from 'react';

const words = ['elephant', 'giraffe', 'dolphin', 'penguin', 'octopus']; // words longer than 5 letters

const Hangman: React.FC = () => {
  const [selectedWord, setSelectedWord] = useState<string>('');
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [wrongGuesses, setWrongGuesses] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [won, setWon] = useState<boolean>(false);

  useEffect(() => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setSelectedWord(randomWord);
  }, []);

  const handleGuess = (letter: string) => {
    if (guessedLetters.includes(letter) || gameOver) return;

    setGuessedLetters([...guessedLetters, letter]);

    if (!selectedWord.includes(letter)) {
      setWrongGuesses(wrongGuesses + 1);
    }

    if (selectedWord.split('').every((char) => guessedLetters.includes(char) || char === letter)) {
      setWon(true);
      setGameOver(true);
    }

    if (wrongGuesses + 1 >= 6) {
      setGameOver(true);
    }
  };

  const resetGame = () => {
    setGuessedLetters([]);
    setWrongGuesses(0);
    setGameOver(false);
    setWon(false);
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setSelectedWord(randomWord);
  };

  const displayWord = selectedWord.split('').map((char) => (guessedLetters.includes(char) ? char : '_')).join(' ');

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Hangman</h1>
      <div style={{ fontSize: '2rem' }}>{displayWord}</div>
      <p>Wrong guesses: {wrongGuesses} / 6</p>

      {gameOver ? (
        <div>
          {won ? <h2>You Won!</h2> : <h2>Game Over! The word was: {selectedWord}</h2>}
          <button onClick={resetGame}>Play Again</button>
        </div>
      ) : (
        <div>
          {'abcdefghijklmnopqrstuvwxyz'.split('').map((letter) => (
            <button
              key={letter}
              onClick={() => handleGuess(letter)}
              disabled={guessedLetters.includes(letter)}
              style={{ margin: '5px', padding: '10px' }}
            >
              {letter}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Hangman;
