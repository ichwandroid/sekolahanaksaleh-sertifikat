# Aplikasi Download Sertifikat Siswa

Aplikasi web untuk mendownload sertifikat siswa Sekolah Anak Saleh dengan fitur pemilihan kelas dan nama siswa.

## Fitur

✨ **Fitur Utama:**
- Pilih kelas terlebih dahulu
- Dropdown nama siswa otomatis terisi berdasarkan kelas
- Preview sertifikat secara real-time
- Download sertifikat dalam format PDF
- Animasi smooth menggunakan GSAP
- Design modern dengan Tailwind CSS
- Responsive untuk semua device

## Teknologi yang Digunakan

- **HTML5** - Struktur halaman
- **Tailwind CSS** - Styling dan design system
- **GSAP** - Animasi dan transisi
- **jsPDF** - Generate PDF sertifikat
- **Canvas API** - Render sertifikat

## Cara Menggunakan

1. **Buka file `certificate.html`** di browser
2. **Pilih Kelas** dari dropdown pertama
3. **Pilih Nama Siswa** dari dropdown kedua (otomatis terisi setelah memilih kelas)
4. **Lihat Preview** sertifikat yang muncul
5. **Klik tombol Download** untuk mendapatkan PDF sertifikat

## Struktur File

```
public/
├── certificate.html      # Halaman utama aplikasi
├── certificate.js        # Logic aplikasi dan animasi
├── data.js              # Data siswa per kelas
└── template-sertifikat.jpg  # Template sertifikat (opsional)
```

## Kustomisasi

### Menambah/Edit Data Siswa

Edit file `data.js`:

```javascript
const studentsData = {
    "Kelas 1A": [
        { nama: "Nama Siswa", nisn: "1234567890", tahun: "2024" },
        // tambahkan siswa lainnya
    ],
    // tambahkan kelas lainnya
};
```

### Menggunakan Template Sertifikat Sendiri

1. Letakkan file gambar template di folder `public/`
2. Edit `data.js` dan ubah path template:

```javascript
const certificateTemplate = "nama-file-template.jpg";
```

3. Sesuaikan posisi teks di `certificate.js` pada fungsi `drawCertificate()`:

```javascript
// Contoh: ubah posisi nama siswa
ctx.fillText(student.nama, canvas.width / 2, 450); // ubah angka 450
```

### Kustomisasi Warna dan Style

Edit bagian CSS di `certificate.html`:

```css
/* Ubah gradient background */
body {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* Ubah warna tombol download */
.download-btn {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

## Tips Penggunaan Template

Jika Anda sudah memiliki template sertifikat:

1. **Format yang disarankan:**
   - Ukuran: 1200 x 850 pixels (atau rasio A4 landscape)
   - Format: JPG atau PNG
   - Resolusi: minimal 150 DPI

2. **Posisi teks:**
   - Sisakan ruang kosong untuk nama siswa (tengah atas/tengah)
   - Sisakan ruang untuk kelas dan NISN
   - Sisakan ruang untuk tahun di bagian bawah

3. **Sesuaikan koordinat:**
   - Buka `certificate.js`
   - Cari fungsi `drawCertificate()`
   - Sesuaikan nilai X dan Y untuk posisi teks:
     ```javascript
     ctx.fillText(student.nama, X, Y); // X = horizontal, Y = vertical
     ```

## Deployment

### Local Development
Cukup buka `certificate.html` di browser.

### Firebase Hosting
```bash
firebase deploy
```

### Server Lain
Upload semua file di folder `public/` ke web server Anda.

## Browser Support

- ✅ Chrome (Recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Opera

## Troubleshooting

**Q: Template gambar tidak muncul?**
- Pastikan path file template sudah benar di `data.js`
- Cek console browser untuk error
- Pastikan file gambar ada di folder yang sama

**Q: PDF tidak ter-download?**
- Pastikan browser mengizinkan download
- Cek popup blocker browser
- Coba browser lain

**Q: Animasi tidak smooth?**
- Pastikan koneksi internet stabil (untuk load library GSAP)
- Coba refresh halaman
- Clear cache browser

## Lisensi

© 2024 Sekolah Anak Saleh. All rights reserved.

## Kontak

Untuk pertanyaan dan support, hubungi admin sekolah.
