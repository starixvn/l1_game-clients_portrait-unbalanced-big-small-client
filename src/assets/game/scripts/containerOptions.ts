import gc from "@sg/game-client-base";
import { LogStore } from "db://shared-components/game/scripts/stores/log-store";
import * as BetChoice from "../scripts";

import { FakeChipHandlers } from "../../../extensions/shared-components/assets/game/chip-flying-total-bets/scripts/handlers/fake-chip-handlers";
import { sharedContainer } from "../../scripts/shared-container";
import { settings } from "./game-settings";

export const containerOptions: gc.IContainerOptions = {
    globalContainer: sharedContainer,
    onContainerCreated: (container) => {
        container.bind(gc.GameConfigs.GameSetting).toConstantValue(settings);
        container.bind(LogStore).to(LogStore);
        container.bind(gc.Chips.ChipHandlers).to(FakeChipHandlers);
    },
    features: [BetChoice, ...gc.defaultFeatures, gc.BetDetailsNew],
};
