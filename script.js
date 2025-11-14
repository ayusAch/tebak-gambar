// Data jawaban dan funfact
const data = [
  { gambar: "images/quis1.png", jawaban: "sate padang", funfact: "Sate Padang berasal dari Padang, Sumatera Barat, terkenal dengan kuah kental berwarna coklat dan rempah yang kaya." },
  { gambar: "images/quis2.png", jawaban: "kuda lumping", funfact: "Kuda Lumping adalah tari tradisional dari Jawa yang menampilkan penari menunggang kuda dari anyaman bambu." },
  { gambar: "images/quis3.png", jawaban: "jalangkung", funfact: "Jalangkung adalah permainan tradisional Indonesia untuk berkomunikasi dengan roh, biasanya dilakukan oleh anak-anak." },
  { gambar: "images/quis4.png", jawaban: "kopi tubruk", funfact: "Kopi Tubruk adalah kopi tradisional Indonesia yang disajikan dengan ampas kopi, populer di Jawa dan Bali." },
  { gambar: "images/quis5.png", jawaban: "kerak telur", funfact: "Kerak Telur adalah jajanan khas Betawi, berupa telur bebek dan kelapa parut yang digoreng dengan tepung ketan." },
  { gambar: "images/quis6.png", jawaban: "harimau sumatra", funfact: "Harimau Sumatra adalah subspesies harimau yang hanya ada di Pulau Sumatera dan masuk hewan yang dilindungi." },
  { gambar: "images/quis7.png", jawaban: "pempek kapal selam", funfact: "Pempek Kapal Selam adalah makanan khas Palembang, berisi telur di dalam adonan ikan dan tepung sagu." },
  { gambar: "images/quis8.png", jawaban: "mie aceh", funfact: "Mie Aceh adalah hidangan mi pedas khas Aceh yang biasanya disajikan dengan daging sapi atau seafood." },
  { gambar: "images/quis9.png", jawaban: "ngaben", funfact: "Ngaben adalah upacara kremasi tradisional Bali untuk menghantarkan roh orang yang meninggal ke alam berikutnya." },
  { gambar: "images/quis10.png", jawaban: "tari piring", funfact: "Tari Piring berasal dari Minangkabau, Sumatera Barat, menampilkan penari menari dengan piring di tangan secara cepat dan lincah." }
];

let index = 0;
let nyawa = 3;
let maxLevelUnlocked = parseInt(localStorage.getItem("maxLevelUnlocked")) || 1;
const bgmMenu = document.getElementById("bgmMenu");
let musicOn = true;

// =============================
// TOGGLE MUSIK
// =============================
function toggleMusic() {
  if (musicOn) {
    bgmMenu.pause();
    musicOn = false;
  } else {
    bgmMenu.play();
    musicOn = true;
  }
}

// =============================
// TRANSISI ANTAR LAYAR
// =============================
function showScreen(fromId, toId) {

  if (toId === "level-select") {
    updateLevelDisplay();
    animateLevelButtons();
  }

  const from = document.getElementById(fromId);
  const to = document.getElementById(toId);

  from.classList.remove("active");
  from.classList.add("fade-out");

  setTimeout(() => {
    from.style.display = "none";
    from.classList.remove("fade-out");

    // Ambil display default dari atribut data-display
    const defaultDisplay = to.dataset.display || "flex";
    to.style.display = defaultDisplay;
    to.classList.add("active");
  }, 400);
}


// =============================
// LOAD GAMBAR
// =============================
function loadGambar() {
  document.getElementById("gambar").src = data[index].gambar;
  document.getElementById("jawaban").value = "";

  // Update level info dan nyawa
  document.getElementById("level-info").textContent = `Level ${index + 1}`;
  document.getElementById("nyawa").textContent = "❤️".repeat(nyawa); 
}

// =============================
// START GAME
// =============================
function mulaiGame() {
  if (musicOn) {
    bgmMenu.volume = 0.4;
    bgmMenu.play();
  }
  showScreen("menu", "level-select");
  updateLevelDisplay();
}

// =============================
// KEMBALI KE MENU
// =============================
function kembaliHome() {
  location.reload();
}

// =============================
// CEK JAWABAN
// =============================
function cekJawaban() {
  let input = document.getElementById("jawaban").value.toLowerCase().trim();

  // Hapus spasi ganda dan karakter tak terlihat
  input = input.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // hilangkan aksen
  input = input.replace(/\s+/g, " "); // ganti spasi ganda dengan satu spasi
  input = input.replace(/\u00A0/g, " "); // ubah non-breaking space jadi spasi biasa

  let benar = data[index].jawaban.toLowerCase().trim();

  if (input === benar) {
    tampilFunfact();
  } else {
    nyawa--;
    document.getElementById("nyawa").textContent = "❤️".repeat(nyawa);

    if (nyawa === 0) {
      showPopup("gameover");
    }else{
      showPopup("salah");
    }
  }
}
// =============================
// FUNFACT
// =============================
function tampilFunfact() {
  const fact = data[index].funfact || "Tidak ada fakta menarik untuk soal ini.";
  document.getElementById("funfact-text").textContent = fact;
  showScreen("game", "funfact");
}

