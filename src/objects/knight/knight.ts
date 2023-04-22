import { AnimatedSprite, Texture, FrameObject } from 'pixi.js'

export default class Knight extends AnimatedSprite {
    constructor () {
        super([
            Texture.from("knight_standing"),
    
            Texture.from("knight_left_walk_1"),
            Texture.from("knight_left_walk_2"),
    
            Texture.from("knight_right_walk_1"),
            Texture.from("knight_right_walk_2"),
        ]);
    }
}
