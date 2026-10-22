/* ══════════════════════════════════════════════════════════════
   SejarahBot – Pangkalan Pengetahuan (Knowledge-Base Engine)
   Static version for GitHub Pages — NO backend, NO API keys.
   Rule-based keyword recognition + contextual responses.
   Primary language: Bahasa Melayu. English on request.
   ══════════════════════════════════════════════════════════════ */
"use strict";

// ── Malaysian History Knowledge Base ─────────────────────────────────────────

const KB = {

  // ── KEMERDEKAAN ──────────────────────────────────────────────────────────
  kemerdekaan: {
    keywords: ["merdeka","kemerdekaan","independence","31 ogos","31 august","1957","tunku","bapa malaysia","hari merdeka","31ogos","merdeka1957"],
    title: "Kemerdekaan Malaysia (31 Ogos 1957)",
    response: `🏳️ **Kemerdekaan Malaysia — 31 Ogos 1957**

Malaysia mencapai kemerdekaan daripada British pada **31 Ogos 1957** di Padang Merdeka (kini Dataran Merdeka), Kuala Lumpur.

**Peristiwa penting:**
- Perjanjian London ditandatangani pada **8 Februari 1956** — British bersetuju memberi kemerdekaan
- **Tunku Abdul Rahman** dilantik sebagai Perdana Menteri pertama
- Waktu tepat 12.00 tengah malam, bendera Union Jack diturunkan dan **Jalur Gemilang** dinaikkan
- Tunku mengisytiharkan: *"Merdeka! Merdeka! Merdeka!"* sebanyak 7 kali

**Tokoh utama perjuangan kemerdekaan:**
- Tunku Abdul Rahman (Bapa Malaysia)
- Tun Abdul Razak Hussein
- Tun Tan Cheng Lock
- Tun V.T. Sambanthan

Kemerdekaan dicapai melalui **perundingan diplomatik** dengan British, bukan melalui revolusi bersenjata.`,
    followUp: ["Siapakah Tunku Abdul Rahman?","Apakah Perjanjian Persekutuan 1948?","Apakah yang berlaku selepas merdeka?"]
  },

  // ── PEMBENTUKAN MALAYSIA ─────────────────────────────────────────────────
  pembentukanMalaysia: {
    keywords: ["pembentukan malaysia","malaysia day","16 september","1963","hari malaysia","formation of malaysia","sabah sarawak bergabung","malaya sabah sarawak"],
    title: "Pembentukan Malaysia (16 September 1963)",
    response: `🇲🇾 **Pembentukan Malaysia — 16 September 1963**

Malaysia ditubuhkan secara rasmi pada **16 September 1963** apabila Persekutuan Tanah Melayu, Sabah, Sarawak, dan Singapura bergabung.

**Komponen asal Malaysia:**
1. **Persekutuan Tanah Melayu** (merdeka sejak 1957)
2. **Sabah** (dahulu British North Borneo)
3. **Sarawak** (dahulu di bawah Brooke/penjajahan British)
4. **Singapura** (keluar pada 9 Ogos 1965)

**Sebab penubuhan:**
- Keselamatan bersama menghadapi ancaman komunis
- Kestabilan ekonomi dan politik
- Penyatuan rantau di bawah satu pentadbiran

**Tentangan terhadap pembentukan:**
- **Konfrontasi Indonesia** (1963–1966) — Sukarno menentang Malaysia
- **Filipina** menuntut Sabah
- Parti komunis menentang penubuhan

16 September kini disambut sebagai **Hari Malaysia**.`,
    followUp: ["Mengapa Singapura keluar dari Malaysia?","Apa yang berlaku semasa Konfrontasi?","Ceritakan tentang Sabah"]
  },

  // ── SINGAPURA KELUAR ─────────────────────────────────────────────────────
  singapura: {
    keywords: ["singapura keluar","singapore","9 ogos 1965","pemisahan singapura","lee kuan yew","separation"],
    title: "Pemisahan Singapura (9 Ogos 1965)",
    response: `🔴 **Pemisahan Singapura daripada Malaysia — 9 Ogos 1965**

Singapura mengisytiharkan kemerdekaan daripada Malaysia pada **9 Ogos 1965**.

**Punca pemisahan:**
- Pertelingkahan ideologi: PAP (Lee Kuan Yew) mahu "Malaysian Malaysia" manakala UMNO mahu hak istimewa Melayu dikekalkan
- Rusuhan kaum **13 Mei 1964** di Singapura menambah ketegangan
- Perdebatan di Parlimen semakin sengit

**Proses pemisahan:**
- Tunku Abdul Rahman dan Lee Kuan Yew bersetuju pemisahan adalah jalan terbaik
- Perjanjian pemisahan ditandatangani secara sulit
- Lee Kuan Yew mengumumkan pemisahan sambil menangis di televisyen

**Kesan:**
- Singapura menjadi republik bebas
- Malaysia kekal dengan 13 negeri
- Hubungan Malaysia-Singapura terus rapat dalam perdagangan dan pertahanan`,
    followUp: ["Siapakah Lee Kuan Yew?","Apakah Peristiwa 13 Mei?","Ceritakan tentang pembentukan Malaysia"]
  },

  // ── SABAH ────────────────────────────────────────────────────────────────
  sabah: {
    keywords: ["sabah","north borneo","borneo utara","berjaya","negeri bawah angin","sabah history","donald stephens","harris salleh"],
    title: "Sejarah Sabah",
    response: `🌴 **Sabah — Negeri Di Bawah Bayu**

**Sejarah awal:**
- Dikenali sebagai **British North Borneo** semasa penjajahan
- Diperintah oleh **Syarikat Berpiagam Borneo Utara British** (1881–1942)
- Dijajah Jepun semasa Perang Dunia Kedua (1941–1945)

**Jalan ke Malaysia:**
- Menjadi **Koloni Mahkota British** pada 1946 selepas Perang Dunia II
- **Referendum Cobbold (1962)** — majoriti rakyat menyokong bergabung dengan Malaysia
- Rasmi bergabung pada **16 September 1963**

**Tokoh penting:**
- **Donald Stephens** (Fuad Stephens) — Ketua Menteri pertama Sabah
- **Harris Salleh** — Ketua Menteri berpengaruh
- **Joseph Pairin Kitingan** — PM pertama dari Kadazan-Dusun

**Tuntutan Filipina:**
- Filipina menuntut Sabah berdasarkan tuntutan Kesultanan Sulu
- Tuntutan ini masih belum diselesaikan secara rasmi

**Budaya:** Pelbagai etnik — Kadazan-Dusun, Bajau, Murut, Cina, dan lain-lain.`,
    followUp: ["Ceritakan tentang pembentukan Malaysia","Apakah Referendum Cobbold?","Siapakah Donald Stephens?"]
  },

  // ── SARAWAK ──────────────────────────────────────────────────────────────
  sarawak: {
    keywords: ["sarawak","brooke","rajah putih","white rajah","bumi kenyalang","kuching","iban","dayak","cession of sarawak"],
    title: "Sejarah Sarawak",
    response: `🦅 **Sarawak — Bumi Kenyalang**

**Era Brooke (Rajah Putih):**
- **James Brooke** dilantik sebagai Rajah pertama Sarawak pada **1841** oleh Sultan Brunei
- Dinasti Brooke memerintah selama lebih **100 tahun**
- Charles Brooke dan Vyner Brooke meneruskan pemerintahan
- Pada **1 Juli 1946**, Vyner Brooke menyerahkan Sarawak kepada British Crown

**Penyerahan kepada British (1946):**
- Keputusan kontroversial — ada yang menyokong, ada yang menentang
- **Duncan Stewart**, Gabenor British dibunuh pada 1949 oleh penentang penyerahan
- Sarawak menjadi Koloni Mahkota British

**Bergabung dengan Malaysia (1963):**
- Referendum mendapati majoriti menyokong
- Rasmi bergabung 16 September 1963
- **Stephen Kalong Ningkan** — Ketua Menteri pertama Sarawak

**Etnik & Budaya:**
- Iban, Bidayuh, Melanau, Melayu, Cina, Penan dan lain-lain
- Terkenal dengan Festival Rainforest World Music`,
    followUp: ["Siapakah James Brooke?","Ceritakan tentang pembentukan Malaysia","Apakah yang berlaku di Sarawak semasa Perang Dunia II?"]
  },

  // ── TUNKU ABDUL RAHMAN ──────────────────────────────────────────────────
  tunku: {
    keywords: ["tunku","tunku abdul rahman","bapa malaysia","perdana menteri pertama","pm pertama","tunku ar"],
    title: "Tunku Abdul Rahman — Bapa Malaysia",
    response: `👨‍💼 **Tunku Abdul Rahman Putra Al-Haj (1903–1990)**

**Bapa Malaysia** — Perdana Menteri pertama Persekutuan Tanah Melayu dan Malaysia.

**Latar belakang:**
- Dilahirkan pada **8 Februari 1903** di Alor Setar, Kedah
- Putera Raja Kedah, Tunku Abdul Hamid Halim
- Belajar di Universiti Cambridge, England

**Sumbangan utama:**
- Memimpin **rundingan kemerdekaan** di London pada 1956
- Mengisytiharkan kemerdekaan pada **31 Ogos 1957**
- Menubuhkan **perikatan kaum** (UMNO-MCA-MIC) — model perpaduan unik
- Memperjuangkan penubuhan **Malaysia** pada 1963
- Penuntut **kedaulatan** melalui diplomasi aman

**Jawatan yang disandang:**
- Presiden UMNO (1951–1971)
- Perdana Menteri pertama (1957–1970)
- Setiausaha Agung OIC pertama (1970–1973)

**Kata-kata terkenal:**
> *"Kita hendak hidup rukun damai, kita hendak maju dan kita hendak berjaya sebagai satu bangsa yang besar."*

Tunku meninggal dunia pada **6 Disember 1990** di Kuala Lumpur.`,
    followUp: ["Apakah Peristiwa 13 Mei 1969?","Siapakah Tun Abdul Razak?","Ceritakan tentang kemerdekaan Malaysia"]
  },

  // ── TUN ABDUL RAZAK ─────────────────────────────────────────────────────
  razak: {
    keywords: ["tun razak","abdul razak","bapa pembangunan","razak hussein","pm kedua","perdana menteri kedua","dasar ekonomi baru","deb"],
    title: "Tun Abdul Razak — Bapa Pembangunan",
    response: `👨‍💼 **Tun Abdul Razak Hussein (1922–1976)**

**Bapa Pembangunan** — Perdana Menteri Malaysia yang ke-2.

**Latar belakang:**
- Dilahirkan pada **11 Mac 1922** di Pekan, Pahang
- Menerima pendidikan undang-undang di Lincoln's Inn, London

**Sumbangan utama:**
- Menggantikan Tunku selepas **Peristiwa 13 Mei 1969**
- Memperkenalkan **Dasar Ekonomi Baru (DEB)** pada 1971 — untuk menghapus kemiskinan dan menyusun semula masyarakat
- Menubuhkan **FELDA** (Federal Land Development Authority) untuk membantu petani
- Menggubal **Rukun Negara** (1970) — prinsip perpaduan negara
- Menubuhkan **ASEAN** bersama negara-negara jiran (1967, semasa beliau Timbalan PM)
- Mengisytiharkan Malaysia sebagai **Zon Aman, Bebas dan Berkecuali (ZOPFAN)**

**Meninggal dunia:**
- Tun Razak meninggal pada **14 Januari 1976** akibat leukemia semasa masih menjawat jawatan PM
- Digantikan oleh Tun Hussein Onn`,
    followUp: ["Apakah Dasar Ekonomi Baru?","Apakah Peristiwa 13 Mei 1969?","Siapakah Tun Hussein Onn?"]
  },

  // ── MAHATHIR ─────────────────────────────────────────────────────────────
  mahathir: {
    keywords: ["mahathir","dr mahathir","bapa pemodenan","perdana menteri keempat","pm keempat","pm4","mahathir mohamad","tun mahathir","wawasan 2020"],
    title: "Tun Dr. Mahathir Mohamad",
    response: `👨‍💼 **Tun Dr. Mahathir Mohamad (lahir 1925)**

**Bapa Pemodenan Malaysia** — Perdana Menteri ke-4 (1981–2003) dan ke-7 (2018–2020).

**Latar belakang:**
- Dilahirkan pada **10 Juli 1925** di Alor Setar, Kedah
- Doktor perubatan — graduan Kolej Perubatan King Edward VII

**Pencapaian semasa PM ke-4 (1981–2003):**
- Melancarkan **Wawasan 2020** — matlamat Malaysia menjadi negara maju
- Membina **KLCC (Menara Petronas)** — pernah bangunan tertinggi dunia
- Membangunankan **Putrajaya** sebagai pusat pentadbiran baru
- Memperkenalkan **Proton** (1983) — kereta nasional
- Membina **KLIA, Lebuhraya PLUS**, dan MSC Malaysia
- Krisis ekonomi 1997 — **melawan spekulan matawang**, menolak syarat IMF

**Penggal kedua (2018–2020):**
- Menang PRU14 bersama Pakatan Harapan — kejutan terbesar dalam sejarah pilihan raya Malaysia
- Menjadi PM tertua di dunia ketika itu (92 tahun)
- Meletak jawatan Februari 2020 — tercetusnya **Sheraton Move**`,
    followUp: ["Apakah Wawasan 2020?","Ceritakan tentang Menara Petronas","Apakah krisis ekonomi 1997?"]
  },

  // ── PERISTIWA 13 MEI ────────────────────────────────────────────────────
  tigabelas: {
    keywords: ["13 mei","13 may","rusuhan kaum","1969","tragedi","darurat 1969","racial riot","peristiwa hitam"],
    title: "Peristiwa 13 Mei 1969",
    response: `⚠️ **Peristiwa 13 Mei 1969**

Tragedi hitam dalam sejarah Malaysia — rusuhan kaum yang berlaku selepas pilihan raya umum 1969.

**Latar belakang:**
- PRU 1969 menyaksikan keputusan yang mengejutkan — pembangkang menang banyak kerusi
- Tunjuk perasaan kemenangan oleh parti pembangkang mencetuskan ketegangan
- **13 Mei 1969** — rusuhan kaum meletus di Kuala Lumpur

**Kesan segera:**
- Berpuluh-puluh nyawa terkorban (jumlah rasmi 196, anggaran tidak rasmi lebih tinggi)
- **Darurat diisytiharkan** — Parlimen digantung
- **Majlis Gerakan Negara (MAGERAN)** ditubuhkan — diterajui Tun Abdul Razak

**Kesan jangka panjang:**
- **Rukun Negara** digubal (1970) — prinsip perpaduan
- **Dasar Ekonomi Baru (DEB)** dilancarkan 1971 — menyusun semula ekonomi untuk mengurangkan jurang
- Akta Hasutan diperkukuh — isu sensitif kaum tidak boleh dipertikaikan secara terbuka

Peristiwa ini menjadi titik tolak perubahan dasar negara ke arah perpaduan dan kesaksamaan ekonomi.`,
    followUp: ["Apakah Dasar Ekonomi Baru?","Siapakah Tun Abdul Razak?","Apakah Rukun Negara?"]
  },

  // ── PENJAJAHAN BRITISH ──────────────────────────────────────────────────
  british: {
    keywords: ["british","penjajah","penjajahan","kolonial","colonial","raffles","stamford raffles","penang","pulau pinang","francis light","perak treaty","perjanjian pangkor","federated malay states","unfederated","residen"],
    title: "Penjajahan British di Tanah Melayu",
    response: `🏴󠁧󠁢󠁥󠁮󠁧󠁿 **Penjajahan British di Tanah Melayu**

**Peringkat awal penjajahan:**
- **1786** — Francis Light menduduki **Pulau Pinang** — permulaan penguasaan British
- **1819** — Stamford Raffles menubuhkan **Singapura**
- **1824** — **Perjanjian Anglo-Belanda** — pembahagian Nusantara antara British dan Belanda
- **1826** — **Negeri-Negeri Selat** (Penang, Melaka, Singapura) ditubuhkan

**Campur tangan dalaman:**
- **1874** — **Perjanjian Pangkor** dengan Perak — sistem Residen diperkenalkan
- British campur tangan dalam urusan dalaman negeri Melayu
- Sistem Residen memastikan kuasa sebenar di tangan British

**Negeri-Negeri Melayu Bersekutu (1896):**
- Perak, Selangor, Pahang, Negeri Sembilan bergabung
- Pusat pentadbiran: **Kuala Lumpur**

**Perang Dunia II (1941–1945):**
- Jepun menyerang Tanah Melayu pada **8 Disember 1941**
- British menyerah kalah di Singapura pada **15 Februari 1942**
- Pendudukan Jepun selama **3 tahun 8 bulan**`,
    followUp: ["Ceritakan tentang Malayan Union","Apakah Darurat 1948?","Siapakah Francis Light?"]
  },

  // ── MALAYAN UNION ────────────────────────────────────────────────────────
  malayanUnion: {
    keywords: ["malayan union","kesatuan malaya","1946","orang melayu bantah","umno ditubuh","penentangan","mcm"],
    title: "Malayan Union (1946)",
    response: `🔴 **Malayan Union (1946) — Penentangan Orang Melayu**

**Apakah Malayan Union?**
British mencadangkan penubuhan **Malayan Union** pada 1946 — menyatukan semua negeri Melayu di bawah satu kerajaan pusat, mengurangkan kuasa Raja-Raja Melayu dan memberi kerakyatan mudah kepada bukan-Melayu.

**Penentangan hebat:**
- Orang Melayu menentang dengan keras — bangkit bersatu
- Majlis-majlis melayu di seluruh negara mengadakan bantahan
- **Dato' Onn Jaafar** memimpin penentangan

**Penubuhan UMNO:**
- **11 Mei 1946** — **UMNO (United Malays National Organisation)** ditubuhkan
- Dato' Onn Jaafar menjadi Presiden pertama
- UMNO berjaya menggugurkan Malayan Union

**Penggantian:**
- Malayan Union dimansuhkan pada **1948**
- Digantikan dengan **Persekutuan Tanah Melayu 1948** — mengembalikan kedudukan Raja-Raja Melayu dan hak istimewa Melayu`,
    followUp: ["Apakah Darurat 1948?","Siapakah Dato Onn Jaafar?","Ceritakan tentang kemerdekaan Malaysia"]
  },

  // ── DARURAT 1948 ─────────────────────────────────────────────────────────
  darurat: {
    keywords: ["darurat","emergency","komunis","pkm","parti komunis malaya","chin peng","perang hutan","malayan emergency","1948","guerilla"],
    title: "Darurat Malaya (1948–1960)",
    response: `⚔️ **Darurat Malaya (1948–1960)**

**Pencetus darurat:**
- **Parti Komunis Malaya (PKM)** dipengaruhi komunisme mula melancarkan pemberontakan bersenjata
- Tiga pengurus estet British dibunuh di Sungai Siput, Perak pada **16 Jun 1948**
- British mengisytiharkan **Darurat** pada 17 Jun 1948

**Strategi PKM:**
- Perang gerila di hutan — menyerang estet, lombong, dan infrastruktur
- Ketua PKM: **Chin Peng**
- Dikenali sebagai "Min Yuen" — rangkaian sokongan awam

**Tindak balas British:**
- **Pelan Briggs (1950)** — memindahkan penduduk luar bandar ke "Kampung Baru" yang dilindungi (Kawasan Berkumpul Baru)
- Operasi ketenteraan besar-besaran di hutan
- **Perisytiharan Baling (1955)** — rundingan Tunku-Chin Peng gagal

**Penamat darurat:**
- Darurat ditamatkan secara rasmi pada **31 Julai 1960**
- PKM terus aktif di sempadan Thai-Malaysia sehingga **2 Disember 1989** — perjanjian damai ditandatangani`,
    followUp: ["Siapakah Chin Peng?","Apakah Pelan Briggs?","Ceritakan tentang kemerdekaan Malaysia"]
  },

  // ── PERANG DUNIA II DI MALAYA ────────────────────────────────────────────
  perangDunia: {
    keywords: ["perang dunia","world war","jepun","japanese","pendudukan jepun","wwii","ww2","1941","1942","singapore falls","british surrender","bintang tiga"],
    title: "Perang Dunia II di Tanah Melayu (1941–1945)",
    response: `⚔️ **Pendudukan Jepun di Tanah Melayu (1941–1945)**

**Serangan Jepun:**
- **8 Disember 1941** — Jepun mendarat di Kota Bharu, Kelantan
- Serangan dilakukan serentak dengan serangan Pearl Harbor
- Jepun bergerak pantas ke selatan melalui Semenanjung
- **31 Januari 1942** — British berundur ke Singapura

**Kejatuhan Singapura:**
- **15 Februari 1942** — British menyerah kalah kepada Jeneral Yamashita
- Winston Churchill menyebutnya sebagai "kekalaman paling besar dalam sejarah British"
- 100,000 tentera British, Australia, dan India ditawan

**Pendudukan Jepun (1942–1945):**
- Tanah Melayu dinamakan semula **Malai** oleh Jepun
- Kekejaman terhadap penduduk Cina — **Sook Ching** (pembersihan etnik)
- Kebuluran dan kerja paksa
- **MPAJA** (Malayan People's Anti-Japanese Army) menentang penjajahan Jepun

**Kemerdekaan Jepun:**
- Bom atom dijatuhkan di Hiroshima (6 Ogos) dan Nagasaki (9 Ogos 1945)
- Jepun menyerah kalah pada **15 Ogos 1945**`,
    followUp: ["Apakah yang berlaku selepas Jepun kalah?","Ceritakan tentang MPAJA","Apakah Darurat 1948?"]
  },

  // ── PERLEMBAGAAN ────────────────────────────────────────────────────────
  perlembagaan: {
    keywords: ["perlembagaan","constitution","artikel 153","article 153","kontrak sosial","social contract","hak istimewa","kerakyatan","citizenship","federal constitution","undang-undang tubuh","parlimen","dewan rakyat","dewan negara"],
    title: "Perlembagaan Persekutuan Malaysia",
    response: `📜 **Perlembagaan Persekutuan Malaysia**

**Sejarah:**
- Digubal oleh **Suruhanjaya Reid** (1956–1957)
- Berkuat kuasa pada **Hari Merdeka, 31 Ogos 1957**
- Berdasarkan model Westminster Britain

**Prinsip utama:**
- **Demokrasi berparlimen** — rakyat memilih wakil melalui pilihan raya
- **Raja Berperlembagaan** — Yang di-Pertuan Agong sebagai ketua negara
- **Persekutuan** — pembahagian kuasa antara kerajaan persekutuan dan negeri

**Peruntukan penting:**
- **Artikel 153** — Hak istimewa Orang Melayu dan Bumiputera (bahagian "kontrak sosial")
- **Artikel 152** — Bahasa Melayu sebagai bahasa kebangsaan
- **Artikel 3** — Islam sebagai agama rasmi persekutuan
- **Artikel 10** — Kebebasan asasi (bercakap, berhimpun, berpersatuan)

**Kontrak Sosial:**
Merupakan persetujuan tidak bertulis antara kaum — Melayu/Bumiputera mendapat hak istimewa, manakala bukan-Melayu mendapat kerakyatan. Prinsip ini menjadi asas negara berbilang kaum.`,
    followUp: ["Apakah Rukun Negara?","Ceritakan tentang sistem beraja Malaysia","Apakah hak asasi dalam perlembagaan?"]
  },

  // ── RUKUN NEGARA ─────────────────────────────────────────────────────────
  rukunNegara: {
    keywords: ["rukun negara","national principles","kepercayaan kepada tuhan","kesetiaan","kedaulatan undang","kesopanan","1970"],
    title: "Rukun Negara",
    response: `🏛️ **Rukun Negara (1970)**

Diisytiharkan pada **31 Ogos 1970** sempena ulang tahun ke-13 kemerdekaan, selepas Peristiwa 13 Mei 1969.

**Lima Prinsip Rukun Negara:**

1. 🕌 **Kepercayaan kepada Tuhan**
   Rakyat Malaysia percaya kepada keagungan Tuhan

2. 👑 **Kesetiaan kepada Raja dan Negara**
   Taat setia kepada Yang di-Pertuan Agong dan Raja-Raja Melayu

3. ⚖️ **Keluhuran Perlembagaan**
   Menjunjung dan mempertahankan perlembagaan

4. 🏛️ **Kedaulatan Undang-Undang**
   Semua rakyat sama di sisi undang-undang

5. 🤝 **Kesopanan dan Kesusilaan**
   Tingkah laku mulia, menghormati satu sama lain

**Tujuan:**
- Membentuk perpaduan kaum selepas tragedi 13 Mei
- Menjadi panduan hidup bermasyarakat
- Mewujudkan identiti kebangsaan yang kukuh`,
    followUp: ["Apakah Peristiwa 13 Mei 1969?","Ceritakan tentang Perlembagaan Persekutuan","Apakah Wawasan 2020?"]
  },

  // ── DASAR EKONOMI BARU ───────────────────────────────────────────────────
  deb: {
    keywords: ["dasar ekonomi baru","deb","new economic policy","nep","bumiputera","1971","kemiskinan","menyusun semula masyarakat","30 peratus","ekuiti"],
    title: "Dasar Ekonomi Baru (DEB) 1971",
    response: `📊 **Dasar Ekonomi Baru (DEB) — 1971–1990**

Dilancarkan oleh Tun Abdul Razak pada **1971** selepas Peristiwa 13 Mei 1969.

**Dua matlamat utama:**
1. **Membasmi kemiskinan** — tanpa mengira kaum
2. **Menyusun semula masyarakat** — menghapus pengenalan kaum mengikut fungsi ekonomi

**Sasaran:**
- Ekuiti Bumiputera ditingkatkan kepada **30%** (daripada 2.4% pada 1970)
- Kemiskinan dikurangkan kepada **16.7%** (daripada 49.3%)
- Penglibatan aktif Bumiputera dalam semua sektor ekonomi

**Instrumen DEB:**
- **MARA** — membantu Bumiputera dalam perniagaan dan pendidikan
- **FELDA** — pembangunan tanah dan pertanian
- **PNB (Permodalan Nasional Bhd)** — amanah saham Bumiputera
- Kuota masuk universiti dan biasiswa

**Keputusan DEB (1990):**
- Ekuiti Bumiputera meningkat kepada ~20% (tidak mencapai 30%)
- Kemiskinan berkurangan dengan ketara
- Kelas menengah Bumiputera berkembang pesat`,
    followUp: ["Siapakah Tun Abdul Razak?","Apakah Peristiwa 13 Mei 1969?","Apakah Dasar Pembangunan Nasional?"]
  },

  // ── WAWASAN 2020 ─────────────────────────────────────────────────────────
  wawasan2020: {
    keywords: ["wawasan 2020","vision 2020","negara maju","developed nation","mahathir wawasan","bangsa malaysia","1991"],
    title: "Wawasan 2020",
    response: `🚀 **Wawasan 2020**

Dilancarkan oleh **Tun Dr. Mahathir** pada **28 Februari 1991** di Persidangan Perniagaan Malaysia pertama.

**Matlamat:**
Malaysia menjadi **negara maju sepenuhnya** menjelang tahun 2020 — dalam semua dimensi:
- Ekonomi
- Sosial
- Psikologi
- Politik
- Kerohanian

**9 Cabaran Wawasan 2020:**
1. Mewujudkan bangsa bersatu
2. Mewujudkan masyarakat berjiwa bebas
3. Mewujudkan masyarakat demokratik yang matang
4. Mewujudkan masyarakat bermoral
5. Mewujudkan masyarakat liberal dan bertolak ansur
6. Mewujudkan masyarakat saintifik dan progresif
7. Mewujudkan masyarakat penyayang
8. Mewujudkan masyarakat adil ekonomi
9. Mewujudkan masyarakat makmur

**Pencapaian & Cabaran:**
- Ekonomi Malaysia berkembang pesat — KLCC, KLIA, Putrajaya, MSC
- Krisis ekonomi 1997–98 melambatkan kemajuan
- Malaysia tidak mencapai status negara maju penuh menjelang 2020`,
    followUp: ["Siapakah Tun Dr. Mahathir?","Apakah Menara Petronas?","Apakah Dasar Pembangunan Nasional?"]
  },

  // ── MELAKA ───────────────────────────────────────────────────────────────
  melaka: {
    keywords: ["melaka","malacca","kesultanan melaka","parameswara","hang tuah","portugis","dutch","bendahara","tun perak","1511"],
    title: "Kesultanan Melayu Melaka",
    response: `⚓ **Kesultanan Melayu Melaka (1400–1511)**

**Penubuhan:**
- Diasaskan oleh **Parameswara** (Pangeran dari Palembang) sekitar **1400**
- Dipilih lokasi Melaka kerana kedudukan strategik — angin monsun membolehkan perdagangan dua hala
- Memeluk Islam — Melaka menjadi pusat penyebaran Islam di rantau ini

**Zaman kegemilangan:**
- Di bawah pemerintahan **Sultan Mansur Shah** dan **Tun Perak** (Bendahara agung)
- Pelabuhan Melaka menjadi **pusat perdagangan terpenting** di Asia Tenggara
- Lebih 80 bahasa digunakan di Melaka
- Sistem pentadbiran canggih — Bendahara, Temenggung, Laksamana

**Tokoh terkenal:**
- **Hang Tuah** — Laksamana ulung, simbol kesetiaan Melayu
- **Tun Perak** — Bendahara paling berpengaruh
- **Hang Jebat** — sahabat Hang Tuah, simbol keberanian

**Kejatuhan Melaka (1511):**
- **Portugis** di bawah Afonso de Albuquerque menyerang Melaka
- Sultan Mahmud Shah tewas dan melarikan diri
- Melaka jatuh ke tangan Portugis — menamatkan zaman Kesultanan Melayu Melaka`,
    followUp: ["Siapakah Hang Tuah?","Apa yang berlaku selepas Melaka jatuh?","Ceritakan tentang penjajahan Portugis"]
  },

  // ── FAKTA MENARIK ─────────────────────────────────────────────────────────
  faktaMenarik: {
    keywords: ["fakta","fact","menarik","interesting","tahukah","did you know","trivia","unik","sejarah unik"],
    title: "Fakta Menarik Sejarah Malaysia",
    response: `✨ **Fakta Menarik Sejarah Malaysia**

1. 🏙️ **Kuala Lumpur** bermaksud "muara berlumpur" dalam Bahasa Melayu — dinamakan sempena lokasi pertemuan Sungai Klang dan Sungai Gombak

2. 🌴 **Nama "Malaysia"** — "Malaya" berasal dari bahasa Sanskrit bermaksud "tanah bergunung-ganang"

3. 🏳️ **Jalur Gemilang** mempunyai **14 jalur** dan **14 penjuru bintang** — mewakili 13 negeri + kerajaan persekutuan

4. 🦅 **Jata Negara** (lambang Malaysia) mengandungi 14 bintang di perisai — mewakili 13 negeri + wilayah persekutuan

5. 🕌 **Masjid Kristal** di Terengganu — dibina daripada keluli dan kaca, menampilkan seni bina Islam moden

6. 🌋 **Gunung Kinabalu** (4,095m) di Sabah adalah gunung tertinggi di Asia Tenggara (di luar kawasan Himalaya)

7. 🌿 **Hutan Malaysia** berusia kira-kira 130 juta tahun — antara hutan tertua di dunia

8. 🏆 **Malaysia** pernah memegang rekod dunia — jambatan terpanjang (Penang Bridge, 1985), bangunan tertinggi (KLCC, 1998)

9. 📜 **Batu Bersurat Terengganu** (abad ke-14) adalah bukti bertulis Islam tertua di Asia Tenggara

10. 🎯 **Wau bulan** (layang-layang bulan sabit) — simbol kebudayaan Kelantan yang diiktiraf UNESCO`,
    followUp: ["Ceritakan tentang Gunung Kinabalu","Apakah Jalur Gemilang?","Ceritakan tentang Menara Petronas"]
  },

  // ── GARIS MASA ───────────────────────────────────────────────────────────
  garisMasa: {
    keywords: ["garis masa","timeline","kronologi","chronology","sejarah ringkas","ringkasan sejarah","tarikh penting","important dates"],
    title: "Garis Masa Sejarah Malaysia",
    response: `📅 **Garis Masa Sejarah Malaysia**

**Zaman Awal:**
- ~**1400** — Parameswara menubuhkan Kesultanan Melaka
- **1511** — Portugis menakluki Melaka
- **1641** — Belanda mengambil alih Melaka dari Portugis
- **1786** — British menduduki Pulau Pinang (Francis Light)

**Era British:**
- **1819** — Raffles menubuhkan Singapura
- **1824** — Perjanjian Anglo-Belanda
- **1826** — Negeri-Negeri Selat ditubuhkan
- **1874** — Perjanjian Pangkor (British masuk ke Perak)
- **1896** — Negeri-Negeri Melayu Bersekutu

**Perang & Darurat:**
- **1941–45** — Pendudukan Jepun
- **1946** — Malayan Union (ditentang)
- **1948** — Darurat diisytiharkan
- **1955** — Pilihan raya persekutuan pertama

**Merdeka & Selepasnya:**
- **31 Ogos 1957** — Kemerdekaan Tanah Melayu
- **16 September 1963** — Penubuhan Malaysia
- **9 Ogos 1965** — Singapura berpisah
- **13 Mei 1969** — Rusuhan kaum
- **1970** — Rukun Negara & DEB
- **1981–2003** — Era Mahathir & Wawasan 2020
- **1997** — Krisis kewangan Asia
- **2018** — PRU14 — Pakatan Harapan menang`,
    followUp: ["Ceritakan tentang kemerdekaan 1957","Apakah yang berlaku pada 13 Mei?","Ceritakan tentang pembentukan Malaysia"]
  },

  // ── TOKOH ─────────────────────────────────────────────────────────────────
  tokoh: {
    keywords: ["tokoh","figure","siapakah","who is","pemimpin","leader","pahlawan","hero","pejuang"],
    title: "Tokoh-Tokoh Sejarah Malaysia",
    response: `👥 **Tokoh-Tokoh Sejarah Malaysia**

**Bapa Kemerdekaan & Negara Bangsa:**
- 👨‍💼 **Tunku Abdul Rahman** — Bapa Malaysia, PM pertama
- 👨‍💼 **Tun Abdul Razak** — Bapa Pembangunan, PM ke-2
- 👨‍💼 **Tun Hussein Onn** — Bapa Perpaduan, PM ke-3
- 👨‍💼 **Tun Dr. Mahathir** — Bapa Pemodenan, PM ke-4 & ke-7

**Pejuang Kemerdekaan:**
- 🦁 **Dato' Onn Jaafar** — Pengasas UMNO, penentang Malayan Union
- ✊ **Burhanuddin Al-Helmy** — Pemimpin nasionalis Melayu
- 📚 **Tan Cheng Lock** — Pemimpin MCA, wakil kaum Cina

**Zaman Melaka:**
- ⚔️ **Hang Tuah** — Laksamana legenda Melayu
- 👑 **Tun Perak** — Bendahara Agung Melaka
- 🌟 **Parameswara** — Pengasas Kesultanan Melaka

**Wanita Berpengaruh:**
- 👸 **Tok Puan Habsah** — Pejuang wanita dari Perak
- 💪 **Shamsiah Fakeh** — Pemimpin wanita dalam perjuangan nasionalisme

Taip nama mana-mana tokoh untuk maklumat lanjut!`,
    followUp: ["Siapakah Tunku Abdul Rahman?","Siapakah Hang Tuah?","Siapakah Tun Razak?"]
  },

  // ── ENGLISH MODE ─────────────────────────────────────────────────────────
  english: {
    keywords: ["english","in english","bahasa inggeris","speak english","reply in english","answer in english"],
    title: "English Mode",
    response: `🇬🇧 **English mode activated!**

I can respond in English. Here's what I can help you with:

- 📖 **Malaysian History Q&A** — events, dates, causes and effects
- 📅 **Historical Timeline** — chronological events from Melaka to modern Malaysia
- 👤 **Historical Figures** — profiles of key leaders and personalities
- 🧠 **Interactive Quiz** — test your knowledge with scored questions
- ✨ **Interesting Facts** — surprising historical trivia

**Try asking:**
- "Tell me about independence 1957"
- "Who was Tunku Abdul Rahman?"
- "What happened on 13 May 1969?"
- "Show me the Malaysian history timeline"
- "Start a quiz"`,
    followUp: ["Tell me about independence 1957","Who was Tunku Abdul Rahman?","Start a quiz"]
  },

  // ── KUIZ ─────────────────────────────────────────────────────────────────
  kuiz: {
    keywords: ["kuiz","quiz","soal","test","ujian","cuba soal","mula kuiz","start quiz","play quiz","main kuiz"],
    title: "Kuiz Sejarah",
    response: `🧠 **Kuiz Sejarah Malaysia**

Uji pengetahuan anda dengan kuiz interaktif! Terdapat **soalan pelbagai pilihan** dengan jawapan dan penjelasan.

Pilih tahap kesukaran:`,
    isQuizTrigger: true,
    followUp: ["Kuiz Mudah (5 soalan)","Kuiz Sederhana (10 soalan)","Kuiz Sukar (10 soalan)"]
  }
};

