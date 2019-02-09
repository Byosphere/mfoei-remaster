import Character from "./../objects/Character";
import { ControlsInterface } from "./../utils/ControlsManager";
import { WAVEMENU_Y } from "../utils/Constants";
import Wave from "../objects/Wave";
import { generateTextureFromLayer } from "../utils/helpers";
export default class GameScene extends Phaser.Scene implements ControlsInterface {

    private characters: Character[] = [];
    private p1Sprite: Phaser.GameObjects.Sprite;
    private p2Sprite: Phaser.GameObjects.Sprite;
    private black: Phaser.GameObjects.Graphics;
    private texts: Phaser.GameObjects.Text[];
    private waves: Wave[] = [];
    private miniWaves: Wave[] = [];
    private wavesData: number[][] = [];
    testText1: Phaser.GameObjects.Text;
    testText2: Phaser.GameObjects.Text;
    loader: Phaser.GameObjects.Sprite;

    constructor() {
        super({ key: "GameScene" });
    }

    preload(data: any): void {
        let controlsManager: any = this.scene.get('ControlsManager');
        controlsManager.setCallbackContext(this, this);
        this.scene.launch('ControlsManager');

        this.texts = [];
        this.texts.push(this.add.text(this.game.canvas.width / 2, this.game.canvas.height / 2, this.game.translate('gamescene.three'), { fontFamily: 'Pixel', fontSize: 200, align: 'center' }));
        this.texts.push(this.add.text(this.game.canvas.width / 2, this.game.canvas.height / 2, this.game.translate('gamescene.two'), { fontFamily: 'Pixel', fontSize: 200, align: 'center' }));
        this.texts.push(this.add.text(this.game.canvas.width / 2, this.game.canvas.height / 2, this.game.translate('gamescene.one'), { fontFamily: 'Pixel', fontSize: 200, align: 'center' }));
        this.texts.push(this.add.text(this.game.canvas.width / 2, this.game.canvas.height / 2, this.game.translate('gamescene.fight'), { fontFamily: 'Pixel', fontSize: 200, align: 'center' }));

        this.texts.forEach(txt => {
            txt.visible = false;
            txt.setScale(0.1, 0.1);
            txt.setOrigin(0.5, 0.5);
            txt.setShadow(3, 3, "#ff00ff", 0);
            txt.setStroke('#00ffff', 5);
            txt.setColor("#000000");
        });
    }

    create(data: any): void {
        this.characters = data.characters;

        this.loader = this.add.sprite(0, this.game.canvas.height - 40, 'loader');
        this.loader.x = this.game.canvas.width - 60;
        this.loader.play('loading');

        this.events.on('transitioncomplete', this.startIntro, this);
    }

    createWaves() {
        let tilemapP1 = this.characters[0].getTileLayer(this);
        let tilemapP2 = this.characters[1].getTileLayer(this);
        generateTextureFromLayer(this, tilemapP1, this.characters[0].getwaveName(1, 16), 16, 'E');
        generateTextureFromLayer(this, tilemapP2, this.characters[1].getwaveName(2, 16), 16, '4');
        let t1 = generateTextureFromLayer(this, tilemapP1, this.characters[0].getwaveName(1, 4), 4);
        let t2 = generateTextureFromLayer(this, tilemapP2, this.characters[1].getwaveName(2, 4), 4);

        let wave3 = new Wave(this, 0, WAVEMENU_Y + 32, 256, 52, this.characters[0].getwaveName(1, 4), this.characters[0].getWaveSpeed() / 4);
        wave3.setX(-wave3.width);
        wave3.setPositionX(160);
        wave3.flipX = true;
        wave3.generateData();

        let wave4 = new Wave(this, this.game.canvas.width, WAVEMENU_Y + 32, 256, 52, this.characters[1].getwaveName(2, 4), this.characters[1].getWaveSpeed() / 4);
        wave4.setPositionX(160);
        wave4.generateData();
        this.miniWaves.push(wave3, wave4);
    }

