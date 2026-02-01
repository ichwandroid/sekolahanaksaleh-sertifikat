// Initialize GSAP animations
document.addEventListener('DOMContentLoaded', function () {
    initializeAnimations();
    initializeSelectors();
    initializeEventListeners();
});

// GSAP Animations
function initializeAnimations() {
    // Animate header
    gsap.from('#header', {
        duration: 1,
        y: -50,
        opacity: 0,
        ease: 'power3.out'
    });

    // Animate selection card
    gsap.from('#selectionCard', {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power3.out',
        delay: 0.3
    });
}

// Initialize Selectors
function initializeSelectors() {
    const kelasSelect = document.getElementById('kelasSelect');

    // Populate kelas dropdown
    Object.keys(studentsData).forEach(kelas => {
        const option = document.createElement('option');
        option.value = kelas;
        option.textContent = kelas;
        kelasSelect.appendChild(option);
    });
}

// Event Listeners
function initializeEventListeners() {
    const kelasSelect = document.getElementById('kelasSelect');
    const siswaSelect = document.getElementById('siswaSelect');
    const downloadBtn = document.getElementById('downloadBtn');

    // Kelas selection change
    kelasSelect.addEventListener('change', function () {
        const selectedKelas = this.value;

        // Reset siswa select
        siswaSelect.innerHTML = '<option value="">-- Pilih Siswa --</option>';
        siswaSelect.disabled = true;

        // Hide certificate section
        hideCertificateSection();

        if (selectedKelas) {
            // Populate siswa dropdown
            const students = studentsData[selectedKelas];
            students.forEach((siswa, index) => {
                const option = document.createElement('option');
                option.value = index;
                option.textContent = siswa.nama;
                siswaSelect.appendChild(option);
            });

            siswaSelect.disabled = false;

            // Update info text
            document.getElementById('infoText').textContent = 'Sekarang pilih nama siswa';

            // Animate siswa select
            gsap.from('#siswaSelect', {
                duration: 0.5,
                scale: 0.95,
                opacity: 0.5,
                ease: 'back.out(1.7)'
            });
        } else {
            document.getElementById('infoText').textContent = 'Silakan pilih kelas terlebih dahulu';
        }
    });

    // Siswa selection change
    siswaSelect.addEventListener('change', function () {
        const selectedKelas = kelasSelect.value;
        const selectedIndex = this.value;

        if (selectedKelas && selectedIndex !== '') {
            const student = studentsData[selectedKelas][selectedIndex];
            showCertificate(student, selectedKelas);
        } else {
            hideCertificateSection();
        }
    });

    // Download button click
    downloadBtn.addEventListener('click', function () {
        const selectedKelas = kelasSelect.value;
        const selectedIndex = siswaSelect.value;

        if (selectedKelas && selectedIndex !== '') {
            const student = studentsData[selectedKelas][selectedIndex];
            downloadCertificatePDF(student, selectedKelas);
        }
    });
}

