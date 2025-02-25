import gc from "@sg/game-client-base";
import { _decorator, Label, Node, Sprite, SpriteAtlas, tween, UIOpacity, v3 } from "cc";
import { ObserverComponent } from "db://shared-components/shared/common-components/observer-component/scripts/observer-component";
import { AnimationUtils } from "db://shared-components/shared/utils/utils";
import Observer from "observer";

const { ccclass, property } = _decorator;
const { render } = Observer;

const { Rounds, Translator } = gc;

@ccclass("GameResult")
export class GameResult extends ObserverComponent {
    @property({ type: Sprite })
    dices: Sprite[] = [];

    @property(SpriteAtlas)
    diceAtlas: SpriteAtlas = null;

    @property(Node)
    nodeResult: Node = null;

    @property(Label)
    lblResult: Label = null;

    private readonly RESULT_DURATION = 2;

    onLoad() {
        this.setResultTextVisibility(false);
        super.onLoad();
    }

    // showResultNoAnim(result: any, roundId: number) {
    //     this.stopAllDiceAnimation();
    //     this.diceSkeleton && AnimationUtils.pauseSpineAnimation(this.diceSkeleton, 1, this.getDiceAnimationName(roundId));
    //     this.dicesComponent.forEach((dice, index) => {
    //         const endPos = result[`dice${index + 1}`];
    //         const frame = this.diceSpriteFrames.find((spriteFrame) => spriteFrame.name === `end-${endPos}-${this.DICE_END_FRAME}`);
    //         dice.setFrame(frame);
    //     });
    // }

    @render(Rounds.RoundTimeStore, (store) => store.isStartingRound)
    hideResultText(isStartingRound: boolean) {
        if (isStartingRound) {
            this.setResultTextVisibility(false);
        }
    }

    setResultTextVisibility(isShow: boolean) {
        if (!this.nodeResult) {
            return;
        }

        this.nodeResult.active = isShow;
        const opacityComp = this.nodeResult.getComponent(UIOpacity);

        if (!isShow) {
            opacityComp.opacity = 0;
            return;
        }

        tween(this.nodeResult)
            .to(0.2, { scale: v3(1.2, 1.2, 1.2) }, { easing: "bounceOut" })
            .parallel(tween().to(0.3, { scale: v3(1, 1, 1) }), tween(opacityComp).to(0.3, { opacity: 255 }))
            .start();
    }

    showResultText(result: any) {
        const choiceWin = this.determineWinningChoice(this.calcTotalPoints(result));
        this.setResultText(choiceWin.toUpperCase());
        this.setResultTextVisibility(true);
    }

    calcTotalPoints(result: any): number {
        return ["dice1", "dice2", "dice3"].map((key) => result[key]).reduce((sum, value) => sum + value, 0);
    }

    determineWinningChoice(totalPoints: number) {
        const winChoice = totalPoints > 6 ? "BigSmall.glossary_big" : "BigSmall.glossary_small";
        return `${totalPoints} - ${Translator.translate(winChoice)}`;
    }

    setResultText(value: string) {
        if (!this.lblResult || !value) {
            return;
        }

        this.lblResult.string = value;
    }

    async showResultAnim(prevResult: any, result: any, roundId: number) {
        //this.resetResultDiceFrames();
        //this.stopAllDiceAnimation();
        this.setResultDiceFrames(result);
        //this.diceSkeleton && AnimationUtils.playSpine(this.diceSkeleton, this.getDiceAnimationName(roundId), false, this.RESULT_DURATION);
        // this.dicesComponent.forEach((dice, index) => {
        //     dice.runAnimation(this.resultDiceFrames[`dice${index + 1}`], this.RESULT_DURATION);
        // });
        await AnimationUtils.delayTime(this.RESULT_DURATION);
        this.showResultText(result);
    }

    private getRandomNumber(max: number): number {
        return Math.floor(Math.random() * max) + 1;
    }

    private setResultDiceFrames(result: any) {
        const { dice1, dice2, dice3 } = result;
        this.dices[0].spriteFrame = this.diceAtlas.getSpriteFrame(`${dice1}-goc-2`);
        this.dices[1].spriteFrame = this.diceAtlas.getSpriteFrame(`${dice2}-goc-1`);
        this.dices[2].spriteFrame = this.diceAtlas.getSpriteFrame(`${dice3}-goc-1`);
    }

    setVisibilityDices(isShow: false) {
        this.dices.forEach((dice) => (dice.node.active = isShow));
    }
}
