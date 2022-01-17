import React from 'react';

type KeyboardProps = {
    onLetterInput: (letter: string) => void,
    onBackspace: () => void,
    onEnter: () => void,
    colorForKey: {[key: string]: string},
}

const ENTER_SYMBOL = '⏎';
const BACKSPACE_SYMBOL = '⌫';

const rows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    [BACKSPACE_SYMBOL, 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ENTER_SYMBOL],
]

export default function Keyboard(props: KeyboardProps) {
    const handleButton = (button: string) => {
        if (button === BACKSPACE_SYMBOL) {
            props.onBackspace();
        } else if (button === ENTER_SYMBOL) {
            props.onEnter();
        } else {
            props.onLetterInput(button);
        }
    }

    return (
        <div className="keyboard">
            {rows.map((row, rowIndex) => (
                <div className="keyboard-row" key={rowIndex}>
                    {row.map((text, letterIndex) => {
                        let className = "keyboard-button"
                        const color = props.colorForKey[text];
                        if (color) {
                            className += ` ${color}-background`;
                        }
                        return (
                            <div
                                className={className}
                                key={letterIndex}
                                // style={{backgroundColor: props.colorForKey[text]}}
                                onClick={() => handleButton(text)}
                            >
                                {text}
                            </div>

                        )
                    }
                )}
                </div>
            ))}
        </div>
    );
}