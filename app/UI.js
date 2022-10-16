export const HIDDEN_CLASS = 'hidden';
export const HIDDEN_SCREEN = false;
export const VISIBLE_SCREEN = true;

export class UI {
    UiSelectors = {
        rulesHeader: '[data-rules-header]',
        rulesText: '[data-rules-text]',
        rulesArrow: '[data-rules-arrow]',
        rivalPoints: '[data-rival-output]',
        playerPoints: '[data-player-output]',
        rivalCards: '[data-rival-cards]',
        playerCards: '[data-player-cards]',
        rivalCard: '[data-card-owner="rival"]',
        playerCard: '[data-card-owner="player"]',
        actualCard: '[data-actual-card]',
        rivalName: '[data-rival-name]',
        playerName: '[data-player-name]',
        cardChangesCounter: '[data-card-changes-counter]',
        button: '[data-button]',
        buttonChange: '[data-button-change]',
        buttonHit: '[data-button-hit]',
        buttonStop: '[data-button-stop]',
        buttonMoveEnd: '[data-button-moveEnd]',
        message: '[data-message]',
        timer: '[data-timer]',
        form: '[data-form]',
        formInput: '[data-form-name]',
        formButton: '[data-form-button]',
        tableWordsRight: '[data-table-right]',
        gameIntro: '[data-game-intro]',
        gameModes: '[data-game-modes]',
        easyMode: '[data-easy-mode]',
        difficultMode: '[data-difficult-mode]',
        gameBoard: '[data-game-board]',
        endScreen: '[data-end-screen]',
        endScreenResult: '[data-end-screen-result]',
        endScreenPlayerPoints: '[data-end-screen-player-points]',
        endScreenRivalPoints: '[data-end-screen-rival-points]',
        buttonBackToStart: '[data-back-to-start]',
        buttonRestartLevel: '[data-restart-level]'
    }

    getElement(selector) {
        return document.querySelector(selector);
    }
    
    getElements(selector) {
        return document.querySelectorAll(selector);
    }

    changeVisibilityScreen(element, mode) {
        mode === VISIBLE_SCREEN? element.classList.remove(HIDDEN_CLASS) : element.classList.add(HIDDEN_CLASS);
    }
}