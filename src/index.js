import readline from "readline";
import colors from "ansi-colors";
import { WordleGame } from "./wordle.js"; // Import de la logique de jeu

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

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
  rl.question("Joueur 1, entrez un mot secret de 5 lettres : ", (secretWord) => {
    if (!/^[a-zA-Z]{5}$/.test(secretWord)) {
      console.log("❌ Le mot doit contenir exactement 5 lettres alphabétiques !");
      askForSecretWord();  // Repose la question si le mot est invalide
    } else {
      console.clear();
      game = new WordleGame(secretWord.toLowerCase());
      console.log("✅ Mot secret choisi ! Joueur 2, devinez le mot en 6 tentatives.\n");
      displayColorRules();
      askGuess();
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

const displayWinMessage = () => {
    console.log(`🎉 Félicitations ! Vous avez trouvé le mot "${game.secretWord}" en ${6 - game.attempts} tentatives !`);
  };
  
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
        rl.close();
        return;
      }

displayRemainingAttempts();  // Affiche les tentatives restantes avant chaque essai

  rl.question("Entrez un mot de 5 lettres : ", (guess) => {
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