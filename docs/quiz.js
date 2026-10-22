/* ══════════════════════════════════════════════════════════════
   SejarahBot – Enjin Kuiz Sejarah Malaysia
   Interactive quiz engine: multiple choice, scoring, explanations.
   Integrated with app.js via window.startQuiz / window.exitQuiz.
   ══════════════════════════════════════════════════════════════ */
"use strict";

// ── Question Bank ─────────────────────────────────────────────────────────────

const QUESTIONS = {

  mudah: [
    {
      q: "Pada tarikh berapakah Malaysia mencapai kemerdekaan?",
      options: ["31 Ogos 1957", "16 September 1963", "31 Julai 1960", "9 Ogos 1965"],
      answer: 0,
      explanation: "Malaysia (ketika itu Persekutuan Tanah Melayu) mencapai kemerdekaan pada **31 Ogos 1957** di Padang Merdeka, Kuala Lumpur."
    },
    {
      q: "Siapakah Perdana Menteri pertama Malaysia?",
      options: ["Tun Abdul Razak", "Tun Dr. Mahathir", "Tunku Abdul Rahman", "Tun Hussein Onn"],
      answer: 2,
      explanation: "**Tunku Abdul Rahman** adalah Perdana Menteri pertama Malaysia, dikenali sebagai 'Bapa Malaysia'."
    },
    {
      q: "Malaysia ditubuhkan secara rasmi pada tarikh?",
      options: ["31 Ogos 1957", "16 September 1963", "1 Februari 1948", "9 Ogos 1965"],
      answer: 1,
      explanation: "**Malaysia** ditubuhkan pada **16 September 1963** apabila Persekutuan Tanah Melayu, Sabah, Sarawak, dan Singapura bergabung."
    },
    {
      q: "Berapa jalur terdapat pada bendera Malaysia (Jalur Gemilang)?",
      options: ["11", "12", "13", "14"],
      answer: 3,
      explanation: "Jalur Gemilang mempunyai **14 jalur** merah dan putih berselang-seli, mewakili 13 negeri dan kerajaan persekutuan."
    },
    {
      q: "Di negeri manakah Gunung Kinabalu terletak?",
      options: ["Sarawak", "Sabah", "Kelantan", "Pahang"],
      answer: 1,
      explanation: "**Gunung Kinabalu** (4,095m) terletak di **Sabah** dan merupakan gunung tertinggi di Malaysia."
    },
    {
      q: "Siapakah yang menubuhkan Kesultanan Melayu Melaka?",
      options: ["Tun Perak", "Hang Tuah", "Parameswara", "Sultan Mansur Shah"],
      answer: 2,
      explanation: "**Parameswara**, seorang Pangeran dari Palembang, menubuhkan Kesultanan Melayu Melaka sekitar tahun 1400."
    },
    {
      q: "Apakah nama gelaran Tun Abdul Razak dalam sejarah Malaysia?",
      options: ["Bapa Malaysia", "Bapa Pembangunan", "Bapa Pemodenan", "Bapa Perpaduan"],
      answer: 1,
      explanation: "**Tun Abdul Razak** dikenali sebagai 'Bapa Pembangunan' kerana sumbangan beliau dalam pembangunan negara."
    },
    {
      q: "Pada tahun berapakah Singapura berpisah dari Malaysia?",
      options: ["1963", "1965", "1969", "1971"],
      answer: 1,
      explanation: "Singapura berpisah dari Malaysia pada **9 Ogos 1965** dan mengisytiharkan kemerdekaan sebagai republik bebas."
    },
    {
      q: "Apakah nama bangunan paling terkenal yang dibina semasa era Tun Dr. Mahathir?",
      options: ["Menara KL", "KLCC (Menara Petronas)", "Istana Negara", "Bangunan Sultan Abdul Samad"],
      answer: 1,
      explanation: "**KLCC (Menara Petronas)** dibina semasa pemerintahan Tun Dr. Mahathir dan pernah menjadi bangunan tertinggi di dunia (1998–2004)."
    },
    {
      q: "Apakah nama sistem pentadbiran yang British perkenalkan di negeri-negeri Melayu melalui Perjanjian Pangkor 1874?",
      options: ["Sistem Feudal", "Sistem Residen", "Sistem Gabenor", "Sistem Pentadbir"],
      answer: 1,
      explanation: "**Sistem Residen** diperkenalkan melalui Perjanjian Pangkor 1874 — seorang Residen British ditempatkan di setiap negeri untuk menasihatkan sultan."
    }
  ],

  sederhana: [
    {
      q: "Apakah nama pelan British yang memindahkan penduduk luar bandar ke kawasan perlindungan semasa Darurat Malaya?",
      options: ["Pelan Templer", "Pelan Briggs", "Pelan Gurney", "Pelan McNulty"],
      answer: 1,
      explanation: "**Pelan Briggs (1950)** yang diperkenalkan oleh Leftenan Jeneral Harold Briggs, memindahkan penduduk luar bandar ke 'Kawasan Berkumpul Baru' (New Villages) untuk memotong bekalan kepada komunis."
    },
    {
      q: "Siapakah pemimpin Parti Komunis Malaya (PKM) yang paling terkenal?",
      options: ["Rashid Maidin", "Chin Peng", "Abdullah CD", "Shamsiah Fakeh"],
      answer: 1,
      explanation: "**Chin Peng** (Ong Boon Hua) adalah Setiausaha Agung PKM dari 1947 hingga pembubaran PKM. Beliau memimpin gerakan bersenjata komunis semasa Darurat Malaya."
    },
    {
      q: "Apakah dua matlamat utama Dasar Ekonomi Baru (DEB) 1971?",
      options: [
        "Memodenkan pertanian dan industri berat",
        "Membasmi kemiskinan dan menyusun semula masyarakat",
        "Membina infrastruktur dan meningkatkan eksport",
        "Mengurangkan pengangguran dan meningkatkan pendidikan"
      ],
      answer: 1,
      explanation: "DEB mempunyai dua matlamat: **membasmi kemiskinan** tanpa mengira kaum, dan **menyusun semula masyarakat** untuk menghapus pengenalan kaum mengikut fungsi ekonomi."
    },
    {
      q: "Pada tahun berapakah Malayan Union dimansuhkan dan digantikan dengan Persekutuan Tanah Melayu?",
      options: ["1946", "1947", "1948", "1949"],
      answer: 2,
      explanation: "Malayan Union dimansuhkan pada **1948** selepas mendapat tentangan hebat daripada orang Melayu dan digantikan dengan Persekutuan Tanah Melayu 1948 yang mengembalikan hak istimewa Melayu."
    },
    {
      q: "Siapakah pengasas UMNO dan siapakah yang menggantikannya sebagai Presiden UMNO pertama yang menentang Malayan Union?",
      options: [
        "Tunku Abdul Rahman",
        "Dato' Onn Jaafar",
        "Tun Abdul Razak",
        "Tun Dr. Mahathir"
      ],
      answer: 1,
      explanation: "**Dato' Onn Jaafar** mengasaskan UMNO pada 11 Mei 1946 dan memimpin penentangan terhadap Malayan Union. Beliau kemudiannya meninggalkan UMNO dan ditggantikan Tunku Abdul Rahman."
    },
    {
      q: "Apakah peristiwa yang mencetuskan pengisytiharan Darurat pada 17 Jun 1948?",
      options: [
        "Serangan ke atas balai polis",
        "Pembunuhan tiga pengurus estet British di Sungai Siput, Perak",
        "Rusuhan kaum di Kuala Lumpur",
        "Serangan komunis ke atas Kuala Lumpur"
      ],
      answer: 1,
      explanation: "Darurat diisytiharkan selepas **tiga pengurus estet British dibunuh di Sungai Siput, Perak** pada 16 Jun 1948 oleh anggota PKM."
    },
    {
      q: "Apakah nama perjanjian yang menandakan campur tangan British pertama kali ke atas hal ehwal dalaman negeri Perak?",
      options: ["Perjanjian Persekutuan", "Perjanjian Pangkor", "Perjanjian Anglo-Dutch", "Perjanjian London"],
      answer: 1,
      explanation: "**Perjanjian Pangkor (1874)** membolehkan British menempatkan seorang Residen di Perak, menandakan permulaan campur tangan British secara langsung dalam hal ehwal dalaman negeri-negeri Melayu."
    },
    {
      q: "Apakah nama kuasa Eropah yang pertama menakluki Melaka pada tahun 1511?",
      options: ["British", "Belanda", "Portugis", "Sepanyol"],
      answer: 2,
      explanation: "**Portugis** di bawah pimpinan Afonso de Albuquerque menakluki Melaka pada **1511**, menamatkan zaman Kesultanan Melayu Melaka."
    },
    {
      q: "Apakah nama prinsip perpaduan negara yang diisytiharkan pada 31 Ogos 1970?",
      options: ["Dasar Pandang ke Timur", "Wawasan 2020", "Rukun Negara", "Dasar Kebudayaan Kebangsaan"],
      answer: 2,
      explanation: "**Rukun Negara** diisytiharkan pada 31 Ogos 1970 oleh Yang di-Pertuan Agong selepas Peristiwa 13 Mei 1969, mengandungi lima prinsip perpaduan negara."
    },
    {
      q: "Siapakah 'Rajah Putih' (White Rajah) pertama Sarawak?",
      options: ["Charles Brooke", "Vyner Brooke", "James Brooke", "Anthony Brooke"],
      answer: 2,
      explanation: "**James Brooke** dilantik sebagai Rajah pertama Sarawak pada 1841 oleh Sultan Brunei. Beliau membantu menghapuskan lanun dan diberikan Sarawak sebagai ganjaran."
    }
  ],

  sukar: [
    {
      q: "Apakah nama gelaran yang diberikan kepada Tun Dr. Mahathir berkaitan sumbangan beliau dalam pembangunan Malaysia?",
      options: ["Bapa Malaysia", "Bapa Pembangunan", "Bapa Pemodenan", "Bapa Perpaduan"],
      answer: 2,
      explanation: "**Tun Dr. Mahathir** dikenali sebagai 'Bapa Pemodenan' kerana beliau memimpin transformasi Malaysia menjadi negara industri moden melalui projek mega seperti KLCC, KLIA, Putrajaya, dan MSC Malaysia."
    },
    {
      q: "Apakah nama sistem pembahagian kawasan yang digunakan British dalam Perjanjian Anglo-Belanda 1824 yang mempengaruhi sempadan Malaysia-Indonesia?",
      options: [
        "Sistem Pemisahan Laut China Selatan",
        "Perjanjian Vienna",
        "Garis pemisah yang membahagikan Nusantara kepada kawasan pengaruh British (utara) dan Belanda (selatan)",
        "Perjanjian Westphalia"
      ],
      answer: 2,
      explanation: "**Perjanjian Anglo-Belanda 1824** membahagikan Nusantara kepada dua kawasan pengaruh — British mengawal bahagian utara (Semenanjung Tanah Melayu) manakala Belanda mengawal bahagian selatan (Indonesia). Ini menjadi asas sempadan moden Malaysia-Indonesia."
    },
    {
      q: "Apakah nama operasi pembersihan etnik yang dilakukan oleh tentera Jepun terhadap penduduk Cina di Singapura dan Tanah Melayu semasa PDII?",
      options: ["Operasi Matador", "Sook Ching", "Operasi Z", "Nanking Massacre"],
      answer: 1,
      explanation: "**Sook Ching** (bermaksud 'pembersihan melalui pemurnian' dalam Bahasa Mandarin) adalah operasi penangkapan dan pembunuhan beramai-ramai terhadap orang Cina yang dianggap sebagai ancaman oleh Jepun (1942)."
    },
    {
      q: "Pada PRU 1969 yang mencetuskan Peristiwa 13 Mei, parti manakah yang memenangi paling banyak kerusi pembangkang?",
      options: ["DAP", "PAP", "Gerakan", "PPP"],
      answer: 2,
      explanation: "**Parti Gerakan** bersama DAP memenangi banyak kerusi pada PRU 1969. Perarakan kemenangan oleh penyokong parti pembangkang mencetuskan ketegangan yang membawa kepada rusuhan 13 Mei."
    },
    {
      q: "Apakah nama perjanjian yang ditandatangani pada 2 Disember 1989 yang secara rasmi menamatkan perjuangan bersenjata PKM?",
      options: [
        "Perjanjian Baling",
        "Perjanjian Haadyai",
        "Perjanjian Bangkok",
        "Perjanjian Kuala Lumpur"
      ],
      answer: 1,
      explanation: "**Perjanjian Haadyai** ditandatangani di Hat Yai, Thailand pada **2 Disember 1989** antara kerajaan Malaysia, Thailand, dan PKM, secara rasmi menamatkan perjuangan bersenjata PKM selepas lebih 40 tahun."
    },
    {
      q: "Apakah nama Suruhanjaya yang ditugaskan British untuk menentukan sama ada rakyat Sabah dan Sarawak menyokong pembentukan Malaysia?",
      options: ["Suruhanjaya Cobbold", "Suruhanjaya Reid", "Suruhanjaya Runciman", "Suruhanjaya MacMichael"],
      answer: 0,
      explanation: "**Suruhanjaya Cobbold (1962)** dipengerusikan oleh Lord Cobbold untuk menilai pendapat rakyat Sabah dan Sarawak tentang bergabung dengan Malaysia. Hasilnya, majoriti rakyat menyokong pembentukan Malaysia."
    },
    {
      q: "Siapakah Ketua Menteri pertama Sarawak selepas bergabung dengan Malaysia pada 1963?",
      options: ["James Brooke", "Abdul Rahman Yakub", "Stephen Kalong Ningkan", "Abdul Taib Mahmud"],
      answer: 2,
      explanation: "**Stephen Kalong Ningkan** (dari etnik Iban) menjadi Ketua Menteri pertama Sarawak selepas bergabung dengan Malaysia. Beliau kemudiannya dipecat secara kontroversial pada 1966."
    },
    {
      q: "Apakah nama perisytiharan dasar luar Malaysia yang mengisytiharkan rantau Asia Tenggara sebagai zon bebas daripada campur tangan kuasa besar?",
      options: ["Doktrin Eisenhower", "ZOPFAN", "ASEAN Declaration", "Dasar Bebas dan Berkecuali"],
      answer: 1,
      explanation: "**ZOPFAN (Zone of Peace, Freedom and Neutrality)** diisytiharkan di Kuala Lumpur pada 1971 oleh lima negara ASEAN. Ia merupakan dasar luar Tun Abdul Razak untuk mengelakkan rantau daripada menjadi medan perebutan kuasa besar."
    },
    {
      q: "Duncan Stewart, Gabenor kedua Sarawak selepas penyerahan kepada British Crown (1946), dibunuh pada 1949. Mengapa beliau dibunuh?",
      options: [
        "Oleh komunis yang menentang kerajaan British",
        "Oleh penentang penyerahan Sarawak kepada British yang menganggapnya pengkhianatan Dinasti Brooke",
        "Oleh kumpulan penjenayah tempatan",
        "Oleh agen Belanda yang menentang pengaruh British"
      ],
      answer: 1,
      explanation: "Duncan Stewart dibunuh oleh **Rosli Dhobi**, seorang pemuda Melayu Sarawak yang menentang penyerahan Sarawak kepada British Crown. Rosli dan rakan-rakannya menganggap penyerahan itu sebagai pengkhianatan dan melakukan tindakan drastik ini sebagai protes."
    },
    {
      q: "Apakah nama perjanjian 1956 yang memperakukan British untuk memberi kemerdekaan kepada Persekutuan Tanah Melayu?",
      options: [
        "Perjanjian Pangkor",
        "Perjanjian London 1956",
        "Perjanjian Persekutuan",
        "Deklarasi Westminster"
      ],
      answer: 1,
      explanation: "**Perjanjian London (8 Februari 1956)** ditandatangani antara delegasi Tanah Melayu (diketuai Tunku Abdul Rahman) dan Kerajaan British, memperakukan British akan memberi kemerdekaan kepada Persekutuan Tanah Melayu pada 31 Ogos 1957."
    }
  ]
};

