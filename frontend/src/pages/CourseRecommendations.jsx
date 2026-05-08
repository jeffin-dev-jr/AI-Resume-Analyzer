import { useEffect, useState } from "react";
import { fetchCourses } from "../services/api";

export default function CourseRecommendations() {

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses()
      .then((data) => {
        setCourses(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);


  /* Loading State */
  if (loading) {
    return (
      <div className="
        min-h-screen flex items-center justify-center
        bg-sageBlue dark:bg-gray-900
        text-ashBerry dark:text-white
      ">
        Loading courses...
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

      <div className="max-w-7xl mx-auto px-6 pt-28 pb-16">

        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-12">
          Courses Available  🎓
        </h1>


        {/* Courses Grid */}
        <div className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-8
          justify-items-center
        ">

          {courses.map((course) => (

            <div
              key={course._id}
              className="
                relative w-full max-w-sm rounded-2xl p-6
                bg-white/90 dark:bg-white/10
                backdrop-blur-xl
                border border-gray-200 dark:border-white/10
                shadow-lg
              "
            >

              {/* Course Title */}
              <h2 className="text-xl font-semibold mb-1">
                {course.title}
              </h2>


              {/* Platform */}
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                {course.platform}
              </p>


              {/* Duration */}
              <p className="text-sm text-gray-700 dark:text-gray-200 mb-4">
                Duration: {course.duration}
              </p>


              {/* Skills */}
              <div className="flex flex-wrap gap-2 mb-6">
                {course.skillsCovered?.map((skill, idx) => (
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


              {/* Start Button */}
              <a
                href={course.link}
                target="_blank"
                rel="noreferrer"
                className="
                  block w-full text-center py-3 rounded-xl font-medium
                  bg-ashBerry text-white
                  hover:bg-[#5f85aa]
                  transition
                "
              >
                Start Learning
              </a>

            </div>

          ))}

        </div>


        {/* Empty State */}
        {courses.length === 0 && (
          <p className="text-center text-lg mt-16 opacity-70">
            No courses available right now.
          </p>
        )}

      </div>

    </div>
  );
}