// ── Fallback responses ────────────────────────────────────────────────────────
const FALLBACKS = [
  "Maaf, saya tidak faham soalan anda. Boleh anda tanya dengan cara lain? Contohnya: \"Ceritakan tentang kemerdekaan Malaysia\" atau \"Siapakah Tunku Abdul Rahman?\"",
  "Saya tidak pasti apa yang anda maksudkan. Cuba tanya tentang: kemerdekaan 1957, pembentukan Malaysia, Peristiwa 13 Mei, tokoh sejarah, atau minta kuiz sejarah.",
  "Soalan anda di luar skop pangkalan pengetahuan saya. Saya hanya boleh menjawab soalan berkaitan **sejarah Malaysia**. Cuba tanya: \"Apakah garis masa sejarah Malaysia?\" atau \"Ceritakan tentang Malayan Union\"."
];

// ── State ─────────────────────────────────────────────────────────────────────
let consecutiveFallbacks = 0;
let isQuizMode = false;

// ── DOM refs ──────────────────────────────────────────────────────────────────
const messageList = document.getElementById("messageList");
const userInput   = document.getElementById("userInput");
const sendBtn     = document.getElementById("sendBtn");
const resetBtn    = document.getElementById("resetBtn");
const noticeBanner = document.getElementById("noticeBanner");
const noticeDismiss = document.getElementById("noticeDismiss");