// ── Quiz state ────────────────────────────────────────────────────────────────

let quizState = {
  questions: [],
  current: 0,
  score: 0,
  answered: false,
  difficulty: "mudah"
};

// ── DOM refs ──────────────────────────────────────────────────────────────────

const quizPanel    = document.getElementById("quizPanel");
const quizQuestion = document.getElementById("quizQuestion");
const quizOptions  = document.getElementById("quizOptions");
const quizFeedback = document.getElementById("quizFeedback");
const quizScore    = document.getElementById("quizScore");
const quizNextBtn  = document.getElementById("quizNextBtn");
const quizExitBtn  = document.getElementById("quizExitBtn");

// ── Helpers ───────────────────────────────────────────────────────────────────

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function simpleMarkdown(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>");
}

function updateScoreDisplay() {
  quizScore.textContent = `Markah: ${quizState.score} / ${quizState.current} soalan`;
}

// ── Quiz rendering ─────────────────────────────────────────────────────────────

function renderQuestion() {
  const q = quizState.questions[quizState.current];
  quizState.answered = false;

  // Progress indicator
  const total = quizState.questions.length;
  const num = quizState.current + 1;
  quizQuestion.innerHTML = `<span style="font-size:11px;color:#667781;font-weight:400;">Soalan ${num} daripada ${total}</span><br>${simpleMarkdown(q.q)}`;

  // Options
  quizOptions.innerHTML = "";
  q.options.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.className = "quiz-option";
    btn.innerHTML = `<span style="font-weight:600;margin-right:6px;">${String.fromCharCode(65 + idx)}.</span>${simpleMarkdown(opt)}`;
    btn.dataset.idx = idx;
    btn.addEventListener("click", () => handleAnswer(idx));
    quizOptions.appendChild(btn);
  });

  quizFeedback.hidden = true;
  quizFeedback.className = "quiz-feedback";
  quizNextBtn.hidden = true;
  updateScoreDisplay();
}

