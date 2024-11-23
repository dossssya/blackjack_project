import React from "react";
import "./Controls.css";

const Controls = ({ onStart, onHit, onStand, gameOver, showStartButton }) => {
    return (
        <div className="controls">
            {showStartButton && <button onClick={onStart}>Start Game</button>}
            {!showStartButton && !gameOver && (
                <>
                    <button onClick={onHit}>Hit</button>
                    <button onClick={onStand}>Stand</button>
                </>
            )}
        </div>
    );
};

export default Controls;
