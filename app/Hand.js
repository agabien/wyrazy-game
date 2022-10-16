export class Hand {
    constructor() {
        this.cards = [];
    }

    addCard(card) {
        this.cards.unshift(card);
    }
}