import { Player } from './Player.js';
import { Deck } from './Deck.js';
import { Table } from './Table.js';
import { Media } from './Media.js';
import { Message } from './Message.js';
import { Card } from "./Card.js";
import { VISIBLE_SCREEN, HIDDEN_SCREEN, UI } from "./UI.js";
import { Timer } from "./Timer.js";

class Game extends UI {
    initializeGame() {   
        this.handleElements();
        this.createObjects();
        this.handleStartPageEvents();
    }

    handleStartPageEvents() {
        this.rulesArrow.addEventListener('mouseover', e => e.target.classList.add('hover-arrow')); 
        this.rulesArrow.addEventListener('mouseout', e => e.target.classList.remove('hover-arrow')); 
        this.rulesArrow.addEventListener('click', () => this.showRules());

        if(this.rulesArrow.classList.contains('active-arrow')) {
            this.rulesArrow.removeEventListener('mouseover', e => e.target.classList.toggle('hover-arrow')); 
        } else {
            this.rulesArrow.addEventListener('mouseover', e => e.target.classList.toggle('hover-arrow'));
        }

        this.formButton.addEventListener('mouseover', e => e.target.classList.toggle('active'));    
        this.formButton.addEventListener('mouseout', e => e.target.classList.remove('active'));  
        this.formButton.addEventListener('click', () => this.handleForm()); 
    }

    handleElements() {
        this.rulesHeader = this.getElement(this.UiSelectors.rulesHeader);
        this.rulesText = this.getElement(this.UiSelectors.rulesText);
        this.rulesArrow = this.getElement(this.UiSelectors.rulesArrow);
        this.rivalPoints = this.getElement(this.UiSelectors.rivalPoints);
        this.playerPoints = this.getElement(this.UiSelectors.playerPoints);
        this.rivalName = this.getElement(this.UiSelectors.rivalName);
        this.playerName = this.getElement(this.UiSelectors.playerName);
        this.cardChangesCounter = this.getElement(this.UiSelectors.cardChangesCounter);
        this.buttonChange = this.getElement(this.UiSelectors.buttonChange);
        this.buttonHit = this.getElement(this.UiSelectors.buttonHit);
        this.buttonStop = this.getElement(this.UiSelectors.buttonStop);
        this.buttonMoveEnd = this.getElement(this.UiSelectors.buttonMoveEnd);
        this.rivalCards = this.getElement(this.UiSelectors.rivalCards);
        this.playerCard = this.getElement(this.UiSelectors.playerCard);
        this.playerCards = this.getElement(this.UiSelectors.playerCards);
        this.actualCardPlace = this.getElement(this.UiSelectors.actualCard);
        this.tableWordsRight = this.getElement(this.UiSelectors.tableWordsRight);   
        this.form = this.getElement(this.UiSelectors.form);
        this.formInput = this.getElement(this.UiSelectors.formInput);
        this.formButton = this.getElement(this.UiSelectors.formButton);
        this.gameIntro = this.getElement(this.UiSelectors.gameIntro);
        this.gameModes = this.getElement(this.UiSelectors.gameModes);
        this.easyMode = this.getElement(this.UiSelectors.easyMode);
        this.difficultMode = this.getElement(this.UiSelectors.difficultMode);
        this.gameBoard = this.getElement(this.UiSelectors.gameBoard);
        this.endScreen = this.getElement(this.UiSelectors.endScreen);
        this.endScreenResult = this.getElement(this.UiSelectors.endScreenResult);
        this.endScreenPlayerPoints = this.getElement(this.UiSelectors.endScreenPlayerPoints);
        this.endScreenRivalPoints = this.getElement(this.UiSelectors.endScreenRivalPoints);
        this.buttonBackToStart = this.getElement(this.UiSelectors.buttonBackToStart);
        this.buttonRestartLevel = this.getElement(this.UiSelectors.buttonRestartLevel);
        this.allButtons = this.getElements(this.UiSelectors.button);
        this.message = this.getElement(this.UiSelectors.message);
        this.clock = this.getElement(this.UiSelectors.timer);
    }

    createObjects() {
        this.table = new Table(this.actualCardPlace, this.tableWordsRight);
        this.messageBox = new Message(this.message);                
        this.rival = new Player('Rywal');
        this.deck = new Deck();
        this.timer = new Timer();
        this.media = new Media();
    }
   
    showRules() {
        this.rulesText.classList.toggle('active-rules');    
        this.rulesArrow.classList.toggle('active-arrow');     
    }

