import { _decorator, Layout, Node, ScrollView, Sprite, SpriteAtlas, UITransform } from "cc";
import { ObserverComponent } from "db://shared-components/shared/common-components/observer-component/scripts/observer-component";
import Observer from "observer";

const { handle, render } = Observer;

const { ccclass, property } = _decorator;

@ccclass()
export class GameScoreBoard extends ObserverComponent {
    @property(Node)
    nodeDiceStatistic: Node = null;

    @property(Node)
    nodeBigRoad: Node = null;

    @property(Node)
    nodeContainer: Node = null;

    @property(SpriteAtlas)
    mainAtlas: SpriteAtlas = null;

    @property(ScrollView)
    scrollBigRoad: ScrollView = null;

    @property(ScrollView)
    scrollDiceStatistic: ScrollView = null;

    @property(Sprite)
    sprChangeModeDices: Sprite = null;

    private isExpandDices = false;

    private readonly WIDTH_COLLAPSE_DICES = 150;
    private readonly WIDTH_SPACING = 32;
    private readonly WIDTH_GAME = 828;

    onClickExpandMode() {
        this.isExpandDices = !this.isExpandDices;

        if (this.isExpandDices) {
            const widthNodeRemain = this.WIDTH_GAME - this.WIDTH_SPACING - this.WIDTH_COLLAPSE_DICES;
            this.nodeBigRoad.getComponent(UITransform).width = this.WIDTH_COLLAPSE_DICES;
            this.nodeDiceStatistic.getComponent(UITransform).width = widthNodeRemain;
            this.sprChangeModeDices.spriteFrame = this.mainAtlas.getSpriteFrame("stats-icon-collapse");
        } else {
            const widthNodeRemain = this.WIDTH_GAME - this.WIDTH_SPACING - this.WIDTH_COLLAPSE_DICES;
            this.nodeBigRoad.getComponent(UITransform).width = widthNodeRemain;
            this.nodeDiceStatistic.getComponent(UITransform).width = this.WIDTH_COLLAPSE_DICES;
            this.sprChangeModeDices.spriteFrame = this.mainAtlas.getSpriteFrame("stats-icon-expand");
        }

        this.scrollBigRoad.stopAutoScroll();
        this.scrollBigRoad.scrollToRight();

        this.scrollDiceStatistic.stopAutoScroll();
        this.scrollDiceStatistic.scrollToRight();

        this.nodeContainer.getComponent(Layout).updateLayout();
    }
}
