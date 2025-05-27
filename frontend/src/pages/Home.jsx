import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import Disclaimer from "../components/Disclaimer";
import FAQ from "../components/FAQ";

function Home() {
  return (
    <div className="w-full h-full flex flex-col relative">
      <Navbar />
      <Hero />
      <FAQ />
      <Disclaimer />
      <Footer />
    </div>
  );
}

export default Home;
