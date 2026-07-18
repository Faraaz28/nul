// =====================================
// 🔐 PASSWORD CONFIG
// =====================================
const CORRECT_PASSWORD = 'bhai';

// =====================================
// 📱 QR CODE CONFIG
// =====================================
// 🔴 QR CODE IMAGE — jo scan karna hai
const QR_IMAGE_URL = 'main qr.png';

// 🔴 SECRET IMAGE — jo password dalne ke baad dikhegi
const SECRET_IMAGE_URL = '';

// =====================================
// 🔐 PASSWORD CHECK (Direct to Hero)
// =====================================
function checkPassword() {
    const input = document.getElementById('passwordInput');
    const errorMsg = document.getElementById('errorMsg');
    const passwordScreen = document.getElementById('passwordScreen');

    const userPassword = input.value.trim().toLowerCase();

    if (userPassword === CORRECT_PASSWORD) {
        errorMsg.textContent = '';
        passwordScreen.classList.add('hide');
        setTimeout(() => {
            passwordScreen.style.display = 'none';
            document.getElementById('heroSection').style.display = 'flex';
            createBalloons();
            startShootingStars();
            startCatPopups();
            startHeroAnimations();
            loadQRImage();
        }, 800);
    } else {
        errorMsg.textContent = '❌ Nhi bhai yee galat password hai';
        input.style.animation = 'shake 0.4s ease-in-out';
        setTimeout(() => {
            input.style.animation = '';
            input.value = '';
            input.focus();
        }, 400);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('passwordInput');
    if (input) {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') checkPassword();
        });
        setTimeout(() => input.focus(), 300);
    }
    
    // 👇 Secret page check — ?secret parameter ke liye
    checkForSecretPage();
});

// =====================================
// 📱 QR CODE — BOTTOM RIGHT
// =====================================
function loadQRImage() {
    if (QR_IMAGE_URL) {
        const img = document.getElementById('qrImageMain');
        if (img) {
            img.src = QR_IMAGE_URL;
            img.style.display = 'block';
            const fallback = document.querySelector('.qr-placeholder-text');
            if (fallback) fallback.style.display = 'none';
        }
    }
}

let qrOpen = false;

function toggleQR() {
    const card = document.getElementById('qrCard');
    qrOpen = !qrOpen;
    if (qrOpen) {
        card.classList.remove('hidden');
        card.classList.add('show');
    } else {
        card.classList.remove('show');
        card.classList.add('hidden');
    }
}

// =====================================
// 📱 SECRET PAGE (QR Scan Handler)
// =====================================
function checkForSecretPage() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('secret')) {
        document.body.innerHTML = `
            <div style="min-height:100vh; background:radial-gradient(ellipse at center, #2d1b69 0%, #0f0c29 100%); display:flex; align-items:center; justify-content:center; padding:20px; font-family:'Poppins',sans-serif;">
                <div style="background:rgba(255,255,255,0.08); backdrop-filter:blur(20px); border:1px solid rgba(255,255,255,0.2); border-radius:20px; padding:40px 30px; text-align:center; max-width:400px; width:100%; animation:bounceIn 0.8s ease;">
                    <div style="font-size:3rem; margin-bottom:10px; animation:pulse 1s infinite;">🔐</div>
                    <h2 style="color:#fff; font-size:1.5rem; margin-bottom:8px;">Secret Surprise!</h2>
                    <p style="color:rgba(255,255,255,0.7); margin-bottom:20px;">Enter password to view secret image</p>
                    <input type="password" id="secretPass" placeholder="Enter password..." style="width:100%; padding:14px; font-size:1rem; background:rgba(255,255,255,0.08); border:2px solid rgba(255,255,255,0.2); border-radius:12px; color:#fff; font-family:'Poppins',sans-serif; text-align:center; margin-bottom:16px; outline:none;">
                    <button onclick="unlockSecret()" style="width:100%; padding:14px; font-size:1rem; background:linear-gradient(135deg, #f093fb, #f5576c); color:#fff; border:none; border-radius:12px; cursor:pointer; font-family:'Poppins',sans-serif; font-weight:600; box-shadow:0 8px 25px rgba(245,87,108,0.4);">Unlock 🔓</button>
                    <p id="secretError" style="margin-top:12px; color:#ff6b6b; font-size:0.9rem; min-height:20px;"></p>
                </div>
            </div>
            <style>
                @keyframes pulse { 0%,100% { transform:scale(1); } 50% { transform:scale(1.2); } }
                @keyframes bounceIn { 0% { transform:scale(0.3); opacity:0; } 60% { transform:scale(1.05); opacity:1; } 100% { transform:scale(1); opacity:1; } }
            </style>
        `;
        
        // Secret password unlock function
        window.unlockSecret = function() {
            const pass = document.getElementById('secretPass').value.trim().toLowerCase();
            if (pass === 'bhai') {
                if (SECRET_IMAGE_URL) {
                    document.body.innerHTML = `
                        <div style="min-height:100vh; background:#0f0c29; display:flex; align-items:center; justify-content:center; padding:20px;">
                            <img src="${SECRET_IMAGE_URL}" alt="Secret Image" style="max-width:100%; max-height:90vh; border-radius:20px; box-shadow:0 20px 60px rgba(0,0,0,0.5);">
                        </div>
                    `;
                } else {
                    document.getElementById('secretError').textContent = '✅ Password  to sahi hai bhai parr............. abhi sahi time nhi hai batane ko !!!!!';
                    document.getElementById('secretError').style.color = '#48dbfb';
                }
            } else {
                document.getElementById('secretError').textContent = '❌ Galat hai bhai password socho na kya hoga??????';
                document.getElementById('secretPass').value = '';
                document.getElementById('secretPass').focus();
            }
        };
        
        // Enter key support for secret page
        document.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && document.getElementById('secretPass')) {
                window.unlockSecret();
            }
        });
    }
}

