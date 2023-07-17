import { Routes, Route } from "react-router-dom";

import ProductHome from "../components/ProductHome";

export default () => {
  return (
    <Routes>
      <Route path="/" element={<ProductHome />} />
      <Route path="/products" element={<ProductHome />} />
    </Routes>
  );
};
