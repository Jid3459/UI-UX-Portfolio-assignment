import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./app/App.tsx";
import { ProjectDetailPage } from "./app/pages/ProjectDetailPage.tsx";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/projects/:slug" element={<ProjectDetailPage />} />
      <Route path="*" element={<App />} />
    </Routes>
  </BrowserRouter>
);
