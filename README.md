# QRGen Pro

QRGen Pro adalah aplikasi pembuat kode QR berbasis web yang sederhana, cepat, dan mudah digunakan. Pengguna dapat membuat QR code dari berbagai tipe data seperti URL, teks, WiFi, email, dan VCard.

## Fitur

- Pilih tipe konten QR
- Masukkan data sesuai kebutuhan
- Kustomisasi warna QR dan latar belakang
- Atur ukuran dan tingkat koreksi kesalahan
- Preview langsung
- Unduh PNG, cetak, dan salin tautan

## Teknologi

- React 18
- Tailwind CSS
- qrcode-generator
- HTML + JavaScript vanilla

## Cara Menjalankan Secara Lokal

1. Buka folder proyek.
2. Jalankan server lokal, misalnya:

   ```bash
   python -m http.server 8000
   ```

3. Buka browser ke:

   ```text
   http://localhost:8000
   ```

Atau cukup buka file `index.html` langsung di browser untuk versi cepat.

## Struktur Proyek

- `app.js` — entry aplikasi
- `index.html` — halaman utama
- `components/` — komponen UI
- `utils/` — utilitas QR

## Catatan

Proyek ini dibuat untuk kebutuhan pembuatan QR code yang cepat dan praktis. Anda dapat mengembangkan lebih lanjut sesuai kebutuhan.
