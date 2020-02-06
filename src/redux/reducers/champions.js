export default (state = [], action) => {
    switch (action.type) {
        case "GET_CHAMPIONS":
            return action.champions;
        default:
            return state;
    }
}