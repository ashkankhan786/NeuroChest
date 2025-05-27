import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router";
import Footer from "../components/Footer";

function Result() {
  const location = useLocation();
  const { prediction, image } = location.state || {};

  useEffect(() => {
    console.log("From result component", prediction);
  }, [prediction]);

  const LABELS = [
    "No Finding",
    "Enlarged Cardiomediastinum",
    "Cardiomegaly",
    "Lung Opacity",
    "Lung Lesion",
    "Edema",
    "Consolidation",
    "Pneumonia",
    "Atelectasis",
    "Pneumothorax",
    "Pleural Effusion",
    "Pleural Other",
    "Fracture",
    "Support Devices",
  ];

  // Thresholds per label (use your actual thresholds here)
  const labelThresholds = {
    "No Finding": 0.21,
    "Enlarged Cardiomediastinum": 0.15,
    Cardiomegaly: 0.33,
    "Lung Opacity": 0.41,
    "Lung Lesion": 0.19,
    Edema: 0.47,
    Consolidation: 0.24,
    Pneumonia: 0.28,
    Atelectasis: 0.27,
    Pneumothorax: 0.24,
    "Pleural Effusion": 0.43,
    "Pleural Other": 0.18,
    Fracture: 0.22,
    "Support Devices": 0.41,
  };

  // Prepare sorted data array based on difference between predicted prob and threshold
  const sortedPredictions = React.useMemo(() => {
    if (!prediction) return [];

    return LABELS.map((label) => {
      const prob = prediction[label] ?? 0;
      const threshold = labelThresholds[label] ?? 0.5;
      const diff = prob - threshold;
      return { label, prob, threshold, diff };
    }).sort((a, b) => b.diff - a.diff);
  }, [prediction]);

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <Navbar />
      <h1 className="text-4xl font-bold text-center text-green-300 mt-28">
        Result
      </h1>

      <div className="flex flex-col md:flex-row justify-center items-start gap-10 md:gap-20 mt-10 px-4 mb-16">
        {/* Image */}
        <div className="w-full max-w-sm">
          <img
            src={image}
            alt="Uploaded X-ray"
            className="w-full rounded-xl shadow-lg"
          />
        </div>

        {/* Predictions Table */}
        <div className="w-full max-w-lg text-white">
          <p className="text-gray-200 text-lg leading-relaxed mb-4 text-center">
            Your X-ray has been analyzed. The results are as follows:
          </p>
          <table className="w-full table-fixed border-collapse border border-green-300 text-left">
            <thead>
              <tr>
                <th className="border border-green-300 px-3 py-2 w-fit">
                  Label
                </th>
                <th className="border border-green-300 px-3 py-2">
                  Difference
                  <br />
                  (Prob - Threshold)
                </th>
                <th className="border border-green-300 px-3 py-2">
                  Predicted Probability
                </th>
                <th className="border border-green-300 px-3 py-2">Threshold</th>
              </tr>
            </thead>
            <tbody>
              {sortedPredictions.map(({ label, prob, threshold, diff }) => (
                <tr
                  key={label}
                  className={diff >= 0 ? "bg-green-900/50" : "bg-red-900/40"}
                >
                  <td className="border border-green-300 px-3 py-2 break-words whitespace-normal">
                    {label}
                  </td>
                  <td className="border border-green-300 px-3 py-2">
                    {diff.toFixed(3)}
                  </td>
                  <td className="border border-green-300 px-3 py-2">
                    {(prob * 100).toFixed(2)}%
                  </td>
                  <td className="border border-green-300 px-3 py-2">
                    {threshold.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Result;
