import React, { useState, useEffect } from "react";
import { Analytics } from "@vercel/analytics/react"
import { Nav, Hero, About, Projects, Stack, Upto, Footer } from "./sections";
import { ThemeProvider } from "./contexts/theme";
import AIChatbot from './components/AIChatBot';



function App() {

       const [themeMode, setThemeMode] = useState("light");
  return (
    <ThemeProvider>
      <div className="min-h-screen">
        <Nav />
        <Hero />
        <About />
        <Projects />
        <Stack />
        <Upto />
        <AIChatbot/>
        <Footer />
        <Analytics/>
      </div>
    </ThemeProvider>
  );
}

export default App