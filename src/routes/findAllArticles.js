const { Article } = require("../db/sequelize");
const { Op } = require("sequelize");

module.exports = (app) => {
  app.get("/api/articles", (req, res) => {
    if (req.query.title) {
      const title = req.query.title;
      const limit = parseInt(req.query.limit) || 5;
      if (title.length < 2) {
        const message =
          "Le terme de recherche doit contenir au minimum 2 caractères";
        return res.status(400).json({ message });
      }
      return Article.findAndCountAll({
        where: {
          title: {
            [Op.like]: `%${title}%`,
          },
        },
        order: ["title"],
        limit: limit,
      }).then(({ count, rows }) => {
        const message = `Il y a ${count} article(s) qui correspondent au terme de recherche ${title}.`;
        return res.json({ message, data: rows });
      });
    } else {
      const limit = parseInt(req.query.limit) || 5;
      Article.findAll({ order: [["created", "DESC"]], limit: limit })
        .then((articles) => {
          const message = "La liste des articles a bien été récupéré.";
          res.json({ message, data: articles });
        })
        .catch((error) => {
          const message = `La liste des articles n'a pas pu être récupéré. 
                         Réessayez dans quelques instants.`;
          res.status(500).json({ message, data: error });
        });
    }
  });
};
