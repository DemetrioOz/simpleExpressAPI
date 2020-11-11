const express = require("express");
const heroesRoute = require("./routes/heroesRoute");
const app = express();

app.use(express.urlencoded({ extended: false }));

heroesRoute(app);

app.get("/", (req, res) => {
  res.send("ola bem vindo a pagina");
});

const port = 3333;
app.listen(port, () => {
  console.log(`server runninge in ${port}`);
});
