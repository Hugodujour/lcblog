const { Sequelize, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const ArticleModel = require("../models/article");
const UserModel = require("../models/user");
const articles = require("./mock-articles");
// require("dotenv").config();

const sequelize = new Sequelize(
  process.env.MYSQLDATABASE, // Utilisez la variable d'environnement correspondant au nom de la base de données
  process.env.MYSQLUSER, // Utilisez la variable d'environnement correspondant au nom d'utilisateur
  process.env.MYSQLPASSWORD, // Utilisez la variable d'environnement correspondant au mot de passe
  {
    host: process.env.MYSQLHOST, // Utilisez la variable d'environnement correspondant à l'adresse du serveur MySQL
    port: process.env.MYSQLPORT, // Utilisez la variable d'environnement correspondant au port MySQL
    dialect: "mariadb", // Spécifiez le dialecte comme MySQL
    dialectOptions: {
      timezone: "Etc/GMT-2",
    },
    logging: true,
  }
);

const Article = ArticleModel(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes);

const initDb = () => {
  return sequelize.sync({ force: true }).then((_) => {
    articles.map((article) => {
      Article.create({
        title: article.title,
        body: article.body,
        picture: article.picture,
        categories: article.categories,
      }).then((article) => console.log(article.toJSON()));
    });

    bcrypt
      .hash(process.env.USER_PASSWORD, 10)
      .then((hash) =>
        User.create({ username: process.env.USER_USERNAME, password: hash })
      )
      .then((user) => console.log(user.toJSON()));

    console.log("La base de donnée a bien été initialisée !");
  });
};

module.exports = {
  initDb,
  Article,
  User,
};
