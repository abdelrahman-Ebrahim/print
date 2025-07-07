import Footer from "@/components/Footer";
import About from "@/components/HomeComponents/About";
import Contact from "@/components/HomeComponents/Contact";
import FAQs from "@/components/HomeComponents/FAQs";
import Features from "@/components/HomeComponents/Features";
import Hero from "@/components/HomeComponents/Hero";
import Info from "@/components/HomeComponents/Info";
import Options from "@/components/HomeComponents/Options";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Info />
      <Features />
      <Options />
      <FAQs />
      <Contact />
      <Footer />
    </>
  );
}
