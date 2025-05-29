import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProductListPage from "./pages/ProductListPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import FavoritesPage from "./pages/FavoritesPage";

const routerConfig = {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
};

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Router {...routerConfig}>
      <nav className="bg-blue-700 text-white shadow-md sticky top-0 z-50 rounded-b-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <span className="bg-white text-blue-700 px-3 py-1 rounded-lg shadow-sm text-xl sm:text-2xl font-bold">
                ShopWithKulsoom
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden sm:flex sm:gap-6">
              <Link 
                to="/" 
                className="text-white hover:text-blue-200 transition-colors duration-200 px-3 py-2 rounded-lg text-lg font-medium focus:outline-none focus:ring-2 focus:ring-white"
              >
                Products
              </Link>
              <Link 
                to="/favorites" 
                className="text-white hover:text-blue-200 transition-colors duration-200 px-3 py-2 rounded-lg text-lg font-medium focus:outline-none focus:ring-2 focus:ring-white"
              >
                Favorites
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="sm:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-blue-200 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={toggleMenu}
                aria-expanded={isMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                {/* Menu Icon */}
                {!isMenuOpen ? (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={`${isMenuOpen ? 'block' : 'hidden'} sm:hidden pb-4`}>
            <div className="flex flex-col gap-2">
              <Link
                to="/"
                className="text-white hover:text-blue-200 hover:bg-blue-600 transition-colors duration-200 px-3 py-2 rounded-lg text-base font-medium focus:outline-none focus:ring-2 focus:ring-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                to="/favorites"
                className="text-white hover:text-blue-200 hover:bg-blue-600 transition-colors duration-200 px-3 py-2 rounded-lg text-base font-medium focus:outline-none focus:ring-2 focus:ring-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Favorites
              </Link>
            </div>
          </div>
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
