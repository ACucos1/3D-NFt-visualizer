import React from "react";
import ReactDOM from "react-dom/client";
import { AlchemyProvider } from "./providers/alchemy-provider/AlchemyProvider";
import App from "./App.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AlchemyProvider>
      <App />
    </AlchemyProvider>
  </React.StrictMode>
);
