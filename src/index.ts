import { Application, Loader, Texture, AnimatedSprite, Sprite, Rectangle, Ticker, Container } from "pixi.js";
import Config from "./config/config"
import FoodFactory from "./objects/food/foodFactory"
import Food from "./objects/food/food";
import Knight from "./objects/knight/knight"
import "./style.css";

const cloudsArray: Array<Sprite> = [];
const foodArray: Array<Food> = [];
let knightFromSprite: Knight;
const gameContainer: Container = new Container();
const foodFactory: FoodFactory = new FoodFactory();

const app = new Application({
    backgroundColor: 0xd3d3d3,
    width: Config.gameWidth,
    height: Config.gameHeight,
});

let score: number = 0;
let lives: number = Config.defaultLives;
let cyclesToNewFood: number = Config.cyclesToNewFood;
let debounce = Config.debounceFames;
let pressedKey: String = "none";

const animationUpdate = function (delta: number) {
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

window.onload = async (): Promise<void> => {
    await loadGameAssets();

    // Construct HTML elements
    const container = document.createElement("div");
    const h = document.createElement("H1");
    h.innerHTML = "Cath The Food";
    container.appendChild(h);
    container.appendChild(app.view);
    document.body.appendChild(container);
    document.title = "Catch The Food";

    // PIXI from now on
    serveFood();
    knightFromSprite = new Knight();
    gameContainer.addChild(knightFromSprite);
    window.addEventListener("keydown", keyDownListener, false);
    window.addEventListener("keyup", keyUpListener, false);
    createCloud();

    app.stage.addChild(gameContainer);
    app.stage.addChild(cloudsArray[0]);
    app.stage.interactive = true;

    app.ticker.start();
};

const keyDownListener = (e:KeyboardEvent) => {
    pressedKey = e.key;
}
const keyUpListener = (e:KeyboardEvent) => {
    pressedKey = "none";
}

async function loadGameAssets(): Promise<void> {
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

function createCloud(): Sprite {
    const cloud = new Sprite(Texture.from("cloud"));
    cloud.scale.set(2);
    cloudsArray.push(cloud)
    app.stage.addChild(cloud);
    cloud.x = -cloud.width;
    cloud.y = Math.floor(Math.random()*cloud.height) - 50;
    return cloud;
}

function updateClouds(): void {
    if (cloudsArray.length) {
        cloudsArray.map((c) => {
            c.x += Config.gridSize*2;
            if (c.x >= Config.gameWidth) {
                cloudsArray.shift();
                c.destroy();
            }
        }); 
    }

    if(Math.random() > 0.95) {
        createCloud();
    }
}

function serveFood(): void {
    const newFood:Food = foodFactory.getNewFood();
    foodArray.push(newFood);
    gameContainer.addChild(newFood);
}

function updateFood(): void {
    if(foodArray.length) {
        foodArray.map((f) => {
            if(hitTestRectangle(f, knightFromSprite)) {
                f.setAnimatedDeath();
                foodArray.shift();
                score ++;

                return;
            }

            f.y += Config.gridSize;
            if (f.y >= Config.gameHeight) {
                foodArray.shift();
                f.destroy();
                lives--;
                if (lives <= 0) {
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

function updateKnight(): void {
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

function hitTestRectangle(a:Sprite, b:AnimatedSprite): Boolean
{
    if(a !== null && b !== null) {
        var ab = a.getBounds();
        var bb = b.getBounds();
        return ab.x + ab.width > bb.x && ab.x < bb.x + bb.width && ab.y + ab.height > bb.y && ab.y < bb.y + bb.height;
    }
    return false;
}