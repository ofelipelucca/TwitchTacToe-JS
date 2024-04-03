import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

 import HomePage from './HomePage'
 import ConnectedPage from './ConnectedPage'
 import GamePage from './GamePage'

 const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="connected" element={<ConnectedPage />} />
                <Route path="connected/game" element={<GamePage />} />
            </Routes>
        </Router>
    )
 }

 export default App;