    handleForm() {
        if(!this.formInput.value) {
            return;
        }

        this.player = new Player(this.formInput.value);
        this.changeVisibilityScreen(this.gameIntro, HIDDEN_SCREEN);
        this.changeVisibilityScreen(this.gameModes, VISIBLE_SCREEN);
        this.handleGameModes();         
    }

    handleGameModes() {
        this.rulesText.classList.remove('active-rules');
        this.rulesArrow.classList.remove('active-arrow');

        this.formInput.value = '';
        this.easyMode.addEventListener('click', e => this.startGame(e));
        this.difficultMode.addEventListener('click', e => this.startGame(e));
    }
    
    startGame = e => {
        if(this.gameStarted) {
            return;
        }
        this.changeVisibilityScreen(this.gameModes, HIDDEN_SCREEN);
        this.changeVisibilityScreen(this.gameBoard, VISIBLE_SCREEN);

        if(!this.gameEnded) {
            this.addEventListeners();
        }
        
        this.deck.makeCards();
        this.deck.shuffle();        
        this.dealCards();
        this.actualCard;
        this.word = '';
        this.mode ? this.mode : this.mode = e.target.textContent.toLowerCase();
        this.sylabsInUse = [];
        this.sylabsToRemove = [];
        this.firstMove = false;
        this.changedCard = 0;
        this.timer.init();
        this.timer.resetTimer();
        this.playerMoveTimeout;
        this.rivalPlaysMessageTimeout = null;
        this.userPlaysTimeout = null;
        this.gameEnded = false;

        this.cardChangesCounter.innerHTML = `Pozostało wymian: ${5 - this.changedCard}`;
        this.playerName.innerHTML = this.player.name;
        this.rivalName.innerHTML = this.rival.name;

        if (!this.media.swapSound) {
			this.media.swapSound = this.loadSound('../assets/sounds/ding.mp3');
		}

        this.gameStarted = true;
    }
    
    addEventListeners() {
        this.buttonChange.addEventListener('click', () => this.changeCard());
        this.buttonHit.addEventListener('click', () => this.hitCard());
        this.buttonStop.addEventListener('click', () => this.stopTheGame());
        this.buttonMoveEnd.addEventListener('click', () => this.makeWord());   
        this.allButtons.forEach(button => button.addEventListener('mouseover', () => button.classList.add('active')));    
        this.allButtons.forEach(button => button.addEventListener('mouseout', () => button.classList.remove('active')));  
        this.clock.addEventListener('mouseover', () => this.clock.classList.add('active-timer'));  
        this.clock.addEventListener('mouseout', () => this.clock.classList.remove('active-timer'));
    }

    dealCards() {
        if(this.gameEnded) {
            this.gameEnded = !this.gameEnded;
        }

        if(this.playerCards.hasChildNodes || this.rivalCards.hasChildNodes) {
            this.table.clearWord(this.playerCards);
            this.table.clearWord(this.rivalCards);
        }

        for (let n = 0; n < 10; n++) {
            let card1 = this.deck.pickOne();
            this.player.hand.addCard(card1);
            this.table.showCards(this.playerCards, card1, 'player');

            let card2 = this.deck.pickOne();
            this.rival.hand.addCard(card2);
            this.table.showCards(this.rivalCards, card2, 'rival');
        }

        this.playerCardsSet = this.getElements(this.UiSelectors.playerCard);
        this.playerCardsSet.forEach(card => card.addEventListener('dragstart', this.dragstart_handler));
        
        this.actualizeRivalCardsSet();

        this.actualCard = this.deck.pickOne();
        this.table.showActualCard(this.actualCard.value);

        this.playerPoints.innerHTML = this.player.points;
        this.rivalPoints.innerHTML = this.rival.points;

        this.firstMove = true;
        this.userPlays();
    }

    actualizeRivalCardsSet () {
        this.rivalCardsSet = this.getElements(this.UiSelectors.rivalCard);
    }

    userPlays = () => {
        this.enableCardsAndButtons();

        if(this.firstMove) {
            this.timer.startTimer();
            this.firstMove = false;
        } else {  
            clearTimeout(this.userPlaysTimeout);    
            this.timer.resetTimer();
        }

        this.playerMoveTimeout = setTimeout(this.rivalPlaysMessage, 12000);     
    }
    
    changeCard() {
        if (this.changedCard >= 5) {
            this.messageBox.setText('Liczba dozwolnych wymian karty została osiągnięta.').show();
            return;
        } else {
            this.actualCard = this.deck.pickOne();
            this.table.showActualCard(this.actualCard.value);
            this.changedCard++;
            this.cardChangesCounter.innerHTML = `Pozostało wymian: ${5 - this.changedCard}`;
        }
    }

