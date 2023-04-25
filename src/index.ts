import { Application, Loader, AnimatedSprite, Sprite, Container } from "pixi.js";
import Config from "./config/config"
import FoodFactory from "./objects/food/foodFactory"
import Clouds from "./objects/cloud/cloud"
import Food from "./objects/food/food";
import Knight from "./objects/knight/knight";
import Lifes from "./screens/lifes"
import Score from "./screens/score"
import Button from "./screens/button"
import "./style.css";

let foodArray: Array<Food> = [];
let knightFromSprite: Knight;
const cloudsContainer: Clouds = new Clouds();
const lifesContainer: Lifes = new Lifes();
const scoreContainer: Score = new Score();
const gameContainer: Container = new Container();
const playButton: Button = new Button();

const app = new Application({
    backgroundColor: 0xd3d3d3,
    width: Config.gameWidth,
    height: Config.gameHeight,
});

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
    
    app.stage.addChild(playButton);

    playButton.addListener("mousedown", (e) => {
        START_GAME();
    });
    
    window.addEventListener("keydown", keyDownListener, false);
    window.addEventListener("keyup", keyUpListener, false);
    
    app.stage.interactive = true;
    app.ticker.update()
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
        Clouds.updateClouds(cloudsContainer);
        knightFromSprite.updateKnight(pressedKey);    
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
    //  Clear Stage
    Clouds.removeClouds();

    foodArray.forEach( f => {
        f.parent.removeChild(f);
    });
    foodArray = [];

    //  Add elements anew
    app.stage.addChild(gameContainer);
    app.stage.addChild(cloudsContainer);
    app.stage.addChild(lifesContainer);
    app.stage.addChild(scoreContainer);
    gameContainer.addChild(knightFromSprite);

    knightFromSprite.knightCenter();
    lifesContainer.resetLifes();
    scoreContainer.resetScore();

    Clouds.createCloud(cloudsContainer);
    serveFood();

    app.stage.addChild(playButton);
    playButton.visible = false;
    app.ticker.start();
}

const END_GAME = (): void => {
    app.ticker.stop();
    playButton.replayText();
    playButton.visible = true;
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
                scoreContainer.setScore(scoreContainer.getScore()+1);
                console.log("SCORE: ", scoreContainer.getScore());
                return;
            }

            f.y += Config.gridSize;
            if (f.y >= Config.gameHeight) {
                foodArray.shift();
                lifesContainer.takeLife();

                if (lifesContainer.getLifes() <= 0) {
                    END_GAME();
                }
            }
        });
    }

    if(cyclesToNewFood > 5) {
        cyclesToNewFood--;
    } else {
        cyclesToNewFood = Config.cyclesToNewFood - scoreContainer.getScore();
        serveFood();
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
