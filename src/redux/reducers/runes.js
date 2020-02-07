export default (state = [], action) => {
    switch (action.type) {
        case "GET_RUNES":
            return action.runes;
        default:
            return state;
    }
}