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

    private updateNodeWidths(expandedNode: Node, collapsedNode: Node) {
        const widthNodeRemain = this.WIDTH_GAME - this.WIDTH_SPACING - this.WIDTH_COLLAPSE_DICES;
        expandedNode.getComponent(UITransform).width = widthNodeRemain;
        collapsedNode.getComponent(UITransform).width = this.WIDTH_COLLAPSE_DICES;
    }

    onClickExpandMode() {
        this.isExpandDices = !this.isExpandDices;

        // Update node widths based on expanded state
        if (this.isExpandDices) {
            this.updateNodeWidths(this.nodeDiceStatistic, this.nodeBigRoad);
            this.sprChangeModeDices.spriteFrame = this.mainAtlas.getSpriteFrame("stats-icon-collapse");
        } else {
            this.updateNodeWidths(this.nodeBigRoad, this.nodeDiceStatistic);
            this.sprChangeModeDices.spriteFrame = this.mainAtlas.getSpriteFrame("stats-icon-expand");
        }

        // Reset and update scrollviews
        [this.scrollBigRoad, this.scrollDiceStatistic].forEach((scroll) => {
            scroll.stopAutoScroll();
            scroll.scrollToRight();
        });

        // Update layout
        this.nodeContainer.getComponent(Layout).updateLayout();

        this.scheduleOnce(() => {
            this.scrollDiceStatistic.scrollToRight();
        }, 0.1);
    }
}
