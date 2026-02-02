// ============================================
// Sertifikat Pramuka SD Anak Saleh
// Main JavaScript File
// ============================================

// DOM Elements
const kelasSelect = document.getElementById('kelas');
const namaSelect = document.getElementById('nama');
const downloadBtn = document.getElementById('downloadBtn');
const btnText = document.getElementById('btnText');
const downloadIcon = document.getElementById('downloadIcon');
const loadingSpinner = document.getElementById('loadingSpinner');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');
const mainCard = document.getElementById('mainCard');
const certificateForm = document.getElementById('certificateForm');

// ============================================
// GSAP Animations
// ============================================

// Initial page load animation
document.addEventListener('DOMContentLoaded', () => {
    // Animate main card entrance
    gsap.to(mainCard, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
    });

    // Animate card elements with stagger
    gsap.from(mainCard.querySelectorAll('h1, p, label, .custom-select-wrapper'), {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        delay: 0.2
    });
});

// ============================================
// Event Listeners
// ============================================

// Handle kelas selection change
kelasSelect.addEventListener('change', function () {
    const selectedKelas = this.value;

    // Clear and reset nama dropdown
    namaSelect.innerHTML = '';

    if (selectedKelas) {
        // Enable nama select
        namaSelect.disabled = false;

        // Filter siswa berdasarkan kelas
        const filteredSiswa = dataSiswa.filter(siswa => siswa.kelas === selectedKelas);

        if (filteredSiswa.length > 0) {
            // Add default option
            const defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.textContent = '-- Pilih Nama Siswa --';
            namaSelect.appendChild(defaultOption);

            // Add filtered students
            filteredSiswa.forEach((siswa) => {
                const option = document.createElement('option');
                option.value = siswa.nama;
                option.textContent = siswa.nama;
                namaSelect.appendChild(option);
            });

            // Animate the nama select wrapper to draw attention
            gsap.from(namaSelect.parentElement, {
                scale: 0.98,
                duration: 0.3,
                ease: 'back.out(1.7)'
            });

        } else {
            const noDataOption = document.createElement('option');
            noDataOption.value = '';
            noDataOption.textContent = '-- Tidak ada data siswa --';
            namaSelect.appendChild(noDataOption);
        }
    } else {
        // Disable nama select
        namaSelect.disabled = true;

        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = '-- Pilih Kelas Terlebih Dahulu --';
        namaSelect.appendChild(defaultOption);
    }

    // Reset download button
    updateDownloadButton();
});

// Handle nama selection change
namaSelect.addEventListener('change', function () {
    updateDownloadButton();

    // Animate button when enabled
    if (this.value) {
        gsap.from(downloadBtn, {
            scale: 0.95,
            duration: 0.3,
            ease: 'back.out(1.7)'
        });
    }
});

// Handle form submission
certificateForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const kelas = kelasSelect.value;
    const nama = namaSelect.value;

    // Find selected student data
    const selectedStudent = dataSiswa.find(siswa => siswa.nama === nama && siswa.kelas === kelas);

    if (kelas && nama) {
        const level = selectedStudent ? selectedStudent.level : '1';
        downloadCertificate(nama, kelas, level);
    }
});

// ============================================
// Helper Functions
// ============================================

// Update download button state
function updateDownloadButton() {
    const kelasSelected = kelasSelect.value !== '';
    const namaSelected = namaSelect.value !== '';

    downloadBtn.disabled = !(kelasSelected && namaSelected);
}

