import React, { useState, useRef } from "react";
import { Stethoscope, Loader2 } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router";

function Hero() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [prediction, setPrediction] = useState({});
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef();

  const navigate = useNavigate();

  const handleUpload = async (imageFile) => {
    setFile(imageFile);
    setPreviewUrl(URL.createObjectURL(imageFile));
    setPrediction("");
    setLoading(true);

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const res = await axios.post("http://127.0.0.1:5000/predict", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const sortedPrediction = Object.fromEntries(
        Object.entries(res.data.prediction).sort(([, a], [, b]) => b - a)
      );
      console.log(sortedPrediction);
      setPrediction(sortedPrediction);
    } catch (err) {
      console.error(err);
      setPrediction("Error processing image.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) handleUpload(selectedFile);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) handleUpload(droppedFile);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (["dragenter", "dragover"].includes(e.type)) setDragActive(true);
    if (e.type === "dragleave") setDragActive(false);
  };

  const openFilePicker = () => inputRef.current.click();

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

  return (
    <div className="flex flex-col items-center justify-center px-6 mt-36 mb-20">
      <header className="text-center mb-10">
        <div className="flex items-center justify-center gap-4">
          <Stethoscope size={45} />
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            NeuroChest
          </h1>
        </div>
        <p className="text-xl mt-2 text-green-300">
          AI-Powered Chest X-ray Diagnosis
        </p>
      </header>

      <section className="max-w-2xl text-center mb-8">
        <p className="text-base sm:text-xl leading-relaxed text-gray-300">
          NeuroChest uses a state-of-the-art deep learning ensemble model to
          classify chest X-ray images into one of 14 thoracic diseases. Trained
          on large-scale medical datasets and fine-tuned with expert insights,
          it delivers fast, accurate, and trustworthy predictions to assist
          radiologists and clinicians in early diagnosis.
        </p>
      </section>

      {/* Drag & Drop Box */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDrag}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onClick={openFilePicker}
        className={`w-full max-w-lg border-2 ${
          dragActive ? "border-green-300 bg-green-900/20" : "border-green-400"
        } border-dashed p-8 text-center rounded-lg transition cursor-pointer`}
      >
        <input
          type="file"
          ref={inputRef}
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        <p className="text-green-200 mb-2 font-medium">
          Drag & drop your chest X-ray here, or click to upload
        </p>
        <p className="text-xs text-gray-400">Only image files are accepted</p>
      </div>

      {/* Preview Image */}
      {previewUrl && (
        <div className="mt-6 max-w-xs w-full">
          <p className="text-green-300 text-sm mb-2">Uploaded Image:</p>
          <img
            src={previewUrl}
            alt="Preview"
            className="w-full rounded shadow-md border border-green-400"
          />
        </div>
      )}

      {/* Spinner */}
      {loading && (
        <div className="flex items-center gap-2 mt-4 text-green-300">
          <Loader2 className="animate-spin" />
          <span>Analyzing image...</span>
        </div>
      )}

      {/* Prediction Result */}
      {prediction && !loading && Object.keys(prediction).length > 0 && (
        <div className="flex flex-col gap-2 mt-4 text-green-300 font-semibold max-w-xs mx-auto">
          <p className="text-xl">Prediction results:</p>
          {(() => {
            const entries = Object.entries(prediction);
            const validLabels = entries
              .filter(
                ([label, prob]) => prob >= (labelThresholds[label] || 0.5)
              )
              .map(([label]) => label)
              .filter((label) => label !== "No Finding");

            if (validLabels.length === 0) {
              return <p className="text-white">No Finding</p>;
            }

            return (
              <div className="text-white space-y-1">
                {validLabels.map((label) => (
                  <p key={label}>{label}</p>
                ))}
              </div>
            );
          })()}
          <p>
            For detailed results :{" "}
            <span
              onClick={() =>
                navigate("/result", {
                  state: { prediction, image: previewUrl },
                })
              }
              className="cursor-pointer hover:text-green-200"
            >
              Click here
            </span>
          </p>
          <p className="text-sm text-gray-400">
            Note: The model's confidence is based on the input image and may
            vary.
          </p>
        </div>
      )}
    </div>
  );
}

export default Hero;
