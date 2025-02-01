import React, { useEffect, useState } from "react";
import {
  FaGlobe,
  FaChevronDown,
  FaImage,
  FaDownload,
  FaExchangeAlt,
} from "react-icons/fa";
import axios from "axios";

const Tmain = () => {
  const [options, setOptions] = useState([]);
  const [from, setFrom] = useState("en");
  const [to, setTo] = useState("hi"); // Default 'To' language set to Hindi
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  async function listL() {
    try {
      const response = await axios.get("https://libretranslate.com/languages");
      setOptions(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    listL();
  }, []);

  async function translate() {
    try {
      const res = await axios.get(
        `https://api.mymemory.translated.net/get?q=${input}&langpair=${from}|${to}`
      );

      const translatedText =
        res.data.matches?.[0]?.translation || "Translation not available";

      setOutput(translatedText);
    } catch (error) {
      console.log("Translation failed:", error);
      setOutput("Error translating text.");
    }
  }

  return (
    <div className="page min-h-screen w-full flex justify-center items-center bg-gradient-to-r from-[#1e3a8a] to-[#64748b] text-white p-4">
      <div className="main-div w-full max-w-4xl bg-[#f8fafc] shadow-2xl rounded-2xl p-6 flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#1e293b] drop-shadow-md">
            Translator App
          </h1>
          <p className="text-base sm:text-lg text-gray-600 mt-2">
            Enter text or upload an image to translate
          </p>
        </div>

        {/* Language Selection & Input Sections */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* From Language Section */}
          <div className="lan1 w-full sm:w-[45%] p-4 flex flex-col items-center">
            <div className="above-div flex justify-between items-center w-full">
              <div className="text-[#1e293b] text-lg font-semibold">
                From ({from})
              </div>
              <div className="flex w-[75%] justify-between items-center rounded-lg bg-[#6366f1] px-4 py-2 shadow-md text-white">
                <FaGlobe size={18} />
                <select
                  className="w-full bg-transparent text-white font-semibold px-2 appearance-none cursor-pointer"
                  onChange={(e) => setFrom(e.target.value)}
                >
                  {options.map((opt) => (
                    <option key={opt.code} value={opt.code}>
                      {opt.name}
                    </option>
                  ))}
                </select>
                <FaChevronDown />
              </div>
            </div>

            {/* Input Textarea */}
            <textarea
              className="w-full h-32 sm:h-48 bg-[#e2e8f0] text-[#1e293b] mt-4 p-4 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-[#6366f1] resize-none"
              placeholder="Enter text..."
              onInput={(e) => setInput(e.target.value)}
            />

            {/* Upload Image Button */}
            <button className="bg-[#4f46e5] text-white px-5 py-2 sm:px-6 sm:py-3 rounded-lg shadow-md hover:bg-[#4338ca] mt-4 flex items-center gap-2 w-full justify-center">
              <FaImage size={20} />
              Upload Image
            </button>
          </div>

          {/* Circular Translate Button */}
          <div
            onClick={translate}
            className="translate-btn sm:absolute sm:top-1/2 sm:left-1/2 sm:transform sm:-translate-x-1/2 sm:-translate-y-1/2 bg-[#4f46e5] text-white rounded-full w-12 h-12 sm:w-16 sm:h-16 flex justify-center items-center shadow-lg cursor-pointer hover:bg-[#4338ca]"
          >
            <FaExchangeAlt size={20} sm:size={24} />
          </div>

          {/* To Language Section */}
          <div className="lan2 w-full sm:w-[45%] p-4 flex flex-col items-center">
            <div className="above-div flex justify-between items-center w-full">
              <div className="text-[#1e293b] text-lg font-semibold">
                To ({to})
              </div>
              <div className="flex w-[75%] justify-between items-center rounded-lg bg-[#38bdf8] px-4 py-2 shadow-md text-white">
                <FaGlobe size={18} />
                <select
                  className="w-full bg-transparent text-white font-semibold px-2 appearance-none cursor-pointer"
                  onChange={(e) => setTo(e.target.value)}
                  value={to} // Ensure Hindi is selected by default
                >
                  {options.map((opt) => (
                    <option key={opt.code} value={opt.code}>
                      {opt.name}
                    </option>
                  ))}
                </select>
                <FaChevronDown />
              </div>
            </div>

            {/* Output Textarea */}
            <textarea
              className="w-full h-32 sm:h-48 bg-[#e2e8f0] text-[#1e293b] mt-4 p-4 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-[#6366f1] resize-none"
              placeholder="Translated text appears here"
              value={output}
              readOnly
            />

            {/* Download Image Button */}
            <button className="bg-[#0284c7] text-white px-5 py-2 sm:px-6 sm:py-3 rounded-lg shadow-md hover:bg-[#0369a1] mt-4 flex items-center gap-2 w-full justify-center">
              <FaDownload size={20} />
              Download Image
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tmain;
