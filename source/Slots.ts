import Reel from './Reel';

export default class Slots {
    private parentElm: HTMLElement;
    private pictures: Array<string>;
    private reels: Array<Reel>;

    constructor(parentElm, pictures) {
        this.parentElm = parentElm;
        this.pictures = pictures;
        this.reels = new Array();

        for (let i = 0; i < 3; i++) {
            const elm = document.createElement('div');
            elm.className = 'reel';
            this.reels.push(new Reel(elm, this.pictures));
            this.parentElm.appendChild(elm);
        }

        const buttonElm = document.createElement('button');
        buttonElm.innerText = 'Start';
        buttonElm.addEventListener('click', () => this.start());
        this.parentElm.appendChild(buttonElm);
    }

    private randomBetween(min, max) {
        return (Math.random() * (max - min)) + min;
    }

    private start() {
        let stopTime = 1000;
        this.reels.forEach(r => {
            r.start();

            stopTime += this.randomBetween(200, 600);
            setTimeout(() => r.stop(), stopTime);
        });

        setTimeout(() => {
            const result = this.reels.reduce((p, r) => p + Math.round(r.currentPos / r.width), 0);

            if (result === 0) {
                alert('YOU WIN!');
            } else {
                alert('You lose');
            }
        }, stopTime + 500);
    }
}
