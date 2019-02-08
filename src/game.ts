import "phaser";
import config from "./data/config";
import { getNavigatorLanguage } from "./utils/helpers";

export default class Game extends Phaser.Game {

    constructor(config: GameConfig) {
        super(config);
    }

    public translate(key: string): string {
        let path = key.split('.');

        let lang = getNavigatorLanguage();
        let langFile = this.cache.json.get('en'); // anglais par défaut
        if (this.cache.json.has(lang)) {
            langFile = this.cache.json.get(lang);
        }
        let result = '';
        for (let i = 0; i < path.length; i++) {
            if (i !== 0) {
                result = result[path[i]];
            } else {
                result = langFile[path[i]];
            }
            if (!result) return key;
        }
        return result;
    }
}

// when the page is loaded, create our game instance
window.addEventListener("load", () => {
    var game = new Game(config);
});