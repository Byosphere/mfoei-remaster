import Character from "../objects/Character";
import { ROOSTER_HEIGHT } from "./../utils/Constants";
import { ROOSTER_SIZE, AVATAR_UNKNOWN } from "./../utils/Constants";
import { ControlsInterface } from "./../utils/ControlsManager";
import CharacterJson from "./../objects/CharacterJsonInterface";
import { ROOSTER_WIDTH, ROOSTER_BASEX, ROOSTER_BASEY } from "../utils/Constants";
import { vectorToNum, numToVector } from "../utils/helpers";

export default class HeroSelectScene extends Phaser.Scene implements ControlsInterface {

    private characterList: Character[] = [];
    private gameMode: string;
    private player1: number = 1;
    private player2: number = 1;
    private cursorPos: Vector2Like[] = [{ x: 0, y: 0 }, { x: 0, y: 0 }];
    private cursors: Phaser.GameObjects.Image[] = [];
    private startButton: Phaser.GameObjects.Text;
    private backP1: Phaser.GameObjects.Sprite;
    private backP2: Phaser.GameObjects.Sprite;
    private infoBack1: Phaser.GameObjects.Container;
    private infoBack2: Phaser.GameObjects.Container;
    private cursorActif: boolean[] = [false, false];
    private backButton: Phaser.GameObjects.Text;
    private roosterContainers: Phaser.GameObjects.Container[] = [];
    private logo: Phaser.GameObjects.Sprite;
    private buttonInfo2: Phaser.GameObjects.Text;
    private buttonInfo: Phaser.GameObjects.Text;

    constructor() {
        super({ key: "HeroSelectScene" });
    }

    preload(): void {
        let controlsManager: any = this.scene.get('ControlsManager');
        controlsManager.setCallbackContext(this, this);
        this.scene.launch('ControlsManager');
    }

    create(data: any): void {
        this.gameMode = data.gamemode;
        this.cache.json.get('characterData').forEach((char: CharacterJson) => {
            this.characterList.push(new Character(char));
        });

        this.initDisplay(null, 500);
        //this.events.on('transitionstart', this.initDisplay, this);
    }

    initDisplay(fromScene: Phaser.Scene, duration: number) {
        this.displayBackground();
        this.displayRooster(1, duration, 0, this.game.canvas.width / 4, 0);
        this.displayRooster(2, duration, 0, this.game.canvas.width * 3 / 4, 0);
        this.displayInfos();
        this.initStartButton();
        setTimeout(() => {
            this.initCursors();
            this.setPlayer(1, 1);
            this.setPlayer(2, 1);
        }, duration);
    }

    displayBackground() {

        this.logo = this.add.sprite(this.game.canvas.width / 2, 0, 'title');
        this.logo.y = (this.logo.height / 2) + 40;
        this.logo.alpha = 0.4;

        this.backP1 = this.add.sprite(0, 0, 'arene');
        this.backP1.setY(this.game.canvas.height - this.backP1.height / 2 - 30);
        this.backP1.setX(this.game.canvas.width / 4);
        this.backP2 = this.add.sprite(0, 0, 'arene');
        this.backP2.setY(this.game.canvas.height - this.backP1.height / 2 - 30);
        this.backP2.setX(this.game.canvas.width * 3 / 4);
        this.backP1.setAlpha(0.8);
        this.backP2.setAlpha(0.8);

        this.backP1.anims.play('arene_anim');
        this.backP2.anims.play('arene_anim');
    }

