import React from "react";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

import persistor, { store } from "./store/store";
import Event from "./pages/events";
import Login from "./pages/login/Login";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Event />} />
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
