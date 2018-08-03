export default (state = { bookNumber: 1 }, action) => {
    const { bookNumber } = state;
    switch (action.type) {
        case 'SELECT_BOOKNUMBER':
            return { bookNumber: action.bookNumber }
        default: 
            return state
    }
}