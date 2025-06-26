import gc from "@sg/game-client-base";
import { _decorator, Label, Sprite, SpriteFrame } from "cc";
import { BaseResultBodyItem } from "db://shared-components/game/bet-history/scripts/components/bet-history-body-item";

const { ccclass, property } = _decorator;

@ccclass
export default class ResultBodyItem extends BaseResultBodyItem {
    @property([Sprite])
    dices: Sprite[] = [];

    @property(Label)
    result: Label = null;

    @property([SpriteFrame])
    dicesSpriteFrames: SpriteFrame[] = [];

    setData(result: gc.BetHistory.DynamicObject<object>, settlementResult: gc.BetHistory.DynamicObject<boolean>) {
        this.showResult(result, this.dicesSpriteFrames, settlementResult);
    }

    showResult(result: any, dicesSpriteFrames: SpriteFrame[], settlementResult: any) {
        this.dices[0].spriteFrame = dicesSpriteFrames[result.dice1 - 1];
        this.dices[1].spriteFrame = dicesSpriteFrames[result.dice2 - 1];
        this.dices[2].spriteFrame = dicesSpriteFrames[result.dice3 - 1];
        const winChoice = ["big", "small"].find((choice) => settlementResult[choice]);
        const winChoiceStr = gc.Translator.translate(`BigSmall.glossary_${winChoice}`);
        this.result.string = `${winChoiceStr} - ${result.dice1 + result.dice2 + result.dice3}`;
    }
}
