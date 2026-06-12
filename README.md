# Portofolio Hafidz Muhammad Rakha Shidqi

## Struktur File
```
Portofolio2/
├── index.html                        <- File utama
├── css/
│   └── style.css                     <- Semua styling
├── js/
│   └── main.js                       <- Semua interaksi & animasi
└── assets/
    ├── img/
    │   └── profile.jpg               <- Foto profil (taruh di sini)
    └── certificates/
        ├── mysql.jpg                 <- Foto sertifikat MySQL
        ├── python.jpg                <- Foto sertifikat Python
        └── (tambah sertifikat lain)
```

## Cara Pakai

### 1. Tambah Foto Profil
- Simpan foto ke `assets/img/profile.jpg`
- Buka `index.html`, cari komentar `FOTO PROFIL`
- Hapus `<div class="avatar-initial">HMR</div>`
- Aktifkan tag `<img src="assets/img/profile.jpg" ...>`

### 2. Tambah Foto Sertifikat
- Simpan foto sertifikat ke `assets/certificates/namafile.jpg`
- Buka `index.html`, cari komentar `SERTIFIKAT MYSQL` atau `SERTIFIKAT PYTHON`
- Hapus `<div class="cert-ph">...</div>`
- Aktifkan tag `<img src="assets/certificates/...">` yang ada di atasnya

### 3. Tambah Sertifikat Baru
- Di `index.html`, cari komentar `TAMBAH SERTIFIKAT`
- Copy-paste satu blok `<article class="cert-card">` dan isi datanya

### 4. Ubah Data Pribadi
- Semua teks bisa langsung diedit di `index.html`
- Cari komentar `Ganti` untuk bagian yang perlu diupdate

### 5. Ubah Warna Tema
- Buka `css/style.css`
- Edit variabel di bagian `:root { }` di atas file
- `--gold` = warna aksen utama
- `--bg` = warna background

## Kontak yang Sudah Diisi
- Email: hafidzrakha17@gmail.com
- Instagram: @hafidzrakha157
- GitHub: perlu diisi sendiri