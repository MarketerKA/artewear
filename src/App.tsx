import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home';
import About from './pages/About';
import ProductDetail from './components/ProductDetail/ProductDetail';
import { FavoritesProvider } from './context/FavoritesContext';
import { CartProvider } from './context/CartContext';
import FavoriteIndicator from './components/FavoriteIndicator/FavoriteIndicator';
import CartIndicator from './components/CartIndicator/CartIndicator';
import FavoritesModal from './components/FavoritesModal/FavoritesModal';
import CartModal from './components/CartModal/CartModal';
import './App.css';

function App() {
  const [isFavoritesModalOpen, setIsFavoritesModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  const handleOpenFavoritesModal = () => {
    setIsFavoritesModalOpen(true);
  };

  const handleCloseFavoritesModal = () => {
    setIsFavoritesModalOpen(false);
  };

  const handleOpenCartModal = () => {
    setIsCartModalOpen(true);
  };

  const handleCloseCartModal = () => {
    setIsCartModalOpen(false);
  };

  return (
    <FavoritesProvider>
      <CartProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/product/:id" element={<ProductDetail />} />
          </Routes>
          <FavoriteIndicator onOpenModal={handleOpenFavoritesModal} />
          <CartIndicator onOpenModal={handleOpenCartModal} />
          <FavoritesModal isOpen={isFavoritesModalOpen} onClose={handleCloseFavoritesModal} />
          <CartModal isOpen={isCartModalOpen} onClose={handleCloseCartModal} />
        </Router>
      </CartProvider>
    </FavoritesProvider>
  );
}

export default App;
