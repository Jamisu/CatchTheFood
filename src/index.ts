import { Application, Loader, Texture, AnimatedSprite, Sprite, Rectangle, Ticker, Container } from "pixi.js";
import Config from "./config/config"
import Knight from "./objects/knight/knight"
import "./style.css";

const foodArray: Array<Sprite> = [];
const cloudsArray: Array<Sprite> = [];
const gameContainer: Container = new Container();

const app = new Application({
    backgroundColor: 0xd3d3d3,
    width: Config.gameWidth,
    height: Config.gameHeight,
});

let debounce = Config.debounceFames;

const animationUpdate = function (delta: number) {
    if (debounce <= 0) {
        debounce = Config.debounceFames;
        updateClouds();
    //  updateKnight();
        updateFood();
    }
    debounce--;
};

app.ticker.add(animationUpdate);

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
    foodArray.push(getFood());
    const knightFromSprite = new Knight();

    gameContainer.addChild(foodArray[0]);
    gameContainer.addChild(knightFromSprite);

    createCloud();

    app.stage.addChild(gameContainer);
    app.stage.addChild(cloudsArray[0]);
    app.stage.interactive = true;
};

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

function getFood(): Sprite {
    const texture = Texture.from("food");
    texture.frame = new Rectangle(16, 0, 16, 15);
    texture.updateUvs();
    const food = new Sprite(texture);
    food.scale.set(2);
    return food;
}

function createCloud(): Sprite {
    const cloud = new Sprite(Texture.from("cloud"));
    cloud.scale.set(2);
    cloudsArray.push(cloud)
    app.stage.addChild(cloud);
    cloud.x = -cloud.width;
    cloud.y = Math.floor(Math.random()*cloud.height)
    return cloud;
}

function updateClouds(): void {
    if (cloudsArray.length) {
        cloudsArray.map((c) => {
            c.x += Config.gridSize*10;
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

function updateFood(): void {
    foodArray.map((f) => f.y += 8);
}