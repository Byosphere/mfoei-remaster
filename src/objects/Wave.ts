export default class Wave extends Phaser.GameObjects.TileSprite {
    private speed: number;
    private moving: boolean;
    private image: string;
    private textureHeight: number;
    private pixelWidth: number;

    constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number, image: string, speed: number) {
        super(scene, x, y, width, height, image);
        this.speed = speed;
        this.setOrigin(0, 0);
        this.moving = false;
        this.image = image;
    }

    preUpdate() {
        if (this.moving) {
            this.tilePositionX += this.speed;
        }
    }

    setMoving(m: boolean) {
        this.moving = m;
    }

    getPosition() {
        return Math.floor(this.tilePositionX % this.width);
    }

    setPositionX(x: number) {
        this.tilePositionX += x;
    }
}