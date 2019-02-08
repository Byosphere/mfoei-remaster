import 'phaser'
import GameScene from "./../scenes/GameScene";
import { LOADER_BACKGROUND } from "./../utils/Constants";
import { ControlsManager } from "./../utils/ControlsManager";
import TitleScene from "./../scenes/TitleScene";
import Loader from '../scenes/Loader';
import Booter from '../scenes/Booter';
import HeroSelectScene from '../scenes/HeroSelectScene';
import Hud from '../subscenes/Hud';

export default {
    title: "Mighty Fight of epic Instruments",
    url: "http://phaser.io",
    version: "0.0.1",
    width: 1280,
    height: 720,
    parent: 'game',
    type: Phaser.AUTO,
    loader: {
        baseURL: 'assets'
    },
    input: {
        gamepad: true
    },
    backgroundColor: LOADER_BACKGROUND,
    disableContextMenu: true,
    renderConfig: {
        antialias: true,
        pixelArt: true,
        roundPixel: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [Booter, Loader, TitleScene, ControlsManager, HeroSelectScene, GameScene, Hud]
}