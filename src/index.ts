import { Application, Loader, Texture, AnimatedSprite, Sprite, Container } from "pixi.js";
import Config from "./config/config"
import FoodFactory from "./objects/food/foodFactory"
import Food from "./objects/food/food";
import Knight from "./objects/knight/knight";
import Lifes from "./screens/lifes"
import "./style.css";

const cloudsArray: Array<Sprite> = [];
const foodArray: Array<Food> = [];
let knightFromSprite: Knight;
const lifesContainer: Lifes = new Lifes();
const gameContainer: Container = new Container();

const app = new Application({
    backgroundColor: 0xd3d3d3,
    width: Config.gameWidth,
    height: Config.gameHeight,
});

let score: number = 0;
let cyclesToNewFood: number = Config.cyclesToNewFood;
let debounce: number = Config.debounceFames;
let pressedKey: String = "none";

window.onload = async (): Promise<void> => {
    await loadGameAssets();

    // Construct HTML elements
    const container = document.createElement("div");
    const h = document.createElement("H1");
    container.appendChild(h);
    container.appendChild(app.view);
    document.body.appendChild(container);
    document.title = h.innerHTML = "Catch The Food";

    // PIXI from now on
    knightFromSprite = new Knight();
    gameContainer.addChild(knightFromSprite);
    app.stage.addChild(gameContainer);
    app.stage.addChild(lifesContainer);
    
    window.addEventListener("keydown", keyDownListener, false);
    window.addEventListener("keyup", keyUpListener, false);
    
    lifesContainer.resetLifes();
    createCloud();
    serveFood();
    app.stage.interactive = true;
    app.ticker.start();
};

const loadGameAssets = async(): Promise<void> => {
    return new Promise((res, rej) => {
        const loader = Loader.shared;
        loader.add("knight", "./assets/knight.json");
        loader.add("food", "./assets/food.png");
        loader.add("cloud", "./assets/cloud1.png");

        loader.onComplete.once(() => {
            res();
        });

        loader.onError.once(() => {
            rej();
        });

        loader.load();
    });
}

const animationUpdate = function (delta: number): void {
    if (debounce <= 0) {
        debounce = Config.debounceFames;
        updateClouds();
        updateKnight();    
        updateFood();
    }
    debounce--;
};

app.ticker.add(animationUpdate);
app.ticker.stop();

const keyDownListener = (e:KeyboardEvent): void => {
    pressedKey = e.key;
}
const keyUpListener = (e:KeyboardEvent): void => {
    pressedKey = "none";
}

const START_GAME = (): void => {

}

const END_GAME = (): void => {

}


const createCloud = (): Sprite => {
    const cloud = new Sprite(Texture.from("cloud"));
    cloud.scale.set(2);
    cloudsArray.push(cloud)
    gameContainer.addChild(cloud);
    cloud.x = -cloud.width;
    cloud.y = Math.floor(Math.random()*cloud.height) - 50;
    return cloud;
}

const updateClouds = (): void => {
    if (cloudsArray.length) {
        cloudsArray.map((c) => {
            c.x += Config.gridSize*2;
            if (c.x >= Config.gameWidth) {
                c.parent.removeChild(c);
                cloudsArray.shift();
                c.destroy();
            }
        }); 
    }

    if(Math.random() > 0.95) {
        createCloud();
    }
}

const serveFood = (): void => {
    const newFood:Food = FoodFactory.getNewFood();
    foodArray.push(newFood);
    gameContainer.addChild(newFood);
}

const updateFood = (): void => {
    if(foodArray.length) {
        foodArray.map((f) => {
            if(hitTestRectangle(f, knightFromSprite)) {
                f.setAnimatedDeath();
                foodArray.shift();
                score ++;
                console.log("SCORE: ", score);
                return;
            }

            f.y += Config.gridSize;
            if (f.y >= Config.gameHeight) {
                foodArray.shift();
                lifesContainer.takeLife();

                if (lifesContainer.getLifes() <= 0) {
                    app.ticker.stop();
                    //  END GAME
                }
            }
        });
    }

    if(cyclesToNewFood > 5) {
        cyclesToNewFood--;
    } else {
        cyclesToNewFood = Config.cyclesToNewFood - score;
        serveFood();
    }
}

const updateKnight = (): void => {
    if (pressedKey === "ArrowLeft") {
        knightFromSprite.knightStepLeft();
        knightFromSprite.x -= Config.gridSize * 2;
        if(knightFromSprite.x <= 0) {
            knightFromSprite.x = 0;
        }
        return;
    } else if(pressedKey === "ArrowRight") {
        knightFromSprite.knightStepRight();
        knightFromSprite.x += Config.gridSize * 2;
        if(knightFromSprite.x >= Config.gameWidth - knightFromSprite.width) {
            knightFromSprite.x = Config.gameWidth - knightFromSprite.width;
        }
        return;
    } else {
        knightFromSprite.knightStand();
    }
}

const hitTestRectangle = (a:Sprite, b:AnimatedSprite): Boolean =>
{
    if(a !== null && b !== null) {
        var ab = a.getBounds();
        var bb = b.getBounds();
        return ab.x + ab.width > bb.x && ab.x < bb.x + bb.width && ab.y + ab.height > bb.y && ab.y < bb.y + bb.height;
    }
    return false;
}