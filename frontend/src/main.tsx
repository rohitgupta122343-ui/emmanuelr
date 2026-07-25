import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Lenis from "lenis";

const lenis = new Lenis({
  autoRaf: true,
  duration: 1.2,
  smoothWheel: true,
});

createRoot(document.getElementById("root")!).render(
  <App />
);