Siap! Ini skrip video lengkap yang disesuaikan persis dengan rubrik penilaian, durasi estimasi **10–12 menit**.

---

# 🎬 SKRIP VIDEO — SITTA (Sistem Informasi Tata Kelola Bahan Ajar UT)

---

## 🎙️ BAGIAN 1 — PEMBUKA (±30 detik)

> *Tampilkan halaman login SITTA di browser*

"Halo! Pada video ini saya akan menjelaskan project **SITTA** — Sistem Informasi Tata Kelola Bahan Ajar Universitas Terbuka, yang saya bangun menggunakan HTML, CSS, dan JavaScript murni tanpa framework tambahan.

Saya akan menjelaskan secara sistematis mulai dari struktur file, desain, logika JavaScript, validasi form, hingga fitur-fitur tambahan yang saya implementasikan."

---

## 🎙️ BAGIAN 2 — STRUKTUR FILE & MODULARITAS (±1 menit)
**(Poin 1.5 — Modularitas, 5 Poin)**

> *Buka VS Code, tampilkan folder structure*

"Pertama, saya jelaskan struktur file project ini.

```
project/
├── index.html        ← Halaman login
├── dashboard.html    ← Dashboard utama
├── stok.html         ← Informasi bahan ajar
├── tracking.html     ← Tracking pengiriman
├── monitoring.html   ← Monitoring progress DO
├── rekap.html        ← Rekap bahan ajar
├── histori.html      ← Histori transaksi
├── css/
│   └── style.css     ← CSS global terpusat
├── js/
│   ├── scripts.js    ← Logic JS utama
│   └── data.js       ← Data dummy terpisah
└── assets/
    └── logo.png
```

Project ini menggunakan pendekatan **modular** — CSS disentralisasi di satu file `style.css` yang dipakai semua halaman, data dipisah ke `data.js`, dan logic utama ada di `scripts.js`. Ini membuat kode lebih mudah dimaintain dan tidak ada duplikasi."

---

## 🎙️ BAGIAN 3 — STRUKTUR HTML SEMANTIK (±1.5 menit)
**(Poin 1.1 — HTML, 15 Poin)**

> *Buka `index.html` di VS Code, highlight bagian-bagian penting*

"Sekarang kita lihat struktur HTML. Saya menggunakan elemen **semantik** seperti `<header>`, `<nav>`, `<main>`, dan `<form>` sesuai fungsinya — bukan sekadar `<div>` semua.

Contohnya di halaman login:"

```html
<body class="login-body">
  <main class="login-container">
    <form id="loginForm">
      <div class="field">
        <label for="email">Email</label>
        <input type="email" id="email" name="email" 
               autocomplete="email" required>
      </div>
      <div class="field">
        <label for="password">Password</label>
        <input type="password" id="password" 
               autocomplete="current-password" required>
      </div>
    </form>
  </main>
</body>
```

"Beberapa hal yang saya perhatikan: atribut `for` di label selalu terhubung dengan `id` input, ada `autocomplete` untuk UX yang baik, dan `required` untuk validasi native HTML. Semua halaman juga memiliki `lang='id'`, `charset='UTF-8'`, dan `viewport` meta tag untuk kompatibilitas."

---

## 🎙️ BAGIAN 4 — DESAIN CSS (±2 menit)
**(Poin 1.2 — CSS, 15 Poin)**

> *Buka `style.css`, lalu tunjukkan hasilnya di browser*

"Untuk desain, saya membangun **design system** yang konsisten menggunakan CSS Custom Properties atau variabel CSS di bagian `:root`:"

```css
:root {
  --primary:    #6C8EBF;
  --primary-dk: #4A6FA5;
  --primary-lt: #EAF0F8;
  --accent:     #F4A261;
  --bg:         #F5F3EE;
  --text:       #2D3142;
  --border:     #DFE3EC;
}
```

"Dengan variabel ini, kalau saya mau ganti warna tema, cukup ubah di satu tempat saja — semua halaman ikut berubah.

Beberapa teknik CSS yang saya terapkan:

**Pertama**, layout login menggunakan **Flexbox** split panel — kiri branding, kanan form.

**Kedua**, animasi blob background menggunakan `@keyframes` untuk efek soft dan friendly:

```css
@keyframes drift {
  0%   { transform: translate(0,0) scale(1); }
  100% { transform: translate(30px,20px) scale(1.06); }
}
```

**Ketiga**, semua komponen punya **hover state** dan **transition** yang smooth — tombol naik sedikit saat dihover, card bergeser, input mendapat glow saat focus.

**Keempat**, ada **responsive design** — di layar kecil panel kiri login hilang, grid menyesuaikan kolom, navbar menyesuaikan padding.

Tema yang saya pilih adalah **Soft & Friendly** dengan warna biru tenang, cocok untuk sistem akademik."

---

## 🎙️ BAGIAN 5 — JAVASCRIPT DOM (±3 menit)
**(Poin 1.3 — JavaScript DOM, 25 Poin)**

> *Demo langsung di browser sambil jelaskan*

"Ini bagian terpenting — JavaScript DOM. Ada beberapa fitur interaktif yang saya bangun.

**Pertama, Sistem Login dengan localStorage.**"

> *Buka `scripts.js`, tunjukkan bagian login*

"Saya menyimpan data user di `localStorage` sehingga bisa persist antar halaman:"

```javascript
function authenticate(email, password) {
  const user = findUser(email);
  return user && user.password === password ? user : null;
}

// Setelah login berhasil:
setCurrentUser(user);
window.location.href = 'dashboard.html';
```

