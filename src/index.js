import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import { Provider } from "react-redux";
import store from "./15-redux-intro/store.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>
);
