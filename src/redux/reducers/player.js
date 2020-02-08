export default (state = {}, action) => {
    switch (action.type) {
        case "GET_PLAYER":
            return action.id;
        default:
            return state;
    }
}