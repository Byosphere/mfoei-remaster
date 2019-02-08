import WaveData from "../objects/waveDataInterface";
import { getNext } from "../utils/helpers";
import { WAVEMENU_Y } from "../utils/Constants";

export default class Wave extends Phaser.Scene {

    private waveMaps: Phaser.Tilemaps.Tilemap[];
    private staticLayers: Phaser.Tilemaps.StaticTilemapLayer[] = [];
    private waveData: WaveData;
    private posY: number;
    private valueZone: Phaser.GameObjects.Graphics;
    private miniCamera: any;
    private playerNum: number;

    constructor(key: string, valueZone: Phaser.GameObjects.Graphics, posY: number, data: WaveData, playerNum: number) {
        super({ key });
        this.waveData = data;
        this.posY = posY;
        this.valueZone = valueZone;
        this.playerNum = playerNum;
    }

    create() {

        this.cameras.main.setViewport(50, 0, this.game.canvas.width - 50 * 2, this.game.canvas.height);

        var hLine = this.add.graphics();
        hLine.lineStyle(4, 0x000000, 0.5);

        this.waveMaps = [
            this.make.tilemap({ key: this.waveData.map }),
            this.make.tilemap({ key: this.waveData.map }),
            this.make.tilemap({ key: this.waveData.map })
        ];
        this.waveMaps.forEach((map: Phaser.Tilemaps.Tilemap, i: number) => {
            let image = map.addTilesetImage('tiletest');
            this.staticLayers[i] = map.createStaticLayer(0, image, 0, this.posY);
            this.staticLayers[i].setX(i * this.staticLayers[i].width);
            this.staticLayers[i].setTileIndexCallback(1, this.dataOverlaps, this);
            this.physics.add.overlap(this.valueZone, this.staticLayers[i]);
        });
        hLine.strokeLineShape(new Phaser.Geom.Line(0, 270, this.game.canvas.width, 270));
    }

    update() {
        if (this.waveMaps.length) {
            this.staticLayers.forEach((layer: Phaser.Tilemaps.StaticTilemapLayer, i: number) => {
                layer.x -= this.waveData.speed;
                if (layer.x <= -this.game.canvas.width) {
                    layer.x = getNext(i, this.staticLayers).x + this.staticLayers[i].width * (this.waveMaps.length - 1);
                }
            });
        }
    }

    dataOverlaps(graph: Phaser.GameObjects.Graphics, tile: Phaser.Tilemaps.Tile) {
        console.log(graph, tile);
    }
}