const fs = require("fs");
// const { join } = fs;
var path = require("path");

const filepath = path.join(__dirname, "heroes.json");

const HeroesGet = () => {
  const db = fs.existsSync(filepath) ? fs.readFileSync(filepath) : [];

  try {
    return JSON.parse(db);
  } catch (error) {
    return [];
  }
};

const saveHeroes = (heroes) =>
  fs.writeFileSync(filepath, JSON.stringify(heroes, null, "\t"));

const heroesRoute = (app) => {
  app
    .route("/heroes/:id?")
    .get((req, res) => {
      const heroes = getHeroes();

      res.send({ heroes });
    })
    .post((req, res) => {
      const heroes = getHeroes();

      heroes.push(req.body);
      saveHeroes(heroes);

      res.status(201).send("ok");
    })
    .put((req, res) => {
      const heroes = getHeroes();

      saveHeroes(
        heroes.map((hero) => {
          if (heroes.id == req.params.id) {
            return {
              ...hero,
              ...req.body,
            };
          }
          return hero;
        })
      );
      res.status(201).send("ok");
    })
    .delete((req, res) => {
      const heroes = getHeroes();

      saveHeroes(heroes.filter((hero) => hero.id !== req.params.id));

      res.status(201).send("ok");
    });
};

module.exports = heroesRoute;
