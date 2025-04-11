# Application ToDoList

## Description
Ceci est une application simple de gestion de tâches (ToDoList) développée avec **Express.js**. Elle permet aux utilisateurs de gérer efficacement leurs tâches en les ajoutant, les consultant, les modifiant et les supprimant.

## Fonctionnalités
- Ajouter de nouvelles tâches
- Consulter toutes les tâches
- Modifier des tâches existantes
- Supprimer des tâches

## Installation

1. Clonez le dépôt :
    ```bash
    git clone <repository-url>
    ```
2. Accédez au répertoire du projet :
    ```bash
    cd todolist
    ```
3. Installez les dépendances :
    ```bash
    npm install
    ```

## Utilisation

1. Lancez le serveur :
    ```bash
    npm start
    ```
2. Ouvrez votre navigateur et accédez à :
    ```
    http://localhost:3000
    ```

## Points de terminaison de l'API

- **GET /tasks** : Récupérer toutes les tâches
- **POST /tasks** : Ajouter une nouvelle tâche
- **PUT /tasks/:id** : Modifier une tâche par ID
- **DELETE /tasks/:id** : Supprimer une tâche par ID

## Technologies utilisées
- Node.js
- Express.js

## Licence
Ce projet est sous licence MIT.

## Contribution
N'hésitez pas à soumettre des issues ou des pull requests pour des améliorations.

## Auteur
[Mathys]