    hitCard() {
        clearTimeout(this.rivalPlaysMessageTimeout);
        this.timer.stopTimer();

        if(this.player.hand.cards.length < 20) {
            const card = this.deck.pickOne();
            this.player.hand.addCard(card);
            this.table.showCards(this.playerCards, card, 'player');
            this.messageBox.setText('Dobrano kartę. Koniec Twojego ruchu. Ruch rywala.').show();
        } else {
            this.messageBox.setText('Niestety nie możesz już dobrać karty. Ruch rywala.').show();
        }
        
        this.playerMoveTimeout = setTimeout(this.rivalPlaysMessage, 2000);

        this.cardHitted = true;

        clearTimeout(this.playerMoveTimeout);
    }

    makeWord() {
        if(this.moveAttempt) {
            return;
        }

        const wordRight = this.tableWordsRight.querySelectorAll('div');
        wordRight.forEach(sylabe => this.sylabsInUse.push(sylabe.textContent));

        const cardToRemove = this.checkWord(this.sylabsInUse);
        
        if (cardToRemove && !this.sylabsToRemove.length) {           
            this.actualCard.value = this.sylabsInUse[this.sylabsInUse.length - 1];
            this.table.changeActualCard(this.sylabsInUse[this.sylabsInUse.length - 1]); 

            this.player.removeCardsFromHand(this.player.hand.cards, this.sylabsInUse);

            for(let i = 0; i < this.sylabsInUse.length; i++) {
                this.playerPoints.textContent = this.player.addPoint();
            }             

            this.player.checkIfWin() ? this.endTheGame(true) : this.disableCardsAndButtons(); 

            if(this.sylabsInUse.length > 1) {
                this.messageBox.setText(`Brawo! Podałeś/aś poprawne karty. Ruch rywala.`).show(true);     
            } else {
                this.messageBox.setText(`Brawo! Podałeś/aś poprawną kartę. Ruch rywala.`).show(true); 
            }    
            this.media.playSwapSound();
        } else if(cardToRemove && this.sylabsToRemove.length) {
            this.actualCard.value = this.sylabsInUse[this.sylabsInUse.length - 1];
            this.table.changeActualCard(this.sylabsInUse[this.sylabsInUse.length - 1]);            
            
            this.player.removeCardsFromHand(this.player.hand.cards, this.sylabsInUse);

            for(let i = 0; i < this.sylabsInUse.length; i++) {
                this.playerPoints.textContent = this.player.addPoint();
            }
            
            this.moveWrongCardsBackToPlayer();

            if(this.player.checkIfWin()) this.endTheGame(true); 

            this.messageBox.setText(`Brawo! Podałeś/aś poprawną kartę. Ruch rywala.`).show(true);
            this.media.playSwapSound(); 
            this.disableCardsAndButtons();
        } else {
            this.moveWrongCardsBackToPlayer();  
            this.messageBox.setText('Niestety podałeś/aś niepoprawną kartę. Ruch rywala.').show();  
            this.disableCardsAndButtons();       
        }       

        clearTimeout(this.playerMoveTimeout);
        this.timer.stopTimer();

        this.playerMoveTimeout = setTimeout(this.rivalPlaysMessage, 5000);

        this.table.clearWord(this.tableWordsRight);    
        
        this.sylabsInUse = [];

        this.moveAttempt = true;
    }

    rivalPlaysMessage = () => {
        if(this.gameEnded) {
            return;
        }
        this.disableCardsAndButtons();

        clearTimeout(this.playerMoveTimeout);
        this.timer.stopTimer();

        if(!this.moveAttempt && !this.cardHitted) {
            this.moveAllCardsBackToPlayer();
            this.table.clearWord(this.tableWordsRight);
            this.messageBox.setText('Czas na wykonanie ruchu upłynął. Ruch rywala.').show();
        } else if (this.cardHitted){
            this.cardHitted = false;
        } else {
            this.moveAttempt = false;
        }                    

        clearTimeout(this.rivalPlaysMessageTimeout);
        this.rivalPlaysMessageTimeout = setTimeout(this.rivalPlays, 1000);
    }

