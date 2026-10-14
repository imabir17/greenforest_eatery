import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import { Signature, Gallery } from "./components/Sections";
import About from "./components/About";
import CoffeeBar from "./components/CoffeeBar";
import Menu from "./components/Menu";
import Reviews from "./components/Reviews";
import { Visit, Footer } from "./components/Visit";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Signature />
        <CoffeeBar />
        <Gallery />
        <Menu />
        <Reviews />
        <Visit />
      </main>
      <Footer />
    </>
  );
}
