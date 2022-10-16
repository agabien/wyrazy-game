import { Hand } from './Hand.js';

export class Player {
    constructor(name) {
        this.name = name;
        this.points = 0;
        this.hand = new Hand();
    }

    addPoint() {
        this.points++;
        return this.points;
    }

    removeCardsFromHand(cardsInHand, cardsToRemove) {
        let removedCardIndex;
        for (let i = 0; i < cardsInHand.length; i++) {
            for (let j = 0; j < cardsToRemove.length; j++) {
                if (cardsInHand[i].value == cardsToRemove[j]) {
                    removedCardIndex = i;
                    cardsInHand.splice(removedCardIndex, 1);
                    i = -1;
                    break;
                }
            }
        }
    }

    checkIfWin() {
        if (!this.hand.cards.length) {
            return true;
        } else {
            return false;
        }
    }
}