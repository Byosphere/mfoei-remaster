import { WAVEWIDTH, WAVEHEIGHT, NB_CHARACTERS } from "../utils/Constants";

export default class Loader extends Phaser.Scene {
    private phaserSprite: Phaser.GameObjects.Sprite;

    constructor() {
        super({ key: "Loader" });

    }

    preload(): void {
        let loader = this.add.sprite(0, this.game.canvas.height - 40, 'loader');
        let text = this.add.text(0, loader.y - (loader.height / 2), this.game.translate('loader.loading') + ' 0/100', { fontFamily: 'Pixel', fontSize: 20 });
        loader.x = this.game.canvas.width - text.width - 60;
        text.x = this.game.canvas.width - text.width - 30;

        this.anims.create({
            key: 'loading',
            frames: this.anims.generateFrameNumbers('loader', { start: 0, end: 3 }),
            frameRate: 15,
            repeat: -1
        });

        loader.play('loading');

        this.load.on('progress', (v: number) => {
            text.setText(this.game.translate('loader.loading') + ' ' + Math.floor(v * 100) + '/100');
        });

        this.load.on('complete', (v: number) => {
            loader.destroy();
            text.destroy();
        });

        this.loadAudio();
        this.loadImages();
        this.loadSpritesheets();
        this.loadData();
    }

    loadImages(): void {
        this.load.image('legumineux', 'legumineux.png');
        this.load.image('light', 'light.png');
        this.load.image('timer', 'sprites/timer.png');
        this.load.image('grid', 'sprites/grid.png');
        this.load.image('overlay', 'sprites/overlay.png');
        this.load.image('ground', 'sprites/ground.png');
        this.load.image('plan2', 'sprites/plan2.png');
        this.load.image('movelist-jauge-top', 'sprites/movelist-jauge-top.png');
        this.load.image('movelist-jauge-bot', 'sprites/movelist-jauge-bot.png');
        this.load.image('rooster_sheet', 'sprites/characterSelect/rooster-sheet.png');
        this.load.image('cursorp1', 'sprites/characterSelect/cursorp1.png');
        this.load.image('cursorp2', 'sprites/characterSelect/cursorp2.png');
        this.load.image('backgroundChar', 'sprites/characterSelect/backgroundChara.png');
        this.load.image('infoback', 'sprites/characterSelect/infoback.png');
        this.load.image('tiletest', 'waves/tiletest.png');
    }

