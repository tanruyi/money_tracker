/** @format */

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { CurrentUserContextProvider } from "./context/currentUserContext";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
	<React.StrictMode>
		<BrowserRouter>
			<CurrentUserContextProvider>
				<App />
			</CurrentUserContextProvider>
		</BrowserRouter>
	</React.StrictMode>
);
