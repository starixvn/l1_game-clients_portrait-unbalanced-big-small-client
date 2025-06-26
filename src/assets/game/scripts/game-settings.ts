const GAME_NAME = "UnbalancedBigSmall4";

export const settings = {
    id: 55,
    name: GAME_NAME,
    observerNamespace: GAME_NAME,
    namespaces: [GAME_NAME, "BigSmall"],
    durations: {
        wholeRound: 40,
        lockingBet: 5,
        placingBet: 30,
        generatingResult: 3,
        showingResult: 4,
        startRound: 3,
    },
    numberOfRoundHistory: 100,
    isMiniGame: true,
};
