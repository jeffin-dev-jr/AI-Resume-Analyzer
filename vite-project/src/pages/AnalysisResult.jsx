import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AnalysisResult() {

  const navigate = useNavigate();

  const saved = localStorage.getItem("analysisData");
  const data = saved ? JSON.parse(saved) : null;

  useEffect(() => {

    if (!data) {
      alert("Please upload the resume to analyse it.");
      navigate("/upload");
    }

  }, [data, navigate]);

  return (
    <div
      className="
        min-h-screen
        bg-sageBlue dark:bg-gradient-to-b dark:from-[#0b1220] dark:to-[#060b16]
        text-ashBerry dark:text-white
      "
    >

      <div className="max-w-7xl mx-auto px-6 pt-28 pb-16">

        {/* Page Title */}
        <h1 className="text-3xl font-bold text-center mb-12">
          Resume Analysis Report 📄✨
        </h1>


        {/* Extracted Skills */}
        <div className="
          backdrop-blur-xl
          bg-white/90 dark:bg-white/10
          border border-gray-200 dark:border-white/10
          rounded-2xl p-6 shadow-lg mb-10
        ">

          <h2 className="text-xl font-semibold mb-4">
            Extracted Skills
          </h2>

          <div className="flex flex-wrap gap-2">
            {data.extractedSkills?.map((skill, index) => (
              <span
                key={index}
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

        </div>


        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Recommended Jobs */}
          <div className="
            backdrop-blur-xl
            bg-white/90 dark:bg-white/10
            border border-gray-200 dark:border-white/10
            rounded-2xl p-6 shadow-lg
          ">

            <h2 className="text-xl font-semibold mb-4">
              Recommended Jobs 💼
            </h2>

            {data.recommendedJobs?.map((job, index) => (
              <p key={index} className="text-gray-700 dark:text-gray-200 mb-2">
                • {job.title} ({job.company})
              </p>
            ))}

          </div>


          {/* Skill Gaps */}
          <div className="
            backdrop-blur-xl
            bg-white/90 dark:bg-white/10
            border border-gray-200 dark:border-white/10
            rounded-2xl p-6 shadow-lg
          ">

            <h2 className="text-xl font-semibold mb-4 text-red-400">
              Skill Gaps ⚠️
            </h2>

            {data.missingSkills?.map((skill, index) => (
              <p key={index} className="text-gray-700 dark:text-gray-200 mb-2">
                • {skill}
              </p>
            ))}

          </div>

        </div>


        {/* Recommended Courses */}
        <div className="
          backdrop-blur-xl
          bg-white/90 dark:bg-white/10
          border border-gray-200 dark:border-white/10
          rounded-2xl p-6 shadow-lg mt-10
        ">

          <h2 className="text-xl font-semibold mb-4 text-yellow-400">
            Recommended Courses 🎓
          </h2>

          <div className="flex flex-wrap gap-2">
            {data.recommendedCourses?.map((course, index) => (
              <span
                key={index}
                className="
                  px-4 py-2 text-sm rounded-xl
                  bg-white/20 dark:bg-white/10
                "
              >
                {course.title}
              </span>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
}