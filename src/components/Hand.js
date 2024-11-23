import React from "react";
import Card from "./Card";
import "./Hand.css";

const Hand = ({ cards, hidden }) => {
    return (
        <div className="hand">
            {cards.map((card, index) => (
                <Card
                    key={index}
                    rank={card.rank}
                    suit={card.suit}
                    hidden={hidden && index === 0}
                />
            ))}
        </div>
    );
};

export default Hand;
