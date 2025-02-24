import gc from "@sg/game-client-base";
import { LogStore } from "db://shared-components/game/scripts/stores/log-store";
import * as BetChoice from "../scripts";

import { sharedContainer } from "../../scripts/shared-container";

export const settings = {
    id: 55,
    name: "UnbalancedBigSmall4",
    namespaces: ["UnbalancedBigSmall4", "BigSmall"],
    durations: {
        wholeRound: 40,
        lockingBet: 5,
        placingBet: 30,
        generatingResult: 4,
        showingResult: 5,
        startRound: 1,
    },
    numberOfRoundHistory: 100,
    isMiniGame: true,
};

export const containerOptions: gc.IContainerOptions = {
    globalContainer: sharedContainer,
    onContainerCreated: (container) => {
        container.bind(gc.GameConfigs.GameSetting).toConstantValue(settings);
        container.bind(LogStore).to(LogStore);
    },
    features: [BetChoice, ...gc.defaultFeatures, gc.BetDetailsNew],
};
