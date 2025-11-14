// Data gambar dan jawaban
const data = [
  {
    gambar: "images/quis1.png",
    jawaban: "sate padang",
    funfact: "Sate Padang berasal dari Padang, Sumatera Barat, terkenal dengan kuah kental berwarna coklat yang kaya rempah seperti kunyit, jahe, dan serai. Sate ini menggunakan daging sapi atau lidah sapi yang direbus lama agar empuk, lalu disiram kuah khas yang memberi rasa pedas gurih yang unik."
  },
  { gambar: "images/quis2.png",
    jawaban: "kuda lumping",
    funfact: "Kuda Lumping adalah tari tradisional Jawa yang menampilkan penari menunggang kuda anyaman bambu. Pertunjukan ini sering disertai atraksi trance di mana penari seolah berada di luar kesadaran, menggambarkan kekuatan magis dan spiritual dalam budaya Jawa."
  },
  { gambar: "images/quis3.png",
    jawaban: "jalangkung",
    funfact: "Jalangkung adalah permainan tradisional Indonesia untuk berkomunikasi dengan roh. Permainan ini biasanya menggunakan boneka sederhana dari batok kelapa atau kayu dengan tulisan mantra tertentu. Aktivitas ini dulunya dilakukan anak-anak sebagai hiburan, meski memiliki unsur mistis yang kuat."
  },
  { gambar: "images/quis4.png",
    jawaban: "kopi tubruk",
    funfact: "Kopi Tubruk adalah kopi tradisional Indonesia yang dibuat dengan menuangkan air mendidih langsung ke bubuk kopi, menghasilkan rasa kuat dan aroma pekat. Minuman ini populer di Jawa dan Bali, dan sering dinikmati tanpa disaring sehingga ampasnya tetap berada di dasar gelas."
  },
  { gambar: "images/quis5.png",
    jawaban: "kerak telur",
    funfact: "Kerak Telur adalah jajanan khas Betawi yang dibuat dari campuran beras ketan, telur bebek, kelapa parut sangrai, serta bumbu khas seperti ebi dan bawang goreng. Hidangan ini dimasak tanpa minyak dan memiliki aroma gurih smoky yang menjadi ciri khasnya, terutama saat Festival Jakarta Fair."
  },
  { gambar: "images/quis6.png",
    jawaban: "harimau sumatra",
    funfact: "Harimau Sumatra adalah subspesies harimau yang hanya hidup di Pulau Sumatera dan merupakan yang terkecil di antara harimau lain di dunia. Mereka kini terancam punah akibat perburuan dan kehilangan habitat, sehingga termasuk hewan yang dilindungi untuk menjaga keberlangsungan ekosistem."
  },
  { gambar: "images/quis7.png",
    jawaban: "pempek kapal selam",
    funfact: "Pempek Kapal Selam adalah makanan khas Palembang yang berisi telur ayam utuh di dalam adonan ikan dan tepung sagu. Hidangan ini disajikan dengan cuko, saus asam-manis pedas yang dibuat dari gula aren, cabai, dan bawang putih, menghasilkan perpaduan rasa yang sangat khas."
  },
  { gambar: "images/quis8.png",
    jawaban: "mie aceh",
    funfact: "Mie Aceh adalah hidangan mi pedas khas Aceh yang dimasak dengan bumbu rempah kuat seperti kari, kapulaga, cengkeh, dan kayu manis. Biasanya disajikan dengan daging sapi, ayam, atau seafood, menjadikannya salah satu kuliner Nusantara dengan cita rasa paling kaya dan beraroma kuat."
  },
  { gambar: "images/quis9.png",
    jawaban: "ngaben",
    funfact: "Ngaben adalah upacara kremasi tradisional Bali untuk menghantarkan roh orang yang meninggal menuju alam selanjutnya. Prosesi ini bukan dianggap kesedihan, melainkan pelepasan penuh sukacita, karena dipercaya membantu roh mencapai kedamaian dan kembali ke asalnya."
  },
  { gambar: "images/quis10.png",
    jawaban: "tari piring",
    funfact: "Tari Piring berasal dari Minangkabau, Sumatera Barat, di mana penari menari dengan piring di kedua tangan sambil melakukan gerakan cepat dan lincah. Tarian ini awalnya merupakan bentuk syukur masyarakat atas hasil panen dan kini menjadi salah satu ikon budaya Minang yang mendunia."
  }
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
  // mainkan musik menu saat tombol Play ditekan
  if (musicOn) {
    bgmMenu.volume = 0.4;
    bgmMenu.play();
  }

  showScreen("menu", "level-select");
  loadGambar();
}

// Kembali ke menu dengan animasi
function kembaliHomeAnim() {
  showScreen("game", "menu");
  index = 0;
}

// =============================
// CEK JAWABAN
// =============================
function cekJawaban() {
  let input = document.getElementById("jawaban").value.toLowerCase().trim();

  // Hapus spasi ganda dan karakter tak terlihat
  input = input.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); 
  input = input.replace(/\s+/g, " "); 
  input = input.replace(/\u00A0/g, " "); 

  let benar = data[index].jawaban.toLowerCase().trim();

  if (input === benar) {
    tampilFunfact();
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
    selesai();
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
// Fungsi pilih level
function pilihLevel(level) {
  console.log("Level dipilih:", level);
  showScreen("level-select", "game");
  index = (level - 1) * 2; // contoh: tiap level punya 2 soal
  loadGambar();
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
// FUNFACT
// =============================
function tampilFunfact() {
  const fact = data[index].funfact || "Tidak ada fakta menarik untuk soal ini.";
  document.getElementById("funfact-text").textContent = fact;
  showScreen("game", "funfact");
}