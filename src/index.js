import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'; // Импорт компонента App

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App /> {/* Используем App здесь */}
    </React.StrictMode>
);
