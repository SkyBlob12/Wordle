import readline from "readline";
import colors from "ansi-colors";
import { WordleGame } from "./wordle.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let game;

// Liste de mots disponibles pour le jeu
export const availableWords = [
  "chien", "plage", "fleur", "arbre", "piano", "louve", "merle", "bison", "lire", "vache"
];

// Fonction pour afficher les règles des couleurs
const displayColorRules = () => {
    console.log("🌈 Règles des couleurs :");
    console.log("🟩 Couleur verte : La lettre est correcte et à la bonne position.");
    console.log("🟨 Couleur jaune : La lettre est correcte mais à la mauvaise position.");
    console.log("⬛ Couleur grise : La lettre n'est pas dans le mot.\n");
  };

// Fonction pour demander à l'utilisateur de saisir un mot secret
const askForSecretWord = () => {
    console.log("Voici une liste de mots de 5 lettres parmi lesquels vous pouvez choisir :");
    availableWords.forEach((word, index) => {
      console.log(`${index + 1}. ${word}`);
    });
  
    rl.question("Choisissez un mot secret parmi cette liste (numéro de 1 à 10) : ", (choice) => {
      const selectedWord = availableWords[parseInt(choice) - 1];
  
      if (!selectedWord) {
        console.log("❌ Choix invalide, veuillez choisir un numéro entre 1 et 10.");
        askForSecretWord();  // Repose la question si le choix est invalide
      } else {
        console.clear();
        game = new WordleGame(selectedWord.toLowerCase());
        console.log("✅ Mot secret choisi !\n");
        displayColorRules();  // Affiche les règles des couleurs
        console.log("Joueur 2, devinez le mot en 6 tentatives.");
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