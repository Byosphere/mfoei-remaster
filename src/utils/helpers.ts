
export function getNavigatorLanguage() {
    let language = (navigator.languages && navigator.languages[0]) || navigator.language;
    if (language.length > 2) {
        language = language.split("-")[0];
    }
    return language;
}

export function vectorToNum(x: number, y: number, width: number): number {
    return width * y + x;
}

export function numToVector(num: number, width: number): Vector2Like {
    return { x: num % width, y: Math.floor(num / width) }
}

export function getNext(i: number, array: any[]): any {
    if (array[i + 1]) return array[i + 1];
    else return array[0];
}

export function generateTextureFromLayer(scene: Phaser.Scene, layer: Phaser.Tilemaps.LayerData, name: string, pixelWidth: number, color?: string): Phaser.Textures.Texture {
    if (scene.textures.exists(name)) return;
    let pixelData = [];
    let c = color || '2';
    layer.data.forEach(line => {
        let ls = '';
        line.forEach((tile: Phaser.Tilemaps.Tile) => {
            ls += tile.index >= 0 ? c : '.';
        });
        pixelData.push(ls);
    });
    return scene.textures.generate(name, { data: pixelData, pixelWidth });
}