// =====================================
// 🎈 BALLOONS
// =====================================
function createBalloons() {
    const container = document.getElementById('balloons');
    container.innerHTML = '';
    const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff', '#5f27cd', '#ee5a24', '#0abde3', '#10ac84', '#f368e0', '#f093fb', '#fda085'];
    const catEmojis = ['🐱', '🐈', '💖', '🌹', '🤍', '💞', '🙀', '💖', '🌻'];
    const count = window.innerWidth < 480 ? 8 : 12;

    for (let i = 0; i < count; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        if (i % 4 === 0) {
            balloon.classList.add('cat-balloon');
            balloon.textContent = catEmojis[Math.floor(Math.random() * catEmojis.length)];
            const size = Math.random() * 20 + (window.innerWidth < 480 ? 25 : 35);
            balloon.style.width = size + 'px';
            balloon.style.height = size + 'px';
            balloon.style.fontSize = (size * 0.7) + 'px';
        } else {
            const size = Math.random() * 25 + (window.innerWidth < 480 ? 35 : 45);
            balloon.style.width = size + 'px';
            balloon.style.height = (size * 1.25) + 'px';
            balloon.style.background = colors[Math.floor(Math.random() * colors.length)];
        }
        balloon.style.left = (Math.random() * 92) + '%';
        balloon.style.animationDuration = (Math.random() * 5 + 7) + 's';
        balloon.style.animationDelay = (Math.random() * 8) + 's';
        container.appendChild(balloon);
    }
}

// =====================================
// ✨ SPARKLE + CAT PAW
// =====================================
const sparklesContainer = document.getElementById('sparkles');

function getRandomSparkleColor() {
    const colors = ['#f093fb', '#f5576c', '#fda085', '#f6d365', '#48dbfb', '#ff9ff3', '#54a0ff', '#5f27cd'];
    return colors[Math.floor(Math.random() * colors.length)];
}

let lastPawTime = 0;
let lastSparkleTime = 0;

function createSparkle(x, y) {
    const now = Date.now();
    if (now - lastPawTime > 300 && Math.random() < 0.15) {
        const paw = document.createElement('div');
        paw.className = 'cat-paw';
        paw.textContent = '🐾';
        paw.style.left = (x - 15) + 'px';
        paw.style.top = (y - 15) + 'px';
        sparklesContainer.appendChild(paw);
        setTimeout(() => paw.remove(), 1000);
        lastPawTime = now;
    }

    if (now - lastSparkleTime < 30) return;
    lastSparkleTime = now;

    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = (x - 3) + 'px';
    sparkle.style.top = (y - 3) + 'px';
    const color = getRandomSparkleColor();
    sparkle.style.background = color;
    sparkle.style.boxShadow = `0 0 10px ${color}, 0 0 20px ${color}`;
    sparklesContainer.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 1500);
}