    rivalPlays = () => {     
        if(this.gameEnded) {
            return;
        }   
        clearTimeout(this.rivalPlaysMessageTimeout);

        for (let i = 0; i < this.rival.hand.cards.length; i++) {
            this.sylabsInUse = [];
            this.sylabsInUse.push(this.rival.hand.cards[i].value);
            const cardToRemove = this.checkWord(this.sylabsInUse);            

            this.sylabsToRemove = [];
            
            if (cardToRemove) {                 
                this.actualCard.value = this.sylabsInUse[this.sylabsInUse.length - 1];
                this.table.changeActualCard(this.sylabsInUse[this.sylabsInUse.length - 1]);

                this.actualizeRivalCardsSet();
                this.table.removeRivalsCards(this.rivalCardsSet, this.sylabsInUse, this.rivalCards);
                this.rival.removeCardsFromHand(this.rival.hand.cards, this.sylabsInUse);
                this.actualizeRivalCardsSet();

                this.rivalPoints.textContent = this.rival.addPoint();
                if(this.rival.checkIfWin()) this.endTheGame(false);
                
                this.sylabsInUse = [];

                this.messageBox.setText('Rywal zdobył punkt! Twój ruch.').show();

                this.userPlaysTimeout = setTimeout(this.userPlays, 3000); 
                
                return;

            }
        } 

        if(this.rival.hand.cards.length < 20) {
            const card = this.deck.pickOne();

            this.rival.hand.addCard(card);
            this.table.showCards(this.rivalCards, card, 'rival');
        }

        this.sylabsInUse = [];

        this.messageBox.setText('Rywal nie znalazł żadnego słowa. Twój ruch.').show();

        this.userPlaysTimeout = setTimeout(this.userPlays, 3000); 

        return;
    }

    moveWrongCardsBackToPlayer() {
        if(this.tableWordsRight.hasChildNodes()) {
            let sylabesToBackRight = [];
            const wordRight = this.tableWordsRight.querySelectorAll('div');
            wordRight.forEach(sylabe => sylabesToBackRight.push(sylabe.textContent));

            for(let i = 0; i < sylabesToBackRight.length; i++) {

                if(this.sylabsToRemove.length) {
                    for(let j = 0; j < this.sylabsToRemove.length; j++) {
                        if(this.sylabsToRemove[j] === sylabesToBackRight[i]) {
                            const card = new Card(sylabesToBackRight[i]);
                            this.player.hand.addCard(card);                        
                            this.table.showCards(this.playerCards, card, 'player');
                        }                        
                    }                    
                } else {
                    const card = new Card(sylabesToBackRight[i]);
                    this.player.hand.addCard(card);                        
                    this.table.showCards(this.playerCards, card, 'player');
                }
                
            }
        }

        this.sylabsToRemove = [];
    }

    moveAllCardsBackToPlayer() {
        if(this.tableWordsRight.hasChildNodes()) {
            let sylabesToBackRight = [];
            const wordRight = this.tableWordsRight.querySelectorAll('div');
            wordRight.forEach(sylabe => sylabesToBackRight.push(sylabe.textContent));

            for(let i = 0; i < sylabesToBackRight.length; i++) {
                for(let j = 0; j < this.player.hand.cards.length; j++) {
                    if(this.player.hand.cards[j].value === sylabesToBackRight[i]) {          
                        this.table.showCards(this.playerCards, this.player.hand.cards[j], 'player');
                    }
                }
            }
        }
    }

    checkWord() {
        const actualWord = String(this.actualCard.value)
        const actualWordLastLetter = actualWord[actualWord.length - 1];
        const actualWordFirstLetter = actualWord[0];

        let words = [];
        this.sylabsInUse.map(word => words.push(word));
        this.sylabsInUse.length = 0;

        let addedWord = false;

        if(this.mode === 'easy') {
            for(let i = 0; i < words.length; i++) {
                addedWord = false;
                const checkedWord = String(words[i]);
                for(let j = 0; j < actualWord.length; j++) {
                    if(addedWord) {
                        break;
                    }
                    for(let k = 0; k < checkedWord.length; k++) {                        
                        if(actualWord[j] === checkedWord[k]) {
                            this.sylabsInUse.push(checkedWord);
                            addedWord = true;
                            break;
                        } 
                        if(j === actualWord.length - 1 && k === checkedWord.length - 1) {
                            this.sylabsToRemove.push(checkedWord);
                        }             
                    }
                }                
            }
        }

        if(this.mode === 'difficult') {
            for(let i = 0; i < words.length; i++) {
                const checkedWord = String(words[i]);
                const checkedWordFirstLetter = checkedWord[0];
                
                if(actualWordFirstLetter === checkedWordFirstLetter) {
                    this.sylabsInUse.push(checkedWord);
                } else if(actualWordLastLetter === checkedWordFirstLetter) {
                    this.sylabsInUse.push(checkedWord);
                } else {
                    this.sylabsToRemove.push(checkedWord);
                }
            }
        }

        if(this.sylabsInUse.length) {
            return this.sylabsInUse;
        } else {
            return false;
        }

    }

