import inversify from "inversify";
const { injectable, inject } = inversify;

@injectable()
export class BetChoiceStore {
    _betChoice: string = "";
    get betChoice() {
        return this._betChoice;
    }

    set betChoice(betChoice: string) {
        this._betChoice = betChoice;
    }
}