    displayBackground() {
        let ground = this.add.graphics();
        ground.fillRect(0, this.game.canvas.height / 2 + 100, this.game.canvas.width, this.game.canvas.height / 2 - 100);
        ground.fillStyle(0x444444, 1);
        let plan2 = this.add.sprite(this.game.canvas.width / 2, this.game.canvas.height - 260, 'plan2');
        let backP1 = this.add.sprite(this.game.canvas.width / 4 + 100, this.game.canvas.height - 100, 'arene');
        backP1.anims.play('arene_anim');
        let backP2 = this.add.sprite(this.game.canvas.width * 3 / 4 - 100, this.game.canvas.height - 100, 'arene');
        backP2.anims.play('arene_anim');

        let animplan2D = this.add.sprite(this.game.canvas.width, plan2.y, 'animplan2D');
        animplan2D.setX(this.game.canvas.width - animplan2D.width / 2 - 44);
        let animplan2G = this.add.sprite(40, plan2.y, 'animplan2G');
        animplan2G.setX(36 + animplan2G.width / 2);

        this.anims.create({
            key: 'animplan2D_anim',
            frames: this.anims.generateFrameNumbers("animplan2D", { start: 0, end: 23 }),
            frameRate: 15,
            repeat: -1
        });

        this.anims.create({
            key: 'animplan2G_anim',
            frames: this.anims.generateFrameNumbers("animplan2G", { start: 0, end: 23 }),
            frameRate: 15,
            repeat: -1
        });

        animplan2D.play('animplan2D_anim');
        animplan2G.play('animplan2G_anim');
        this.displayBackWaves();

        let overlay = this.add.sprite(this.game.canvas.width / 2, this.game.canvas.height / 2, 'overlay');
        let particles1 = this.add.particles('particles', 1);
        let emitter1 = particles1.createEmitter({
            alpha: 0.5,
            scaleX: 0.5,
            scaleY: 0.5
        });
        emitter1.setPosition(this.game.canvas.width - 230, animplan2D.y);
        emitter1.setSpeed(200);
        emitter1.setBlendMode(Phaser.BlendModes.ADD);
        emitter1.setDeathZone({ type: 'onLeave', source: new Phaser.Geom.Circle(this.game.canvas.width - 230, animplan2D.y, 100) });
        let particles2 = this.add.particles('particles', 2);
        let emitter2 = particles2.createEmitter({
            alpha: 0.5,
            scaleX: 0.5,
            scaleY: 0.5
        });
        emitter2.setPosition(225, animplan2D.y);
        emitter2.setSpeed(200);
        emitter2.setBlendMode(Phaser.BlendModes.ADD);
        emitter2.setDeathZone({ type: 'onLeave', source: new Phaser.Geom.Circle(230, animplan2D.y, 100) });
    }

    displayBackWaves() {
        var hLine = this.add.graphics();
        hLine.lineStyle(8, 0x000000, 0.3);
        hLine.strokeLineShape(new Phaser.Geom.Line(0, 296, this.game.canvas.width, 296));
        var vLine = this.add.graphics();
        vLine.lineStyle(4, 0xffffff, 0.5);
        vLine.strokeLineShape(new Phaser.Geom.Line(this.game.canvas.width / 2 - 2, 150, this.game.canvas.width / 2 - 2, 406));
        let wave = new Wave(this, 0, 152, this.game.canvas.width, 208, this.characters[0].getwaveName(1, 16), this.characters[0].getWaveSpeed());
        wave.setAlpha(0.5);
        this.add.existing(wave);
        let wave2 = new Wave(this, 0, 160, this.game.canvas.width, 208, this.characters[1].getwaveName(2, 16), this.characters[1].getWaveSpeed());
        wave2.setAlpha(0.5);
        this.add.existing(wave2);
        this.waves.push(wave, wave2);
    }

    displayWaves() {
        this.add.existing(this.miniWaves[0]);
        this.add.existing(this.miniWaves[1]);

        this.add.tween({
            targets: this.miniWaves[0],
            x: { value: 0, duration: 500, ease: "Quart.easeIn" },
            onComplete: () => {this.miniWaves[0].displayJauge()}
        });
        this.add.tween({
            targets: this.miniWaves[1],
            x: { value: this.game.canvas.width - 260, duration: 500, ease: "Quart.easeIn" },
            onComplete: () => {this.miniWaves[1].displayJauge(true)}
        });
    }

    startWaves() {
        this.waves[0].setMoving(true);
        this.waves[1].setMoving(true);
        this.miniWaves[0].setMoving(true);
        this.miniWaves[1].setMoving(true);
        this.testText1 = this.add.text(this.miniWaves[0].x, this.miniWaves[0].y, '');
        this.testText2 = this.add.text(this.miniWaves[1].x, this.miniWaves[1].y, '');
    }

    startIntro() {
        this.createWaves();
        this.scene.launch('Hud', this.characters);
        this.displayBackground();
        this.black = this.add.graphics();
        this.black.fillStyle(0x252525, 1);
        this.black.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height);
        this.p1Sprite = this.characters[0].getCharacterSprite(1, 0, this.game.canvas.height / 2, this);
        this.p1Sprite.setScale(3, 3);
        this.p2Sprite = this.characters[1].getCharacterSprite(2, this.game.canvas.width, this.game.canvas.height / 2, this);
        this.p2Sprite.setScale(3, 3);
        this.loader.destroy();

