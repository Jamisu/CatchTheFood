import { Sprite } from 'pixi.js'

export default class Clouds extends Sprite {
 
    private static cloudsArray: Array<Sprite> = [];

    static setCloudsArray(cArray: Array<Sprite>): void {
        Clouds.cloudsArray = cArray;
    }

    static getCloudsArray(): Array<Sprite> {
        return Clouds.cloudsArray;
    }
}
