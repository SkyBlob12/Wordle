import { describe, it, expect } from "vitest";
import { WordleGame } from "../src/wordle.js";

describe("WordleGame", () => {
  it("doit initialiser le jeu avec un mot secret", () => {
    const game = new WordleGame("apple");
    expect(game.secretWord).toBe("apple");
  });

  it("doit détecter une victoire si le mot est correctement deviné", () => {
    const game = new WordleGame("apple");
    game.checkGuess("apple");
    expect(game.isGameOver()).toBe(true);
  });

  it("doit renvoyer un feedback correct", () => {
    const game = new WordleGame("apple");
    expect(game.checkGuess("apply")).toEqual(["green", "green", "green", "green", "gray"]);
  });

  it("doit gérer les lettres bien placées (vert)", () => {
    const game = new WordleGame("grape");
    expect(game.checkGuess("grace")).toEqual(["green", "green", "green", "gray", "green"]);
  });

  it("doit gérer les lettres mal placées (jaune)", () => {
    const game = new WordleGame("grape");
    expect(game.checkGuess("pearl")).toEqual(["yellow", "yellow", "green", "yellow", "gray"]);
  });

  it("doit gérer les lettres absentes (gris)", () => {
    const game = new WordleGame("grape");
    expect(game.checkGuess("zzzzz")).toEqual(["gray", "gray", "gray", "gray", "gray"]);
  });

  it("doit décrémenter le nombre d'essais restants après chaque tentative", () => {
    const game = new WordleGame("apple");
    game.checkGuess("apply");
    expect(game.attempts).toBe(5);
  });

  it("doit détecter une défaite après 6 essais incorrects", () => {
    const game = new WordleGame("apple");
    for (let i = 0; i < 6; i++) {
      game.checkGuess("wrong");
    }
    expect(game.isGameOver()).toBe(true);
  });

  it("doit lever une erreur si le mot ne fait pas 5 lettres", () => {
    const game = new WordleGame("apple");
    expect(() => game.checkGuess("abc")).toThrow("Le mot doit contenir exactement 5 lettres");
  });

  it("doit lever une erreur si le mot contient des caractères non alphabétiques", () => {
    const game = new WordleGame("apple");
    expect(() => game.checkGuess("12345")).toThrow("Le mot doit contenir exactement 5 lettres");
  });

  it("doit enregistrer l'historique des tentatives", () => {
    const game = new WordleGame("apple");
    game.checkGuess("apply");
    expect(game.history).toEqual([{ guess: "apply", feedback: ["green", "green", "green", "green", "gray"] }]);
  });
  
  it("doit gérer correctement les lettres répétées", () => {
    const game = new WordleGame("allee"); 
    expect(game.checkGuess("elite")).toEqual(["yellow", "green", "gray", "gray", "green"]);
  });

  it("ne doit pas marquer une lettre comme jaune si elle a déjà été validée en vert", () => {
    const game = new WordleGame("piano");
    expect(game.checkGuess("papas")).toEqual(["green", "yellow", "gray", "gray", "gray"]);
  });
  
});
