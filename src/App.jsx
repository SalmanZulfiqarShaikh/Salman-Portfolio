import React from "react"
import { Analytics } from "@vercel/analytics/react"
import { Nav,Hero,About,Projects,Stack,Upto,Footer} from "./sections"

function App() {

  return (
    <>
      <Nav/>
      <Hero/>
      <About/>
      <Projects/>
      <Stack/>
      <Upto/>
      <Footer/>
      
      <Analytics />
    </>
  )
}

export default App
