import React, { useState } from "react";
import "./styles/App.css";
import Hand from "./components/Hand";
import Controls from "./components/Controls";
import { createDeck, shuffleDeck } from "./utils/deck";
import { calculateScore } from "./utils/score";

const App = () => {
    const [deck, setDeck] = useState([]);
    const [playerHand, setPlayerHand] = useState([]);
    const [dealerHand, setDealerHand] = useState([]);
    const [playerScore, setPlayerScore] = useState(0);
    const [dealerScore, setDealerScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [message, setMessage] = useState("");
    const [showStartButton, setShowStartButton] = useState(true); // Управляет отображением кнопки

    const startGame = () => {
        const newDeck = shuffleDeck(createDeck());
        const playerStartHand = [newDeck.pop(), newDeck.pop()];
        const dealerStartHand = [newDeck.pop(), newDeck.pop()];

        setDeck(newDeck);
        setPlayerHand(playerStartHand);
        setDealerHand(dealerStartHand);
        setPlayerScore(calculateScore(playerStartHand));
        setDealerScore(calculateScore(dealerStartHand));
        setGameOver(false);
        setMessage("");
        setShowStartButton(false); // Скрыть кнопку Start Game после начала игры

        // Автоматическая проверка на "Blackjack"
        if (calculateScore(playerStartHand) === 21 || calculateScore(dealerStartHand) === 21) {
            endGame();
        }
    };

    const hit = () => {
        if (gameOver) return;

        const newDeck = [...deck];
        const newCard = newDeck.pop();
        const newPlayerHand = [...playerHand, newCard];

        setDeck(newDeck);
        setPlayerHand(newPlayerHand);
        setPlayerScore(calculateScore(newPlayerHand));

        if (calculateScore(newPlayerHand) === 21) {
            stand(); // Автоматически завершить ход
        } else if (calculateScore(newPlayerHand) > 21) {
            setMessage("You busted! Dealer wins.");
            endGame();
        }
    };

    const stand = () => {
        if (gameOver) return;

        let newDealerHand = [...dealerHand];
        let newDeck = [...deck];

        while (calculateScore(newDealerHand) < 17) {
            const newCard = newDeck.pop();
            newDealerHand.push(newCard);
        }

        const dealerFinalScore = calculateScore(newDealerHand);

        setDealerHand(newDealerHand);
        setDealerScore(dealerFinalScore);

        if (dealerFinalScore > 21) {
            setMessage("Dealer busted! You win!");
        } else if (dealerFinalScore === playerScore) {
            setMessage("It's a tie!");
        } else if (dealerFinalScore >= playerScore) {
            setMessage("Dealer wins!");
        } else {
            setMessage("You win!");
        }

        endGame();
    };

    const endGame = () => {
        setGameOver(true);
        setShowStartButton(true); // Отображаем кнопку Start Game после окончания игры
    };

    return (
        <div className="container">
            <h1>Blackjack</h1>
            <div className="scores">
                <div>Player Score: {playerScore}</div>
                <div>Dealer Score: {gameOver ? dealerScore : "?"}</div>
            </div>
            <Hand cards={playerHand} />
            <Hand cards={dealerHand} hidden={!gameOver} />
            <Controls
                onStart={startGame}
                onHit={hit}
                onStand={stand}
                gameOver={gameOver}
                showStartButton={showStartButton}
            />
            {message && <div className="message">{message}</div>}
        </div>
    );
};

export default App;
