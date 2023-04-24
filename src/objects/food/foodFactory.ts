import { Texture, Sprite, Rectangle } from "pixi.js";
import Config from "../../config/config";
import Food from "./food"

export default class FoodFactory {
    static getNewFood(row?: number, column?: number): Food {

        const argRow: number | undefined = (row) ? row * 16 : undefined;
        const argColumn: number | undefined = (column) ? column * 16 : undefined;
    
        const fRow: number = argRow || Math.floor( Math.random() * 8 ) * 16;
        const fColumn: number = argColumn || Math.floor( Math.random() * 8 ) * 16;

        const tex: Texture = Texture.from("food");
        tex.frame = new Rectangle(fColumn, fRow, 16, 16);

        const texture = tex.clone();
        tex.updateUvs();

        const food = new Food(texture);
        food.setId(( fRow * fColumn ) + fColumn);
        food.scale.set(2);
        food.x = Math.floor(Math.random() * Config.gameWidth) - food.width;
        
        if(food.x < 1) {
            food.x = 1
        };

        return food;
    }
}