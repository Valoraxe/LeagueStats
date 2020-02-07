export const getChampions = (champions) => ({
    type: "GET_CHAMPIONS",
    champions
});

export const getRunes = (runes) => ({
    type: "GET_RUNES",
    runes
});


export const getSummoners = (summoners) => ({
    type: "GET_SUMMONERS",
    summoners
});