import { _decorator } from "cc";
const { ccclass, property } = _decorator;

export namespace GameServiceMessage {
    export class BetChoice {
        static eventName = "betChoice";
    }
}
