import React from "react";
import { Route, Routes } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import IndexPage from "./pages/IndexPage.tsx";
import JsonToolPage from "./pages/JsonToolPage.tsx";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/jsontool" element={<JsonToolPage />} />
      </Routes>
      <Analytics />
    </>
  );
}
