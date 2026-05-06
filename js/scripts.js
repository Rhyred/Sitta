document.addEventListener("DOMContentLoaded", () => {

    // --- 1. Logika Halaman Login / User Store (localStorage) ---
    const USERS_KEY = 'sitta_users_v1';
    const CURRENT_KEY = 'sitta_current_v1';

    function loadUsers() {
        try { return JSON.parse(localStorage.getItem(USERS_KEY) || '[]'); } catch (e) { return []; }
    }
    function saveUsers(u) { try { localStorage.setItem(USERS_KEY, JSON.stringify(u)); } catch (e) { } }
    function ensureDefaultUser() {
        const u = loadUsers();
        if (!u || u.length === 0) {
            const def = [{ name: 'Mahasiswa UT', email: 'mahasiswa@ut.ac.id', password: '123456', nim: '00000000', role: 'Mahasiswa Aktif' }];
            saveUsers(def);
            return def;
        }
        return u;
    }
    function findUser(email) { return loadUsers().find(x => x.email === email); }
    function authenticate(email, password) { const u = findUser(email); return u && u.password === password ? u : null; }
    function setCurrentUser(u) { try { localStorage.setItem(CURRENT_KEY, JSON.stringify(u)); } catch (e) { } }
    function getCurrentUser() { try { return JSON.parse(localStorage.getItem(CURRENT_KEY) || 'null'); } catch (e) { return null; } }
    function logout() { localStorage.removeItem(CURRENT_KEY); window.location.href = 'index.html'; }

    // Initialize default user if none
    ensureDefaultUser();

    // Update navbar user display on any page
    const current = getCurrentUser();
    if (current) {
        document.querySelectorAll('.nav-user-name').forEach(el => el.textContent = current.name || current.email);
        document.querySelectorAll('.nav-user-role').forEach(el => el.textContent = current.role || 'Mahasiswa');
        const initials = (current.name || current.email || 'MU').split(' ').map(s => s[0]).join('').slice(0, 2).toUpperCase();
        document.querySelectorAll('.nav-avatar').forEach(av => { av.textContent = initials; av.style.cursor = 'pointer'; av.title = 'Klik untuk keluar'; av.addEventListener('click', () => { if (confirm('Keluar dari akun?')) logout(); }); });
    }

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const btn = loginForm.querySelector('.btn-primary');

            if (!email || !password) { alert('Isi email dan password terlebih dahulu'); return; }

            const user = authenticate(email, password);
            if (user) {
                setCurrentUser(user);
                if (btn) { btn.textContent = 'Memproses...'; btn.disabled = true; }
                setTimeout(() => { window.location.href = 'dashboard.html'; }, 600);
            } else {
                alert('Email/password yang anda masukkan salah');
            }
        });

        // Daftar submit: ambil fields dari index.html modal (id ditambahkan)
        const btnDaftarSubmit = document.getElementById('btnDaftarSubmit');
        if (btnDaftarSubmit) {
            btnDaftarSubmit.addEventListener('click', () => {
                const name = (document.getElementById('registerName') || {}).value || '';
                const email = (document.getElementById('registerEmail') || {}).value || '';
                const nim = (document.getElementById('registerNIM') || {}).value || '';

                if (!name || !email || !nim) { alert('Lengkapi semua field pendaftaran'); return; }

                const users = loadUsers();
                if (users.find(u => u.email === email)) { alert('Email sudah terdaftar, silakan login'); return; }

                const password = prompt('Buat password untuk akun Anda (min 4 karakter):');
                if (!password || password.length < 4) { alert('Password tidak valid'); return; }

                users.push({ name, email, password, nim, role: 'Mahasiswa Aktif' });
                saveUsers(users);

                // show success state if modal exists
                const successEl = document.getElementById('successDaftar');
                if (successEl) { document.getElementById('btnDaftarSubmit').style.display = 'none'; successEl.style.display = 'block'; }
            });
        }
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