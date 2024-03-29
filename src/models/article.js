const slugify = require("slugify");

const validCategories = [
  "Portrait Vigneron",
  "Parlons vins",
  "Mets & Vins",
  "Restaurateurs",
  "Conseils & Astuces",
];

module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define(
    "Article",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Ce titre existe déjà",
        },
        validate: {
          notEmpty: { msg: "Le champ 'Titre' ne doit pas être vide." },
          notNull: { msg: "Le titre est une propriété requise." },
        },
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: false,
        validate: {
          notEmpty: { msg: "Le champ 'Contenu' ne doit pas être vide." },
          notNull: { msg: "Le contenu est une propriété requise." },
        },
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: { msg: "Le lien de l'image doit être valide." },
          notNull: { msg: "L'image est une propriété requise." },
        },
      },
      categories: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isCategoryValid(value) {
            if (!value) {
              throw new Error("Un article doit avoir au moins une catégorie.");
            }
            if (value.split(",").length > 2) {
              throw new Error(
                "Un article ne peut pas avoir plus de 2 catégories"
              );
            }
            value.split(",").forEach((type) => {
              if (!validCategories.includes(type)) {
                throw new Error(
                  `La catégorie d'un article doit appartenir à la liste suivante : ${validCategories} `
                );
              }
            });
          },
        },
        get() {
          return this.getDataValue("categories").split(",");
        },
        set(categories) {
          this.setDataValue("categories", categories.join());
        },
      },
    },
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: false,
      hooks: {
        beforeValidate: (article, options) => {
          if (article.title) {
            article.slug = slugify(article.title, { lower: true });
          }
        },
        beforeUpdate: (article, options) => {
          if (article.title && article.changed("title")) {
            article.slug = slugify(article.title, { lower: true });
          }
        },
        beforeSave: (article, options) => {
          if (article.title && !article.changed("title")) {
            article.slug = slugify(article.title, { lower: true });
          }
        },
      },
    }
  );

  return Article;
};
