import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

export interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string[];
  sizes: string[];
  consist: string;
  color: string;
  selectedSize: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number, selectedSize: string) => void;
  updateQuantity: (id: number, selectedSize: string, quantity: number) => void;
  isInCart: (id: number) => boolean;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

const STORAGE_KEY = 'artewear_cart';

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const savedItems = localStorage.getItem(STORAGE_KEY);
    return savedItems ? JSON.parse(savedItems) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = (item: CartItem) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id && i.selectedSize === item.selectedSize);
      if (existingItem) {
        return prevItems.map(i => 
          i.id === item.id && i.selectedSize === item.selectedSize
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number, selectedSize: string) => {
    setItems(prevItems => prevItems.filter(item => !(item.id === id && item.selectedSize === selectedSize)));
  };

  const updateQuantity = (id: number, selectedSize: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(id, selectedSize);
      return;
    }
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id && item.selectedSize === selectedSize ? { ...item, quantity } : item
      )
    );
  };

  const isInCart = (id: number) => {
    return items.some(item => item.id === id);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, isInCart, getTotalPrice }}>
      {children}
    </CartContext.Provider>
  );
}; 