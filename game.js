// Soruları karıştırma fonksiyonu
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Sorular dizisi
const questions = [
    { question: "Namazın kaç vakti vardır?", answer: "5" },
    { question: "Kur'an'ın ilk suresi nedir?", answer: "Al-Fatiha" },
    { question: "Hac ibadetini yerine getiren kişi hangi şehre gider?", answer: "Mekke" },
    { question: "İslam'ın 5 şartı nedir?", answer: "Şahadet, Namaz, Oruç, Zekat, Hac" },
    { question: "Kur'an-ı Kerim'in son suresi nedir?", answer: "An-Nas" },
    { question: "Ramazan ayında oruç tutma süresi kaç gündür?", answer: "29-30" },
    { question: "Hangi ayda oruç tutulur?", answer: "Ramazan" },
    { question: "İslam'da sağ el ile yapılan işlerin başında hangi iş gelir?", answer: "Namaz" },
    { question: "Kurban Bayramı hangi günde başlar?", answer: "Zilhicce'nin 10. günü" },
    { question: "Peygamber Efendimizin annesinin adı nedir?", answer: "Amine" },
    { question: "Kur'an'da kaç sure vardır?", answer: "114" },
    { question: "Peygamberimiz Mekke'den nereye hicret etmiştir?", answer: "Medine" },
    { question: "İslam'ın ilk kızı kimdir?", answer: "Fatıma" },
    { question: "Şahadet kelimesi ne demektir?", answer: "Allah'tan başka ilah yoktur, Muhammed Allah'ın elçisidir" },
    { question: "İslam dini hangi şehirde doğmuştur?", answer: "Mekke" },
    { question: "Ağaçlara ne denir?", answer: "Şecere" },
    { question: "İslam'da zorunlu olan ibadetler nelerdir?", answer: "Namaz, oruç, zekat, hac" },
    { question: "İlk müslüman kadının adı nedir?", answer: "Hatice" },
    { question: "İslam'da helal ve haram nedir?", answer: "Helal, yapılması uygun olan şey; Haram, yapılması yasak olan şey" },
    { question: "Peygamberimiz ne zaman vefat etmiştir?", answer: "632" },
    { question: "Hangi kitap Müslümanların kutsal kitabıdır?", answer: "Kur'an-ı Kerim" },
    { question: "Kur'an'ın ilk vahyi hangi mağarada inmiştir?", answer: "Hira Mağarası" },
    { question: "Mekke'nin fethinden önce Peygamberimiz nereye hicret etmiştir?", answer: "Medine" },
    { question: "İslam'da hangi inanç esasları vardır?", answer: "Allah'a inanmak, Meleklere inanmak, Kitaplara inanmak, Peygamberlere inanmak, Ahirete inanmak, Kaderin hayır ve şerrine inanmak" },
    { question: "Oruç tutarken hangi şeyler orucu bozar?", answer: "Yemek içmek, cinsel ilişki, kusma" },
    { question: "İslam'ın son peygamberi kimdir?", answer: "Muhammed" },
    { question: "Kur'an-ı Kerim'in dili nedir?", answer: "Arapça" },
    { question: "İslam'da zekat ne zaman verilmelidir?", answer: "Yılda bir kez, malın belli bir miktarı üzerinden" },
    { question: "Peygamberimiz hangi hayvana binerdi?", answer: "Katır" },
    { question: "İslam'da bayramlar nelerdir?", answer: "Ramazan Bayramı, Kurban Bayramı" }
];

shuffleArray(questions);

let currentQuestionIndex = 0;
let score = 0;
let passesLeft = 5;

window.onload = function () {
    const playerName = localStorage.getItem("username");
    if (!playerName) {
        alert("Kullanıcı adı bulunamadı. Lütfen ana sayfaya dönünüz.");
        window.location.href = "index.html";
        return;
    }
    document.getElementById("playerName").textContent = `Hoşgeldin, ${playerName}!`;
    updatePassButton();
    showQuestion(currentQuestionIndex);
};

