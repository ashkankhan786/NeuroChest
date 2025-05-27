import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FAQ from "../components/FAQ";
function About() {
  return (
    <div className="flex flex-col">
      <Navbar />
      <section className="py-20 px-6 text-white mt-28 mb-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-4xl font-bold text-green-300 mb-4">
              About NeuroChest
            </h2>
            <p className="text-gray-200 text-lg leading-relaxed">
              NeuroChest is a deep learning–powered tool that classifies chest
              X-rays into 13 thoracic diseases or a No finding label. Our
              mission is to support healthcare professionals with rapid,
              trustworthy AI diagnostics.
            </p>
            <ul className="mt-6 space-y-3 text-green-100 list-disc list-inside">
              <li>Based on DenseNet, ResNet, and VGG ensemble models</li>
              <li>Trained using Chexpert dataset </li>
              <li>Real-time inference with high accuracy</li>
              <li>Privacy-focused – no image data is stored</li>
            </ul>
          </div>

          <div className="flex justify-center">
            <img
              src="/chest-xray.jpg"
              alt="Chest X-ray"
              class="w-full max-w-sm rounded-xl shadow-lg"
            />
          </div>
        </div>
      </section>
      <FAQ />
      <Footer />
    </div>
  );
}

export default About;
