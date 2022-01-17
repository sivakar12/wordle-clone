import React from 'react';
import Keyboard from './Keyboard';
import './App.css'
type LetterStatus = 
  'guessedWrongPosition' | 'guessedRightPosition' | 'guessedWrong' | 'notGuessed';

function colorForLetter(letterStatus: LetterStatus) {
  switch (letterStatus) {
    case 'guessedWrongPosition':
      return 'yellow';
    case 'guessedRightPosition':
      return 'green';
    case 'guessedWrong':
      return 'grey';
    case 'notGuessed':
      return '';
  }
}
type LetterStatusMap = {
  [key: string]: LetterStatus;
}

const initialLetterStatus: LetterStatusMap = 
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    .split('')
    .reduce((acc, letter) => (
      {letter: 'notGuessed', ...acc}), 
      {}
    );

type Attempts = string[];

const WORD_LENGT = 5;
const MAX_ATTEMPTS = 6;

function displayWord(word: string, letterStatus: LetterStatusMap) {
  return (
    <div className='letter-grid-row'>
      {
        word.split('').map(letter => {
          const color = colorForLetter(letterStatus[letter]);
          return (
            <div className='letter-grid-item' style={{color: color}}>
              {letter}
            </div>
          );
        }) 
      }
    </div>
  );
}

function App() {

  const [word, setWord] = React.useState('APPLE');
  const [currentEntry, setCurrentEntry] = React.useState('');
  const [attempts, setAttempts] = React.useState<Attempts>(['TOTAL', 'WATER', 'INDIA']);

  return (
    <div className='main-layout'>
      <div className='title'>WORDLE</div>
      <div className='letter-grid'>
        {attempts.map(attempt => displayWord(attempt, initialLetterStatus))}
        {displayWord(currentEntry, initialLetterStatus)}
      </div>
      <Keyboard
        onLetterInput={letter => {setCurrentEntry(currentEntry + letter);}}
        onBackspace={() => {setCurrentEntry(currentEntry.slice(0, -1));}}
        onEnter={() => {setAttempts([...attempts, currentEntry]); setCurrentEntry('');}}
      />
    </div>
  );
}

export default App;
