import React from "react";
import "./Card.css";

const Card = ({ rank, suit, hidden }) => {
    const suitsMap = {
        "♠": "♠",
        "♥": "♥",
        "♦": "♦",
        "♣": "♣",
    };

    return (
        <div className={`card ${hidden ? "hidden" : ""}`}>
            {!hidden && (
                <>
                    <div className="corner top">
                        {rank}
                        <span>{suitsMap[suit]}</span>
                    </div>
                    <div className={`suit ${suit}`}>
                        {suitsMap[suit]}
                    </div>
                    <div className="corner bottom">
                        {rank}
                        <span>{suitsMap[suit]}</span>
                    </div>
                </>
            )}
        </div>
    );
};

export default Card;