document.addEventListener('mousemove', (e) => createSparkle(e.clientX, e.clientY));
document.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    createSparkle(touch.clientX, touch.clientY);
});
document.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    createSparkle(touch.clientX, touch.clientY);
});

// =====================================
// 🐱 CAT POPUPS
// =====================================
let catPopupInterval = null;

function startCatPopups() {
    const container = document.getElementById('catPopupContainer');
    const catEmojis = ['🐱', '🌻', '😸', '🌹', '😻', ' 🥀', '❤️', '😺', '❤️', '🐾'];

    if (catPopupInterval) clearInterval(catPopupInterval);

    catPopupInterval = setInterval(() => {
        const hero = document.getElementById('heroSection');
        if (hero.style.display !== 'flex') return;
        const popup = document.createElement('div');
        popup.className = 'cat-popup';
        popup.textContent = catEmojis[Math.floor(Math.random() * catEmojis.length)];
        popup.style.left = (Math.random() * 85 + 5) + '%';
        popup.style.top = (Math.random() * 80 + 10) + '%';
        container.appendChild(popup);
        setTimeout(() => popup.remove(), 4000);
    }, 3000);
}

// =====================================
// 🌠 SHOOTING STARS
// =====================================
function startShootingStars() {
    const container = document.getElementById('shootingStars');
    setInterval(() => {
        const star = document.createElement('div');
        star.className = 'shooting-star';
        star.style.top = (Math.random() * 40) + '%';
        star.style.left = (Math.random() * 60 + 40) + '%';
        star.style.animationDuration = (Math.random() * 1.5 + 1) + 's';
        container.appendChild(star);
        setTimeout(() => star.remove(), 3000);
    }, 3000);
}

// =====================================
// ⌨️ TYPEWRITER
// =====================================
let typewriterStarted = false;

function startHeroAnimations() {
    if (typewriterStarted) return;
    typewriterStarted = true;
    typeWriter();
}

function typeWriter() {
    const text = "oyee oyee ajj mere bhai ka birthday hai ajj mere bhai ka birthday hai..! 🎉🐱";
    
    const typeEl = document.getElementById('typeText');
    let i = 0;
    function type() {
        if (i < text.length) {
            typeEl.textContent += text.charAt(i);
            i++;
            setTimeout(type, 60);
        } else {
            setTimeout(() => {
                typeEl.textContent = '';
                i = 0;
                type();
            }, 4000);
        }
    }
    type();
}

// =====================================
// 🎵 MUSIC
// =====================================
let isPlaying = false;

function toggleMusic() {
    const audio = document.getElementById('bgMusic');
    const btn = document.getElementById('musicBtn');
    if (isPlaying) {
        audio.pause();
        btn.textContent = '🎵 Play Music';
        btn.classList.remove('playing');
    } else {
        audio.play().then(() => {
            btn.textContent = '🔊 Playing...';
            btn.classList.add('playing');
        }).catch(() => {});
    }
    isPlaying = !isPlaying;
}

// =====================================
// 🃏 CARD
// =====================================
let isFlipped = false;

function openCard() {
    document.getElementById('heroSection').style.display = 'none';
    document.getElementById('cardSection').classList.add('active');
    startFireworks();
    setTimeout(() => flipCard(), 2000);
}

function flipCard() {
    const card = document.querySelector('.card');
    if (isFlipped) return;
    card.classList.add('card-flipped');
    isFlipped = true;
}

function goBack() {
    const card = document.querySelector('.card');
    card.classList.remove('card-flipped');
    isFlipped = false;
    document.getElementById('cardSection').classList.remove('active');
    document.getElementById('heroSection').style.display = 'flex';
    stopFireworks();
}

// =====================================
// 🎮 GAME (ORIGINAL - No Changes)
// =====================================
let cards = [];
let flippedCards = [];
let moves = 0;
let matches = 0;
let totalPairs = 0;
let timerInterval = null;
let seconds = 0;
let isLocked = false;
let difficulty = 'easy';

let bestScores = {
    easy: null,
    medium: null,
    hard: null,
    supperhard: null,
    special: null
};

