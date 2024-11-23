export const calculateScore = (hand) => {
    let score = 0;
    let aceCount = 0;

    hand.forEach((card) => {
        if (card.rank === "A") {
            aceCount += 1;
            score += 11; // Изначально считаем туз как 11
        } else if (["K", "Q", "J"].includes(card.rank)) {
            score += 10; // Фигурные карты дают 10 очков
        } else {
            score += parseInt(card.rank); // Карты с числами дают свои значения
        }
    });

    // Если сумма очков превышает 21, туз становится равным 1
    while (score > 21 && aceCount > 0) {
        score -= 10;
        aceCount -= 1;
    }

    return score;
};
