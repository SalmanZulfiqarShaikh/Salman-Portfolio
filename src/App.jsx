import React, { useState, useEffect } from "react";
import { Analytics } from "@vercel/analytics/react"
import { Nav, Hero, About, Projects, Stack, Upto, Footer } from "./sections";
import { ThemeProvider } from "./contexts/theme";

function App() {
  
  const [themeMode, setThemeMode] = useState("light");


  return (
    <>
    <ThemeProvider>
      <Nav />
      <Hero />
      <About />
      <Projects />
      <Stack />
      <Upto />
      <Footer />
      <Analytics />
      </ThemeProvider>
</>
  );
}

export default App;