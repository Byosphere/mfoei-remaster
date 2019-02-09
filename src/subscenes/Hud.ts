import Character from "./../objects/Character";
export default class Hud extends Phaser.Scene {


    constructor() {
        super({ key: "Hud" });
    }

    preload(): void {

    }

    create(characters: Character[]): void {
        console.log(characters);
    }
}