    loadSpritesheets(): void {
        // ADD SPRITESHEETS HERE
        this.load.spritesheet('particles', 'particles.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('timeout', 'sprites/timeout.png', { frameWidth: 1280, frameHeight: 720 });
        this.load.spritesheet('gameover', 'sprites/gameover.png', { frameWidth: 1280, frameHeight: 720 });
        this.load.spritesheet('healthbar', 'sprites/barredevie.png', { frameWidth: 540, frameHeight: 48 });
        this.load.spritesheet('c1_p1', 'sprites/characters/c1_p1.png', { frameWidth: 296, frameHeight: 256 });
        this.load.spritesheet('c1_p2', 'sprites/characters/c1_p2.png', { frameWidth: 296, frameHeight: 256 });
        this.load.spritesheet('c2_p1', 'sprites/characters/c2_p1.png', { frameWidth: 296, frameHeight: 256 });
        this.load.spritesheet('c2_p2', 'sprites/characters/c2_p2.png', { frameWidth: 296, frameHeight: 256 });
        this.load.spritesheet('c3_p1', 'sprites/characters/c3_p1.png', { frameWidth: 296, frameHeight: 256 });
        this.load.spritesheet('c3_p2', 'sprites/characters/c3_p2.png', { frameWidth: 296, frameHeight: 256 });
        this.load.spritesheet('c4_p1', 'sprites/characters/c4_p1.png', { frameWidth: 296, frameHeight: 256 });
        this.load.spritesheet('c4_p2', 'sprites/characters/c4_p2.png', { frameWidth: 296, frameHeight: 256 });
        this.load.spritesheet('player3', 'sprites/p3.png', { frameWidth: 296, frameHeight: 256 });
        this.load.spritesheet('player4', 'sprites/p4.png', { frameWidth: 296, frameHeight: 256 });
        this.load.spritesheet('unknown', 'sprites/characterSelect/unknown.png', { frameWidth: 296, frameHeight: 256 });
        this.load.spritesheet('title', 'title.png', { frameWidth: 1280, frameHeight: 520 });
        this.load.spritesheet('movelist-background-left', 'sprites/movelist-background-left.png', { frameWidth: 296, frameHeight: 100 });
        this.load.spritesheet('movelist-background-right', 'sprites/movelist-background-right.png', { frameWidth: 296, frameHeight: 100 });
        this.load.spritesheet('movelist-deco-left', 'sprites/movelist-deco-left.png', { frameWidth: 296, frameHeight: 200 });
        this.load.spritesheet('movelist-deco-right', 'sprites/movelist-deco-right.png', { frameWidth: 296, frameHeight: 200 });
        this.load.spritesheet('animbtG', 'sprites/animbtG.png', { frameWidth: 32, frameHeight: 160 });
        this.load.spritesheet('animbtD', 'sprites/animbtD.png', { frameWidth: 32, frameHeight: 160 });
        this.load.spritesheet('arene', 'sprites/arene.png', { frameWidth: 336, frameHeight: 124 });
        this.load.spritesheet('animplan2D', 'sprites/animplan2D.png', { frameWidth: 600, frameHeight: 108 });
        this.load.spritesheet('animplan2G', 'sprites/animplan2G.png', { frameWidth: 600, frameHeight: 108 });
        this.load.spritesheet('wave1', 'sprites/waves/wave1.png', { frameWidth: WAVEWIDTH, frameHeight: WAVEHEIGHT });
        this.load.spritesheet('wave2', 'sprites/waves/wave2.png', { frameWidth: WAVEWIDTH, frameHeight: WAVEHEIGHT });
        this.load.spritesheet('wave3', 'sprites/waves/wave3.png', { frameWidth: WAVEWIDTH, frameHeight: WAVEHEIGHT });
        this.load.spritesheet('wave4', 'sprites/waves/wave4.png', { frameWidth: WAVEWIDTH, frameHeight: WAVEHEIGHT });
        this.load.spritesheet('leftpattern', 'sprites/characterSelect/characterselect-leftpattern.png', { frameWidth: 580, frameHeight: 720 });
        this.load.spritesheet('rightpattern', 'sprites/characterSelect/characterselect-rightpattern.png', { frameWidth: 580, frameHeight: 720 });
        this.load.spritesheet('avatarsP1', 'sprites/characterSelect/avatarsP1.png', { frameWidth: 104, frameHeight: 104 });
        this.load.spritesheet('avatarsP2', 'sprites/characterSelect/avatarsP2.png', { frameWidth: 104, frameHeight: 104 });
    }

    loadAudio() {
        // ADD AUDIO HERE
        this.load.audio('intro_theme', 'sound/intro_theme.mp3');
        this.load.audio('theme', 'sound/theme.mp3');
        this.load.audio('healDiscoBoy', 'sound/discoBoy/heal.wav');
        this.load.audio('healAccordeonMan', 'sound/accordeonMan/heal.wav');
    }

    loadData() {
        this.load.json('characterData', 'data/characters.json');
        this.load.tilemapTiledJSON('test', 'waves/test.json');
        this.load.tilemapTiledJSON('test2', 'waves/test2.json');
        this.load.tilemapTiledJSON('test3', 'waves/test3.json');
    }

    createAnimations() {
        this.anims.create({
            key: 'arene_anim',
            frames: this.anims.generateFrameNumbers("arene", { start: 0, end: 23 }),
            frameRate: 15,
            repeat: -1
        });

        for (let i = 1; i < NB_CHARACTERS + 1; i++) {
            this.anims.create({
                key: 'c' + i + '_p1_idle',
                frames: this.anims.generateFrameNumbers('c' + i + '_p1', { start: 0, end: 1 }),
                frameRate: 4,
                repeat: -1
            });
            this.anims.create({
                key: 'c' + i + '_p2_idle',
                frames: this.anims.generateFrameNumbers('c' + i + '_p2', { start: 0, end: 1 }),
                frameRate: 4,
                repeat: -1
            });
        }
    }

    create(): void {
        this.createAnimations();
        this.debugScene('HeroSelectScene');
        let logo = this.add.image(this.game.canvas.width / 2, this.game.canvas.height / 2, 'legumineux');
        let light = this.add.image(this.game.canvas.width / 2, (this.game.canvas.height / 2) - 100, 'light');
        logo.alpha = 0;
        light.alpha = 0;
        this.tweens.add({
            targets: logo,
            alpha: { value: 1, duration: 1000, ease: 'Linear' },
            completeDelay: 2000,
            onComplete: () => {
                this.tweens.add({
                    targets: light,
                    alpha: { value: 1, duration: 500, ease: 'Linear' },
                    onComplete: () => {
                        this.tweens.add({
                            targets: light,
                            scaleX: { value: 30, duration: 1500, ease: 'Linear' },
                            scaleY: { value: 30, duration: 1500, ease: 'Linear' },
                            onComplete: () => {
                                this.cameras.main.fadeOut(500, 255, 255, 255);
                                this.cameras.main.on('camerafadeoutcomplete', () => {
                                    setTimeout(() => { this.scene.start('TitleScene') }, 200);
                                }, this);
                            }
                        });
                    }
                });
            }
        });
    }

    debugScene(scene: string) {
        this.scene.start(scene);
    }
}