        this.add.tween({
            targets: this.p1Sprite,
            x: { value: this.p1Sprite.width, duration: 1000, ease: 'Power4' }
        });
        this.add.tween({
            targets: this.p2Sprite,
            x: { value: this.game.canvas.width - this.p2Sprite.width, duration: 1000, ease: 'Power4' },
            onComplete: () => {
                this.reduce(this.p1Sprite, this.p2Sprite);
                this.tweens.addCounter({
                    from: 1,
                    to: 0.5,
                    duration: 500,
                    onUpdate: (tween) => {
                        this.black.clear();
                        this.black.fillStyle(0x000000, tween.getValue());
                        this.black.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height);
                    }
                })
            }
        });
    }

    reduce(p1: Phaser.GameObjects.Sprite, p2: Phaser.GameObjects.Sprite) {
        let p1x = this.game.canvas.width / 4 + 100
        let p2x = this.game.canvas.width * 3 / 4 - 100;
        let y = this.game.canvas.height - p1.height / 2 - 60;

        this.add.tween({
            targets: p1,
            x: { value: p1x, duration: 1000, ease: 'Power4' },
            y: { value: y, duration: 1000, ease: 'Power4' },
            scaleX: { value: 1, duration: 1000, ease: 'Power4' },
            scaleY: { value: 1, duration: 1000, ease: 'Power4' }
        });

        this.add.tween({
            targets: p2,
            x: { value: p2x, duration: 1000, ease: 'Power4' },
            y: { value: y, duration: 1000, ease: 'Power4' },
            scaleX: { value: 1, duration: 1000, ease: 'Power4' },
            scaleY: { value: 1, duration: 1000, ease: 'Power4' },
            onComplete: () => { this.animateGetReady() }
        });
    }

    animateGetReady() {
        let textGroup = this.add.container(0, 0, this.texts);

        this.texts[0].visible = true;
        this.add.tween({
            targets: this.texts[0],
            scaleX: { value: 1.5, duration: 1000, ease: "Quart.easeOut" },
            scaleY: { value: 1.5, duration: 1000, ease: "Quart.easeOut" },
            onComplete: () => {
                this.texts[1].visible = true;
                this.texts[0].visible = false;
                this.add.tween({
                    targets: this.texts[1],
                    scaleX: { value: 1.5, duration: 1000, ease: "Quart.easeOut" },
                    scaleY: { value: 1.5, duration: 1000, ease: "Quart.easeOut" },
                    onComplete: () => {
                        this.texts[2].visible = true;
                        this.texts[1].visible = false;
                        this.displayWavesMenu();
                        this.displayWaves();
                        this.add.tween({
                            targets: this.texts[2],
                            scaleX: { value: 1.5, duration: 1000, ease: "Quart.easeOut" },
                            scaleY: { value: 1.5, duration: 1000, ease: "Quart.easeOut" },
                            onComplete: () => {
                                this.texts[3].visible = true;
                                this.texts[2].visible = false;
                                this.add.tween({
                                    targets: this.texts[3],
                                    scaleX: { value: 1.5, duration: 1000, ease: "Quart.easeOut" },
                                    scaleY: { value: 1.5, duration: 1000, ease: "Quart.easeOut" },
                                    onComplete: () => {
                                        this.texts[3].visible = false;
                                        this.black.destroy();
                                        this.startMatch();
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    }

    displayWavesMenu() {
        let waveMenu1 = this.add.sprite(0, WAVEMENU_Y, 'movelist-background-left');
        let waveMenu2 = this.add.sprite(0, WAVEMENU_Y, 'movelist-background-right');
        waveMenu1.setX(-waveMenu1.width);
        waveMenu2.setX(this.game.canvas.width);
        waveMenu1.setOrigin(0, 0);
        waveMenu2.setOrigin(0, 0);
        this.add.tween({
            targets: waveMenu1,
            x: { value: 0, duration: 500, ease: "Quart.easeIn" }
        });
        this.add.tween({
            targets: waveMenu2,
            x: { value: this.game.canvas.width - waveMenu2.width, duration: 500, ease: "Quart.easeIn" }
        });
    }

    startMatch() {
        this.startWaves();
        this.p1Sprite.play('c' + this.characters[0].getId() + '_p1_idle');
        this.p2Sprite.play('c' + this.characters[1].getId() + '_p2_idle');
    }

    update() {
        if (this.testText1) this.testText1.setText('val : ' + this.miniWaves[0].getDataValue());
        if (this.testText2) this.testText2.setText('val : ' + this.miniWaves[1].getDataValue());
    }

    mouseOver(gameObject: Phaser.GameObjects.GameObject): void {
        throw new Error("Method not implemented.");
    }
    mouseOut(gameObject: Phaser.GameObjects.GameObject): void {
        throw new Error("Method not implemented.");
    }
    click(gameObject: Phaser.GameObjects.GameObject): void {
        throw new Error("Method not implemented.");
    }
    actionButtonReleased(playerNum?: number): void {
    }
    upButtonReleased(playerNum?: number): void {
        throw new Error("Method not implemented.");
    }
    downButtonReleased(playerNum?: number): void {
        throw new Error("Method not implemented.");
    }
    leftButtonReleased(playerNum?: number): void {
        throw new Error("Method not implemented.");
    }
    rightButtonReleased(playerNum?: number): void {
        throw new Error("Method not implemented.");
    }
    cancelButtonReleased(playerNum?: number): void {
        throw new Error("Method not implemented.");
    }
    actionButtonDown(playerNum?: number): void {

    }
    upButtonDown(playerNum?: number): void {
        throw new Error("Method not implemented.");
    }
    downButtonDown(playerNum?: number): void {
        throw new Error("Method not implemented.");
    }
    leftButtonDown(playerNum?: number): void {
        throw new Error("Method not implemented.");
    }
    rightButtonDown(playerNum?: number): void {
        throw new Error("Method not implemented.");
    }
    cancelButtonDown(playerNum?: number): void {
        throw new Error("Method not implemented.");
    }
}