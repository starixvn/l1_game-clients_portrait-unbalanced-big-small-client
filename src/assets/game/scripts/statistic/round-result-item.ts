import gc from "@sg/game-client-base";
import { _decorator, Component, Label, Node, Sprite, SpriteAtlas } from "cc";

const { ccclass, property } = _decorator;

const enum Choice {
    big = "big",
    small = "small",
}

@ccclass("round_result_item")
export class RoundResultItem extends Component {
    @property({ type: Node })
    dices: Node[] = [];

    @property(Node)
    nodeResult: Node = null;

    @property(Label)
    lblTotalPoint: Label = null;

    @property(Node)
    highlight: Node = null;

    @property(SpriteAtlas)
    mainAtlas: SpriteAtlas = null;

    private readonly mainChoice = ["big", "small"];

    setData(data: any) {
        const { result, settlementResult } = data;
        this.mainChoice.forEach((choice, index) => {
            if (settlementResult[choice]) {
                this.nodeResult.getComponent(Label).string = gc.Translator.gameTranslate(`scoreboard_${choice}`);
            }
        });

        let totalPoint = 0;
        Object.keys(result).forEach((key) => {
            const dice = this.dices.find((item) => item.name === key);
            dice.getComponent(Sprite).spriteFrame = this.mainAtlas.getSpriteFrame(`scoreboard-xx${result[key]}`);
            totalPoint += result[key];
        });
        this.lblTotalPoint.string = totalPoint.toString();
    }
}
