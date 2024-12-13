import React, { useState, useEffect } from 'react';
import { store } from './store';
import styles from './Field.module.css';

export const Field = () => {
    const [state, setState] = useState(store.getState());

    useEffect(() => {
        const unsubscribe = store.subscribe(() => {
            setState(store.getState());
        });
        return () => unsubscribe();
    }, []);

    const handleClick = (index) => {
        if (state.field[index] || state.isGameEnded) return;

        const newField = [...state.field];
        newField[index] = state.currentPlayer;

        store.dispatch({ type: 'SET_FIELD', payload: newField });
        checkGameState(newField, state.currentPlayer);

        const nextPlayer = state.currentPlayer === 'X' ? '0' : 'X';
        store.dispatch({ type: 'SET_CURRENT_PLAYER', payload: nextPlayer });
    };

    const checkGameState = (newField, player) => {
        const WIN_PATTERNS = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6],
        ];

        for (let pattern of WIN_PATTERNS) {
            const [a, b, c] = pattern;
            if (newField[a] && newField[a] === newField[b] && newField[a] === newField[c]) {
                store.dispatch({ type: 'SET_GAME_ENDED', payload: true });
                return;
            }
        }

        if (newField.every(cell => cell !== '')) {
            store.dispatch({ type: 'SET_DRAW', payload: true });
        }
    };

    return (
        <div className={styles.field}>
            {state.field.map((cell, index) => (
                <button key={index} onClick={() => handleClick(index)}>
                    {cell}
                </button>
            ))}
        </div>
    );
};
