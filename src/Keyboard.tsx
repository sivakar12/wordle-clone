import React from 'react';

type KeyboardProps = {
    onLetterInput: (letter: string) => void,
    onBackspace: () => void,
    onEnter: () => void
}

const rows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Backspace', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Enter']
]

export default function Keyboard(props: KeyboardProps) {
    const handleButton = (button: string) => {
        if (button === 'Backspace') {
            props.onBackspace();
        } else if (button === 'Enter') {
            props.onEnter();
        } else {
            props.onLetterInput(button);
        }
    }
    return (
        <div className="keyboard">
            {rows.map((row, rowIndex) => (
                <div className="keyboard-row" key={rowIndex}>
                    {row.map((text, letterIndex) => (
                        <button
                            className="keyboard-button"
                            key={letterIndex}
                            onClick={() => handleButton(text)}
                        >
                            {text}
                        </button>
                    ))}
                </div>
            ))}
        </div>
    );
}