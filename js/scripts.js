document.addEventListener("DOMContentLoaded", () => {

    // --- 1. Logika Halaman Login ---
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            // Simulasi validasi sederhana
            if (email === "mahasiswa@ut.ac.id" && password === "123456") {
                window.location.href = "dashboard.html";
            } else {
                alert("Email/password yang anda masukkan salah");
            }
        });

        // Logika Modal Box
        const modal = document.getElementById("modalBox");
        const btnLupa = document.getElementById("btnLupa");
        const btnDaftar = document.getElementById("btnDaftar");
        const spanClose = document.getElementsByClassName("close")[0];
        const modalTitle = document.getElementById("modalTitle");
        const modalBody = document.getElementById("modalBody");

        const openModal = (title, body) => {
            modalTitle.innerText = title;
            modalBody.innerText = body;
            modal.style.display = "block";
        };

        btnLupa.addEventListener("click", () => openModal("Lupa Password", "Silakan hubungi administrator UT Daerah Anda."));
        btnDaftar.addEventListener("click", () => openModal("Pendaftaran", "Pendaftaran akun baru sedang ditutup."));
        spanClose.addEventListener("click", () => modal.style.display = "none");
        window.addEventListener("click", (e) => { if (e.target == modal) modal.style.display = "none"; });
    }

    // --- 2. Logika Dashboard (Greeting Time) ---
    const greetingText = document.getElementById("greetingText");
    if (greetingText) {
        const hour = new Date().getHours();
        let ucapan = "Selamat Malam";
        if (hour >= 4 && hour < 11) ucapan = "Selamat Pagi";
        else if (hour >= 11 && hour < 15) ucapan = "Selamat Siang";
        else if (hour >= 15 && hour < 18) ucapan = "Selamat Sore";

        greetingText.innerText = `${ucapan}, Mahasiswa UT!`;
    }

    // --- 3. Logika Tracking Pengiriman ---
    const btnCariDO = document.getElementById("btnCariDO");
    const trackingResult = document.getElementById("trackingResult");
    if (btnCariDO && trackingResult) {
        btnCariDO.addEventListener("click", () => {
            const inputVal = document.getElementById("noDO").value;
            if (inputVal.trim() !== "") {
                trackingResult.classList.remove("hidden");
            } else {
                alert("Masukkan nomor DO terlebih dahulu!");
            }
        });
    }

    // --- 4. Logika Informasi Stok ---
    const stokList = document.getElementById("stokList");
    if (stokList && typeof dataBahanAjar !== 'undefined') {
        const renderStok = (dataArray) => {
            stokList.innerHTML = "";
            dataArray.forEach(item => {
                const card = document.createElement("div");
                card.className = "stok-card";
                card.innerHTML = `
                    <h4>${item.nama}</h4>
                    <p><strong>Kode:</strong> ${item.kode}</p>
                    <p><strong>Jenis:</strong> ${item.jenis}</p>
                    <p><strong>Edisi:</strong> ${item.edisi}</p>
                    <p><strong>Stok:</strong> ${item.stok}</p>
                `;
                stokList.appendChild(card);
            });
        };

        // Render awal dari data dummy
        renderStok(dataBahanAjar);

        // Fitur tambah baris stok (DOM Manipulation)
        const btnTambahStok = document.getElementById("btnTambahStok");
        if (btnTambahStok) {
            btnTambahStok.addEventListener("click", () => {
                const kode = document.getElementById("inputKode").value;
                const nama = document.getElementById("inputNama").value;
                const stok = document.getElementById("inputStok").value;

                if (kode && nama && stok) {
                    dataBahanAjar.push({ kode, nama, jenis: "Baru", edisi: "-", stok: parseInt(stok) });
                    renderStok(dataBahanAjar); // Render ulang DOM
                    document.getElementById("inputKode").value = "";
                    document.getElementById("inputNama").value = "";
                    document.getElementById("inputStok").value = "";
                } else {
                    alert("Lengkapi semua field untuk menambah data!");
                }
            });
        }
    }
});