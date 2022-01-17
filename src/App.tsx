import React from 'react';
import Keyboard from './Keyboard';
import './App.css'


type Attempts = string[];

const WORD_LENGTH = 5;
const MAX_ATTEMPTS = 6;


function App() {
  
  const [word, setWord] = React.useState('APPLE');
  const [currentEntry, setCurrentEntry] = React.useState('');
  const [attempts, setAttempts] = React.useState<Attempts>(['TOTAL', 'WATER', 'INDIA']);
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
  function displayWord(word: string, showColors: boolean) {
    return (
      <div className='letter-grid-row'>
        {
          word.split('').map((letter, index) => {
            const color = showColors ? colorForLetter(letter, index) : '';
            return (
              <div className='letter-grid-item' style={{backgroundColor: color}}>
                {letter}
              </div>
            );
          }) 
        }
      </div>
    );
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
    setAttempts([...attempts, currentEntry]);
    setCurrentEntry('')
    if (attempts.length === MAX_ATTEMPTS) {
      setGameOver(true);
    }
  }

  return (
    <div className='main-layout'>
      <div className='title'>WORDLE</div>
      <div className='letter-grid'>
        {attempts.map(attempt => displayWord(attempt, true))}
        {displayWord(currentEntry, false)}
      </div>
      <Keyboard
        onLetterInput={handleLetterInput}
        onBackspace={handleBackspace}
        onEnter={handleSubmitWord}
        colorForKey={getColorsForKeyboard()}
      />
    </div>
  );
}

export default App;
