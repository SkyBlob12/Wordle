import readline from "readline";
import colors from "ansi-colors";
import { WordleGame } from "./wordle.js";
import { dictionary } from "./Dictionary.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Liste des mots disponibles dans le dictionnaire
const availableWords = dictionary.map(word => word.toLowerCase());

let game;

// Fonction pour afficher les règles des couleurs
const displayColorRules = () => {
    console.log("🌈 Règles des couleurs :");
    console.log("🟩 Couleur verte : La lettre est correcte et à la bonne position.");
    console.log("🟨 Couleur jaune : La lettre est correcte mais à la mauvaise position.");
    console.log("⬛ Couleur grise : La lettre n'est pas dans le mot.\n");
  };

// Fonction pour demander à l'utilisateur de saisir un mot secret
const askForSecretWord = () => {
  rl.question("🔤 Choisissez un mot secret : ", (inputWord) => {
    const word = inputWord.toLowerCase();

    // Vérifie si le mot est valide (présent dans le dictionnaire)
    if (availableWords.includes(word)) {
      console.clear();
      game = new WordleGame(word);
      console.log("✅ Mot secret choisi !\n");
      displayColorRules();
      console.log("Joueur 2, devinez le mot en 6 tentatives.");
      askGuess();
    } else {
      console.log("❌ Mot invalide, veuillez entrer un mot de 5 lettres qui se trouve dans le dictionnaire.");
      askForSecretWord();
    }
  });
};

// Fonction pour afficher les résultats de la tentative avec couleurs
const displayColoredGuess = (guess, feedback) => {
  let coloredOutput = "";
  for (let i = 0; i < 5; i++) {
    if (feedback[i] === "green") {
      coloredOutput += colors.green(guess[i]);
    } else if (feedback[i] === "yellow") {
      coloredOutput += colors.yellow(guess[i]);
    } else {
      coloredOutput += colors.gray(guess[i]);
    }
  }
  console.log("📝 Résultat :", coloredOutput);
  console.log("");
};

// Fonction pour afficher les tentatives restantes
const displayRemainingAttempts = () => {
  console.log(`⏳ Tentatives restantes : ${game.attempts}`);
};

// Fonction pour afficher le message de victoire
const displayWinMessage = () => {
    console.log(`🎉 Félicitations ! Vous avez trouvé le mot "${game.secretWord}" en ${6 - game.attempts} tentatives !`);
  };

// Fonction pour afficher le message de défaite
const displayLossMessage = () => {
    console.log(`😔 Vous avez épuisé toutes vos tentatives. Le mot secret était "${game.secretWord}".`);
  };

// Fonction pour gérer les tentatives de l'utilisateur
const askGuess = () => {
    if (game.isGameOver()) {
        if (game.history.some(entry => entry.feedback.every(f => f === "green"))) {
          displayWinMessage();
        } else {
          displayLossMessage();
        }

        // Affichage de l'historique des tentatives
        console.log("\n📜 Historique des tentatives :");
        game.history.forEach((entry, index) => {
          let coloredOutput = "";
          for (let i = 0; i < 5; i++) {
            if (entry.feedback[i] === "green") {
              coloredOutput += colors.green(entry.guess[i]);
            } else if (entry.feedback[i] === "yellow") {
              coloredOutput += colors.yellow(entry.guess[i]);
            } else {
              coloredOutput += colors.gray(entry.guess[i]);
            }
          }
          console.log(`${index + 1}. ${coloredOutput}`);
        });
        rl.close();
        return;
      }

displayRemainingAttempts();  // Affiche les tentatives restantes avant chaque essai

  // Demande à l'utilisateur de saisir un mot de 5 lettres
  rl.question("🔤 Entrez un mot de 5 lettres : ", (guess) => {
    guess = guess.toLowerCase();
    try {
      const feedback = game.checkGuess(guess);
      displayColoredGuess(guess, feedback);
      askGuess();
    } catch (error) {
      console.log(error.message);
      askGuess();
    }
  });
};

// Lancement du jeu
askForSecretWord();