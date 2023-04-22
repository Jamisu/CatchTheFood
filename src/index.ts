import { Application, Loader, Texture, AnimatedSprite, Sprite, Rectangle, Ticker } from "pixi.js";
import Knight from "./objects/knight/knight"
import "./style.css";

const gameWidth = 800;
const gameHeight = 600;

const foodArray: Array<Sprite> = [];
const cloudsArray: Array<Sprite> = [];

export interface ImageDefinition {
    name: string;
    extension: string;
    texture: Texture | undefined;
}

const app = new Application({
    backgroundColor: 0xd3d3d3,
    width: gameWidth,
    height: gameHeight,
});

let debounce = 1000;

const animationUpdate = function (delta: number) {
    console.log("tick " + delta);
    if (debounce <= 0) {
        app.ticker.stop();
    }
    debounce--;
    updateClouds();
    // updateKnight();
    // updateFood();
};

app.ticker.add(animationUpdate);
app.ticker.speed = 1;

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
    const foodFromSprite = getFood();
    const knightFromSprite = new Knight();

    cloudsArray[0] = getCloud();
    cloudsArray.push(cloudsArray[0]);
    cloudsArray[0].y = 100;

    app.stage.addChild(cloudsArray[0]);
    app.stage.addChild(foodFromSprite);
    app.stage.addChild(knightFromSprite);
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

// function getKnight(): AnimatedSprite {
//     const knight: AnimatedSprite = new AnimatedSprite([
//         Texture.from("knight_standing"),

//         Texture.from("knight_left_walk_1"),
//         Texture.from("knight_left_walk_2"),

//         Texture.from("knight_right_walk_1"),
//         Texture.from("knight_right_walk_2"),
//     ]);

//     knight.scale.set(2);

//     return knight;
// }

function getCloud(): Sprite {
    const cloud = new Sprite(Texture.from("cloud"));
    cloud.scale.set(2);

    return cloud;
}

function updateClouds(): void {
    if (cloudsArray[0]) {
        cloudsArray[0].x += 1;
        if (cloudsArray[0].x <= -cloudsArray[0].width) {
            console.log("cloud offscreen");
        }
    }
}
