import gc from "@sg/game-client-base";
import { _decorator, Label, Node, sp, Sprite, SpriteAtlas, tween, UIOpacity, v3 } from "cc";
import { ObserverComponent } from "db://shared-components/shared/common-components/observer-component/scripts/observer-component";
import { AnimationUtils } from "db://shared-components/shared/utils/utils";
import Observer from "observer";

const { ccclass, property } = _decorator;
const { render, handle } = Observer;

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

    @property(sp.Skeleton)
    skeletonDice: sp.Skeleton = null;

    private readonly RESULT_DURATION = 2;
    private readonly soundDiceShake = "dice_shake";

    onLoad() {
        this.setResultTextVisibility(false);
        super.onLoad();
    }

    showResultNoAnim(result: any, settlementResult: any) {
        this.skeletonDice && (this.skeletonDice.node.active = false);
        this.setResultDiceFrames(result);
        this.showResultText(result, settlementResult);
    }

    @render(Rounds.RoundTimeStore, (store) => store.isStartingRound)
    async handleStartingRound(isStartingRound: boolean) {
        if (isStartingRound && this.skeletonDice) {
            this.setResultTextVisibility(false);
            this.skeletonDice.node.active = true;
            await AnimationUtils.playSpine(this.skeletonDice, "close", false);
            this.playSound(this.soundDiceShake);
            AnimationUtils.playSpine(this.skeletonDice, "shake", false);
        }
    }

    @render(Rounds.RoundTimeStore, (store) => store.isPlacingBet)
    handlePlacingBet(isPlacingBet: boolean) {
        if (isPlacingBet && this.skeletonDice) {
            this.setResultTextVisibility(false);
            AnimationUtils.playSpine(this.skeletonDice, "idle", true);
        }
    }

    @render(Rounds.RoundTimeStore, (store) => store.isLocking)
    setAnimDishAtLockingBet(isLocking: boolean) {
        isLocking && AnimationUtils.playSpine(this.skeletonDice, "idle", true);
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

    showResultText(result: any, settlementResult: any) {
        const choiceWin = this.determineWinningChoice(result, settlementResult);
        this.setResultText(choiceWin.toUpperCase());
        this.setResultTextVisibility(true);
    }

    calcTotalPoints(result: any): number {
        return ["dice1", "dice2", "dice3"].map((key) => result[key]).reduce((sum, value) => sum + value, 0);
    }

    determineWinningChoice(result: any, settlementResult: any) {
        const totalPoint = this.calcTotalPoints(result);
        const winChoice = ["big", "small"].find((choice) => settlementResult[choice]);
        return `${totalPoint} - ${Translator.translate(winChoice === "big" ? "BigSmall.glossary_big" : "BigSmall.glossary_small")}`;
    }

    setResultText(value: string) {
        if (!this.lblResult || !value) {
            return;
        }

        this.lblResult.string = value;
    }

    async showResultAnim(result: any, settlementResult: any) {
        this.setResultDiceFrames(result);
        this.skeletonDice && AnimationUtils.playSpine(this.skeletonDice, "open", false);
        await AnimationUtils.delayTime(this.RESULT_DURATION);
        this.showResultText(result, settlementResult);
    }

    private setResultDiceFrames(result: any) {
        const { dice1, dice2, dice3 } = result;
        this.dices[0].spriteFrame = this.diceAtlas.getSpriteFrame(`${dice1}-goc-2`);
        this.dices[1].spriteFrame = this.diceAtlas.getSpriteFrame(`${dice2}-goc-1`);
        this.dices[2].spriteFrame = this.diceAtlas.getSpriteFrame(`${dice3}-goc-1`);
    }

    @handle(gc.Audios.AudioHandler, (handle, id: string) => handle.playSFX(id))
    playSound(id: string) {
        return id;
    }
}
