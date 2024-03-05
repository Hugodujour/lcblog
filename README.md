# Projet : API CRUD pour des Articles de Blog en Node.js avec Sequelize et MySQL

## Description
Ce projet consiste en une API CRUD (Create, Read, Update, Delete) développée en Node.js pour gérer des articles de blog. L'API permet d'accéder à une liste d'articles ainsi qu'à des articles spécifiques en utilisant des routes définies. Il utilise Sequelize comme ORM (Object-Relational Mapping) pour interagir avec une base de données MySQL.

## Fonctionnalités principales
- Création, lecture, mise à jour et suppression (CRUD) d'articles de blog.
- Accès aux articles via des endpoints définis, notamment `/api/articles` pour la liste complète des articles et `/api/articles/:id` pour un article spécifique identifié par son ID.

## Technologies utilisées
- **Node.js**: Utilisé comme environnement d'exécution pour le serveur.
- **Express.js**: Framework web pour Node.js utilisé pour créer des endpoints API RESTful.
- **Sequelize**: ORM pour Node.js qui prend en charge plusieurs bases de données relationnelles, utilisé ici avec MySQL.
- **MySQL**: Système de gestion de base de données relationnelle.

## Configuration requise
- Node.js et npm installés localement.
- Une instance de MySQL disponible et configurée.
- Sequelize configuré avec les informations de connexion à la base de données MySQL.

## Installation
1. Cloner ce dépôt Git.
2. Installer les dépendances en exécutant `npm install`.
3. Configurer Sequelize avec les informations de connexion à la base de données MySQL.
4. Lancer le serveur en exécutant `npm start`.
5. L'API sera accessible à l'adresse `http://localhost:3000`.

## Utilisation
Une fois le serveur en cours d'exécution, vous pouvez accéder à l'API à l'aide d'un client HTTP ou d'un navigateur Web.
- Pour obtenir la liste complète des articles : `GET /api/articles`.
- Pour récupérer un article spécifique : `GET /api/articles/:id`.
- Pour créer un nouvel article : `POST /api/articles`.
- Pour mettre à jour un article existant : `PUT /api/articles/:id`.
- Pour supprimer un article : `DELETE /api/articles/:id`.

## Exemple d'objet Article
```json
{
  "id": "1",
  "title": "Titre de l'article",
  "content": "Contenu de l'article..."
}
