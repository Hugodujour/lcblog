const slugify = require("slugify");

const { Article } = require("../db/sequelize");
const { ValidationError, UniqueConstraintError } = require("sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.put("/api/articles/:id", auth, async (req, res) => {
    const id = req.params.id;
    const updatedArticleData = req.body;

    try {
      let article = await Article.findByPk(id);

      if (!article) {
        return res
          .status(404)
          .json({ message: "L'article demandé n'existe pas." });
      }

      // Mise à jour des propriétés de l'article
      article.set(updatedArticleData);

      // Vérification si le titre a changé
      if (article.changed("title")) {
        // Mise à jour du slug en fonction du nouveau titre
        article.slug = slugify(article.title, { lower: true });
      }

      // Enregistrement de l'article mis à jour dans la base de données
      await article.save();

      const message = `L'article ${article.title} a bien été modifié.`;
      res.json({ message, data: article });
    } catch (error) {
      if (
        error instanceof ValidationError ||
        error instanceof UniqueConstraintError
      ) {
        return res.status(400).json({ message: error.message, data: error });
      }
      const message = "L'article n'a pas pu être modifié.";
      res.status(500).json({ message, data: error });
    }
  });
};
