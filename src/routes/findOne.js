const { Article } = require("../db/sequelize");

module.exports = (app) => {
  app.get("/api/articles/:slug", (req, res) => {
    Article.findOne({
      where: {
        slug: req.params.slug,
      },
    })
      .then((article) => {
        if (!article) {
          const message =
            "L'article demandé n'existe pas. Réessayez avec un autre titre.";
          return res.status(404).json({ message });
        }

        const message = "Un article a bien été trouvé.";
        res.json({ message, data: article });
      })
      .catch((error) => {
        const message =
          "L'article n'a pas pu être récupéré. Réessayez dans quelques instants.";
        res.status(500).json({ message, data: error });
      });
  });
};
