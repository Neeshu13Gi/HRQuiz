import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const themes = {
  dark:  'theme-dark',
  light: 'theme-light',
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('hrquiz-theme');
    // migrate old 'blue' users to 'light'
    return (saved === 'dark' || saved === 'light') ? saved : 'light';
  });

  useEffect(() => {
    const root = document.getElementById('root');
    if (root) {
      Object.values(themes).forEach(cls => root.classList.remove(cls));
      root.classList.add(themes[theme]);
    }
    localStorage.setItem('hrquiz-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
