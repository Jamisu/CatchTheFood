import { Sprite, Texture } from 'pixi.js'
import Config from "../../config/config"

export default class Clouds extends Sprite {
 
    private static cloudsArray: Array<Sprite> = [];

    static setCloudsArray(cArray: Array<Sprite>): void {
        Clouds.cloudsArray = cArray;
    }

    static getCloudsArray(): Array<Sprite> {
        return Clouds.cloudsArray;
    }

    static createCloud = (cloudContainer: Sprite): Sprite => {
        const cloud = new Sprite(Texture.from("cloud"));
        
        cloud.scale.set(2);
        this.cloudsArray.push(cloud)
        cloudContainer.addChild(cloud);
        cloud.x = -cloud.width;
        cloud.y = Math.floor(Math.random()*cloud.height) - 50;
        
        return cloud;
    }
    
    static updateClouds = (cloudContainer: Sprite): void => {
        if (this.cloudsArray.length) {
            this.cloudsArray.map((c) => {
                c.x += Config.gridSize * 2;
                if (c.x >= Config.gameWidth) {
                    c.parent.removeChild(c);
                    this.cloudsArray.shift();
                    c.destroy();
                }
            });
        }
    
        if(Math.random() > 0.95) {
            this.createCloud(cloudContainer);
        }
    }
}
