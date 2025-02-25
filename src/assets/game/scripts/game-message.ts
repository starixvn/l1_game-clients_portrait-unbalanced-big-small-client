import { _decorator } from "cc";
const { ccclass, property } = _decorator;

export namespace GameServiceMessage {
    export class OwnChip {
        static eventName = "betChoice,endBet";
    }
}