// 16 symbols (12 pairs ke liye enough)
const cardSymbols = [
    '🎂', '🙄', '🌻', '🎉',
    '🤧', '🎶', '🥀', '🌹',
    '❤️', '💖', '🌙', '⭐',
    '🍫', '🐻', '💌', '🎁'
];

function getDifficultyConfig(diff) {
    if (diff === 'special') return { pairs: 12 };      // 24 Tiles
    if (diff === 'supperhard') return { pairs: 16 };   // 32 Tiles
    if (diff === 'hard') return { pairs: 8 };          // 16 Tiles
    if (diff === 'medium') return { pairs: 6 };        // 12 Tiles
    return { pairs: 4 };                              // 8 Tiles
}

function initGame(diff = 'easy') {
    difficulty = diff;
    const config = getDifficultyConfig(diff);

    totalPairs = config.pairs;
    moves = 0;
    matches = 0;
    seconds = 0;
    flippedCards = [];
    isLocked = false;

    document.getElementById('moves').textContent = '0';
    document.getElementById('matches').textContent = '0/' + totalPairs;
    document.getElementById('timer').textContent = '0s';

    updateBestScore();

    const board = document.getElementById('gameBoard');
    board.className = 'game-board ' + diff;
    board.innerHTML = '';

    const selectedSymbols = [...cardSymbols]
        .sort(() => Math.random() - 0.5)
        .slice(0, config.pairs);

    cards = [...selectedSymbols, ...selectedSymbols]
        .sort(() => Math.random() - 0.5);

    cards.forEach(symbol => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.symbol = symbol;

        card.innerHTML = `
            <div class="card-face card-front"></div>
            <div class="card-face card-back-face">${symbol}</div>
        `;

        card.addEventListener('click', () => flipMemoryCard(card));
        board.appendChild(card);
    });

    if (timerInterval) clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        seconds++;
        document.getElementById('timer').textContent = seconds + 's';
    }, 1000);
}

function flipMemoryCard(card) {
    if (
        isLocked ||
        card.classList.contains('flipped') ||
        card.classList.contains('matched') ||
        flippedCards.length >= 2
    ) return;

    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        moves++;
        document.getElementById('moves').textContent = moves;
        checkMatch();
    }
}

function checkMatch() {
    isLocked = true;

    const [card1, card2] = flippedCards;

    if (card1.dataset.symbol === card2.dataset.symbol) {

        setTimeout(() => {
            card1.classList.add('matched');
            card2.classList.add('matched');

            matches++;

            document.getElementById('matches').textContent =
                matches + '/' + totalPairs;

            flippedCards = [];
            isLocked = false;

            if (matches === totalPairs) {
                setTimeout(gameWon, 600);
            }

        }, 500);

    } else {

        setTimeout(() => {

            card1.classList.add('shake');
            card2.classList.add('shake');

            setTimeout(() => {

                card1.classList.remove('flipped', 'shake');
                card2.classList.remove('flipped', 'shake');

                flippedCards = [];
                isLocked = false;

            }, 400);

        }, 800);
    }
}

function updateBestScore() {
    document.getElementById('bestScore').textContent =
        bestScores[difficulty]
            ? bestScores[difficulty] + 's'
            : '-';
}

function gameWon() {

    clearInterval(timerInterval);
    timerInterval = null;

    if (
        !bestScores[difficulty] ||
        seconds < bestScores[difficulty]
    ) {
        bestScores[difficulty] = seconds;
    }

    updateBestScore();

    document.getElementById('finalTime').textContent = seconds + 's';
    document.getElementById('finalMoves').textContent = moves;

    const ratio = moves / totalPairs;

    let rating, msg;

    if (ratio <= 1.2) {
        rating = '⭐⭐⭐⭐⭐ GENIUS!';
        msg = 'Sab to yaad rehta bhai apko 👑';
    } else if (ratio <= 1.5) {
        rating = '⭐⭐⭐⭐ AMAZING!';
        msg = 'Waaaaaoooowwwww 🧠✨';
    } else if (ratio <= 2) {
        rating = '⭐⭐⭐ GREAT!';
        msg = 'Kya hua bhai yaaddash kamzor hai! 🤧';
    } else {
        rating = '⭐⭐ GOOD!';
        msg = 'Badaam khao badaam! 🤧';
    }

    document.getElementById('finalRating').textContent = rating;
    document.getElementById('winMessage').textContent = msg;

    document.getElementById('winModal').classList.add('show');

    startFireworks();

    setTimeout(stopFireworks, 6000);
}

