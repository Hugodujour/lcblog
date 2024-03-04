const { Article } = require("../db/sequelize");
const { ValidationError, UniqueConstraintError } = require("sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.post("/api/articles", auth, (req, res) => {
    Article.create(req.body)
      .then((article) => {
        const message = `L'article ${req.body.title} a bien été crée.`;
        res.json({ message, data: article });
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        if (error instanceof UniqueConstraintError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        const message =
          "L'article n'a pas pu être ajouté. Réessayez dans quelques instants.";
        res.status(500).json({ message, data: error });
      });
  });
};
