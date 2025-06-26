import gc from "@sg/game-client-base";
import { _decorator, Color, Label } from "cc";
import { BetHistoryNewBodyItem } from "db://shared-components/game/bet-history-new/scripts/bet-history-new-body-item";
import { BetHistoryBodyItemType } from "db://shared-components/game/bet-history/scripts/components/bet-history-body-item";
const { ccclass, property } = _decorator;

@ccclass
export class BetHistoryUnbalanceBigsmallBodyItem extends BetHistoryNewBodyItem {
    @property(Label)
    lblBet: Label = null;

    setData(data: BetHistoryBodyItemType) {
        super.setData(data);
        const { settlementResult, odds, totalAmount, betwin } = data.betHistoryLog;
        if (settlementResult) {
            Object.keys(settlementResult).forEach((choice) => {
                const stake = data.betHistoryLog[choice];
                if (+stake > 0) {
                    const odd = this.getFormatOdd(odds[choice]?.toString(), data?.fractionalOddsFormat);
                    this.handleBetOptionItem(choice, odd);
                }
            });
        }
        const winloss = betwin - totalAmount;
        this.lblBet.color = winloss >= 0 ? new Color().fromHEX("F1E344") : new Color().fromHEX("ffffff");
        this.lblTotalStake.color = winloss >= 0 ? new Color().fromHEX("F1E344") : new Color().fromHEX("ffffff");
    }

    handleBetOptionItem(choice: string, odd: string) {
        const choiceStr = gc.Translator.translate(`BigSmall.glossary_${choice}`);
        this.lblBet.string = `${choiceStr} @ ${odd}`;
    }
}
