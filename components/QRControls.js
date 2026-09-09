function QRControls({ config, setConfig }) {
  const types = [
    { id: 'url', label: 'URL / Link', icon: 'icon-link' },
    { id: 'text', label: 'Teks Bebas', icon: 'icon-type' },
    { id: 'wifi', label: 'WiFi', icon: 'icon-wifi' },
    { id: 'email', label: 'Email', icon: 'icon-mail' },
    { id: 'vcard', label: 'VCard', icon: 'icon-user' },
  ];

  const handleInputChange = (e) => {
    setConfig({ ...config, value: e.target.value });
  };

  const handleWifiChange = (field, val) => {
    const wifiData = config.wifi || { ssid: '', password: '', encryption: 'WPA' };
    const newWifi = { ...wifiData, [field]: val };
    setConfig({
      ...config,
      wifi: newWifi,
      value: window.QRUtils.formatWiFi(newWifi.ssid, newWifi.password, newWifi.encryption)
    });
  };

  const handleEmailChange = (field, val) => {
    const emailData = config.emailData || { address: '', subject: '', body: '' };
    const newEmail = { ...emailData, [field]: val };
    setConfig({
      ...config,
      emailData: newEmail,
      value: window.QRUtils.formatEmail(newEmail.address, newEmail.subject, newEmail.body)
    });
  };

  const updateColor = (key, val) => {
    setConfig({
      ...config,
      color: { ...config.color, [key]: val }
    });
  };

  return (
    <div className="space-y-6" data-name="qr-controls" data-file="components/QRControls.js">
      <div className="card">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <div className="icon-settings text-red-500"></div>
          1. Pilih Tipe Konten
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {types.map(type => (
            <button
              key={type.id}
              onClick={() => setConfig({ ...config, type: type.id })}
              className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                config.type === type.id 
                ? 'border-red-500 bg-red-50 text-red-700' 
                : 'border-gray-100 hover:border-red-200'
              }`}
            >
              <div className={`${type.icon} text-2xl`}></div>
              <span className="text-xs font-medium">{type.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <div className="icon-file-text text-blue-500"></div>
          2. Masukkan Data
        </h3>
        <div className="space-y-4">
          {config.type === 'url' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Website URL</label>
              <input 
                type="url" 
                value={config.value}
                onChange={handleInputChange}
                placeholder="https://example.com"
                className="input-field"
              />
            </div>
          )}
          {config.type === 'text' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pesan Teks</label>
              <textarea 
                rows="4"
                value={config.value}
                onChange={handleInputChange}
                placeholder="Tulis pesan Anda di sini..."
                className="input-field resize-none"
              ></textarea>
            </div>
          )}

          {config.type === 'wifi' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Jaringan (SSID)</label>
                <input 
                  type="text"
                  value={config.wifi?.ssid || ''}
                  onChange={(e) => handleWifiChange('ssid', e.target.value)}
                  placeholder="My Home WiFi"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kata Sandi</label>
                <input 
                  type="password"
                  value={config.wifi?.password || ''}
                  onChange={(e) => handleWifiChange('password', e.target.value)}
                  placeholder="********"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Enkripsi</label>
                <select 
                  className="input-field"
                  value={config.wifi?.encryption || 'WPA'}
                  onChange={(e) => handleWifiChange('encryption', e.target.value)}
                >
                  <option value="WPA">WPA/WPA2</option>
                  <option value="WEP">WEP</option>
                  <option value="nopass">Tanpa Kata Sandi</option>
                </select>
              </div>
            </div>
          )}

          {config.type === 'email' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Email</label>
                <input 
                  type="email"
                  value={config.emailData?.address || ''}
                  onChange={(e) => handleEmailChange('address', e.target.value)}
                  placeholder="hello@example.com"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subjek</label>
                <input 
                  type="text"
                  value={config.emailData?.subject || ''}
                  onChange={(e) => handleEmailChange('subject', e.target.value)}
                  placeholder="Pertanyaan terkait..."
                  className="input-field"
                />
              </div>
            </div>
          )}

          {config.type === 'vcard' && (
            <div className="p-8 text-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
              <p className="text-gray-500 italic">Fitur VCARD akan hadir di pembaruan selanjutnya!</p>
            </div>
          )}
        </div>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <div className="icon-palette text-blue-500"></div>
          3. Kustomisasi Desain
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Warna QR</label>
            <div className="flex items-center gap-3">
              <input 
                type="color" 
                value={config.color.dark}
                onChange={(e) => updateColor('dark', e.target.value)}
                className="w-12 h-12 rounded cursor-pointer border-none"
              />
              <input 
                type="text" 
                value={config.color.dark}
                onChange={(e) => updateColor('dark', e.target.value)}
                className="input-field text-sm uppercase"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Warna Latar</label>
            <div className="flex items-center gap-3">
              <input 
                type="color" 
                value={config.color.light}
                onChange={(e) => updateColor('light', e.target.value)}
                className="w-12 h-12 rounded cursor-pointer border-none"
              />
              <input 
                type="text" 
                value={config.color.light}
                onChange={(e) => updateColor('light', e.target.value)}
                className="input-field text-sm uppercase"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Ukuran (px)</label>
            <select 
              value={config.size}
              onChange={(e) => setConfig({...config, size: parseInt(e.target.value)})}
              className="input-field"
            >
              <option value="200">200 x 200 (Kecil)</option>
              <option value="300">300 x 300 (Standar)</option>
              <option value="500">500 x 500 (Besar)</option>
              <option value="1000">1000 x 1000 (HD)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Presisi (Error Correction)</label>
            <select 
              value={config.errorLevel}
              onChange={(e) => setConfig({...config, errorLevel: e.target.value})}
              className="input-field"
            >
              <option value="L">Level L (7%)</option>
              <option value="M">Level M (15%)</option>
              <option value="Q">Level Q (25%)</option>
              <option value="H">Level H (30% - Rekomendasi)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}