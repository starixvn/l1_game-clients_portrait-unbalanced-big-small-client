import gc from "@sg/game-client-base";
import inversify from "inversify";
import { GameServiceMessage } from "../game-message";
const { injectable, inject } = inversify;

@injectable()
export class BetResponseHandlers implements gc.Shared.IMultipleHandlers {
    @inject(gc.Chips.ChipStore) protected readonly chipStore: gc.Chips.ChipStore;
    @inject(gc.Rounds.RoundStore) protected readonly roundStore: gc.Rounds.RoundStore;
    handleBetChoice(ownChip: any) {
        const endBet = ownChip.endBet;
        if (endBet > 0) {
            this.chipStore.ownChip = { betChoice: ownChip.betChoice, amount: endBet };
            this.addChipToClientChips(ownChip.betChoice, endBet);
        }
    }

    addChipToClientChips(betChoice: string, amount: number) {
        const betChoiceData = this.chipStore.clientChips[betChoice] || {};
        const current = betChoiceData[amount] || 0;
        betChoiceData[amount] = current + 1;
        this.chipStore.clientChips[betChoice] = betChoiceData;
    }

    eventHandleList = [
        {
            name: GameServiceMessage.OwnChip.eventName,
            handle: this.handleBetChoice,
        },
    ];
}
