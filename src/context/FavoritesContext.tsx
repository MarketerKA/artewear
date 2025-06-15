import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

export interface FavoriteItem {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string[];
  sizes: string[];
  consist: string;
  color: string;
}

interface FavoritesContextType {
  items: FavoriteItem[];
  addToFavorites: (item: FavoriteItem) => void;
  removeFromFavorites: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const STORAGE_KEY = 'artewear_favorites';

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<FavoriteItem[]>(() => {
    // Initialize from localStorage if available
    const savedItems = localStorage.getItem(STORAGE_KEY);
    return savedItems ? JSON.parse(savedItems) : [];
  });

  // Save to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addToFavorites = (item: FavoriteItem) => {
    setItems(prevItems => {
      if (!prevItems.some(i => i.id === item.id)) {
        return [...prevItems, item];
      }
      return prevItems;
    });
  };

  const removeFromFavorites = (id: number) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const isFavorite = (id: number) => {
    return items.some(item => item.id === id);
  };

  return (
    <FavoritesContext.Provider value={{ items, addToFavorites, removeFromFavorites, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}; 