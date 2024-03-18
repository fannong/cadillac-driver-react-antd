import "./App.css";
import React, { FC } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "./routes";

const App: FC = () => (
  <Router>
    <Routes>
      {routes.map((item) => (
        <Route path={item.path} element={item.element} />
      ))}
    </Routes>
  </Router>
);

export default App;
