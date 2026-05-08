import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-sageBlue dark:bg-gray-900">

      {/* HERO IMAGE */}
      <div className="relative h-[50vh] w-full overflow-hidden mt-20">
        <img
          src="/job-hats-hero.png"
          alt="Job Hats Hero"
          className="h-full w-full object-cover"
        />
      </div>

      {/* FEATURE GRID — 10% OVERLAP */}
      <div className="-mt-16 flex justify-center">
        <div
          className="grid grid-cols-2 gap-6
                     bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg
                     rounded-2xl p-8 shadow-xl"
        >
          <FeatureCard
            to="/upload"
            title="Upload Resume"
            desc="Upload your resume for analysis"
          />
          <FeatureCard
            to="/jobs"
            title="Job Availability"
            desc="Find jobs matching your skills"
          />
          <FeatureCard
            to="/courses"
            title="Course Availability"
            desc="Upskill with recommended courses"
          />
          <FeatureCard
            to="/analysis"
            title="Analysis Result"
            desc="View insights & recommendations"
          />
        </div>
      </div>

      {/* SPACING BELOW */}
      <div className="py-20"></div>
    </div>
  );
}

function FeatureCard({ to, title, desc }) {
  return (
    <Link
      to={to}
      className="group w-64 p-5 rounded-xl
                 bg-gradient-to-r from-blue-500 to-sky-400
                 text-white shadow-md
                 hover:scale-105 transition"
    >
      <h3 className="text-lg font-semibold mb-1">
        {title}
      </h3>
      <p className="text-sm text-white/90">
        {desc}
      </p>
    </Link>
  );
}
