export default class Config {
    static knightFrames: Array<string> = [
        "knight_standing", "knight_left_walk_1", "knight_left_walk_2", "knight_right_walk_1", "knight_right_walk_2"
    ];

    static defaultLifes: number = 10;

    static gameWidth: number = 800;
    static gameHeight: number = 600;

    static debounceFames: number = 5;  //  used for pixel-style movement (refreshes 1/N-th frame), and optimisation
    static gridSize: number = 8;  //  

    static cyclesToNewFood: number = 40;
}
