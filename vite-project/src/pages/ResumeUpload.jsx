import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ResumeUpload() {

  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleUpload = async () => {

    if (!file) {
      alert("Please upload a resume first.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {

      const response = await fetch("http://localhost:5000/api/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      localStorage.setItem("analysisData", JSON.stringify(data));

      navigate("/analysis");

    } catch (err) {

      console.error(err);
      alert("Error uploading resume!");

    }

  };

  return (
    <div
      className="
        min-h-screen flex flex-col items-center justify-center
        bg-sageBlue dark:bg-gradient-to-b dark:from-[#0b1220] dark:to-[#060b16]
        text-ashBerry dark:text-white
        px-6 pt-20
      "
    >

      <div
        className="
          backdrop-blur-xl
          bg-white/90 dark:bg-white/10
          border border-gray-200 dark:border-white/10
          rounded-3xl p-10
          shadow-2xl
          w-full max-w-xl
          text-center
        "
      >

        {/* Title */}
        <h1 className="text-3xl font-bold mb-6">
          Upload Your Resume
        </h1>


        {/* Upload Area */}
        <label
          htmlFor="resumeInput"
          className="
            cursor-pointer
            border border-dashed border-sageBlue dark:border-white/30
            rounded-2xl p-10 w-full
            flex flex-col items-center justify-center
            bg-white/70 dark:bg-white/5
            hover:bg-white/90 dark:hover:bg-white/10
            transition-all
          "
        >

          <span className="text-gray-700 dark:text-gray-300 text-lg">
            Click to upload your resume
          </span>

          {file && (
            <p className="mt-3 text-green-500 dark:text-green-400">
              {file.name}
            </p>
          )}

        </label>


        <input
          id="resumeInput"
          type="file"
          accept=".pdf,.doc,.docx"
          className="hidden"
          onChange={(e) => setFile(e.target.files[0])}
        />


        {/* Analyze Button */}
        <button
          onClick={handleUpload}
          className="
            mt-6 w-full
            bg-ashBerry text-white
            py-3 rounded-xl
            shadow-lg
            hover:bg-[#5f85aa]
            transition
          "
        >
          Analyze Resume
        </button>

      </div>

    </div>
  );
}