export class WordleGame {
    constructor(secretWord) {
      if (!/^[a-zA-Z]{5}$/.test(secretWord)) {
        throw new Error("Le mot secret doit contenir exactement 5 lettres");
      }
      this.secretWord = secretWord.toLowerCase();
      this.attempts = 6;
      this.history = [];
    }
  
    validateGuess(guess) {
      return /^[a-zA-Z]{5}$/.test(guess);
    }
  
    checkGuess(guess) {
      if (!this.validateGuess(guess)) {
        throw new Error("Le mot doit contenir exactement 5 lettres");
      }
      guess = guess.toLowerCase();
      let feedback = Array(5).fill("gray");
      let secretArray = this.secretWord.split("");
      let guessArray = guess.split("");
  
      for (let i = 0; i < 5; i++) {
        if (guessArray[i] === secretArray[i]) {
          feedback[i] = "green";
          secretArray[i] = null;
          guessArray[i] = null;
        }
      }
  
      for (let i = 0; i < 5; i++) {
        if (guessArray[i] && secretArray.includes(guessArray[i])) {
          feedback[i] = "yellow";
          secretArray[secretArray.indexOf(guessArray[i])] = null;
        }
      }
  
      this.history.push({ guess, feedback });
      this.attempts--;
  
      return feedback;
    }
  
    isGameOver() {
      return this.attempts <= 0 || this.history.some(entry => entry.feedback.every(f => f === "green"));
    }
    
    getHistory() {
      return this.history;
    }
  }
  