    displayInfos() {
        this.infoBack1 = this.add.container(0, 0);
        let backImage = this.add.image(0, 0, 'infoback');
        this.infoBack1.setX(-backImage.width / 2);
        this.infoBack1.setY(this.game.canvas.height * 2 / 3);
        backImage.flipX = true;
        this.infoBack1.add(backImage);
        this.infoBack2 = this.add.container(0, 0);
        let backImage2 = this.add.image(0, 0, 'infoback');
        this.infoBack2.setX(this.game.canvas.width + backImage2.width / 2);
        this.infoBack2.setY(this.game.canvas.height * 2 / 3);
        this.infoBack2.add(backImage2);

        this.add.tween({
            targets: this.infoBack1,
            x: { value: backImage.width / 2, duration: 500, ease: 'Quart.easeOut' }
        });

        this.add.tween({
            targets: this.infoBack2,
            x: { value: this.game.canvas.width - backImage.width / 2, duration: 500, ease: 'Quart.easeOut' }
        });

        let charName1 = this.add.text(0, 0, this.characterList[0].getName(), { fontFamily: 'Pixel', fontSize: 20, align: "left" });
        charName1.setX(-charName1.width + 35);
        charName1.setY(-backImage.height / 2 + 15);
        let charName2 = this.add.text(0, 0, this.characterList[0].getName(), { fontFamily: 'Pixel', fontSize: 20, align: "left" });
        charName2.setX(-charName2.width + 45);
        charName2.setY(-backImage2.height / 2 + 15);
        this.infoBack1.add(charName1);
        this.infoBack2.add(charName2);
        charName1.name = 'charname';
        charName2.name = 'charname';
    }

    displayRooster(playerNum: number, duration: number, delay: number, x: number, y: number) {

        let backgroundMenu = this.add.sprite(0, 0, 'rooster_sheet');
        backgroundMenu.y = backgroundMenu.height / 2;
        this.roosterContainers[playerNum] = this.add.container(x, y, [backgroundMenu]);
        this.roosterContainers[playerNum].setY(-backgroundMenu.height);
        this.add.tween({
            targets: this.roosterContainers[playerNum],
            y: { value: 0, duration, ease: 'Quart.easeOut' },
            delay
        });

        for (let i = 0; i < ROOSTER_SIZE; i++) {
            let x: number = -(backgroundMenu.width / 2) + ROOSTER_BASEX;
            let y: number = ROOSTER_BASEY;

            if (i >= ROOSTER_WIDTH) {
                y = 204;
            } else {
                y = 76;
            }
            x += (i % ROOSTER_WIDTH) * 128;
            let text: Phaser.GameObjects.Text = this.add.text(x + 4, y - 3, '', { fontFamily: 'Pixel', fontSize: 12 });
            text.setOrigin(0, 0);
            let backText: Phaser.GameObjects.Graphics = this.add.graphics();
            backText.fillRect(x, y, 104, 14);
            backText.fillStyle(0x000000, 0.5);

            if (this.characterList[i]) {
                this.roosterContainers[playerNum].add(this.characterList[i].getAvatar(playerNum, x, y, this).setInteractive());
                this.roosterContainers[playerNum].add(backText);
                this.roosterContainers[playerNum].add(text.setText(this.characterList[i].getName()));
            } else {
                this.roosterContainers[playerNum].add(this.add.sprite(x, y, 'avatarsP1', AVATAR_UNKNOWN).setOrigin(0, 0));
                this.roosterContainers[playerNum].add(backText);
                this.roosterContainers[playerNum].add(text.setText('??????'));
            }
        }
        this.characterList[0].animateAvatar(playerNum, true);
    }

    initCursors() {
        this.cursors[0] = this.add.image(0, 0, 'cursorp1');
        this.cursors[1] = this.add.image(0, 0, 'cursorp2');
        this.cursors[0].setX(128);
        this.cursors[0].setY(128);
        this.cursors[1].setX(768);
        this.cursors[1].setY(128);
        this.cursors[0].setAlpha(0.7);
        this.cursors[1].setAlpha(0.7);
        this.cursorActif = [true, true];
    }

    updateCursor(playerNum: number, char: number) {
        let vector: Vector2Like = numToVector(char - 1, ROOSTER_WIDTH);
        let baseX = playerNum === 1 ? 128 : 768;
        this.cursors[playerNum - 1].x = baseX + vector.x * 128;
        this.cursors[playerNum - 1].y = 128 + vector.y * 128;
    }

    setPlayer(playerNum: number, char: number) {
        let player = playerNum === 1 ? this.player1 : this.player2;
        this.characterList[player - 1].animateAvatar(playerNum, false);
        this.characterList[player - 1].destroyCharacterSprite(playerNum);
        playerNum === 1 ? this.player1 = char : this.player2 = char;
        let x = playerNum === 1 ? this.game.canvas.width / 4 : this.game.canvas.width * 3 / 4;
        let charSprite = this.characterList[char - 1].getCharacterSprite(playerNum, x, this.game.canvas.height - 200, this);
        charSprite.play('c' + char + '_p' + playerNum + '_idle');
        this.updateInfos(this.characterList[char - 1], playerNum);
        this.characterList[char - 1].animateAvatar(playerNum, true);
        this.updateCursor(playerNum, char);
    }

