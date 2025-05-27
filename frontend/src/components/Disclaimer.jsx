import React from "react";

function Disclaimer() {
  return (
    <section className="bg-black/90 text-gray-300 text-sm px-6 py-4 mt-10 border-t border-green-800">
      <div className="max-w-4xl mx-auto">
        <p className="leading-relaxed">
          <span className="font-semibold text-green-300">Disclaimer:</span>{" "}
          NeuroChest is an AI-assisted tool intended for educational and
          research purposes only. It is not a substitute for professional
          medical diagnosis or advice. Always consult a qualified healthcare
          provider regarding medical concerns.
        </p>
      </div>
    </section>
  );
}

export default Disclaimer;
