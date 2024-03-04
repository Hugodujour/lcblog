const { Article } = require("../db/sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.delete("/api/articles/:id", auth, (req, res) => {
    Article.findByPk(req.params.id)
      .then((article) => {
        if (article === null) {
          const message = "L'article demandé nexiste pas";
          return res.status(404).json({ message });
        }
        const articleDeleted = article;
        return Article.destroy({
          where: { id: article.id },
        }).then((_) => {
          const message = `L'article avec l'identifiant n°${articleDeleted.id} a été supprimé.`;
          res.json({ message, data: articleDeleted });
        });
      })
      .catch((error) => {
        const message =
          "L'article n'a pas pu être supprimé. Réessayez dans quelques instants.";
        res.status(500).json({ message, data: error });
      });
  });
};