function handleAnswer(selectedIdx) {
  if (quizState.answered) return;
  quizState.answered = true;

  const q = quizState.questions[quizState.current];
  const correct = selectedIdx === q.answer;

  if (correct) quizState.score++;

  // Style all buttons
  const buttons = quizOptions.querySelectorAll(".quiz-option");
  buttons.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === q.answer) btn.classList.add("correct");
    else if (idx === selectedIdx && !correct) btn.classList.add("wrong");
  });

  // Feedback
  quizFeedback.hidden = false;
  quizFeedback.className = `quiz-feedback ${correct ? "correct" : "wrong"}`;
  const icon = correct ? "✅" : "❌";
  quizFeedback.innerHTML = `${icon} ${correct ? "<strong>Betul!</strong>" : "<strong>Salah.</strong>"} ${simpleMarkdown(q.explanation)}`;

  // Show next button or finish
  const isLast = quizState.current >= quizState.questions.length - 1;
  if (!isLast) {
    quizNextBtn.hidden = false;
    quizNextBtn.textContent = "Seterusnya ▶";
  } else {
    quizNextBtn.hidden = false;
    quizNextBtn.textContent = "Lihat Keputusan 🏆";
  }

  updateScoreDisplay();
}

function nextQuestion() {
  const isLast = quizState.current >= quizState.questions.length - 1;
  if (isLast) {
    endQuiz();
    return;
  }
  quizState.current++;
  renderQuestion();
}

