import React from 'react';
import _ from 'lodash';
import { WORD_LENGTH } from './App';

type AttemptRowProps = {
    colorForLetter: (letter: string, index: number) => string,
    word: string
}
export const AttemptedRow = (props: AttemptRowProps) => {
    return (
        <div className='letter-grid-row'>
          {
            props.word.split('').map((letter, index) => {
              const color = props.colorForLetter(letter, index);
              let className = "letter-grid-item";
              if (color) {
                className += ` ${color}-background`;
              }
              return (
                <div className={className}>
                  {letter}
                </div>
              );
            }) 
          }
        </div>
      );
}

export const CurrentEntry = (props: { word: string }) => {
    const paddedWord: string = _.padEnd(props.word, WORD_LENGTH, ' ');
    return (
        <div className='letter-grid-row'>
            {
                paddedWord.split('').map(letter => 
                    <div className='letter-grid-item'>{letter}</div>)
            }
        </div>
    )
}

export const EmptyRow = () => {
    return (
        <div className='letter-grid-row'>
            {
                _.range(WORD_LENGTH).map(() =>
                    <div className='letter-grid-item'></div>)

            }
        </div>
    )
}