function restartGame() {
    document.getElementById('winModal').classList.remove('show');
    stopFireworks();
    initGame(difficulty);
}

function openGame() {
    document.getElementById('heroSection').style.display = 'none';
    document.getElementById('gameSection').classList.add('active');

    if (!cards.length) {
        initGame('easy');
    }
}

function closeGame() {

    document.getElementById('gameSection').classList.remove('active');
    document.getElementById('winModal').classList.remove('show');

    document.getElementById('heroSection').style.display = 'flex';

    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

document.querySelectorAll('.diff-btn').forEach(btn => {

    btn.addEventListener('click', (e) => {

        document.querySelectorAll('.diff-btn').forEach(b =>
            b.classList.remove('active')
        );

        e.target.classList.add('active');

        initGame(e.target.dataset.difficulty);

    });

});

// =====================================
// 📝 QUIZ
// =====================================
const quizQuestions = [
    { question: "Batao mera birthday kab aata hai?", options: ["7 July", "17 July", "9 July", "19 July"], correct: 2 },
    { question: "Vo jo apko sab se zada pasand hai.", options: ["Dog 🐕", "Cat 🐱", "Rabbit 🐰", "Horse 🐴"], correct: 1 },
    { question: "Apka favorite color mere hisab se?", options: ["Gulabi 💗", "Neela 💙", "Peela 💛", "Kala ⚫"], correct: 3  },
    { question: "Batao mera nick name kya hai", options: ["Faraaz", "Bhai", "Balli", "bhaieeee"], correct: 2 },
    { question: "Batao office me meri kitni biwiyan thi 😂", options: ["1", "4", "3", "2"], correct: 1 },
    { question: "Vo konsa phool hai jo kisi ne apko diya tha ", options: ["🌻", "🌹", "🌸", "🥀"], correct: 0 }
];

let currentQuestion = 0, quizScore = 0, answered = false;

function openQuiz() {
    document.getElementById('heroSection').style.display = 'none';
    document.getElementById('quizSection').classList.add('active');
    currentQuestion = 0; quizScore = 0; answered = false;
    document.getElementById('quizResult').style.display = 'none';
    document.getElementById('btnNext').classList.remove('show');
    document.getElementById('quizQuestion').style.display = 'block';
    document.getElementById('quizProgress').style.display = 'inline-block';
    document.getElementById('quizFeedback').style.display = 'block';
    showQuestion();
}

function closeQuiz() {
    document.getElementById('quizSection').classList.remove('active');
    document.getElementById('heroSection').style.display = 'flex';
}

function showQuestion() {
    const q = quizQuestions[currentQuestion];
    document.getElementById('qProgress').textContent = currentQuestion + 1;
    document.getElementById('questionText').textContent = q.question;
    document.getElementById('quizFeedback').textContent = '';
    document.getElementById('btnNext').classList.remove('show');
    answered = false;
    const optionsDiv = document.getElementById('quizOptions');
    optionsDiv.innerHTML = '';
    q.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option';
        btn.textContent = opt;
        btn.onclick = () => selectAnswer(idx);
        optionsDiv.appendChild(btn);
    });
}

function selectAnswer(index) {
    if (answered) return;
    answered = true;
    const q = quizQuestions[currentQuestion];
    const options = document.querySelectorAll('.quiz-option');
    options.forEach((btn, i) => {
        btn.disabled = true;
        if (i === q.correct) btn.classList.add('correct');
        else if (i === index) btn.classList.add('wrong');
    });
    const fb = document.getElementById('quizFeedback');
    if (index === q.correct) { quizScore++; fb.textContent = '✅ Haa sahi hai! 🎉'; fb.style.color = '#48dbfb'; }
    else { fb.textContent = '❌ Kya bhai galat hai ye: ' + q.options[q.correct]; fb.style.color = '#ff6b6b'; }
    document.getElementById('btnNext').textContent = currentQuestion < quizQuestions.length - 1 ? 'Next ➡️' : 'See Results 🏆';
    document.getElementById('btnNext').classList.add('show');
}

