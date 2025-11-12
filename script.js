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
  document.getElementById("level-info").textContent = `Level ${Math.floor(index / 2) + 1}`;
  document.getElementById("nyawa").textContent = "❤️❤️❤️"; // sementara tetap 3 nyawa default
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
  loadGambar();
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
    document.getElementById("hasil").textContent = "Jawaban salah, coba lagi!";
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
  index++;
  if (index < data.length) {
    showScreen("funfact", "game");
    loadGambar();
  } else {
    selesai();
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
  console.log("Level dipilih:", level);
  showScreen("level-select", "game");
  index = (level - 1) * 2; // contoh: tiap level 2 soal
  loadGambar();
}