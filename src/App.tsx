import React from 'react';
import _ from 'lodash'
import Keyboard from './Keyboard';
import './App.css'
import { AttemptedRow, CurrentEntry, EmptyRow } from './DisplayRows';
import allWords from './words';
import easyWords from './easy-words';

type Attempts = string[];

export const WORD_LENGTH = 5;
const MAX_ATTEMPTS = 6;

// const words = [
//   'APPLE', 'MANGO', 'WATER', 'LIVER', 'RIVER',
//   'DRONE', 'KITES', 'ROUND', 'WOMAN'
// ]

function getRandomWord() {
  const index = Math.floor(Math.random() * easyWords.length);
  return easyWords[index]
}

function validWord(wordToCheck: string) {
  // TODO: Must find a better tree based search 
  // when there are more words
  return allWords.some(w => w === wordToCheck)
}

function App() {
  
  const [word, setWord] = React.useState(getRandomWord());
  const [currentEntry, setCurrentEntry] = React.useState('');
  const [attempts, setAttempts] = React.useState<Attempts>([]);
  const [gameOver, setGameOver] = React.useState(false);

  function colorForLetter(letter: string, index: number) {
    if (word[index] === letter) {
      return 'green';
    } else if (word.indexOf(letter) > -1) {
        return 'yellow';
    } else {
      return ''
    }
  }

  function getColorsForKeyboard(): { [key: string]: string } {
    let colorForLetter: { [key: string]: string}  = {};
    attempts.forEach(attempt => {
      attempt.split('').forEach((letter, index) => {
        if (word.charAt(index) === letter) {
          colorForLetter[letter] = 'green';
        } else if (word.indexOf(letter) > -1) {
          colorForLetter[letter] = 'yellow';
        } else {
          colorForLetter[letter] = 'grey';
        }
      })
    })
    return colorForLetter;
  }

  const handleLetterInput = (letter: string) => {
    if (currentEntry.length === WORD_LENGTH) {
      return;
    }
    setCurrentEntry(currentEntry + letter);
  }

  const handleBackspace = () => {
    if (currentEntry.length === 0) {
      return;
    }
    setCurrentEntry(currentEntry.slice(0, -1));
  }
  const handleSubmitWord = () => {
    if (currentEntry.length !== WORD_LENGTH) {
      return;
    }
    if (validWord(currentEntry)) {
      setAttempts([...attempts, currentEntry]);
      setCurrentEntry('')
      if (currentEntry === word || attempts.length === MAX_ATTEMPTS - 1) {
        setGameOver(true);
      }
    } else {
      setCurrentEntry('');
    }
  }

  const GameOver = () => {
    const isWon = attempts[attempts.length - 1] === word;
    const handleRestart = () => {
      setWord(getRandomWord());
      setAttempts([]);
      setGameOver(false);
    }
    return (
      <div className="game-over">
        {isWon ? <p>You won!</p> : <p>Game over!</p>}
        {!isWon && <p>The word is {word}</p>}
        <span className="game-over-restart" onClick={handleRestart}>Play Again</span>
      </div>
    )
  }

  return (
    <div className='main-layout'>
      <div className='title'>WORDLE</div>
      <hr/>
      <div className='letter-grid'>
        {attempts.map(word => <AttemptedRow word={word} colorForLetter={colorForLetter} />)}
        { (attempts.length < MAX_ATTEMPTS) && <CurrentEntry word={currentEntry}/> }
        { _.range(0, MAX_ATTEMPTS - attempts.length - 1, 1).map(() => <EmptyRow />)}
      </div>
      <hr/>
      { gameOver ?
        <GameOver/> :
        <Keyboard
          onLetterInput={handleLetterInput}
          onBackspace={handleBackspace}
          onEnter={handleSubmitWord}
          colorForKey={getColorsForKeyboard()}
        />
      }
    </div>
  );
}

export default App;
