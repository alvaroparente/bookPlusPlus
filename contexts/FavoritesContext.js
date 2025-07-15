import React, { createContext, useState, useContext } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = (book) => {
    setFavorites((prev) => {
      // Evita duplicatas
      if (prev.some((item) => item.id === book.id)) return prev;
      return [...prev, book];
    });
  };

  const removeFromFavorites = (bookId) => {
    setFavorites((prev) => prev.filter((item) => item.id !== bookId));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
