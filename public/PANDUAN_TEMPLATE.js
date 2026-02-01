/**
 * PANDUAN INTEGRASI TEMPLATE SERTIFIKAT
 * =====================================
 * 
 * Ikuti langkah-langkah berikut untuk menggunakan template sertifikat Anda sendiri:
 */

// LANGKAH 1: PERSIAPAN TEMPLATE
// ==============================
// 1. Letakkan file template sertifikat Anda di folder 'public/'
// 2. Nama file bisa apa saja, misalnya: "template-sertifikat.jpg"
// 3. Format yang didukung: JPG, PNG
// 4. Ukuran yang disarankan: 1200 x 850 pixels (rasio A4 landscape)


// LANGKAH 2: UPDATE PATH TEMPLATE
// ================================
// Buka file 'data.js' dan ubah baris berikut:

const certificateTemplate = "template-sertifikat.jpg"; // <-- Ganti dengan nama file template Anda


// LANGKAH 3: SESUAIKAN POSISI TEKS
// =================================
// Buka file 'certificate.js' dan cari fungsi 'drawCertificate()'
// Sesuaikan koordinat teks sesuai dengan layout template Anda:

/*
CONTOH PENYESUAIAN:

templateImg.onload = function() {
    // Draw template
    ctx.drawImage(templateImg, 0, 0, canvas.width, canvas.height);

    // NAMA SISWA - Sesuaikan posisi Y (vertical)
    ctx.font = 'bold 60px "Playfair Display", serif';
    ctx.fillStyle = '#2c3e50'; // Ubah warna jika perlu
    ctx.textAlign = 'center';
    ctx.fillText(student.nama, canvas.width / 2, 450); // <-- Ubah angka 450

    // KELAS - Sesuaikan posisi Y
    ctx.font = '30px "Inter", sans-serif';
    ctx.fillStyle = '#555'; // Ubah warna jika perlu
    ctx.fillText(kelas, canvas.width / 2, 520); // <-- Ubah angka 520

    // NISN - Sesuaikan posisi Y
    ctx.font = '24px "Inter", sans-serif';
    ctx.fillStyle = '#777'; // Ubah warna jika perlu
    ctx.fillText('NISN: ' + student.nisn, canvas.width / 2, 560); // <-- Ubah angka 560

    // TAHUN - Sesuaikan posisi Y
    ctx.font = '28px "Inter", sans-serif';
    ctx.fillStyle = '#555'; // Ubah warna jika perlu
    ctx.fillText('Tahun ' + student.tahun, canvas.width / 2, 720); // <-- Ubah angka 720
};
*/


// LANGKAH 4: TIPS MENEMUKAN KOORDINAT YANG TEPAT
// ===============================================
/*
Cara mudah menemukan koordinat yang tepat:

1. Buka aplikasi di browser
2. Buka Developer Tools (F12)
3. Pilih tab Console
4. Jalankan kode berikut untuk menampilkan koordinat mouse:

   const canvas = document.getElementById('certificateCanvas');
   canvas.addEventListener('click', function(e) {
       const rect = canvas.getBoundingClientRect();
       const scaleX = canvas.width / rect.width;
       const scaleY = canvas.height / rect.height;
       const x = (e.clientX - rect.left) * scaleX;
       const y = (e.clientY - rect.top) * scaleY;
       console.log('X:', Math.round(x), 'Y:', Math.round(y));
   });

4. Klik pada posisi di canvas dimana Anda ingin menempatkan teks
5. Lihat koordinat X dan Y di console
6. Gunakan koordinat tersebut di kode
*/


// LANGKAH 5: KUSTOMISASI FONT DAN WARNA
// ======================================
/*
Anda bisa mengubah font dan warna teks:

// Ukuran font
ctx.font = 'bold 60px "Playfair Display", serif'; // Ubah 60px

// Warna teks (gunakan hex color atau nama warna)
ctx.fillStyle = '#2c3e50'; // Contoh: '#FF0000' untuk merah

// Alignment (posisi horizontal)
ctx.textAlign = 'center'; // Opsi: 'left', 'center', 'right'

// Font family yang tersedia:
// - "Playfair Display" (untuk judul/nama)
// - "Inter" (untuk teks biasa)
// - "Arial", "Times New Roman", dll (font system)
*/


