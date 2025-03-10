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
        const { settlementResult, freeBet, odds, totalAmount, betwin } = data.betHistoryLog;
        if (settlementResult) {
            Object.keys(settlementResult).forEach((choice) => {
                let stake = data.betHistoryLog[choice];
                if (+stake > 0) {
                    stake = freeBet ? 0 : stake;
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
        this.lblBet.string = `${gc.Translator.translate(`BigSmall.glossary_${choice}`)} @ ${odd}`;
    }
}
