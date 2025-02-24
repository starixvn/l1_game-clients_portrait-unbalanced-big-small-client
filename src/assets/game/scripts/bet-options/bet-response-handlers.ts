import gc from "@sg/game-client-base";
import inversify from "inversify";
import { GameServiceMessage } from "../game-message";
import { BetChoiceStore } from "./bet-choice-store";
const { injectable, inject } = inversify;

@injectable()
export class BetResponseHandlers implements gc.Shared.IMultipleHandlers {
    @inject(BetChoiceStore) protected readonly betChoiceStore: BetChoiceStore;
    @inject(gc.Bet.BetStore) protected readonly betStore: gc.Bet.BetStore;
    @inject(gc.Chips.ChipStore) protected readonly chipStore: gc.Chips.ChipStore;
    handleBetChoice(betChoice: string) {
        this.betChoiceStore.betChoice = betChoice;
        if (this.betStore.lastReceivedBet.value > 0) {
            this.chipStore.ownChip = { betChoice: this.betChoiceStore.betChoice, amount: this.betStore.lastReceivedBet.value };
        }
    }

    eventHandleList = [
        {
            name: GameServiceMessage.BetChoice.eventName,
            handle: this.handleBetChoice,
        },
    ];
}
