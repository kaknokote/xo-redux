const initialState = {
    field: Array(9).fill(''),
    currentPlayer: 'X',
    isGameEnded: false,
    isDraw: false,
};

export const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case 'SET_FIELD':
            return { ...state, field: payload };
        case 'SET_CURRENT_PLAYER':
            return { ...state, currentPlayer: payload };
        case 'SET_GAME_ENDED':
            return { ...state, isGameEnded: payload };
        case 'SET_DRAW':
            return { ...state, isDraw: payload };
        case 'RESTART_GAME':
            return initialState;
        default:
            return state;
    }
};
