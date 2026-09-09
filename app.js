const { useState, useEffect } = React;

function App() {
  try {
    const [qrConfig, setQrConfig] = useState({
      value: 'https://trickle.so',
      type: 'url',
      color: {
        dark: '#000000',
        light: '#ffffff',
      },
      size: 300,
      margin: 4,
      errorLevel: 'H',
      logo: null
    });

    const [qrDataUrl, setQrDataUrl] = useState('');

    const generateQR = async () => {
      try {
        let attempts = 0;
        const maxAttempts = 15; // Increased attempts
        
        const tryGenerate = async () => {
          // Using qrcode-generator global
          const QRCodeFactory = window.qrcode;
          
          if (typeof QRCodeFactory !== 'function') {
            if (attempts < maxAttempts) {
              attempts++;
              // Exponential backoff or steady wait
              setTimeout(tryGenerate, 400);
              return;
            }
            console.error('QR library (qrcode-generator) failed to initialize from CDN');
            return;
          }

          try {
            // qrcode(typeNumber, errorCorrectionLevel)
            // typeNumber 0 = auto
            const typeNumber = 0;
            const errorCorrectionLevel = qrConfig.errorLevel || 'H';
            const qr = QRCodeFactory(typeNumber, errorCorrectionLevel);
            
            qr.addData(qrConfig.value);
            qr.make();

            // Calculate cell size based on desired pixels
            const modules = qr.getModuleCount();
            const cellSize = Math.max(1, Math.floor(qrConfig.size / modules));
            const margin = Math.floor(qrConfig.margin * (qrConfig.size / 300));
            
            // Generate Data URL using the built-in method
            const url = qr.createDataURL(cellSize, margin);
            setQrDataUrl(url);
          } catch (qrErr) {
            console.error('Error during QR generation:', qrErr);
          }
        };

        await tryGenerate();
      } catch (err) {
        console.error('QR Generation Wrapper Error:', err);
      }
    };

    useEffect(() => {
      generateQR();
    }, [qrConfig]);

    return (
      <Layout data-name="app-layout" data-file="app.js">
        <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <QRControls 
              config={qrConfig} 
              setConfig={setQrConfig} 
            />
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <QRDisplay 
                dataUrl={qrDataUrl} 
                config={qrConfig} 
              />
            </div>
          </div>
        </div>
      </Layout>
    );
  } catch (error) {
    console.error('App component error:', error);
    return null;
  }
}

// Important: DO NOT remove this ErrorBoundary component.
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  componentDidCatch(error, errorInfo) { console.error('ErrorBoundary caught an error:', error, errorInfo.componentStack); }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Ada yang salah</h1>
            <p className="text-gray-600 mb-4">Mohon maaf, terjadi kesalahan yang tidak terduga.</p>
            <button onClick={() => window.location.reload()} className="btn btn-primary">Muat Ulang Halaman</button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);