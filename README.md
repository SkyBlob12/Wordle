# Wordle

Wordle est un jeu de mots populaire où les joueurs doivent deviner un mot de cinq lettres en six essais ou moins. Chaque essai fournit des indices sur la proximité des lettres de la solution.

## Règles du jeu

1. Le joueur a six tentatives pour deviner un mot de cinq lettres.
2. Après chaque tentative, les lettres du mot proposé changent de couleur pour indiquer leur proximité avec le mot cible :
    - **Vert** : La lettre est correcte et à la bonne position.
    - **Jaune** : La lettre est correcte mais à la mauvaise position.
    - **Gris** : La lettre n'est pas dans le mot cible.
3. Le jeu continue jusqu'à ce que le joueur devine correctement le mot ou utilise toutes ses tentatives.

## Comment jouer

1. Le premier joueur choisit un mot de cinq lettres parmis ceux proposés.
2. Le second joueur utilise les indices de couleur pour affiner ses prochaines tentatives.
3. Répétez jusqu'à ce que vous trouviez le mot correct ou que vous épuisiez vos six tentatives.

## Exemple

Supposons que le mot cible soit **BISON** et que le joueur propose **PIANO** :

- **I** est correct et à la bonne position (vert).
- **O** et **N** sont correct mais à la mauvaise position (jaune).
- **B** et **S** ne sont pas dans le mot cible (gris).

## Installation

Pour installer et exécuter le jeu Wordle localement, suivez ces étapes :

1. Clonez le dépôt :
    ```bash
    git clone https://github.com/SkyBlob12/Wordle.git
    ```
2. Accédez au répertoire du projet :
    ```bash
    cd src
    ```
3. Installez les dépendances :
    ```bash
    npm install
    ```
4. Démarrez le jeu :
    ```bash
    node index.js
    ```

## Test

Pour lancer les tests unitaires, suivez ces étapes :

1. Accédez au répertoire du projet de test :
    ```bash
    cd test
    ```
2. Démarrez les test :
    ```bash
    npx vitest
    ```