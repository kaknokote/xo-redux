import React, { useState, useEffect } from 'react';
import { store } from './store';
import styles from './Information.module.css';

export const Information = () => {
    const [state, setState] = useState(store.getState());

    useEffect(() => {
        const unsubscribe = store.subscribe(() => {
            setState(store.getState());
        });
        return () => unsubscribe();
    }, []);

    let message;
    if (state.isDraw) {
        message = 'Ничья';
    } else if (state.isGameEnded) {
        message = `Победа: ${state.currentPlayer === 'X' ? '0' : 'X'}`;
    } else {
        message = `Ходит: ${state.currentPlayer}`;
    }

    return <div className={styles.information}>{message}</div>;
};
