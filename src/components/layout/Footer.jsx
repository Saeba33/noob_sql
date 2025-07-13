export default function Footer() {
  return (
    <footer className="bg-slate-800 border-t border-slate-700 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="flex items-center space-x-2">
            <span className="text-lg">🥋</span>
            <span className="font-semibold text-white">
              NoobSQL
            </span>
          </div>
          <p className="text-sm text-slate-300">
            &copy; 2025 - Apprenez SQL avec le système de ceintures
          </p>
        </div>
      </div>
    </footer>
  );
}
