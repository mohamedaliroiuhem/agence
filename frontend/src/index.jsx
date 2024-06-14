import React from "react";
import { createRoot } from "react-dom/client";
import Admin from "./components/Admin";

const rootElement = document.getElementById("root");

const root = createRoot(rootElement);
root.render(<Admin />);
