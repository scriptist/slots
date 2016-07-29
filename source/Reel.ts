export default class Reel {
    public currentPos: number;
    public width: number;

    private parentElm: HTMLElement;
    private innerElm: HTMLElement;
    private pictures: Array<string>;
    private height: number;

    private running: boolean = false;
    private startedTime: number = 0;
    private startedPos: number;
    private speed: number = 0;

    constructor(parentElm, pictures) {
        this.parentElm = parentElm;
        this.pictures = pictures;

        this.innerElm = document.createElement('div');
        this.innerElm.className = 'reel__inner';

        this.width = 85;
        this.height = this.width * pictures.length;
        this.startedPos = Math.floor(Math.random() * pictures.length) * this.width;

        // Add images twice
        this.pictures.forEach(i => this.addImage(i));
        this.pictures.forEach(i => this.addImage(i));

        this.parentElm.appendChild(this.innerElm);

        this.render();
    }

    public start() {
        this.running = true;
        this.speed = 0.7 + Math.random() / 3;
        this.startedPos = this.currentPos;
        this.startedTime = Date.now();
        this.render();
    }

    public stop() {
        this.running = false;
    }

    private addImage(src: string): HTMLElement {
        const img = document.createElement('img');
        img.className = 'reel__image';
        img.src = src;

        this.innerElm.appendChild(img);

        return img;
    }

    private render() {
        const now = Date.now();
        let newPos = (this.startedPos + this.speed * (now - this.startedTime)) % this.height;

        if (!this.running) {
            if (newPos % this.width < this.currentPos % this.width) {
                newPos = Math.floor(newPos / this.width) * this.width;
            }
            // if (newPos < this.currentPos) {
            //     newPos = Math.floor(newPos / this.width) * this.width;
            // }
        }

        this.innerElm.style.transform = `translateY(-${newPos}px)`;

        this.currentPos = newPos;

        if (this.running || newPos % this.width) {
            requestAnimationFrame(() => this.render());
        }
    }
}
