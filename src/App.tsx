import React from "react";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

import persistor, { store } from "./store/store";
import Login from "./pages/login/Login";
import Home from "./pages/home";
import NewAccount from "./pages/newAccount";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/newaccount" element={<NewAccount />} />
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