    updateInfos(char: Character, playerNum: number): any {
        let infoTab: Phaser.GameObjects.Container = playerNum === 1 ? this.infoBack1 : this.infoBack2;
        let charName: any = infoTab.getAll("name", "charname");
        if (charName[0]) charName[0].setText(char.getName());
    }

    initStartButton() {
        this.backButton = this.add.text(this.game.canvas.width / 2, 15, this.game.translate('heroselect.back'), { fontFamily: 'Pixel', fontSize: 28, align: 'center' });
        this.backButton.setOrigin(0.5, 0.5);
        this.backButton.setName('backButton');
        this.backButton.setInteractive();
        this.buttonInfo2 = this.add.text(this.game.canvas.width / 2, 38, this.game.translate('heroselect.infobutton2'), { fontFamily: 'Pixel', fontSize: 14, align: 'center' });
        this.buttonInfo2.setOrigin(0.5, 0.5);
        this.buttonInfo2.setAlpha(0.5);

        this.startButton = this.add.text(0, 0, this.game.translate('heroselect.fight'), { fontFamily: 'Pixel', fontSize: 50, align: 'center' });
        this.startButton.setX(this.game.canvas.width / 2);
        this.startButton.setY(this.game.canvas.height - 80);
        this.startButton.setName('startButton');
        this.startButton.setOrigin(0.5, 0.5);
        this.startButton.setInteractive();
        this.buttonInfo = this.add.text(0, 0, this.game.translate('heroselect.infobutton'), { fontFamily: 'Pixel', fontSize: 14, align: 'center' });
        this.buttonInfo.setX(this.game.canvas.width / 2);
        this.buttonInfo.setY(this.game.canvas.height - 40);
        this.buttonInfo.setOrigin(0.5, 0.5);
        this.buttonInfo.setAlpha(0.5);

        this.add.tween({
            targets: this.startButton,
            scaleX: { value: 1.2, duration: 400, ease: 'Quart.easeIn' },
            scaleY: { value: 1.2, duration: 400, ease: 'Quart.easeIn' },
            loop: -1,
            yoyo: true
        });
    }

    transitionOut(progress: number) {

        this.backP1.y += this.backP1.height * progress;
        this.backP2.y += this.backP1.height * progress;
        this.logo.alpha = 0;
        let ifb: any = this.infoBack1.getAll()[0];
        this.infoBack1.x -= ifb.width / 2 * progress;
        this.infoBack2.x += ifb.width / 2 * progress;
        let back: any = this.roosterContainers[1].getAll()[0];
        this.roosterContainers[1].y -= (back.height / 2) * progress;
        this.roosterContainers[2].y -= (back.height / 2) * progress;
        if (this.characterList.length) {
            this.cursors[0].destroy(true);
            this.cursors[1].destroy(true);
            this.buttonInfo.destroy(true);
            this.buttonInfo2.destroy(true);
            this.backButton.destroy(true);
            this.startButton.destroy(true);
            this.characterList[this.player1 - 1].destroyCharacterSprite(1);
            this.characterList[this.player2 - 1].destroyCharacterSprite(2);
            this.characterList = [];
        }
    }

    mouseOver(gameObject: Phaser.GameObjects.GameObject) {
        if (gameObject instanceof Phaser.GameObjects.Sprite) {
            let ids: string[] = gameObject.name.split('_');
            let playerNum: number = parseInt(ids[1]);
            if (!this.cursorActif[playerNum - 1]) return;
            let charId: number = parseInt(ids[0]);
            if (playerNum === 1 && this.player1 !== charId) {
                this.setPlayer(1, charId);
            }
            if (playerNum === 2 && this.player2 !== charId) {
                this.setPlayer(2, charId);
            }
        } else if (gameObject instanceof Phaser.GameObjects.Text && gameObject.name === "startButton") {
            gameObject.setShadow(5, 5, "#ff00ff", 0);
            gameObject.setColor('#00ffff');
            gameObject.setFontSize(60);
        } else if (gameObject instanceof Phaser.GameObjects.Text && gameObject.name === "backButton") {
            gameObject.setShadow(5, 5, "#ff00ff", 0);
            gameObject.setColor('#00ffff');
        }
    }

