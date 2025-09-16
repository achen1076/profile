import React from "react";
import { Route, Routes } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import IndexPage from "./pages/IndexPage.tsx";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<IndexPage />} />
      </Routes>
      <Analytics />
    </>
  );
}
