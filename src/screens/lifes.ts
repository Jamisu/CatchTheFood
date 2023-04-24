import { Sprite } from 'pixi.js'
import Config from '../config/config'
import Food from "../objects/food/food"
import FoodFactory from "../objects/food/foodFactory"

export default class Lifes extends Sprite {
    private lifes: number = Config.defaultLifes;
    private lifesArray: Array<Food> = [];

    resetLifes(): void {
        //  Clear any remains
        this.lifesArray.forEach( l => {
            l.parent.removeChild(l);
        })
        this.lifesArray = [];

        //  Create new lifes
        this.lifes = Config.defaultLifes;

        for (let i = this.lifes; i >= 0; i--) {
            const life: Food = FoodFactory.getNewFood(1, 4); // take apple symbol as a life
            life.coloriseFood();
            this.lifesArray.push(life);
            this.addChild(life);
            
            life.x = (-i)* (life.width + this.lifes);
            life.y = 0;
        }

        this.x = Config.gameWidth;
        
        console.log(this.x, this.width)
    }

    takeLife(): void {
        console.log("takeLife");
        
        const lifeLost: Food | undefined = this.lifesArray.shift();
        if (lifeLost) {
            this.lifes--;
            this.removeChild(lifeLost);
        } else {
            throw new Error("No more lives to take. Contact local provider for more info")
        }
    }

    getLifes(): number {
        return this.lifes
    }
}