    disableCardsAndButtons() {
        this.playerCardsSet.forEach(card => card.setAttribute('draggable', 'false'));
        this.playerCardsSet.forEach(card => card.removeAttribute('ondragstart'));
        this.allButtons.forEach(button => button.disabled = true);
        this.allButtons.forEach(button => button.removeEventListener('mouseover', () => button.classList.add('active'))); 
        this.allButtons.forEach(button => button.removeEventListener('mouseout', () => button.classList.remove('active')));   
        this.clock.removeEventListener('mouseover', () => this.clock.classList.add('active-timer'));  
        this.clock.removeEventListener('mouseout', () => this.clock.classList.remove('active-timer'));
    }

    enableCardsAndButtons() {
        this.playerCardsSet.forEach(card => card.setAttribute('draggable', 'true'));
        this.playerCardsSet.forEach(card => card.setAttribute('ondragstart', 'dragstart_handler(event)'));
        this.allButtons.forEach(button => button.disabled = false);
        this.allButtons.forEach(button => button.addEventListener('mouseover', () => button.classList.add('active'))); 
        this.allButtons.forEach(button => button.addEventListener('mouseout', () => button.classList.remove('active')));   
        this.clock.addEventListener('mouseover', () => this.clock.classList.add('active-timer'));  
        this.clock.addEventListener('mouseout', () => this.clock.classList.remove('active-timer'));
    }

    endTheGame(isWin) {  
        this.enableCardsAndButtons();      
        clearTimeout(this.playerMoveTimeout);
        clearTimeout(this.rivalPlaysMessageTimeout);
        clearTimeout(this.userPlaysTimeout);
        this.timer.stopTimer();

        this.changeVisibilityScreen(this.endScreen, VISIBLE_SCREEN);
        
        this.endScreenPlayerPoints.textContent =  String(this.player.points);
        this.endScreenRivalPoints.textContent =  String(this.rival.points);

        if (isWin === true) {
            this.endScreenResult.textContent = 'Gratulacje! Wygrałeś/aś!';
        } else {
            this.endScreenResult.textContent = 'Niestety! Przegrałeś/aś.';
        }        
        
        this.buttonRestartLevel.addEventListener('click', () => this.restartLevel());
        this.buttonBackToStart.addEventListener('click', () => this.backToStart()); 

        this.gameEnded = true;
        this.gameStarted = false;
    }

    stopTheGame() {
        this.table.clearWord(this.tableWordsRight);

        clearTimeout(this.playerMoveTimeout);
        clearTimeout(this.rivalPlaysMessageTimeout);
        clearTimeout(this.userPlaysTimeout);
        this.timer.stopTimer();

        this.changeVisibilityScreen(this.endScreen, VISIBLE_SCREEN);

        this.endScreenPlayerPoints.textContent =  String(this.player.points);
        this.endScreenRivalPoints.textContent =  String(this.rival.points);

        if (this.player.points > this.rival.points) {
            this.endScreenResult.textContent = 'Gratulacje! Wygrałeś/aś!';
        } else if (this.player.points < this.rival.points) {
            this.endScreenResult.textContent = 'Niestety! Przegrałeś/aś.';
        } else {
            this.endScreenResult.textContent = 'Remis :)';
        }

        this.buttonRestartLevel.addEventListener('click', () => this.restartLevel());
        this.buttonBackToStart.addEventListener('click', () => this.backToStart());
        
        this.gameEnded = true;
        this.gameStarted = false;
    }

    restartLevel() {
        if(this.gameStarted) {
            return;
        }
        this.changeVisibilityScreen(this.endScreen, HIDDEN_SCREEN);
        this.restartGame();
        this.startGame(this.mode);        
    }

    backToStart() {        
        this.changeVisibilityScreen(this.endScreen, HIDDEN_SCREEN);
        this.changeVisibilityScreen(this.gameBoard, HIDDEN_SCREEN);
        this.changeVisibilityScreen(this.gameIntro, VISIBLE_SCREEN);   
             
        this.restartGame();
    }

    restartGame() {
        this.message.style.display = 'none';        
        clearTimeout(this.playerMoveTimeout);
        clearTimeout(this.rivalPlaysMessageTimeout);
        clearTimeout(this.userPlaysTimeout);
        this.timer.stopTimer();

        this.player.points = 0;
        this.rival.points = 0;
        this.player.hand.cards.length = 0;
        this.rival.hand.cards.length = 0;

        return;
    }

    loadSound(soundUrl) {
		const audio = new Audio();
		audio.src = soundUrl;

		return audio;
	}

}

const game = new Game();

game.initializeGame();

