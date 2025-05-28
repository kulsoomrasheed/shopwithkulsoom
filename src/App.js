import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProductListPage from "./pages/ProductListPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import FavoritesPage from "./pages/FavoritesPage";

function App() {
  return (
    <Router>
      <nav className="bg-blue-700 text-white px-8 py-4 flex items-center justify-between shadow-md sticky top-0 z-50 rounded-b-lg">
        <div className="flex items-center gap-2 text-2xl font-bold tracking-wide">
          <span className="bg-white text-blue-700 px-3 py-1 rounded-lg shadow-sm">ShopWithKulsoom</span>
        </div>
        <div className="flex gap-6 text-lg font-medium">
          <Link to="/" className="hover:text-blue-200 transition-colors duration-200 px-2 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-white">Products</Link>
          <Link to="/favorites" className="hover:text-blue-200 transition-colors duration-200 px-2 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-white">Favorites</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<ProductListPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