// LANGKAH 6: MENAMBAHKAN ELEMEN TAMBAHAN
// =======================================
/*
Anda bisa menambahkan elemen lain seperti:

// Garis horizontal
ctx.strokeStyle = '#764ba2';
ctx.lineWidth = 2;
ctx.beginPath();
ctx.moveTo(300, 470); // Titik awal (x, y)
ctx.lineTo(900, 470); // Titik akhir (x, y)
ctx.stroke();

// Kotak/Rectangle
ctx.strokeStyle = '#667eea';
ctx.lineWidth = 3;
ctx.strokeRect(100, 100, 200, 150); // (x, y, width, height)

// Lingkaran
ctx.beginPath();
ctx.arc(600, 400, 50, 0, 2 * Math.PI); // (x, y, radius, startAngle, endAngle)
ctx.stroke();

// Gambar tambahan (logo, stempel, dll)
const logo = new Image();
logo.onload = function() {
    ctx.drawImage(logo, x, y, width, height);
};
logo.src = 'logo.png';
*/


// LANGKAH 7: TESTING
// ==================
/*
1. Simpan semua perubahan
2. Refresh browser (Ctrl + F5)
3. Pilih kelas dan siswa
4. Periksa apakah teks sudah berada di posisi yang tepat
5. Jika belum, sesuaikan lagi koordinatnya
6. Ulangi sampai sempurna
*/


// CONTOH LENGKAP KUSTOMISASI
// ==========================
/*
function drawCertificate(student, kelas) {
    const canvas = document.getElementById('certificateCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = 1200;
    canvas.height = 850;

    const templateImg = new Image();
    templateImg.crossOrigin = "anonymous";

    templateImg.onload = function() {
        // 1. Gambar template
        ctx.drawImage(templateImg, 0, 0, canvas.width, canvas.height);

        // 2. Nama siswa (tengah, besar, bold)
        ctx.font = 'bold 70px "Playfair Display", serif';
        ctx.fillStyle = '#1a1a1a';
        ctx.textAlign = 'center';
        ctx.fillText(student.nama, 600, 400);

        // 3. Garis bawah nama
        ctx.strokeStyle = '#764ba2';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(200, 420);
        ctx.lineTo(1000, 420);
        ctx.stroke();

        // 4. Kelas (di bawah nama)
        ctx.font = '32px "Inter", sans-serif';
        ctx.fillStyle = '#444';
        ctx.fillText(kelas, 600, 470);

        // 5. NISN (lebih kecil)
        ctx.font = '24px "Inter", sans-serif';
        ctx.fillStyle = '#666';
        ctx.fillText('NISN: ' + student.nisn, 600, 510);

        // 6. Tahun (di bagian bawah)
        ctx.font = 'bold 28px "Inter", sans-serif';
        ctx.fillStyle = '#667eea';
        ctx.fillText('Tahun Ajaran ' + student.tahun, 600, 750);

        // 7. Tambahkan logo (opsional)
        // const logo = new Image();
        // logo.onload = function() {
        //     ctx.drawImage(logo, 50, 50, 100, 100);
        // };
        // logo.src = 'logo-sekolah.png';
    };

    templateImg.onerror = function() {
        drawDefaultCertificate(ctx, canvas, student, kelas);
    };

    templateImg.src = certificateTemplate;
}
*/


// TROUBLESHOOTING
// ===============
/*
MASALAH: Template tidak muncul
SOLUSI: 
- Cek nama file sudah benar
- Cek file ada di folder public/
- Cek console browser untuk error
- Pastikan format file JPG atau PNG

MASALAH: Teks tidak terlihat
SOLUSI:
- Ubah warna teks (ctx.fillStyle)
- Cek koordinat Y tidak keluar dari canvas
- Perbesar ukuran font

MASALAH: Teks terpotong
SOLUSI:
- Kurangi ukuran font
- Ubah posisi X dan Y
- Cek lebar canvas

MASALAH: PDF blur/pecah
SOLUSI:
- Gunakan template dengan resolusi lebih tinggi
- Pastikan ukuran canvas cukup besar (min 1200x850)
- Gunakan format JPEG dengan quality 1.0
*/
