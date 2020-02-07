export default (state = [], action) => {
    switch (action.type) {
        case "GET_SUMMONERS":
            return action.summoners;
        default:
            return state;
    }
}