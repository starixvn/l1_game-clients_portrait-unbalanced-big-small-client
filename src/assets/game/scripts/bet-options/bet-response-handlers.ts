import gc from "@sg/game-client-base";
import inversify from "inversify";
import { GameServiceMessage } from "../game-message";
const { injectable, inject } = inversify;

@injectable()
export class BetResponseHandlers implements gc.Shared.IMultipleHandlers {
    @inject(gc.Chips.ChipStore) protected readonly chipStore: gc.Chips.ChipStore;
    handleBetChoice(ownChip: any) {
        const endBet = ownChip.endBet;
        if (endBet > 0) {
            this.chipStore.ownChip = { betChoice: ownChip.betChoice, amount: endBet };
        }
    }

    eventHandleList = [
        {
            name: GameServiceMessage.OwnChip.eventName,
            handle: this.handleBetChoice,
        },
    ];
}
