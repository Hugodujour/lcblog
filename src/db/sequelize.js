const { Sequelize, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const ArticleModel = require("../models/article");
const UserModel = require("../models/user");
const articles = require("./mock-articles");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    dialectOptions: {
      useUTC: "Etc/GMT-2",
    },
    logging: false,
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

// Tester la connexion à la base de données
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

testConnection();

module.exports = {
  initDb,
  Article,
  User,
};
