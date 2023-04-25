# simple pixi-typescript-webpack game

## Config.ts

-   defaultLifes - 10
-   debounceFames - used for pixel-style movement (refreshes 1/N-th frame), and optimisation
for fast pace game set it to 1.
in future adaptation there will be food that speeds up only the knight for couple of seconds.
Fools app.ticker

-   gridSize - step for moving elements in pixels per cycle
-   cyclesToNewFood - instead of randomised, its regular, but speeds up with score up

## Commands:

-   `npm run build` - starts build procedure
-   `npm run start` - start watching for files and open's server on localhost:8080
-   `npm run test` - run tests
-   `npm run code-coverage` - generate code coverage report
-   `npm run code-style-check` - run's eslint and prettier check on your code

use arrowLeft and arrowRight to control the Knight
enjoy

# TODO

- remove unused dependencies from package.json
- externalise Config and load it as a JSON file to Loader shared
- further refactor main class to achive greater abstraction
- add basic unit testing (Jest)

- add powerUp food to speedUp the Knight (size.set(3))
- add lifeUp food (maybe some filters)
- add sword hit animation when food is taken
