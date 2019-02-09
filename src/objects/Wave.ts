export default class Wave extends Phaser.GameObjects.TileSprite {

    private speed: number;
    private moving: boolean;
    private jaugeTop: Phaser.GameObjects.Sprite;
    private jaugeBot: Phaser.GameObjects.Sprite;
    private waveData: number[] = [];
    private image: string;

    constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number, image: string, speed: number) {
        super(scene, x, y, width, height, image);
        this.speed = speed;
        this.setOrigin(0, 0);
        this.moving = false;
        this.image = image;
    }

    generateData() {
        if (!this.waveData.length) {
            for (let x = 0; x < this.texture.get().width; x++) {
                let col = [];
                for (let y = 0; y < this.texture.get().height; y++) {
                    let pixel = this.scene.textures.getPixel(x, y, this.image, 0);
                    if (pixel) col.push(pixel.blue);
                }
                this.waveData.push(col.findIndex(val => { return val > 0 }));
            }
        }
        return this.waveData;
    }

    displayJauge(right?: boolean) {
        if (!right) {
            this.jaugeTop = this.scene.add.sprite(this.width + 22, this.y + 10, 'movelist-jauge-top');
            this.jaugeBot = this.scene.add.sprite(this.width + 22, this.y + this.jaugeTop.height + 14, 'movelist-jauge-bot');
        } else {
            this.jaugeTop = this.scene.add.sprite(this.x - 22, this.y + 10, 'movelist-jauge-top');
            this.jaugeBot = this.scene.add.sprite(this.x - 22, this.y + this.jaugeTop.height + 14, 'movelist-jauge-bot');
        }
    }

    getDataValue(): number {
        if (!this.waveData.length) return -1;
        return this.waveData[Math.floor(this.tilePositionX % this.width)];
    }

    preUpdate() {
        if (this.moving) {
            this.tilePositionX += this.speed;
        }

        if (this.jaugeBot && this.jaugeTop && this.waveData.length) {
            this.jaugeTop.setCrop(0, this.getDataValue(), this.jaugeTop.width, this.jaugeTop.height);
            this.jaugeBot.setCrop(0, 0, this.jaugeTop.width, this.getDataValue() - 20);
        }
    }

    setMoving(m: boolean) {
        this.moving = m;
    }

    setPositionX(x: number) {
        this.tilePositionX += x;
    }
}