export class Card {

    constructor(value) {
        this.value = value;
    }

    render(playersCardAttribute) {
        const card = document.createElement('div');
        card.setAttribute('class', 'card');

        if(playersCardAttribute !== null) {
            card.setAttribute('data-card-owner', playersCardAttribute);
            card.setAttribute('id', this.value);            

            if(playersCardAttribute === 'player') {
                card.setAttribute('draggable', 'true');
                card.setAttribute('ondragstart', 'dragstart_handler(event)');
                card.setAttribute('ondragover', 'event.stopImmediatePropagation()');
            }            
        }
        card.innerHTML = this.value;

        return card;
    }
}