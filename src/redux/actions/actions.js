export const getChampions = (champions) => ({
    type: "GET_CHAMPIONS",
    champions
});

export const getMatches = (matches) => ({
    type: "GET_MATCHES",
    matches
});

export const getPlayer = (id) => ({
    type: "GET_PLAYER",
    id
});

export const getRunes = (runes) => ({
    type: "GET_RUNES",
    runes
});

export const getSummoners = (summoners) => ({
    type: "GET_SUMMONERS",
    summoners
});