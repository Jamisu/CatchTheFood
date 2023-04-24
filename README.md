# simple pixi-typescript-webpack game

There is still much TODO, especially splitting the main class into separate components

## Config.ts

-   defaultLifes - 10
-   gameWidth - 
-   gameHeight - 
-   debounceFames - used for pixel-style movement (refreshes 1/N-th frame), and optimisation
for fast pace game set it to 1.
in future adaptation there will be food that speeds up only the knight for couple of seconds

-   gridSize - 
-   cyclesToNewFood - 

## Commands:

-   `npm run build` - starts build procedure
-   `npm run start` - start watching for files and open's server on localhost:8080
-   `npm run test` - run tests
-   `npm run code-coverage` - generate code coverage report
-   `npm run code-style-check` - run's eslint and prettier check on your code

use arrowLeft and arrowRight to control the Knight
enjoy