function endQuiz() {
  quizPanel.hidden = true;
  window.onQuizEnd && window.onQuizEnd(quizState.score, quizState.questions.length);
}

// ── Public API (called by app.js) ─────────────────────────────────────────────

window.startQuiz = function(difficultyLabel) {
  // Map chip labels to difficulty keys
  let diff = "mudah";
  const lower = difficultyLabel.toLowerCase();
  if (lower.includes("sederhana") || lower.includes("medium")) diff = "sederhana";
  else if (lower.includes("sukar") || lower.includes("hard")) diff = "sukar";
  else diff = "mudah";

  const pool = QUESTIONS[diff];
  const count = diff === "mudah" ? 5 : 10;
  quizState = {
    questions: shuffle(pool).slice(0, count),
    current: 0,
    score: 0,
    answered: false,
    difficulty: diff
  };

  quizPanel.hidden = false;
  renderQuestion();

  // Scroll quiz into view
  quizPanel.scrollIntoView({ behavior: "smooth", block: "start" });
};

window.exitQuiz = function() {
  quizPanel.hidden = true;
  quizState = { questions: [], current: 0, score: 0, answered: false, difficulty: "mudah" };
};

// ── Event listeners ────────────────────────────────────────────────────────────

quizNextBtn.addEventListener("click", nextQuestion);

quizExitBtn.addEventListener("click", () => {
  const confirmed = quizState.current === 0 || quizState.current >= quizState.questions.length - 1 ||
    confirm("Adakah anda pasti ingin tamatkan kuiz? Markah semasa anda: " + quizState.score);
  if (confirmed) {
    endQuiz();
  }
});

// ── Handle quiz chip clicks from app.js ────────────────────────────────────────
// Intercept quick-chip clicks for quiz difficulty selection
document.addEventListener("click", (e) => {
  if (!e.target.classList.contains("quick-chip")) return;
  const text = e.target.textContent.trim();
  if (text.includes("Kuiz Mudah") || text.includes("Kuiz Sederhana") || text.includes("Kuiz Sukar")) {
    e.stopPropagation();
    window.startQuizFromChat && window.startQuizFromChat(text);
  }
});
