import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/Header/Header';
import Home from './pages/Home';
import About from './pages/About';
import Catalog from './pages/Catalog';
import ProductDetail from './components/ProductDetail/ProductDetail';
import { FavoritesProvider } from './context/FavoritesContext';
import { CartProvider } from './context/CartContext';
import FavoriteIndicator from './components/FavoriteIndicator/FavoriteIndicator';
import CartIndicator from './components/CartIndicator/CartIndicator';
import FavoritesModal from './components/FavoritesModal/FavoritesModal';
import CartModal from './components/CartModal/CartModal';
import './App.css';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ 
          duration: 0.5,
          ease: "easeInOut"
        }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

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
          <AnimatedRoutes />
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
