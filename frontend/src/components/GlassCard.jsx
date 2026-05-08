export default function GlassCard({ title, children }) {
  return (
    <div className="backdrop-blur-xl bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-2xl p-6 shadow-xl hover:bg-white/20 hover:scale-105 transition-all cursor-pointer">
      <h2 className="text-xl font-semibold mb-3 text-sageBlue dark:text-white">
        {title}
      </h2>
      <p className="text-gray-700 dark:text-gray-300">{children}</p>
    </div>
  );
}
