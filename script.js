// Data gambar dan jawaban
const data = [
  { gambar: "images/gambar1.jpg", jawaban: "" },
  { gambar: "images/gambar2.jpg", jawaban: "" },
  { gambar: "images/gambar3.jpg", jawaban: "" },
  { gambar: "images/gambar4.jpg", jawaban: "" },
  { gambar: "images/gambar5.jpg", jawaban: "" }
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

// Fungsi untuk menampilkan gambar
function loadGambar() {
  document.getElementById("gambar").src = data[index].gambar;
  document.getElementById("jawaban").value = "";
  document.getElementById("hasil").innerHTML = "";
}

// Fungsi yang dipanggil tombol Play
function mulaiGame() {
  // mainkan musik menu saat tombol Play ditekan
  if (musicOn) {
    bgmMenu.volume = 0.4;
    bgmMenu.play();
  }

  document.getElementById("menu").style.display = "none";
  document.getElementById("game").style.display = "flex";

  loadGambar();
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