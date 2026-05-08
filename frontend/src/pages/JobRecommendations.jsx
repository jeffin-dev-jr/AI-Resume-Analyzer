import { useEffect, useState } from "react";
import { fetchJobs } from "../services/api";

const JobRecommendations = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs()
      .then((data) => {
        setJobs(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  /* 🔹 Loading State (theme-aware) */
  if (loading) {
    return (
      <div
        className="
          min-h-screen flex items-center justify-center
          bg-sageBlue dark:bg-gray-900
          text-ashBerry dark:text-white
        "
      >
        Loading jobs...
      </div>
    );
  }

  return (
    <div
      className="
        min-h-screen
        bg-sageBlue dark:bg-gradient-to-b dark:from-[#0b1220] dark:to-[#060b16]
        text-ashBerry dark:text-white
      "
    >
      {/* 🔹 Page Container */}
      <div className="max-w-7xl mx-auto px-6 pt-28 pb-16">

        {/* 🔹 Title */}
        <h1 className="text-3xl font-bold text-center mb-12">
          Job Available 💼
        </h1>

        {/* 🔹 Jobs Grid (AUTO WORKING WITH MONGODB DATA) */}
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-8
            justify-items-center
          "
        >
          {jobs.map((job) => (
            <div
              key={job._id}
              className="
                relative w-full max-w-sm rounded-2xl p-6
                bg-white/90 dark:bg-white/10
                backdrop-blur-xl
                border border-gray-200 dark:border-white/10
                shadow-lg
              "
            >
              {/* 🔹 Fit Badge */}
              <div
                className="
                  absolute top-4 right-4 px-3 py-1 text-sm rounded-full
                  bg-sageBlue text-ashBerry
                  dark:bg-white/20 dark:text-white
                "
              >
                {Math.floor(75 + Math.random() * 20)}% Fit
              </div>

              {/* 🔹 Job Title */}
              <h2 className="text-xl font-semibold mb-1">
                {job.title}
              </h2>

              {/* 🔹 Company */}
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                {job.company} {job.location && `• ${job.location}`}
              </p>

              {/* 🔹 Description */}
              <p className="text-sm text-gray-700 dark:text-gray-200 mb-4 line-clamp-3">
                {job.description}
              </p>

              {/* 🔹 Skills */}
              <div className="flex flex-wrap gap-2 mb-6">
                {job.skills?.map((skill, idx) => (
                  <span
                    key={idx}
                    className="
                      px-3 py-1 text-xs rounded-full
                      bg-sageBlue/70 text-ashBerry
                      dark:bg-white/20 dark:text-white
                    "
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* 🔹 Button */}
              <button
                className="
                  w-full py-3 rounded-xl font-medium
                  bg-ashBerry text-white
                  hover:bg-[#5f85aa]
                  transition
                "
              >
                View Job
              </button>
            </div>
          ))}
        </div>

        {/* 🔹 Empty State (Optional but Professional) */}
        {jobs.length === 0 && (
          <p className="text-center text-lg mt-16 opacity-70">
            No job recommendations available right now.
          </p>
        )}

      </div>
    </div>
  );
};

export default JobRecommendations;
