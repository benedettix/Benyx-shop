import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import App from "./App";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { PersistGate } from "redux-persist/lib/integration/react";
import { GoogleOAuthProvider } from "@react-oauth/google";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <GoogleOAuthProvider clientId="796926581362-mttrfsji7k4ak4si4lsn549h9nafnbg9.apps.googleusercontent.com">
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </GoogleOAuthProvider>
);
