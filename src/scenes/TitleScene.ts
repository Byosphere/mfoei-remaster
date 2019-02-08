import { ControlsInterface } from "./../utils/ControlsManager";
import { QUICK_PLAY } from "../utils/Constants";

export default class TitleScene extends Phaser.Scene implements ControlsInterface {

    private menuGroup: Phaser.GameObjects.Group;
    private menuBack: Phaser.GameObjects.Graphics;
    private selectedMenu: number;

    constructor() {
        super({ key: "TitleScene" });
    }

    preload(): void {
        let controlsManager: any = this.scene.get('ControlsManager');
        controlsManager.setCallbackContext(this, this);
        this.scene.launch('ControlsManager');
    }

    create(): void {
        let logo = this.add.sprite(this.game.canvas.width / 2, 0, 'title');
        logo.y = (logo.height / 2) + 40;
        logo.scaleX = 0.5;
        logo.scaleY = 0.5;
        this.tweens.add({
            targets: logo,
            scaleX: { value: 1, duration: 500, ease: 'Back' },
            scaleY: { value: 1, duration: 500, ease: 'Back' },
        });
        if (!this.anims.get('title_anim')) {
            this.anims.create({
                key: 'title_anim',
                frames: this.anims.generateFrameNumbers('title', { start: 0, end: 3 }),
                frameRate: 10,
                repeat: -1
            });
        }

        logo.play('title_anim');

        var text = this.add.text(0, 0, this.game.config.gameTitle + ' | ' + 'Version: ' + this.game.config.gameVersion, { font: '16px Courier', fill: '#ffffff', align: 'center' });
        text.x = (this.game.canvas.width / 2) - (text.width / 2);
        text.y = this.game.canvas.height - 30;

        this.createMenu();
    }


    createMenu() {
        this.menuBack = this.add.graphics();
        let menu1 = this.add.text(2000, 500, this.game.translate('mainmenu.campaign'), { fontFamily: 'Pixel', fontSize: 30 }).setInteractive();
        menu1.setName('menu1');
        let menu2 = this.add.text(2000, menu1.y + 55, this.game.translate('mainmenu.quickplay'), { fontFamily: 'Pixel', fontSize: 30 }).setInteractive();
        menu2.setName('menu2');
        let menu3 = this.add.text(2000, menu2.y + 55, this.game.translate('mainmenu.settings'), { fontFamily: 'Pixel', fontSize: 30 }).setInteractive();
        menu2.setName('menu3');
        this.tweens.add({ targets: menu1, x: { value: this.game.canvas.width - menu1.width - 90, duration: 500, ease: 'Power4' } });
        this.tweens.add({ targets: menu2, x: { value: this.game.canvas.width - menu2.width - 90, duration: 500, ease: 'Power4', delay: 200 } });
        this.tweens.add({ targets: menu3, x: { value: this.game.canvas.width - menu3.width - 90, duration: 500, ease: 'Power4', delay: 400 } });
        this.menuGroup = this.add.group([menu1, menu2, menu3]);
        menu1.setShadow(5, 5, "#ff00ff", 0);
        menu1.setColor('#00ffff');
        this.selectedMenu = 0;
        this.drawMenuBack(menu1);
        this.menuBack.setInteractive();
    }

    drawMenuBack(menu: Phaser.GameObjects.Text) {
        this.menuBack.clear();
        this.menuBack.fillStyle(0x000000, 0.4);
        this.menuBack.beginPath();
        this.menuBack.moveTo(this.game.canvas.width, menu.y);
        this.menuBack.lineTo(this.game.canvas.width - 400, menu.y);
        this.menuBack.lineTo(this.game.canvas.width - 450, menu.y + menu.height + 10);
        this.menuBack.lineTo(this.game.canvas.width, menu.y + menu.height + 10);
        this.menuBack.closePath();
        this.menuBack.fillPath();
    }

    validateMenuItem() {

        switch (this.selectedMenu) {
            case 0:
                break;
            case 1:
                this.scene.transition({
                    target: 'HeroSelectScene',
                    duration: 500,
                    moveAbove: true,
                    onUpdate: this.transitionOut,
                    data: { gamemode: QUICK_PLAY }
                });
                break;
            case 2:
                break;
        }
    }

    transitionOut(progress: number) {
        //this.cameras.main.y = this.game.canvas.height * progress;
        this.cameras.main.alpha = (0.5 - progress) + 0.5;
    }

    selectMenuItem(item: Phaser.GameObjects.Text) {
        item.setShadow(5, 5, "#ff00ff", 0);
        item.setColor('#00ffff');
        this.drawMenuBack(item);
    }

    unselectMenuItem(item: Phaser.GameObjects.Text) {
        item.setShadow(0, 0);
        item.setColor('#FFFFFF');
    }

    actionButtonReleased(playerNum: number): void {
        this.validateMenuItem();
    }

    upButtonReleased(playerNum: number): void {
        if (this.selectedMenu > 0) {
            let previousGameObject = this.menuGroup.getChildren()[this.selectedMenu];
            if (previousGameObject instanceof Phaser.GameObjects.Text) this.unselectMenuItem(previousGameObject);

            this.selectedMenu--;
            let gameObject = this.menuGroup.getChildren()[this.selectedMenu];
            if (gameObject instanceof Phaser.GameObjects.Text) this.selectMenuItem(gameObject)
        }
    }

    downButtonReleased(playerNum: number): void {
        if (this.selectedMenu < this.menuGroup.getChildren().length - 1) {
            let previousGameObject = this.menuGroup.getChildren()[this.selectedMenu];
            if (previousGameObject instanceof Phaser.GameObjects.Text) this.unselectMenuItem(previousGameObject);

            this.selectedMenu++;
            let gameObject = this.menuGroup.getChildren()[this.selectedMenu];
            if (gameObject instanceof Phaser.GameObjects.Text) this.selectMenuItem(gameObject);
        }
    }

    mouseOver(gameObject: Phaser.GameObjects.GameObject) {
        if (gameObject instanceof Phaser.GameObjects.Text) {
            this.menuGroup.getChildren().forEach((child: Phaser.GameObjects.Text, index: number) => {
                this.unselectMenuItem(child);
                if (child.name === gameObject.name) this.selectedMenu = index;
            });
            this.selectMenuItem(gameObject);
        }
    }
    click(gameObject: Phaser.GameObjects.GameObject): void {
        this.validateMenuItem();
    }

    leftButtonReleased(playerNum: number): void { }
    rightButtonReleased(playerNum: number): void { }
    cancelButtonReleased(playerNum: number): void { }
    actionButtonDown(playerNum: number): void { }
    upButtonDown(playerNum: number): void { }
    downButtonDown(playerNum: number): void { }
    leftButtonDown(playerNum: number): void { }
    rightButtonDown(playerNum: number): void { }
    cancelButtonDown(playerNum: number): void { }
    mouseOut(gameObject: Phaser.GameObjects.GameObject): void { }
}