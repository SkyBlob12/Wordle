import { dictionary } from "./Dictionary.js";

const availableWords = dictionary.map(word => word.toLowerCase());

export class WordleGame {
    constructor(secretWord) {
      // Vérification de la validité du mot secret
      // Le mot doit contenir exactement 5 lettres et appartenir au dictionnaire des mots disponibles
      if (!/^[a-zA-Z]{5}$/.test(secretWord) && (!availableWords.includes(secretWord.toLowerCase()))) {
        throw new Error("Le mot secret doit contenir exactement 5 lettres et appartenir au dictionnaire des mots disponibles");
      }
      this.secretWord = secretWord.toLowerCase();
      this.attempts = 6;
      this.history = [];
    }
  
    // Fonction pour valider le mot proposé par l'utilisateur
    // Le mot doit contenir exactement 5 lettres
    validateGuess(guess) {
      return /^[a-zA-Z]{5}$/.test(guess);
    }
  
    // Fonction pour vérifier le mot proposé par l'utilisateur
    // Elle compare le mot proposé avec le mot secret et renvoie un tableau de feedback
    checkGuess(guess) {
      if (!this.validateGuess(guess)) {
        throw new Error("Le mot doit contenir exactement 5 lettres");
      }
      guess = guess.toLowerCase();
      let feedback = Array(5).fill("gray");
      let secretArray = this.secretWord.split("");
      let guessArray = guess.split("");
  
      // Vérification des lettres bien placées (vert)
      // On compare chaque lettre du mot proposé avec le mot secret
      for (let i = 0; i < 5; i++) {
        if (guessArray[i] === secretArray[i]) {
          feedback[i] = "green";
          secretArray[i] = null;
          guessArray[i] = null;
        }
      }
  
      // Vérification des lettres mal placées (jaune)
      // On compare les lettres restantes du mot proposé avec celles du mot secret
      for (let i = 0; i < 5; i++) {
        if (guessArray[i] && secretArray.includes(guessArray[i])) {
          feedback[i] = "yellow";
          secretArray[secretArray.indexOf(guessArray[i])] = null;
        }
      }
  
      // Enregistrement de l'historique des tentatives
      // On stocke le mot proposé et le feedback associé
      this.history.push({ guess, feedback });
      this.attempts--;
  
      return feedback;
    }
  
    // Fonction pour vérifier si le jeu est terminé (victoire ou défaite)
    isGameOver() {
      return this.attempts <= 0 || this.history.some(entry => entry.feedback.every(f => f === "green"));
    }
  }
  