export class Table {
    constructor(actualCardPlace, tableWordRight) {
        this.actualCardPlace = actualCardPlace;
        this.tableWordRight = tableWordRight;
    }

    showCards(table, card, owner) {
        table.appendChild(card.render(owner));
    }

    removeRivalsCards(allCards, cardsToRemove, rivalsTable) {
        for (let i = 0; i < allCards.length; i++) {
            if (allCards[i].textContent === cardsToRemove[0]) {
                rivalsTable.removeChild(allCards[i]);
                return;
            }
        }
    }

    showActualCard(card) {
        this.actualCardPlace.textContent = card;
    }

    changeActualCard(card) {
        document.querySelector('[data-actual-card]').textContent = card;
    }

    clearWord(tablePart) {
        let child = tablePart.lastElementChild; 
        while (child) {
            tablePart.removeChild(child);
            child = tablePart.lastElementChild;
        }
    }
}