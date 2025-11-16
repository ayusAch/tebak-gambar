# How to Build the Tebak Gambar Game

## Introduction
This document provides a complete, step-by-step explanation of how the Tebak Gambar Game was built. It is intended for clients, presenters, or developers who need to understand the structure, logic, and workflow of the game for presentation or future development.

---

## 1. Project Overview
The Tebak Gambar Game is a browser-based mobile‑friendly quiz game where players menebak gambar dan menjawab berdasarkan clue. Game ini memiliki:
- Sistem level otomatis
- Pagination level (10 per halaman)
- Funfact setiap berhasil menjawab
- Sistem nyawa (3 nyawa)
- Popup interaktif
- Animasi transisi antar layar
- Musik dan SFX
- Win screen dengan efek confetti

Game dibangun menggunakan:
- **HTML** → struktur halaman & tampilan UI
- **CSS** → styling, animasi, layout mobile
- **JavaScript** → logika game, pagination, level unlocking, audio, dan interaksi

---

## 2. Folder Structure
```
project/
│ index.html
│ style.css
│ script.js
│
├── images/
│   ├── quis1.png
│   ├── quis2.png
│   └── ...
│
└── audio/
    ├── bgmMenu.mp3
    ├── sfxAngklung.mp3
    ├── sfxKendang.mp3
    ├── sfxSuling.mp3
    ├── sfxGameOver.mp3
    └── sfxWin.mp3
```

---

## 3. How Levels Work
### 3.1 Dynamic Level System
Semua data level disimpan di dalam array `data[]` pada file **script.js**.

Contoh satu level:
```js
{
  gambar: "images/quis1.png",
  jawaban: "sate padang",
  funfact: "Funfact tentang sate padang...",
  clue: "Khas Sumatera Barat"
}
```

### 3.2 Adding New Levels
Cukup tambahkan objek baru di dalam array data, misalnya:
```js
data.push({
  gambar: "images/quis11.png",
  jawaban: "jawaban baru",
  funfact: "funfact baru",
  clue: "clue tambahan"
});
```

Level select otomatis menyesuaikan jumlah level yang tersedia.

---

## 4. Pagination System
Jika total level lebih dari 10, level otomatis terbagi ke beberapa halaman.

Variabel:
```js
let currentPage = 1;
const perPage = 10;
```

Generator tombol level:
```js
generateLevelButtons();
```

Pagination UI:
- ⏴ Prev Page
- ⏵ Next Page
- Info halaman 1/2/3

---

## 5. Game Flow
### 5.1 Saat game dimulai
1. User klik **Play**
2. Musik mulai
3. Transisi ke halaman `level-select`
4. Level ditampilkan sesuai pagination

### 5.2 Saat level dipilih
1. Game pindah ke layar **game**
2. Gambar soal dimuat
3. Nyawa ditampilkan
4. Pemain menjawab

### 5.3 Jika jawaban benar
1. Popup funfact muncul
2. Level berikutnya dibuka (`maxLevelUnlocked`)
3. Jika level terakhir → Win Screen

### 5.4 Jika jawaban salah
- Nyawa berkurang
- Jika nyawa 1 → popup warning
- Jika nyawa 0 → popup Game Over → kembali ke level select

---

## 6. Audio System
Game memiliki audio:
- Background Music (BGM)
- SFX Benar
- SFX Salah
- SFX Warning
- SFX Game Over
- SFX Winner

Tombol toggle musik:
```js
function toggleMusic() { ... }
```

---

## 7. Screen Transition System
Menggunakan fungsi:
```js
showScreen(fromId, toId)
```
Animasi menggunakan kelas CSS `.active` + `.fade-out`.

---

## 8. Win Screen & Confetti
Setelah semua level selesai:
- Musik berhenti
- SFX Win dimainkan
- Layer Win-Screen ditampilkan
- Confetti jatuh (CSS + JS)

---

## 9. Reset Progress
Client dapat mereset progress kapan saja:
```js
localStorage.removeItem("maxLevelUnlocked");
```
Semua level terkunci kecuali Level 1.

---

## 10. Deployment / Build
Game ini **tidak memerlukan build system**, cukup deploy folder ke:
- Hosting statis (Netlify, Vercel, GitHub Pages)
- Server Apache/Nginx
- Atau disimpan offline dalam folder lokal

Langkah upload:
1. Upload semua file dan folder apa adanya
2. Pastikan path gambar dan audio benar
3. Buka `index.html`
4. Game langsung berjalan

---

