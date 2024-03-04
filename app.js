const express = require("express");
const morgan = require("morgan");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const sequelize = require("./src/db/sequelize");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app
  .use(favicon(__dirname + "/favicon.ico"))
  .use(morgan("dev"))
  .use(bodyParser.json());

sequelize.initDb();

// Find all articles
require("./src/routes/findAllArticles")(app);

// Find article by Primary Key
require("./src/routes/findArticleByPk")(app);

// Create article
require("./src/routes/createArticle")(app);

// Update article
require("./src/routes/updateArticle")(app);

// Delete article
require("./src/routes/deleteArticle")(app);

// Login
require("./src/routes/login")(app);

app.use(({ res }) => {
  const message =
    "Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL.";
  res.status(404).json({ message });
});

app.listen(port, () =>
  console.log(
    `Notre application Node est démarrée sur : http://localhost:${port}`
  )
);
