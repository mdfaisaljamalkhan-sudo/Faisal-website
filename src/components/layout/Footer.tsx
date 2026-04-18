export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white/50 backdrop-blur border-t border-[#E8E5E0] mt-20">
      <div className="max-w-6xl mx-auto px-6 py-12 text-center">
        <p className="text-sm text-[#A09AAB]">© {currentYear} Faisal. Built with React + TypeScript.</p>
      </div>
    </footer>
  )
}