// ── Helpers ───────────────────────────────────────────────────────────────────

function nowTime() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function markdownToHtml(text) {
  let html = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Bold / italic
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/__(.+?)__/g, "<strong>$1</strong>");
  html = html.replace(/\*([^*\n]+)\*/g, "<em>$1</em>");
  html = html.replace(/_([^_\n]+)_/g, "<em>$1</em>");

  // Blockquote
  html = html.replace(/^&gt;\s*(.+)$/gm, "<blockquote>$1</blockquote>");

  const lines = html.split("\n");
  const result = [];
  let inUl = false, inOl = false;

  lines.forEach(line => {
    const ulMatch = line.match(/^[\s]*[-*]\s+(.+)/);
    const olMatch = line.match(/^[\s]*\d+\.\s+(.+)/);
    const hrMatch = line.match(/^---+$/);
    const h3Match = line.match(/^###\s+(.+)/);

    if (hrMatch) {
      if (inUl) { result.push("</ul>"); inUl = false; }
      if (inOl) { result.push("</ol>"); inOl = false; }
      result.push("<hr>");
    } else if (h3Match) {
      if (inUl) { result.push("</ul>"); inUl = false; }
      if (inOl) { result.push("</ol>"); inOl = false; }
      result.push(`<h3>${h3Match[1]}</h3>`);
    } else if (ulMatch) {
      if (!inUl) { result.push("<ul>"); inUl = true; }
      if (inOl)  { result.push("</ol>"); inOl = false; }
      result.push(`<li>${ulMatch[1]}</li>`);
    } else if (olMatch) {
      if (!inOl) { result.push("<ol>"); inOl = true; }
      if (inUl)  { result.push("</ul>"); inUl = false; }
      result.push(`<li>${olMatch[1]}</li>`);
    } else {
      if (inUl) { result.push("</ul>"); inUl = false; }
      if (inOl) { result.push("</ol>"); inOl = false; }
      result.push(line === "" ? "" : `<p>${line}</p>`);
    }
  });

  if (inUl) result.push("</ul>");
  if (inOl) result.push("</ol>");

  return result.join("\n");
}