"Setelah login, navbar di semua halaman otomatis menampilkan nama dan inisial user yang sedang login — ini DOM manipulation lintas halaman."

> *Demo: login → lihat navbar berubah nama*

**"Kedua, Live Clock di Dashboard."**

```javascript
function updateClock() {
  const now = new Date();
  document.getElementById('liveClock').textContent =
    now.toLocaleTimeString('id-ID', {hour:'2-digit', minute:'2-digit'});
}
setInterval(updateClock, 1000);
```

> *Tunjukkan jam bergerak di dashboard*

**"Ketiga, Render data dinamis di halaman Bahan Ajar."**

```javascript
function renderStok(data) {
  const list = document.getElementById('stokList');
  list.innerHTML = '';
  data.forEach((item, idx) => {
    const card = document.createElement('div');
    card.className = 'stok-card';
    card.innerHTML = `<h4>${item.nama}</h4>...`;
    list.appendChild(card);
  });
}
```

> *Demo: tambah bahan ajar baru, card langsung muncul*

**"Keempat, Search dan filter live di beberapa halaman."**

> *Demo: ketik di search bar, hasil langsung filter tanpa reload*

**"Kelima, Pagination di Histori Transaksi dengan sort kolom."**

> *Demo: klik header kolom untuk sort, klik nomor halaman*

**"Keenam, Tracking dengan timeline visual."**

> *Demo: ketik nomor DO, muncul timeline dengan status done/active/pending*"

---

## 🎙️ BAGIAN 6 — VALIDASI FORM & ALERT (±1.5 menit)
**(Poin 1.4 — Validasi, 15 Poin)**

> *Demo langsung validasi*

"Untuk validasi, saya menerapkan **dua lapis** — HTML5 native dan JavaScript custom.

**Layer 1 — HTML5 native:** atribut `required`, `type='email'`, `min` pada input angka. Browser otomatis mencegah submit jika tidak valid.

**Layer 2 — JavaScript custom** dengan feedback visual:"

```javascript
document.getElementById('btnSimpan').addEventListener('click', () => {
  const stok = parseInt(document.getElementById('inputStok').value);
  
  if (!kode || !nama || !edisi || isNaN(stok) || stok < 0) {
    showAlert('Semua field harus diisi dengan benar!', 'danger');
    return;
  }
  // lanjut simpan...
});

function showAlert(msg, type = 'success') {
  const area = document.getElementById('alertArea');
  area.innerHTML = `<div class="alert alert-${type}">
    ${type === 'success' ? '✅' : '❌'} ${msg}
  </div>`;
  setTimeout(() => area.innerHTML = '', 3000); // auto hilang 3 detik
}
```

> *Demo: coba submit form kosong → muncul alert merah. Isi dengan benar → alert hijau sukses*

"Alert muncul di atas halaman dan **otomatis hilang** setelah 3 detik. Ada 3 tipe: success hijau, danger merah, dan info biru. Validasi juga ada di modal pendaftaran dan form reset password."

---

## 🎙️ BAGIAN 7 — KREATIVITAS TAMBAHAN (±1.5 menit)
**(Poin 1.6 — Kreativitas, 10 Poin)**

> *Klik-klik fitur sambil jelaskan*

"Beberapa fitur kreatif tambahan yang saya implementasikan:

**Satu** — **Animated background blobs** di halaman login menggunakan CSS animation murni, memberikan kesan modern dan soft.

**Dua** — **Toggle show/hide password** dengan emoji yang berubah 👁 / 🙈 saat diklik.

**Tiga** — **Progress bar visual** di monitoring DO yang berubah warna sesuai status — hijau untuk selesai, biru untuk dalam pengiriman, oranye untuk diproses.

**Empat** — **Timeline interaktif** di tracking dengan tiga state berbeda: titik hijau ✓ untuk selesai, titik biru berkedip untuk proses aktif, dan titik abu transparan untuk pending.

**Lima** — **Greeting dinamis** yang berubah berdasarkan jam — Selamat Pagi, Siang, Sore, atau Malam.

**Enam** — **Sort kolom tabel** di histori transaksi — klik header untuk urutkan ascending atau descending.

**Tujuh** — **Avatar user** dengan inisial otomatis dari nama, dan klik untuk logout dengan konfirmasi.

**Delapan** — **Sistem registrasi** — user bisa daftar akun baru dan langsung bisa dipakai untuk login, data disimpan di localStorage."

---

## 🎙️ BAGIAN 8 — PENUTUP (±30 detik)

> *Tampilkan demo singkat semua halaman berurutan*

"Jadi secara keseluruhan, project SITTA ini memiliki **7 halaman** yang terkoneksi, **design system CSS terpusat**, **JavaScript DOM manipulation** yang cukup kompleks mulai dari CRUD data, filtering, pagination, tracking, hingga autentikasi sederhana berbasis localStorage.

Semua dibangun dengan **HTML, CSS, dan JavaScript murni** tanpa library eksternal apapun.

Terima kasih!"

---

## 📋 TIPS REKAMAN

| Tips | Detail |
|------|--------|
| **Urutan demo** | Login → Dashboard → Stok (tambah data) → Tracking → Monitoring → Rekap → Histori |
| **Screen size** | Pakai zoom browser 90% supaya semua konten kelihatan |
| **Highlight kode** | Pakai VS Code dengan tema terang agar mudah dibaca di video |
| **Transisi** | Bilang *"sekarang kita lihat..."* sebelum pindah halaman agar tidak tiba-tiba |
| **Durasi target** | ~10–12 menit, masih di bawah batas 15 menit |