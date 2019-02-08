import { PAD_A, PAD_B, PAD_UP, PAD_RIGHT, PAD_LEFT, PAD_DOWN } from "./Constants";
import { Scene } from "phaser";

interface PlayerInput {
    code: number
    type: string
}

export class ControlsManager extends Phaser.Scene {


    private gamepads: Gamepad[] = [];
    private debug: boolean = false;
    private callbackContext: ControlsInterface;
    private parentScene: Scene;
    private p1_action: PlayerInput;
    private p1_cancel: PlayerInput;
    private p1_up: PlayerInput;
    private p1_down: PlayerInput;
    private p1_right: PlayerInput;
    private p1_left: PlayerInput;
    private p2_action: PlayerInput;
    private p2_cancel: PlayerInput;
    private p2_up: PlayerInput;
    private p2_down: PlayerInput;
    private p2_right: PlayerInput;
    private p2_left: PlayerInput;

    constructor() {
        super({ key: "ControlsManager" });
    }

    public setCallbackContext(context: ControlsInterface, scene: Scene) {
        this.callbackContext = context;
        this.parentScene = scene;
    }

    create() {
        let text = this.add.text(10, 10, '', { font: '16px Courier', fill: '#00ff00' });
        let tween;
        this.input.gamepad.on('down', (pad: Gamepad, button: Phaser.Input.Gamepad.Button, index) => {

            if (!this.gamepads.find((p: Gamepad) => { return pad.id === p.id })) {
                text.setText(pad.id);
                tween = this.tweens.add({
                    targets: text,
                    alpha: { value: 0, duration: 1500, ease: 'Linear' },
                    delay: 1000
                });
                this.gamepads.push(pad);
            } else {
                let playerNum = this.gamepads.findIndex((p: Gamepad) => { return pad.id === p.id });
                if (this.debug) {
                    text.setText("bouton " + button.index);
                    tween.restart();
                }
                this.onControllerButtonDown(button.index, playerNum);
            }
        }, this);

        this.input.gamepad.on('up', (pad: Gamepad, button: Phaser.Input.Gamepad.Button, index) => {
            let playerNum = this.gamepads.findIndex((p: Gamepad) => { return pad.id === p.id });
            this.onControllerButtonReleased(button.index, playerNum);
        });

        this.input.keyboard.on('keydown', this.onKeyboardButtonDown, this);
        this.input.keyboard.on('keyup', this.onKeyboardButtonReleased, this);

        this.parentScene.input.on('gameobjectover', this.onMouseOver, this);
        this.parentScene.input.on('gameobjectout', this.onMouseOut, this);
        this.parentScene.input.on('gameobjectup', this.onClick, this);
    }

    onControllerButtonDown(button: number, playerNum: number) {

        switch (button) {
            case PAD_A:
                this.callbackContext.actionButtonDown(playerNum);
                break;
            case PAD_B:
                this.callbackContext.cancelButtonDown(playerNum);
                break;
            case PAD_UP:
                this.callbackContext.upButtonDown(playerNum);
                break;
            case PAD_DOWN:
                this.callbackContext.downButtonDown(playerNum);
                break;
            case PAD_LEFT:
                this.callbackContext.leftButtonDown(playerNum);
                break;
            case PAD_RIGHT:
                this.callbackContext.rightButtonDown(playerNum);
                break;
            default:
                console.warn('Button pressed unknown : ' + button);
        }
    }

    onKeyboardButtonDown(event: KeyboardEvent) {
        let button = event.keyCode;
        if (event.repeat) return;

        switch (button) {
            case Phaser.Input.Keyboard.KeyCodes.B:
                this.callbackContext.actionButtonDown(0);
                break;
            case Phaser.Input.Keyboard.KeyCodes.N:
                this.callbackContext.cancelButtonDown(0);
                break;
            case Phaser.Input.Keyboard.KeyCodes.Z:
                this.callbackContext.upButtonDown(0);
                break;
            case Phaser.Input.Keyboard.KeyCodes.S:
                this.callbackContext.downButtonDown(0);
                break;
            case Phaser.Input.Keyboard.KeyCodes.Q:
                this.callbackContext.leftButtonDown(0);
                break;
            case Phaser.Input.Keyboard.KeyCodes.D:
                this.callbackContext.rightButtonDown(0);
                break;
            case Phaser.Input.Keyboard.KeyCodes.NUMPAD_ONE:
                this.callbackContext.actionButtonDown(1);
                break;
            case Phaser.Input.Keyboard.KeyCodes.NUMPAD_TWO:
                this.callbackContext.cancelButtonDown(1);
                break;
            case Phaser.Input.Keyboard.KeyCodes.UP:
                this.callbackContext.upButtonDown(1);
                break;
            case Phaser.Input.Keyboard.KeyCodes.DOWN:
                this.callbackContext.downButtonDown(1);
                break;
            case Phaser.Input.Keyboard.KeyCodes.LEFT:
                this.callbackContext.leftButtonDown(1);
                break;
            case Phaser.Input.Keyboard.KeyCodes.RIGHT:
                this.callbackContext.rightButtonDown(1);
                break;
            default:
                console.warn('Button pressed unknown : ' + button);
        }
    }

