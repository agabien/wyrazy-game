import { Card } from './Card.js';

const Values = ['arbuz', 'aparat', 'alkohol', 'atom', 'bal', 'bój', 'brama', 'bojar', 'czas', 'czuł', 'czosnek', 'czemu', 'dom', 'dal', 'dąb', 'daleko', 'eskismos', 'emu', 'elegant', 'erazm', 'fart', 'fajans', 'fotel', 'frak','grać', 'grymas', 'gapie', 'gołąb', 'hamak', 'huk', 'hałas', 'historia', 'igloo', 'irys', 'imbryk', 'internet', 'jazgot', 'jak', 'jeśli', 'już', 'klub', 'kolaż', 'kop', 'klif', 'las', 'lep', 'lew', 'ludzie', 'łomot', 'łoskot', 'łata', 'łój', 'maź', 'miód', 'mors', 'mag', 'noc', 'nie', 'niebieski', 'najpierw', 'okap', 'opór', 'osioł', 'oprych', 'pieróg', 'prom', 'port', 'pan', 'rym', 'robot', 'raj', 'rak', 'syki', 'smok', 'samolub', 'sad', 'torf',  'tran', 'trans', 'taniec', 'układ', 'uraz', 'ubaw', 'upiec', 'właz', 'wij', 'wahadło', 'wór', 'zegar', 'ziąb', 'zorza', 'ząb', 'źrebak', 'źle', 'żaba', 'życie', 'żółw'];

export class Deck {

    makeCards() {

        this.cards = [];

        Values.forEach(value => this.cards.push(new Card(value)));
    }

    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * i);
            const temp = this.cards[i];
            this.cards[i] = this.cards[j];
            this.cards[j] = temp;
        }

        return this.cards;
    }

    pickOne() {
        return this.cards.pop();
    }

    addOne(addedCart) {
        this.cards.unshift(addedCart);
    }
}