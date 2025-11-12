// Data gambar dan jawaban
const data = [
  { gambar: "images/quis1.png", jawaban: "" },
  { gambar: "images/quis2.png", jawaban: "" },
  { gambar: "images/quis3.png", jawaban: "" },
  { gambar: "images/quis4.png", jawaban: "" },
  { gambar: "images/quis5.png", jawaban: "" },
  { gambar: "images/quis6.png", jawaban: "" },
  { gambar: "images/quis7.png", jawaban: "" },
  { gambar: "images/quis8.png", jawaban: "" },
  { gambar: "images/quis9.png", jawaban: "" },
  { gambar: "images/quis10.png", jawaban: "" }
];

let index = 0;
const bgmMenu = document.getElementById("bgmMenu");
let musicOn = true;

// Fungsi toggle musik
function toggleMusic() {
  if (musicOn) {
    bgmMenu.pause();
    musicOn = false;
  } else {
    bgmMenu.play();
    musicOn = true;
  }
}

// Transisi antar layar
function showScreen(fromId, toId) {
  const from = document.getElementById(fromId);
  const to = document.getElementById(toId);

  from.classList.remove("active");
  from.classList.add("fade-out");
  setTimeout(() => {
    from.style.display = "none";
    to.style.display = "flex";
    to.classList.add("active");
  }, 400);
}

// Fungsi untuk menampilkan gambar
function loadGambar() {
  document.getElementById("gambar").src = data[index].gambar;
  document.getElementById("jawaban").value = "";
  document.getElementById("hasil").innerHTML = "";
}

// Fungsi How to play
function showHowToPlay() {
  const popup = document.getElementById("popup");
  const popupText = document.getElementById("popup-text");
  const popupButtons = document.getElementById("popup-buttons");

  popup.style.display = "flex";
  popupText.innerHTML = `
    📘 <b>Cara Bermain:</b><br><br>
    1️⃣ Lihat gambar yang muncul.<br>
    2️⃣ Ketik jawaban yang kamu pikir benar.<br>
    3️⃣ Tekan tombol <b>Jawab</b> atau Enter.<br><br>
    Selamat bermain!
  `;
  popupButtons.innerHTML = `<button onclick="closePopup()">Tutup</button>`;
}

// Fungsi yang dipanggil tombol Play
function mulaiGame() {
  // mainkan musik menu saat tombol Play ditekan
  if (musicOn) {
    bgmMenu.volume = 0.4;
    bgmMenu.play();
  }

  showScreen("menu", "game");
  loadGambar();
}

// Kembali ke menu dengan animasi
function kembaliHomeAnim() {
  showScreen("game", "menu");
  index = 0;
}

// Fungsi cek jawaban
function cekJawaban() {
  let input = document.getElementById("jawaban").value.toLowerCase().trim();
  let benar = data[index].jawaban.toLowerCase();

  if (input === benar) {
    showPopup("benar");
  } else {
    showPopup("salah");
  }
}

// Fungsi menampilkan popup
function showPopup(status) {
  const popup = document.getElementById("popup");
  const popupText = document.getElementById("popup-text");
  const popupButtons = document.getElementById("popup-buttons");

  popup.style.display = "flex";

  if (status === "benar") {
    popupText.innerHTML = "Jawaban Benar!";
    popupButtons.innerHTML = `
      <button onclick="lanjut()">Lanjutkan</button>
      <button onclick="kembaliHome()">Kembali</button>
    `;
  } else {
    popupText.innerHTML = "Jawaban Salah!";
    popupButtons.innerHTML = `
      <button onclick="ulangi()">Ulangi</button>
      <button onclick="kembaliHome()">Kembali</button>
    `;
  }
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}

function ulangi() {
  closePopup();
  document.getElementById("jawaban").focus();
}

function lanjut() {
  closePopup();
  index++;
  if (index < data.length) {
    loadGambar();
  } else {
    // Semua gambar selesai, tampilkan popup
    const popup = document.getElementById("popup");
    const popupText = document.getElementById("popup-text");
    const popupButtons = document.getElementById("popup-buttons");

    popupText.innerHTML = "Selamat kamu menang!";
    popupButtons.innerHTML = `<button onclick="kembaliHome()">Kembali</button>`;
    popup.style.display = "flex";
  }
}


function kembaliHome() {
  location.reload();
}

// Hubungkan tombol Jawab
document.getElementById("btnJawab").addEventListener("click", cekJawaban);

// Optional: tekan Enter untuk submit jawaban
document.getElementById("jawaban").addEventListener("keypress", function(e) {
  if (e.key === 'Enter') {
    cekJawaban();
  }
});