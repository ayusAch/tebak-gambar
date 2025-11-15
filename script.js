// Data jawaban dan funfact
const data = [
  {
    gambar: "images/quis1.png",
    jawaban: "sate padang",
    funfact: "Sate Padang berasal dari Padang, Sumatera Barat, terkenal dengan kuah kental berwarna coklat yang kaya rempah. Sate ini menggunakan daging sapi yang disiram kuah khas yang memberi rasa pedas gurih yang unik.",
    clue: "Khas Sumatera Barat"
  },
  { gambar: "images/quis2.png",
    jawaban: "kuda lumping",
    funfact: "Kuda Lumping adalah tari tradisional Jawa yang menampilkan penari menunggang kuda anyaman bambu. Pertunjukan ini menggambarkan kekuatan magis dan spiritual dalam budaya Jawa.",
    clue: "Kesenian tradisional"
  },
  { gambar: "images/quis3.png",
    jawaban: "jalangkung",
    funfact: "Jalangkung adalah permainan tradisional Indonesia untuk berkomunikasi dengan roh. Permainan ini biasanya menggunakan boneka sederhana dari batok kelapa atau kayu dengan tulisan mantra tertentu.",
    clue: "Mistis"
  },
  { gambar: "images/quis4.png",
    jawaban: "kopi tubruk",
    funfact: "Kopi Tubruk adalah kopi tradisional Indonesia yang memiliki rasa kuat dan aroma pekat. Minuman ini sering dinikmati tanpa disaring sehingga ampasnya tetap berada di dasar gelas.",
    clue: "Tanpa disaring"
  },
  { gambar: "images/quis5.png",
    jawaban: "kerak telur",
    funfact: "Kerak Telur adalah jajanan khas Betawi yang dibuat dari campuran beras ketan, telur bebek, dan kelapa parut. Hidangan ini dimasak tanpa minyak dan memiliki aroma gurih yang menjadi ciri khasnya.",
    clue: "Khas betawi"
  },
  { gambar: "images/quis6.png",
    jawaban: "harimau sumatra",
    funfact: "Harimau Sumatra adalah subspesies harimau yang hanya hidup di Pulau Sumatera dan merupakan yang terkecil di antara harimau lain di dunia. Termasuk hewan yang dilindungi dan terancam punah.",
    clue: "Predator endemik"
  },
  { gambar: "images/quis7.png",
    jawaban: "pempek kapal selam",
    funfact: "Pempek Kapal Selam adalah makanan khas Palembang yang berisi telur ayam utuh di dalam adonan ikan dan tepung sagu. Hidangan ini disajikan dengan cuko, saus asam-manis pedas yang sangat khas.",
    clue: "Khas Palembang"
  },
  { gambar: "images/quis8.png",
    jawaban: "mie aceh",
    funfact: "Mie Aceh adalah hidangan mie pedas khas Aceh yang dimasak dengan bumbu rempah. Termasuk kuliner Nusantara dengan cita rasa paling kaya dan beraroma kuat.",
    clue: "Khas Serambi mekkah"
  },
  { gambar: "images/quis9.png",
    jawaban: "ngaben",
    funfact: "Ngaben adalah upacara adat tradisional Bali untuk menghantarkan roh orang yang meninggal menuju alam selanjutnya. Prosesi ini dipercaya membantu roh mencapai kedamaian dan kembali ke asalnya.",
    clue: "Upacara adat"
  },
  { gambar: "images/quis10.png",
    jawaban: "tari piring",
    funfact: "Tari Piring berasal dari Minangkabau, Sumatera Barat, di mana penari menari dengan piring di kedua tangan. Tarian ini merupakan bentuk syukur masyarakat atas panen hasil bumi.",
    clue: "Kesenian daerah"
  }
];

let index = 0;
let nyawa = 3;
let maxLevelUnlocked = parseInt(localStorage.getItem("maxLevelUnlocked")) || 1;
const bgmMenu = document.getElementById("bgmMenu");
const sfxAngklung = document.getElementById("sfxAngklung");
const sfxKendang = document.getElementById("sfxKendang");
const sfxSuling = document.getElementById("sfxSuling");
let musicOn = true;

// =============================
// TOGGLE MUSIK
// =============================
function toggleMusic() {
  const btn = document.getElementById("music-btn");
  if (musicOn) {
    bgmMenu.pause();
    musicOn = false;
    btn.textContent = "🔇";
  } else {
    bgmMenu.play();
    musicOn = true;
    btn.textContent = "🔊";
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
function Petunjuk() {
  const clueText = data[index].clue;

  // Isi teks popup
  document.getElementById("popup-text").textContent = "";

  // Isi tombol + isi clue
  document.getElementById("popup-buttons").innerHTML = `
    <p style="font-size: 18px; margin-bottom: 15px;">${clueText}</p>
    <button onclick="tutupPopup()">Tutup</button>
  `;

  // Tampilkan popup
  document.getElementById("popup").style.display = "flex";
}

function tutupPopup() {
  document.getElementById("popup").style.display = "none";
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
    if (nyawa === 1) {
      
      sfxKendang.currentTime = 0;
      sfxKendang.play();
      showPopup("warning");
      return; 
    }
    if (nyawa === 0) {
      showPopup("gameover");
    } else {
      sfxKendang.currentTime = 0;
      sfxKendang.play();
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

  //sfx angklung
  sfxAngklung.currentTime = 0;
  sfxAngklung.play();

  showScreen("game", "funfact");
}

// =============================
// LANJUT KE SOAL BERIKUTNYA
// =============================
function lanjutSoal() {
  const currentLevel = index + 1;

  if (currentLevel === 10) {
    showWinScreen();
    return;
    
  }
  bukaLevelBerikutnya(currentLevel);
  showPopup("selesai");

  sfxSuling.currentTime = 0;
  sfxSuling.play();
  
}


// =============================
// FUNGSI BUKA LEVEL BERIKUTNYA
// =============================
function bukaLevelBerikutnya(currentLevel) {
  const nextLevel = currentLevel + 1;
  //buka level
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
document.getElementById("jawaban").addEventListener("keypress", function (e) {
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
  } else if (status === "warning") {
    popupText.innerHTML = "⚠️ Hati-hati! Kesempatanmu tinggal 1 😢";
    popupButtons.innerHTML = `
      <button onclick="closePopup()">Lanjutkan</button>
    `;
  }

}
function showWinScreen() {
  const win = document.getElementById("win-screen");
  win.style.display = "flex";

  // stop BGM
  bgmMenu.pause();

  // kalau mau tambahkan SFX kembang api:
  // sfxAngklung.play();
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
  const totalDelay = 3000; 

  setTimeout(() => {
    backBtn.style.transition = "opacity 0.5s ease, transform 0.3s ease";
    resetBtn.style.transition = "opacity 0.5s ease, transform 0.3s ease";

    backBtn.style.opacity = "1";
    resetBtn.style.opacity = "1";

    backBtn.style.transform = "translateY(0)";
    resetBtn.style.transform = "translateY(0)";
  }, totalDelay);
}
