import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

//google apis
import { GoogleOAuthProvider } from "@react-oauth/google";

import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId="754777254417-e177q2glmotv28lllmm7chn9p6krevpi.apps.googleusercontent.com">
    <BrowserRouter>
        <div className="App">
          <App />
        </div>
    </BrowserRouter>
  </GoogleOAuthProvider>
);
