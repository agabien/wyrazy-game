export class Message {
    messageInterval = null;

    constructor(element) {
        this.element = element;        
    }

    setText(message) {
        let child = this.element.lastElementChild; 
        while (child) {
            this.element.removeChild(child);
            child = this.element.lastElementChild;
        }
        
        const text = document.createElement('p');
        text.innerHTML = message;
        this.element.appendChild(text);

        return this;
    }

    show(wordFound) {
        this.element.classList.remove('message--wordFound');
        this.element.style.display = 'flex';
        this.element.classList.add('message');

        if(wordFound === true) {
            this.element.classList.add('message--wordFound');
        }
        
        this.messageInterval = setInterval(() => {
            this.element.style.display = 'none';
            clearInterval(this.messageInterval);
        }, 3000)
    }
}