function normalizeAnswer(text) {
    // Türkçe karakterleri normal harflere çevir ve küçük harfe al
    const map = { 'ç': 'c', 'ğ': 'g', 'ı': 'i', 'ö': 'o', 'ş': 's', 'ü': 'u' };
    return text.toLowerCase().replace(/[çğıöşü]/g, c => map[c] || c).trim();
}

function showQuestion(index) {
    if (index < questions.length) {
        document.getElementById("question").textContent = questions[index].question;
        document.getElementById("answer").value = "";
        document.getElementById("resultMessage").textContent = "";
        document.getElementById("answer").style.display = "inline-block";

        // Butonları düzenle
        document.getElementById("submitButton").style.display = "inline-block";
        document.getElementById("skipButton").style.display = "none";
        document.getElementById("nextQuestion").style.display = "none";
        document.getElementById("passButton").style.display = "inline-block";
        document.getElementById("collapseButton").style.display = "inline-block";
        document.getElementById("endButton").style.display = "inline-block";

    } else {
        showFinalScreen();
    }
}

function submitAnswer() {
    const userAnswer = normalizeAnswer(document.getElementById("answer").value);
    const correctAnswer = normalizeAnswer(questions[currentQuestionIndex].answer);

    if (userAnswer === correctAnswer) {
        score += 5;
        document.getElementById("resultMessage").textContent = `✅ Tebrikler! 1 taş çekmeye hak kazandın. +5 puan. Toplam puanınız: ${score}`;
        document.getElementById("resultMessage").style.color = "green";

        // Gönder butonu gizlenir, sonraki soru görünür
        document.getElementById("submitButton").style.display = "none";
        document.getElementById("nextQuestion").style.display = "inline-block";
        document.getElementById("skipButton").style.display = "none";
    } else {
        score -= 2;  // Yanlış cevapta 2 puan eksilt
        document.getElementById("resultMessage").innerHTML = `❌ Yanlış cevap!<br>Doğru cevap: <strong>${questions[currentQuestionIndex].answer}</strong><br>-2 puan. Toplam puanınız: ${score}`;
        document.getElementById("resultMessage").style.color = "red";

        // Gönder butonu gizlenir, geç butonu görünür
        document.getElementById("submitButton").style.display = "none";
        document.getElementById("skipButton").style.display = "inline-block";
        document.getElementById("nextQuestion").style.display = "none";
    }
}

function skipQuestion() {
    currentQuestionIndex++;
    showQuestion(currentQuestionIndex);
}

function nextQuestion() {
    currentQuestionIndex++;
    showQuestion(currentQuestionIndex);
}

function usePass() {
    if (passesLeft > 0) {
        passesLeft--;
        currentQuestionIndex++;
        updatePassButton();
        showQuestion(currentQuestionIndex);
    } else {
        alert("Pas hakkınız kalmadı!");
    }
}

function updatePassButton() {
    document.getElementById("passButton").textContent = `Pas (${passesLeft})`;
    if (passesLeft === 0) {
        document.getElementById("passButton").disabled = true;
        document.getElementById("passButton").style.opacity = 0.6;
        document.getElementById("passButton").style.cursor = "default";
    } else {
        document.getElementById("passButton").disabled = false;
        document.getElementById("passButton").style.opacity = 1;
        document.getElementById("passButton").style.cursor = "pointer";
    }
}

function collapseTower() {
    score -= 20;
    // Puan negatif olabilir, izin veriyoruz
    alert("Kule devrildi! 20 puanınız silindi.");
    showFinalScreen();
}

function endGame() {
    if (confirm("Oyunu bitirmek istediğine emin misin?")) {
        showFinalScreen();
    }
}

function showFinalScreen() {
    document.getElementById("question").textContent = `🎉 Oyun bitti! Toplam puanınız: ${score}`;
    document.getElementById("answer").style.display = "none";
    document.getElementById("submitButton").style.display = "none";
    document.getElementById("skipButton").style.display = "none";
    document.getElementById("nextQuestion").style.display = "none";
    document.getElementById("passButton").style.display = "none";
    document.getElementById("collapseButton").style.display = "none";
    document.getElementById("endButton").style.display = "none";
    document.getElementById("resultMessage").textContent = "";
    document.getElementById("playerName").textContent = "Oyuna Katıldığınız İçin Teşekkürler!";
}
