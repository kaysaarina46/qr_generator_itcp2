function QRDisplay({ dataUrl, config }) {
  const downloadQR = (format) => {
    const link = document.createElement('a');
    link.download = `qr-code-${Date.now()}.${format}`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="card flex flex-col items-center" data-name="qr-display" data-file="components/QRDisplay.js">
      <h3 className="text-lg font-semibold mb-6 text-center w-full">Preview QR Code</h3>
      
      <div className="relative p-6 bg-gray-50 rounded-2xl border border-gray-100 mb-8 group">
        {dataUrl ? (
          <img 
            src={dataUrl} 
            alt="QR Code" 
            className="w-full h-auto max-w-[250px] mx-auto shadow-lg rounded-lg bg-white"
          />
        ) : (
          <div className="w-[250px] h-[250px] flex items-center justify-center bg-gray-200 animate-pulse rounded-lg">
            <span className="text-gray-400">Menghasilkan...</span>
          </div>
        )}
      </div>

      <div className="w-full space-y-3">
        <button 
          onClick={() => downloadQR('png')}
          className="btn btn-primary w-full py-3"
        >
          <div className="icon-download"></div>
          Unduh PNG
        </button>
        <div className="grid grid-cols-2 gap-2">
          <button 
            className="btn btn-outline text-xs"
            onClick={() => window.print()}
          >
            <div className="icon-printer"></div>
            Cetak
          </button>
          <button 
            className="btn btn-outline text-xs"
            onClick={() => {
              navigator.clipboard.writeText(config.value);
              alert('Link berhasil disalin!');
            }}
          >
            <div className="icon-copy"></div>
            Salin Link
          </button>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-100 w-full text-center">
        <p className="text-xs text-gray-500 mb-2">Scan dengan kamera smartphone Anda</p>
        <div className="flex justify-center gap-4 grayscale opacity-50">
          <div className="icon-smartphone text-2xl"></div>
          <div className="icon-camera text-2xl"></div>
        </div>
      </div>
    </div>
  );
}