function appendBubble(direction, text, quickReplies) {
  const row = document.createElement("div");
  row.className = `bubble-row ${direction}`;

  const bubble = document.createElement("div");
  bubble.className = "bubble";

  if (direction === "incoming") {
    bubble.innerHTML = markdownToHtml(text);
    if (quickReplies && quickReplies.length) {
      const qr = document.createElement("div");
      qr.className = "quick-replies";
      quickReplies.forEach(label => {
        const chip = document.createElement("button");
        chip.className = "quick-chip";
        chip.textContent = label;
        chip.addEventListener("click", () => {
          userInput.value = label;
          sendMessage();
        });
        qr.appendChild(chip);
      });
      bubble.appendChild(qr);
    }
  } else {
    bubble.textContent = text;
  }

  const time = document.createElement("div");
  time.className = "bubble-time";
  time.textContent = nowTime();
  bubble.appendChild(time);

  row.appendChild(bubble);
  messageList.appendChild(row);
  scrollToBottom();
  return row;
}

function showTyping() {
  const row = document.createElement("div");
  row.className = "bubble-row incoming";
  row.id = "typingRow";
  const indicator = document.createElement("div");
  indicator.className = "typing-indicator";
  indicator.innerHTML = "<span></span><span></span><span></span>";
  row.appendChild(indicator);
  messageList.appendChild(row);
  scrollToBottom();
}