    click(gameObject: Phaser.GameObjects.GameObject): void {
        if (gameObject instanceof Phaser.GameObjects.Text && gameObject.name === 'startButton') {

            if (this.player1 && this.player2) {
                this.scene.transition({
                    target: 'GameScene',
                    duration: 500,
                    moveAbove: true,
                    onUpdate: this.transitionOut,
                    data: { characters: [this.characterList[this.player1 - 1], this.characterList[this.player2 - 1]], gameMode: this.gameMode }
                });
            }
        } else if (gameObject instanceof Phaser.GameObjects.Text && gameObject.name === "backButton") {
            this.scene.transition({
                target: 'TitleScene',
                duration: 500,
                moveAbove: true,
                onUpdate: this.transitionOut
            });
        }
    }

    actionButtonReleased(playerNum?: number): void {
        switch (playerNum) {
            case 1:
                break;
            case 2:
                break;
        }
    }
    cancelButtonReleased(playerNum?: number): void {
        this.scene.transition({
            target: 'TitleScene',
            duration: 500,
            moveAbove: true,
            onUpdate: this.transitionOut
        });
    }
    upButtonReleased(playerNum?: number): void {
        if (!this.cursorActif[playerNum]) return;
        let cursorPos = this.cursorPos[playerNum];
        if (cursorPos.y > 0 && this.characterList[vectorToNum(cursorPos.x, cursorPos.y - 1, ROOSTER_WIDTH)]) {
            cursorPos.y--;
            this.setPlayer(playerNum + 1, vectorToNum(cursorPos.x, cursorPos.y, ROOSTER_WIDTH) + 1);
        }
    }
    downButtonReleased(playerNum?: number): void {
        if (!this.cursorActif[playerNum]) return;
        let cursorPos = this.cursorPos[playerNum];
        if (cursorPos.y > ROOSTER_HEIGHT - 1 && this.characterList[vectorToNum(cursorPos.x, cursorPos.y + 1, ROOSTER_WIDTH)]) {
            cursorPos.y++;
            this.setPlayer(playerNum + 1, vectorToNum(cursorPos.x, cursorPos.y, ROOSTER_WIDTH) + 1);
        }
    }
    leftButtonReleased(playerNum?: number): void {

        if (!this.cursorActif[playerNum]) return;
        let cursorPos = this.cursorPos[playerNum];
        if (cursorPos.x > 0 && this.characterList[vectorToNum(cursorPos.x - 1, cursorPos.y, ROOSTER_WIDTH)]) {
            cursorPos.x--;
            this.setPlayer(playerNum + 1, vectorToNum(cursorPos.x, cursorPos.y, ROOSTER_WIDTH) + 1);
        }
    }
    rightButtonReleased(playerNum?: number): void {
        if (!this.cursorActif[playerNum]) return;
        let cursorPos = this.cursorPos[playerNum];
        if (cursorPos.x < ROOSTER_WIDTH - 1 && this.characterList[vectorToNum(cursorPos.x + 1, cursorPos.y, ROOSTER_WIDTH)]) {
            cursorPos.x++;
            this.setPlayer(playerNum + 1, vectorToNum(cursorPos.x, cursorPos.y, ROOSTER_WIDTH) + 1);
        }
    }

    mouseOut(gameObject: Phaser.GameObjects.GameObject): void {
        if (gameObject instanceof Phaser.GameObjects.Text && gameObject.name === "startButton") {
            gameObject.setShadow(0, 0);
            gameObject.setColor('#FFFFFF');
            gameObject.setFontSize(50);
        } else if (gameObject instanceof Phaser.GameObjects.Text && gameObject.name === "backButton") {
            gameObject.setShadow(0, 0);
            gameObject.setColor('#FFFFFF');
        }
    }

    actionButtonDown(playerNum?: number): void { }
    upButtonDown(playerNum?: number): void { }
    downButtonDown(playerNum?: number): void { }
    leftButtonDown(playerNum?: number): void { }
    rightButtonDown(playerNum?: number): void { }
    cancelButtonDown(playerNum?: number): void { }
}