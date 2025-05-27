import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is NeuroChest?",
    answer:
      "NeuroChest is an ensemble deep learning model combining VGG16, VGG19, ResNet50, and DenseNet121 to diagnose chest X-ray images. It classifies input images into one of 13 disease categories or 'No Finding'.",
  },
  {
    question: "What dataset is NeuroChest trained on?",
    answer:
      "NeuroChest is trained on the CheXpert dataset — a large dataset of labeled chest radiographs used for medical image diagnosis research.",
  },
  {
    question: "Which diseases can NeuroChest detect?",
    answer:
      "NeuroChest can identify 13 chest-related conditions including Atelectasis, Cardiomegaly, Consolidation, Edema, Effusion, Emphysema, Fibrosis, Hernia, Infiltration, Mass, Nodule, Pleural Thickening, and Pneumonia.",
  },
  {
    question: "Is my image data stored?",
    answer:
      "No. NeuroChest is privacy-focused — no image data is stored or sent to third parties.",
  },
  {
    question: "Can this be used in hospitals or clinics?",
    answer:
      "NeuroChest is currently intended for research and educational use. Deployment in clinical settings requires regulatory approval and integration with hospital systems.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className=" px-6 py-20 text-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-green-300 text-center mb-12">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-900 border border-gray-700 rounded-xl p-5 shadow-lg"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center w-full text-left"
              >
                <span className="text-lg font-semibold text-green-100">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="text-green-300 w-5 h-5" />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    key="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden mt-3 text-gray-300 text-base leading-relaxed"
                  >
                    <p>{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