function hideTyping() {
  const el = document.getElementById("typingRow");
  if (el) el.remove();
}

function scrollToBottom() {
  messageList.scrollTop = messageList.scrollHeight;
}

// ── Knowledge base lookup ─────────────────────────────────────────────────────

function findKBEntry(input) {
  const q = input.toLowerCase().trim();
  let bestMatch = null;
  let bestScore = 0;

  for (const key of Object.keys(KB)) {
    const entry = KB[key];
    let score = 0;
    for (const kw of entry.keywords) {
      if (q.includes(kw.toLowerCase())) {
        // Longer keyword matches score higher
        score += kw.length;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }

  return bestScore > 0 ? bestMatch : null;
}

// ── Core message handler ──────────────────────────────────────────────────────

function getBotResponse(userText) {
  const match = findKBEntry(userText);

  if (!match) {
    consecutiveFallbacks++;
    const fallbackIdx = Math.min(consecutiveFallbacks - 1, FALLBACKS.length - 1);
    const fallbackText = FALLBACKS[fallbackIdx];

    if (consecutiveFallbacks >= 2) {
      return {
        text: fallbackText + "\n\n👨‍🏫 **Sila hubungi guru atau pembimbing sejarah anda untuk bantuan lanjut.**",
        followUp: ["Paparkan garis masa sejarah","Tunjukkan senarai topik","Mula kuiz sejarah"]
      };
    }
    return {
      text: fallbackText,
      followUp: ["Kemerdekaan 1957","Pembentukan Malaysia","Tokoh sejarah","Garis masa sejarah"]
    };
  }

  consecutiveFallbacks = 0;

  if (match.isQuizTrigger) {
    return {
      text: match.response,
      followUp: match.followUp,
      isQuizTrigger: true
    };
  }

  return {
    text: match.response,
    followUp: match.followUp || []
  };
}

// ── Send / receive ────────────────────────────────────────────────────────────

function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;
  if (isQuizMode) return;

  appendBubble("outgoing", text);
  userInput.value = "";
  userInput.style.height = "auto";
  sendBtn.disabled = true;

  showTyping();

  // Simulate slight processing delay for natural feel
  setTimeout(() => {
    hideTyping();
    const response = getBotResponse(text);
    appendBubble("incoming", response.text, response.followUp);
    sendBtn.disabled = false;
    userInput.focus();
  }, 400 + Math.random() * 300);
}

// ── Event listeners ───────────────────────────────────────────────────────────

sendBtn.addEventListener("click", sendMessage);

userInput.addEventListener("keydown", e => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

userInput.addEventListener("input", () => {
  userInput.style.height = "auto";
  userInput.style.height = Math.min(userInput.scrollHeight, 120) + "px";
});

resetBtn.addEventListener("click", () => {
  messageList.innerHTML = "";
  consecutiveFallbacks = 0;
  if (isQuizMode) {
    window.exitQuiz && window.exitQuiz();
  }
  init();
});

noticeDismiss.addEventListener("click", () => {
  noticeBanner.hidden = true;
});

// ── Quiz integration bridge ────────────────────────────────────────────────────
// Called by quiz.js when a quiz chip is clicked
window.startQuizFromChat = function(difficulty) {
  isQuizMode = true;
  userInput.disabled = true;
  sendBtn.disabled = true;
  window.startQuiz(difficulty);
};

window.onQuizEnd = function(score, total) {
  isQuizMode = false;
  userInput.disabled = false;
  sendBtn.disabled = false;

  const pct = Math.round((score / total) * 100);
  let remark = "";
  if (pct >= 80) remark = "🏆 Cemerlang! Anda seorang pakar sejarah!";
  else if (pct >= 60) remark = "👍 Bagus! Teruskan belajar!";
  else remark = "📚 Jangan putus asa — baca semula dan cuba lagi!";

  appendBubble("incoming",
    `**Kuiz tamat!** Anda mendapat **${score} / ${total}** (${pct}%)\n\n${remark}`,
    ["Cuba kuiz lagi","Ceritakan tentang kemerdekaan","Tunjukkan garis masa sejarah"]
  );
  userInput.focus();
};

// ── Initial welcome ────────────────────────────────────────────────────────────

function init() {
  const welcome = [
    "👋 **Selamat datang ke SejarahBot – Rakan Sejarah Anda!**",
    "",
    "Saya adalah **chatbot berasaskan pangkalan pengetahuan** yang boleh membantu anda belajar sejarah Malaysia. Saya bukan AI generatif — jawapan saya berdasarkan fakta sejarah yang telah diprogramkan.",
    "",
    "Saya boleh membantu anda:",
    "- 📖 Menjawab soalan sejarah Malaysia",
    "- 📅 Memaparkan garis masa peristiwa penting",
    "- 🧑‍🤝‍🧑 Memperkenalkan tokoh-tokoh sejarah",
    "- 🧠 Kuiz sejarah interaktif dengan pemarkahan",
    "- ✨ Fakta menarik tentang sejarah Malaysia",
    "",
    "Taip soalan anda atau pilih topik untuk bermula! 🇲🇾",
  ].join("\n");

  appendBubble("incoming", welcome, [
    "Kemerdekaan 1957 🏳️",
    "Pembentukan Malaysia 🇲🇾",
    "Garis masa sejarah 📅",
    "Mula kuiz 🧠"
  ]);
}

init();
