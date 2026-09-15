function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col" data-name="layout" data-file="components/Layout.js">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center">
              <div className="icon-qr-code text-white text-xl"></div>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
              QRGen Pro
            </h1>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-gray-600 hover:text-red-600 font-medium">Beranda</a>
          </nav>
          <div className="flex items-center gap-3">
            <button className="btn btn-outline text-sm hidden">Masuk</button>
            <button className="btn btn-primary text-sm hidden">Daftar Gratis</button>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-white border-t border-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            2026 QRGen Pro. dibuat oleh Kaysa dengan penuh cinta untuk kemudahan berbagi.
          </p>
        </div>
      </footer>
    </div>
  );
}