// =============================
// LANJUT KE SOAL BERIKUTNYA
// =============================
function lanjutSoal() {
  // const totalPerLevel = index + 1; // jumlah soal per level
  const currentLevel = index + 1;
  bukaLevelBerikutnya(currentLevel);
  showPopup("selesai");
  // index++;

  // // Cek apakah masih ada soal di level ini
  // if (index < currentLevel * totalPerLevel && index < data.length) {
  //   showScreen("funfact", "game");
  //   loadGambar();
  // } else {
  //   bukaLevelBerikutnya(currentLevel);
  //   showPopup("selesai");
  // }
}


// =============================
// FUNGSI BUKA LEVEL BERIKUTNYA
// =============================
function bukaLevelBerikutnya(currentLevel) {
  const nextLevel = currentLevel + 1;
  if (nextLevel > maxLevelUnlocked && nextLevel <= 10) {
    maxLevelUnlocked = nextLevel;
    localStorage.setItem("maxLevelUnlocked", maxLevelUnlocked);
  }
}



// =============================
// SELESAI
// =============================
function selesai() {
  alert("Semua pertanyaan selesai!");
  location.reload();
}

// =============================
// EVENT LISTENER
// =============================
document.getElementById("btnJawab").addEventListener("click", cekJawaban);
document.getElementById("jawaban").addEventListener("keypress", function(e) {
  if (e.key === 'Enter') cekJawaban();
});

// =============================
// PILIH LEVEL
// =============================
function pilihLevel(level) {
  if (level > maxLevelUnlocked) {
    alert("Level ini masih terkunci 🔒\nSelesaikan level sebelumnya dulu!");
    return;
  }

  console.log("Level dipilih:", level);
  showScreen("level-select", "game");
  index = level - 1; // tiap level punya 1 soal
  loadGambar();
}


// =============================
// POPUP
// =============================
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
  } else if (status === "salah") {
    popupText.innerHTML = "Jawaban Salah!";
    popupButtons.innerHTML = `
      <button onclick="ulangi()">Ulangi</button>
      <button onclick="kembaliHome()">Kembali</button>
    `;
  } else if (status === "gameover") {
    popupText.innerHTML = "Game Over! Nyawamu habis 😢";
    popupButtons.innerHTML = `
      <button onclick="ulangGame()">Ulangi Game</button>
      <button onclick="kembaliHome()">Kembali</button>
    `;
  } else if (status === "selesai") {
    popupText.innerHTML = "Selamat! Kamu menyelesaikan level ini 🎉";
    popupButtons.innerHTML = `
    <button onclick="kembaliLevelSelect()">Kembali ke Level</button>
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
function ulangGame() {
  closePopup();
  nyawa = 3;
  index = 0;
  loadGambar();
}
// =============================
// LOGIC BUKA LEVEL
// =============================
function updateLevelDisplay() {
  const items = document.querySelectorAll(".level-item");
  items.forEach((item, i) => {
    const level = i + 1;
    if (level <= maxLevelUnlocked) {
      item.style.opacity = "1";
      item.style.pointerEvents = "auto";
      item.innerHTML = `<span class="stars">⭐ Level ${level}</span>`;
    } else {
      item.style.opacity = "0.5";
      item.style.pointerEvents = "none";
      item.innerHTML = `<span class="stars">🔒 Level ${level}</span>`;
    }
  });
}

function kembaliLevelSelect() {
  closePopup();
  showScreen("funfact", "level-select");
  updateLevelDisplay();
}

document.addEventListener("DOMContentLoaded", updateLevelDisplay);

function resetProgress() {
  if (confirm("Apakah kamu yakin ingin mengulang dari awal?\nSemua progress level akan dihapus.")) {
    localStorage.removeItem("maxLevelUnlocked");
    maxLevelUnlocked = 1;
    updateLevelDisplay();
    alert("Progress berhasil di-reset! Semua level terkunci kecuali Level 1.");
  }
}

function animateLevelButtons() {
  const backBtn = document.querySelector(".level-select .back-btn");
  const resetBtn = document.querySelector(".level-select .reset-btn");

  // Sembunyikan dulu tombolnya
  backBtn.style.opacity = "0";
  resetBtn.style.opacity = "0";

  // Hitung waktu total animasi level-item (terakhir = 1s)
  const totalDelay = 2000; // dalam ms (1.2 detik)

  setTimeout(() => {
    backBtn.style.transition = "opacity 0.5s ease, transform 0.3s ease";
    resetBtn.style.transition = "opacity 0.5s ease, transform 0.3s ease";

    backBtn.style.opacity = "1";
    resetBtn.style.opacity = "1";

    backBtn.style.transform = "translateY(0)";
    resetBtn.style.transform = "translateY(0)";
  }, totalDelay);
}
