import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from './HomePage'
import ConnectedPage from './ConnectedPage'
import GamePage from './GamePage'
import ResultPage from "./ResultPage";

const App = () => {
return (
    <Router>
        <Routes>
            <Route path="/TwitchTacToe-JS" element={<HomePage />} />
            <Route path="connected" element={<ConnectedPage />} />
            <Route path="connected/game" element={<GamePage />} />
            <Route path="results" element={<ResultPage />} />
        </Routes>
    </Router>
)
}

export default App;