// Download certificate function
async function downloadCertificate(nama, kelas, level) {
    // Show loading state
    setLoadingState(true);

    try {
        // Initialize jsPDF
        const { jsPDF } = window.jspdf;
        // Landscape orientation, millimeters, A4 size
        const doc = new jsPDF('l', 'mm', 'a4');
        const template = new Image();
        template.src = 'assets/template_pramuka.png';

        // Wait for image to load
        await new Promise((resolve, reject) => {
            template.onload = resolve;
            template.onerror = reject;
        });

        // Document dimensions
        const width = doc.internal.pageSize.getWidth();
        const height = doc.internal.pageSize.getHeight();

        // --- Design Certificate ---

        // 1. Background / Border
        doc.addImage(template, 'PNG', 0, 0, width, height);

        // 2. Student Name (Centerpiece)
        doc.setFont("times", "bolditalic");
        doc.setFontSize(45);
        doc.setTextColor(62, 39, 35); // Tanah-900 (Brown)
        doc.text(nama, width / 2, 83, { align: "center" });

        // 3. Class
        doc.setFont("helvetica", "normal");
        doc.setFontSize(18);
        doc.setTextColor(62, 39, 35);
        doc.text(`Gugus Depan SD Anak Saleh Malang Kelas ${kelas}`, width / 2, 100, { align: "center" });

        // 4. Description
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.setTextColor(110, 80, 60);

        // Dynamic description based on level
        let descLine1 = "Atas partisipasinya yang aktif dan penuh semangat dalam kegiatan";
        let descLine2 = "Kepramukaan SD Anak Saleh Malang Tahun Ajaran 2025/2026";
        let descLineTema = "";
        let certificateDate = "Februari 2026";

        if (level === '1') {
            descLine1 = "Atas partisipasinya yang aktif dan penuh semangat dalam kegiatan";
            descLineTema = "Scout Adventure: Playing, Caring, and Working Together";
            descLine2 = "SD Anak Saleh Malang Tahun Ajaran 2025/2026";
            certificateDate = "3 Februari 2026";
        } else if (level === '2') {
            descLine1 = "Atas partisipasinya yang aktif dan penuh semangat dalam kegiatan";
            descLineTema = "Innovative Little Scouts: From Imagination to Achievement";
            descLine2 = "SD Anak Saleh Malang Tahun Ajaran 2025/2026";
            certificateDate = "4 Februari 2026";
        } else if (level === '3') {
            descLine1 = "Atas partisipasinya yang aktif dan penuh semangat dalam kegiatan";
            descLineTema = "Tunas Kelapa Beraksi";
            descLine2 = "Young, Brave, Creative and Fun Camp Adventure";
            certificateDate = "5 Februari 2026";
        } else if (level === '4') {
            descLine1 = "Atas partisipasinya yang aktif dan penuh semangat dalam kegiatan";
            descLineTema = "Little Guardians, Big Commitment";
            descLine2 = "SD Anak Saleh Malang Tahun Ajaran 2025/2026";
            certificateDate = "11-12 Februari 2026";
        } else if (level === '5' || level === '6') {
            descLine1 = "Jejak juang Pramuka berakhlak mulia, siap beramal";
            descLine2 = "untuk kesejahteraan semesta";
            certificateDate = "9-10 Februari 2026";
        }

        doc.text(descLine1, width / 2, 110, { align: "center" });
        doc.text(descLineTema, width / 2, 117, { align: "center" });
        doc.text(descLine2, width / 2, 124, { align: "center" });

        doc.setFont("helvetica", "italic");
        doc.setFontSize(12);
        doc.text("\"Satyaku Kudarmakan, Darmaku Kubaktikan\"", width / 2, 130, { align: "center" });

        // 5. Date
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.setTextColor(27, 56, 11); // Green (#1b380b)
        doc.text(`Malang, ${certificateDate}`, width / 2, 138, { align: "center" });

        // --- Preview PDF ---
        const pdfBlob = doc.output('bloburl');
        window.open(pdfBlob, '_blank');

        // Success feedback
        setLoadingState(false);
        showToast(`Sertifikat ${nama} berhasil dibuat!`, 'success');

        // Celebrate animation
        gsap.to(mainCard, {
            y: -5,
            duration: 0.2,
            yoyo: true,
            repeat: 1,
            ease: 'power2.inOut'
        });

    } catch (error) {
        console.error("Error generating PDF:", error);
        setLoadingState(false);
        showToast("Gagal membuat PDF. Silakan coba lagi.", "error");
    }
}

// Set loading state for download button
function setLoadingState(isLoading) {
    if (isLoading) {
        downloadBtn.disabled = true;
        btnText.textContent = 'Memproses...';
        downloadIcon.classList.add('hidden');
        loadingSpinner.classList.remove('hidden');
    } else {
        downloadBtn.disabled = false;
        btnText.textContent = 'Preview Sertifikat';
        downloadIcon.classList.remove('hidden');
        loadingSpinner.classList.add('hidden');
    }
}

// Show toast notification
function showToast(message, type = 'success') {
    // Set message
    toastMessage.textContent = message;

    // Animate toast in (slide from right)
    gsap.to(toast, {
        x: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'power3.out'
    });

    // Hide toast after 3 seconds
    setTimeout(() => {
        gsap.to(toast, {
            x: '100%',
            opacity: 0,
            duration: 0.5,
            ease: 'power3.in'
        });
    }, 3000);
}
