import CharacterJson from "./CharacterJsonInterface";
import WaveData from "./waveDataInterface";

class Character {

    private avatarAnim: number[]
    private avatar: Phaser.GameObjects.Sprite[] = [];
    private avatarFrame: number;
    private name: string;
    private id: number;
    private character: Phaser.GameObjects.Sprite[] = [];
    private spritesheet: string[];
    private waveHdData: WaveData;
    private waveTileLayer: Phaser.Tilemaps.LayerData;
    private life: number;

    constructor(data: CharacterJson) {
        this.avatarAnim = data.avatarAnim;
        this.avatarFrame = data.avatar;
        this.name = data.name;
        this.id = data.id;
        this.spritesheet = data.spritesheet;
        this.waveHdData = data.waveData;
        this.life = data.life;
    }

    getTileLayer(scene: Phaser.Scene): Phaser.Tilemaps.LayerData {
        this.waveTileLayer = this.waveTileLayer || scene.make.tilemap({ key: this.waveHdData.map }).getLayer(0);
        return this.waveTileLayer;
    }

    getAvatar(playerNum: number, x: number, y: number, scene: Phaser.Scene, originX?: number, originY?: number): Phaser.GameObjects.Sprite {
        this.avatar[playerNum] = scene.add.sprite(x, y, "avatarsP" + playerNum, this.avatarFrame);
        this.avatar[playerNum].name = this.id.toString() + "_" + playerNum;
        if (!scene.anims.get('avatar_anim_' + this.id + playerNum)) {
            scene.anims.create({
                key: 'avatar_anim_' + this.id + playerNum,
                frames: scene.anims.generateFrameNumbers("avatarsP" + playerNum, { start: this.avatarAnim[0], end: this.avatarAnim[1] }),
                frameRate: 15,
                repeat: -1
            });
        }

        this.avatar[playerNum].setOrigin(originX || 0, originY || 0);
        return this.avatar[playerNum];
    }

    animateAvatar(playerNum: number, animate: boolean) {
        if (!this.avatar) return;
        if (animate) {
            this.avatar[playerNum].anims.play('avatar_anim_' + this.id + playerNum);
        } else {
            this.avatar[playerNum].anims.stop();
            this.avatar[playerNum].setFrame(this.avatarFrame);
        }
    }

    getId(): number {
        return this.id;
    }

    getwaveName(playerNum: number, pixelSize: number): string {
        return 'wave-' + playerNum + '-' + this.getId() + '-' + pixelSize;
    }

    getCharacterSprite(playerNum: number, x: number, y: number, scene: Phaser.Scene): Phaser.GameObjects.Sprite {
        if (this.character[playerNum]) this.character[playerNum].destroy();
        return this.character[playerNum] = scene.add.sprite(x, y, this.spritesheet[playerNum - 1]);
    }

    destroyCharacterSprite(playerNum: number) {
        if (this.character[playerNum]) {
            this.character[playerNum].destroy();
            this.character[playerNum] = null;
        }
    }
    getWaveSpeed() {
        return this.waveHdData.speed;
    }
    getWaveMap() {
        return this.waveHdData;
    }

    getName(): string {
        return this.name;
    }
}

export default Character;