// Show Certificate
function showCertificate(student, kelas) {
    const certificateSection = document.getElementById('certificateSection');
    const studentName = document.getElementById('studentName');
    const studentClass = document.getElementById('studentClass');

    // Update student info
    studentName.textContent = student.nama;
    studentClass.textContent = kelas + ' • NISN: ' + student.nisn;

    // Show certificate section
    certificateSection.classList.remove('hidden');

    // Animate certificate section
    gsap.from('#studentInfoCard', {
        duration: 0.8,
        y: 50,
        opacity: 0,
        ease: 'power3.out'
    });

    gsap.from('#certificatePreview', {
        duration: 1,
        scale: 0.9,
        opacity: 0,
        ease: 'back.out(1.2)',
        delay: 0.2
    });

    gsap.from('#downloadBtn', {
        duration: 0.8,
        y: 30,
        opacity: 0,
        ease: 'power3.out',
        delay: 0.4
    });

    // Scroll to certificate
    setTimeout(() => {
        certificateSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300);

    // Draw certificate on canvas
    drawCertificate(student, kelas);
}

// Hide Certificate Section
function hideCertificateSection() {
    const certificateSection = document.getElementById('certificateSection');
    certificateSection.classList.add('hidden');
}

// Draw Certificate on Canvas
function drawCertificate(student, kelas) {
    const canvas = document.getElementById('certificateCanvas');
    const ctx = canvas.getContext('2d');

    // Set canvas size (A4 landscape ratio)
    canvas.width = 1200;
    canvas.height = 850;

    // Load template image
    const templateImg = new Image();
    templateImg.crossOrigin = "anonymous";

    templateImg.onload = function () {
        // Draw template
        ctx.drawImage(templateImg, 0, 0, canvas.width, canvas.height);

        // Add student name
        ctx.font = 'bold 60px "Playfair Display", serif';
        ctx.fillStyle = '#2c3e50';
        ctx.textAlign = 'center';
        ctx.fillText(student.nama, canvas.width / 2, 450);

        // Add class
        ctx.font = '30px "Inter", sans-serif';
        ctx.fillStyle = '#555';
        ctx.fillText(kelas, canvas.width / 2, 520);

        // Add NISN
        ctx.font = '24px "Inter", sans-serif';
        ctx.fillStyle = '#777';
        ctx.fillText('NISN: ' + student.nisn, canvas.width / 2, 560);

        // Add year
        ctx.font = '28px "Inter", sans-serif';
        ctx.fillStyle = '#555';
        ctx.fillText('Tahun ' + student.tahun, canvas.width / 2, 720);
    };

    templateImg.onerror = function () {
        // If template image fails to load, draw a default certificate
        drawDefaultCertificate(ctx, canvas, student, kelas);
    };

    // Try to load template (sesuaikan dengan path template Anda)
    templateImg.src = certificateTemplate;
}

// Draw Default Certificate (if template not found)
function drawDefaultCertificate(ctx, canvas, student, kelas) {
    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#667eea');
    gradient.addColorStop(1, '#764ba2');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // White inner rectangle
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(50, 50, canvas.width - 100, canvas.height - 100);

    // Border
    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = 10;
    ctx.strokeRect(70, 70, canvas.width - 140, canvas.height - 140);

    // Inner border
    ctx.strokeStyle = '#764ba2';
    ctx.lineWidth = 3;
    ctx.strokeRect(90, 90, canvas.width - 180, canvas.height - 180);

    // Title
    ctx.font = 'bold 50px "Playfair Display", serif';
    ctx.fillStyle = '#667eea';
    ctx.textAlign = 'center';
    ctx.fillText('SERTIFIKAT', canvas.width / 2, 200);

    // Subtitle
    ctx.font = '32px "Inter", sans-serif';
    ctx.fillStyle = '#555';
    ctx.fillText('Sekolah Anak Saleh', canvas.width / 2, 260);

    // Divider line
    ctx.strokeStyle = '#764ba2';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(300, 290);
    ctx.lineTo(900, 290);
    ctx.stroke();

    // Certificate text
    ctx.font = '28px "Inter", sans-serif';
    ctx.fillStyle = '#333';
    ctx.fillText('Diberikan kepada:', canvas.width / 2, 360);

    // Student name
    ctx.font = 'bold 60px "Playfair Display", serif';
    ctx.fillStyle = '#2c3e50';
    ctx.fillText(student.nama, canvas.width / 2, 450);

    // Underline for name
    ctx.strokeStyle = '#764ba2';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(250, 470);
    ctx.lineTo(950, 470);
    ctx.stroke();

    // Class
    ctx.font = '30px "Inter", sans-serif';
    ctx.fillStyle = '#555';
    ctx.fillText(kelas, canvas.width / 2, 520);

    // NISN
    ctx.font = '24px "Inter", sans-serif';
    ctx.fillStyle = '#777';
    ctx.fillText('NISN: ' + student.nisn, canvas.width / 2, 560);

    // Achievement text
    ctx.font = '26px "Inter", sans-serif';
    ctx.fillStyle = '#333';
    ctx.fillText('Atas prestasi dan dedikasi dalam pembelajaran', canvas.width / 2, 630);

    // Year
    ctx.font = 'bold 28px "Inter", sans-serif';
    ctx.fillStyle = '#667eea';
    ctx.fillText('Tahun ' + student.tahun, canvas.width / 2, 720);

    // Signature section
    ctx.font = '20px "Inter", sans-serif';
    ctx.fillStyle = '#555';
    ctx.textAlign = 'left';
    ctx.fillText('Kepala Sekolah', 200, 780);
    ctx.textAlign = 'right';
    ctx.fillText('Wali Kelas', canvas.width - 200, 780);
}

// Download Certificate as PDF
function downloadCertificatePDF(student, kelas) {
    const loadingOverlay = document.getElementById('loadingOverlay');
    loadingOverlay.classList.remove('hidden');

    // Animate loading overlay
    gsap.from('#loadingOverlay', {
        duration: 0.3,
        opacity: 0
    });

    setTimeout(() => {
        const canvas = document.getElementById('certificateCanvas');
        const { jsPDF } = window.jspdf;

        // Create PDF in landscape A4
        const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: 'a4'
        });

        // Convert canvas to image
        const imgData = canvas.toDataURL('image/jpeg', 1.0);

        // Add image to PDF (A4 landscape: 297mm x 210mm)
        pdf.addImage(imgData, 'JPEG', 0, 0, 297, 210);

        // Generate filename
        const filename = `Sertifikat_${student.nama.replace(/\s+/g, '_')}_${kelas.replace(/\s+/g, '_')}.pdf`;

        // Save PDF
        pdf.save(filename);

        // Hide loading overlay
        setTimeout(() => {
            gsap.to('#loadingOverlay', {
                duration: 0.3,
                opacity: 0,
                onComplete: () => {
                    loadingOverlay.classList.add('hidden');
                }
            });
        }, 500);

    }, 1000);
}
