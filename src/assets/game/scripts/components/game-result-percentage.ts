import gc from "@sg/game-client-base";
import { _decorator, Label } from "cc";
import { ObserverComponent } from "db://shared-components/shared/common-components/observer-component/scripts/observer-component";
import Observer from "observer";

const { ccclass, property } = _decorator;
const { handle, render } = Observer;

export enum GameBetType {
    big = "big",
    small = "small",
}

@ccclass
export class GameResultPercentage extends ObserverComponent {
    @property(Label)
    lblBig: Label = null;

    @property(Label)
    lblSmall: Label = null;

    @render(gc.RoundHistories.RoundHistoryStore, (store) => store.histories)
    renderResultPercentage(dataLogs: any[]) {
        this.calculatePercentagesMainChoice(dataLogs);
    }

    calculatePercentagesMainChoice(dataLogs: any[]) {
        if (dataLogs.length > 0) {
            let bigTotal = 0,
                smallTotal = 0;

            dataLogs.forEach((log) => {
                const { settlementResult } = log;

                bigTotal += settlementResult[GameBetType.big] ? 1 : 0;
                smallTotal += settlementResult[GameBetType.small] ? 1 : 0;
            });

            const length = dataLogs.length;

            const bigPercentage = Math.round((bigTotal / length) * 100);
            const smallPercentage = Math.round((smallTotal / length) * 100);

            this.lblBig.string = `${bigPercentage}%`;
            this.lblSmall.string = `${smallPercentage}%`;
        }
    }

    countDiceValue(result: any, value: number) {
        let count = 0;
        if (result.dice1 === value) {
            count++;
        }
        if (result.dice2 === value) {
            count++;
        }
        if (result.dice3 === value) {
            count++;
        }

        return count;
    }
}