function nextQuestion() {
    if (currentQuestion < quizQuestions.length - 1) { currentQuestion++; showQuestion(); }
    else showResults();
}

function showResults() {
    document.getElementById('quizQuestion').style.display = 'none';
    document.getElementById('quizProgress').style.display = 'none';
    document.getElementById('quizFeedback').style.display = 'none';
    document.getElementById('btnNext').style.display = 'none';
    document.getElementById('quizResult').style.display = 'block';
    const score = quizScore;
    document.getElementById('resultScore').textContent = 'You scored ' + score + '/6';
    let msg, cats;
    if (score === 5) { msg = '🔥 PERFECT! kya baat hai broooo 👑'; cats = '🐱🐈😻👑✨'; startFireworks(); setTimeout(stopFireworks, 4000); }
    else if (score >= 3) { msg = '💪 zada khush mat ho galat jawab diye ho! 🌟'; cats = '😸😹😼🐾✨'; }
    else { msg = '🤗 Hatttt! 💕'; cats = '🐱🐈🙀😽💕'; }
    document.getElementById('resultMessage').textContent = msg;
    document.getElementById('resultCats').textContent = cats;
}

function retryQuiz() {
    document.getElementById('quizResult').style.display = 'none';
    document.getElementById('quizQuestion').style.display = 'block';
    document.getElementById('quizProgress').style.display = 'inline-block';
    document.getElementById('quizFeedback').style.display = 'block';
    document.getElementById('btnNext').style.display = 'none';
    currentQuestion = 0; quizScore = 0; answered = false;
    showQuestion();
}










// =====================================
// 🎆 FIREWORKS
// =====================================
const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');
let fireworksAnimationId = null;
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor(x, y, color) {
        this.x = x; this.y = y; this.color = color;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 6 + 2;
        this.vx = Math.cos(angle) * speed; this.vy = Math.sin(angle) * speed;
        this.gravity = 0.05; this.friction = 0.98; this.alpha = 1;
        this.decay = Math.random() * 0.015 + 0.005;
        this.size = Math.random() * 4 + 2; this.trail = [];
    }
    update() {
        this.trail.push({ x: this.x, y: this.y, alpha: this.alpha });
        if (this.trail.length > 8) this.trail.shift();
        this.vx *= this.friction; this.vy *= this.friction; this.vy += this.gravity;
        this.x += this.vx; this.y += this.vy; this.alpha -= this.decay;
    }
    draw(ctx) {
        for (let i = 0; i < this.trail.length; i++) {
            ctx.beginPath();
            ctx.arc(this.trail[i].x, this.trail[i].y, this.size * 0.4, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.getRGB()}, ${this.trail[i].alpha * 0.2})`;
            ctx.fill();
        }
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.getRGB()}, ${this.alpha})`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.getRGB()}, ${this.alpha * 0.15})`;
        ctx.fill();
    }
    getRGB() {
        const map = { '#f093fb': '240,147,251', '#f5576c': '245,87,108', '#fda085': '253,160,133', '#f6d365': '246,211,101', '#48dbfb': '72,219,251', '#ff9ff3': '255,159,243', '#54a0ff': '84,160,255', '#feca57': '254,202,87', '#ff6b6b': '255,107,107' };
        return map[this.color] || '255,215,0';
    }
}

function createFirework() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height * 0.6;
    const colors = ['#f093fb', '#f5576c', '#fda085', '#f6d365', '#48dbfb', '#ff9ff3', '#54a0ff', '#feca57', '#ff6b6b'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const count = Math.floor(Math.random() * 50) + 30;
    for (let i = 0; i < count; i++) particles.push(new Particle(x, y, color));
}

function animateFireworks() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, index) => {
        p.update(); p.draw(ctx);
        if (p.alpha <= 0) particles.splice(index, 1);
    });
    if (Math.random() < 0.1) createFirework();
    fireworksAnimationId = requestAnimationFrame(animateFireworks);
}

function startFireworks() {
    canvas.classList.add('show');
    if (fireworksAnimationId) return;
    for (let i = 0; i < 8; i++) setTimeout(() => createFirework(), i * 150);
    animateFireworks();
}

function stopFireworks() {
    if (fireworksAnimationId) { cancelAnimationFrame(fireworksAnimationId); fireworksAnimationId = null; }
    particles = []; ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.classList.remove('show');
}







