import { Texture } from "pixi.js"

export default class Config {
    static gameWidth: number = 800;
    static gameHeight: number = 600;

    static debounceFames: number = 5;  //  used for pixel-style movement (refreshes 1/N-th frame), and optimisation
    static gridSize: number = 8;  //  

    static cyclesToNewFood: number = 40;
}
