import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Theme from "./theme";
import AppLayout from "./router/Layout";
import { AppWalletProvider } from "./WalletProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// let password = "tarscode918";
// console.log = () => console.error = () => console.warn = () => {}

// console.log = () => {};
// prompt password
// let _password = prompt("Enter password", password);

// if password is correct
// if (_password === password) {
  root.render(
    // <React.StrictMode>
        <AppWalletProvider>
      <Theme>
          <AppLayout />
      </Theme>
      </AppWalletProvider>
    // </React.StrictMode>
  );
// }
