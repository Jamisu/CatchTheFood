import { Application, Loader, Texture, AnimatedSprite, Sprite, Rectangle, Ticker } from "pixi.js";
import "./style.css";

const gameWidth = 800;
const gameHeight = 600;

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
let temp = 10;
const animationUpdate = function (delta: number) {
    console.log("tick " + delta);
    if (temp <= 0) {
        app.ticker.stop();
    }
    temp--;
};

app.ticker.add(animationUpdate);
app.ticker.speed = 1;

window.onload = async (): Promise<void> => {
    await loadGameAssets();

    const container = document.createElement("div");
    const h = document.createElement("H1");
    h.innerHTML = "Cath The Food";
    container.appendChild(h);
    container.appendChild(app.view);
    document.body.appendChild(container);

    const foodFromSprite = getFood();
    foodFromSprite.anchor.set(0.5, 0.5);
    foodFromSprite.position.set(gameWidth / 2, gameHeight - 16);

    app.stage.addChild(foodFromSprite);
    app.stage.interactive = true;
};

async function loadGameAssets(): Promise<void> {
    return new Promise((res, rej) => {
        const loader = Loader.shared;
        loader.add("knight", "./assets/knight.json");
        loader.add("food", "./assets/food.png");

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
    // const image: ImageDefinition = { name: "food", extension: "png", texture: undefined };
    // image.texture = Loader.shared.resources[image.name].texture;
    const texture = Texture.from("food");
    texture.frame = new Rectangle(16, 0, 16, 15);
    texture.updateUvs();
    const food = new Sprite(texture);
    food.scale.set(2);
    return food;
}

function getKnight(): AnimatedSprite {
    const knight: AnimatedSprite = new AnimatedSprite([
        Texture.from("knight_standing"),

        Texture.from("knight_left_walk_1"),
        Texture.from("knight_left_walk_2"),

        Texture.from("knight_right_walk_1"),
        Texture.from("knight_right_walk_2"),
    ]);

    knight.animationSpeed = 0.1;
    //knight.play();
    knight.scale.set(2);

    return knight;
}
