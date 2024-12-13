import React from 'react';
import { store } from './store';
import { Information } from './Information';
import { Field } from './Field';
import styles from './Game.module.css';

export const Game = () => {
    const resetGame = () => {
        store.dispatch({ type: 'RESTART_GAME' });
    };

    return (
        <div className={styles.game}>
            <Information />
            <Field />
            <button onClick={resetGame}>Начать заново</button>
        </div>
    );
};
