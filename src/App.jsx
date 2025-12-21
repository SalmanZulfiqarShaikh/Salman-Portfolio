import React, { useState, useEffect } from "react";
import { ThemeProvider } from "./contexts/theme"; 
import { Analytics } from "@vercel/analytics/react"
import { Nav, Hero, About, Projects, Stack, Upto, Footer } from "./sections";

function App() {
  
  const [themeMode, setThemeMode] = useState("dark");

  const lightTheme = () => setThemeMode("light");
  const darkTheme = () => setThemeMode("dark");

  useEffect(() => {
    const html = document.querySelector('html');
    html.classList.remove("light", "dark");
    html.classList.add(themeMode);
  }, [themeMode]);

  return (
    
    <ThemeProvider value={{ themeMode, lightTheme, darkTheme }}>
      <Nav />
      <Hero />
      <About />
      <Projects />
      <Stack />
      <Upto />
      <Footer />
      <Analytics />
    </ThemeProvider>
  );
}

export default App;