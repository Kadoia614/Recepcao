import { useState, useEffect, useContext, useMemo } from 'react';
import { PrimeReactContext } from 'primereact/api';
import { ThemeContext } from './ThemeContext';

const DARK  = 'lara-dark-indigo';
const LIGHT = 'lara-light-indigo';

export default function ThemeProvider({ children }) {
  const PrimeReact = useContext(PrimeReactContext);

  /** tema inicial */
  const getInitial = () =>
    localStorage.getItem('theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  const [mode, setMode] = useState(getInitial); // 'dark' | 'light'

  /** alterna claro / escuro */
  const toggleTheme = () => setMode(prev => (prev === 'dark' ? 'light' : 'dark'));

  /** troca o CSS do PrimeReact sempre que mudar */
  useEffect(() => {
    localStorage.setItem('theme', mode);
  }, [mode, PrimeReact]);

  /** valor exposto no contexto */
  const value = useMemo(() => ({ theme: mode, toggleTheme }), [mode]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
