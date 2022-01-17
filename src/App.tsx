import React from 'react';
import Keyboard from './Keyboard';

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
    <div>
      {
        word.split('').map(letter => {
          const color = colorForLetter(letterStatus[letter]);
          return (
            <span style={{color: color}}>
              {letter}
            </span>
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
    <div>
      <div>WORDLE</div>
      <div>
        {attempts.map(attempt => displayWord(attempt, initialLetterStatus))}
        {displayWord(currentEntry, initialLetterStatus)}
      </div>
      <Keyboard
        onLetterInput={letter => {setCurrentEntry(currentEntry + letter);}}
        onBackspace={() => {setCurrentEntry(currentEntry.slice(0, -1));}}
        onEnter={() => {attempts.push(currentEntry); setCurrentEntry('');}}
      />
    </div>
  );
}

export default App;
