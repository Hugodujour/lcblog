const { Article } = require("../db/sequelize");
const { ValidationError } = require("sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.put("/api/articles/:id", auth, (req, res) => {
    const id = req.params.id;
    Article.update(req.body, {
      where: { id: id },
    })
      .then((_) => {
        return Article.findByPk(id).then((article) => {
          if (article === null) {
            const message = "L'article demandé n'existe pas.";
            return res.status(404).json({ message });
          }
          const message = `L'article ${article.title} a bien été modifié.`;
          res.json({ message, data: article });
        });
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        if (error instanceof UniqueConstraintError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        const message = "L'article n'a pas pu être modifié.";
        res.status(500).json({ message, data: error });
      });
  });
};