    onKeyboardButtonReleased(event: KeyboardEvent) {
        let button = event.keyCode;

        switch (button) {
            case Phaser.Input.Keyboard.KeyCodes.B:
                this.callbackContext.actionButtonReleased(0);
                break;
            case Phaser.Input.Keyboard.KeyCodes.N:
                this.callbackContext.cancelButtonReleased(0);
                break;
            case Phaser.Input.Keyboard.KeyCodes.Z:
                this.callbackContext.upButtonReleased(0);
                break;
            case Phaser.Input.Keyboard.KeyCodes.S:
                this.callbackContext.downButtonReleased(0);
                break;
            case Phaser.Input.Keyboard.KeyCodes.Q:
                this.callbackContext.leftButtonReleased(0);
                break;
            case Phaser.Input.Keyboard.KeyCodes.D:
                this.callbackContext.rightButtonReleased(0);
                break;
            case Phaser.Input.Keyboard.KeyCodes.NUMPAD_ONE:
                this.callbackContext.actionButtonReleased(1);
                break;
            case Phaser.Input.Keyboard.KeyCodes.NUMPAD_TWO:
                this.callbackContext.cancelButtonReleased(1);
                break;
            case Phaser.Input.Keyboard.KeyCodes.UP:
                this.callbackContext.upButtonReleased(1);
                break;
            case Phaser.Input.Keyboard.KeyCodes.DOWN:
                this.callbackContext.downButtonReleased(1);
                break;
            case Phaser.Input.Keyboard.KeyCodes.LEFT:
                this.callbackContext.leftButtonReleased(1);
                break;
            case Phaser.Input.Keyboard.KeyCodes.RIGHT:
                this.callbackContext.rightButtonReleased(1);
                break;
            default:
                console.warn('Button released unknown : ' + button);
        }
    }


    onControllerButtonReleased(button: number, playerNum: number) {

        switch (button) {
            case PAD_A:
                this.callbackContext.actionButtonReleased(playerNum);
                break;
            case PAD_B:
                this.callbackContext.cancelButtonReleased(playerNum);
                break;
            case PAD_UP:
                this.callbackContext.upButtonReleased(playerNum);
                break;
            case PAD_DOWN:
                this.callbackContext.downButtonReleased(playerNum);
                break;
            case PAD_LEFT:
                this.callbackContext.leftButtonReleased(playerNum);
                break;
            case PAD_RIGHT:
                this.callbackContext.rightButtonReleased(playerNum);
                break;
            default:
                console.warn('Button released unknown : ' + button);
        }
    }

    onClick(pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.GameObject) {
        this.callbackContext.click(gameObject);
    }
    onMouseOver(pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.GameObject) {
        this.callbackContext.mouseOver(gameObject);
    }

    onMouseOut(pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.GameObject) {
        this.callbackContext.mouseOut(gameObject);
    }
}

export interface ControlsInterface {

    mouseOver(gameObject: Phaser.GameObjects.GameObject): void;
    mouseOut(gameObject: Phaser.GameObjects.GameObject): void;
    click(gameObject: Phaser.GameObjects.GameObject): void;

    actionButtonReleased(playerNum?: number): void;
    upButtonReleased(playerNum?: number): void;
    downButtonReleased(playerNum?: number): void;
    leftButtonReleased(playerNum?: number): void;
    rightButtonReleased(playerNum?: number): void;
    cancelButtonReleased(playerNum?: number): void;

    actionButtonDown(playerNum?: number): void;
    upButtonDown(playerNum?: number): void;
    downButtonDown(playerNum?: number): void;
    leftButtonDown(playerNum?: number): void;
    rightButtonDown(playerNum?: number): void;
    cancelButtonDown(playerNum?: number): void;
}