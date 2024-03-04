const { Sequelize, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const ArticleModel = require("../models/article");
const UserModel = require("../models/user");
const articles = require("./mock-articles");
require("dotenv").config();

const sequelize = new Sequelize(
  "blog l&cvins",
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
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
