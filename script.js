// ===============================
// LA RULETA DE LA VIDA
// ===============================

let score = Number(localStorage.getItem("score")) || 0;
let xp = Number(localStorage.getItem("xp")) || 0;
let gamesPlayed = Number(localStorage.getItem("gamesPlayed")) || 0;

let stats = JSON.parse(
    localStorage.getItem("brainStats")
) || {
    memory: 0,
    logic: 0,
    observation: 0,
    speed: 0
};

let currentGame = null;
let timerInterval;
let rotation = 0;

const roulette = document.getElementById("roulette");
const spinBtn = document.getElementById("spinBtn");


// ===============================
// JUEGOS
// ===============================

const games = [

    {
        title: "Secuencia misteriosa",
        category: "🧩 LÓGICA",
        type: "sequence",
        question: "2, 4, 8, 16, ?",
        answer: "32",
        points: 100,
        stat: "logic"
    },

    {
        title: "Cálculo rápido",
        category: "🔢 MATEMÁTICA",
        type: "sequence",
        question: "15 + 27 = ?",
        answer: "42",
        points: 100,
        stat: "logic"
    },

    {
        title: "Encuentra el número",
        category: "🧠 LÓGICA",
        type: "sequence",
        question: "3, 6, 9, 12, ?",
        answer: "15",
        points: 100,
        stat: "logic"
    },

    {
        title: "Memoria rápida",
        category: "🧠 MEMORIA",
        type: "memory",
        items: ["🍎", "🚗", "🐶", "⚽", "🍕", "🎸", "🌙", "📱"],
        answer: "🌙",
        points: 150,
        stat: "memory"
    },

    {
        title: "Otra secuencia",
        category: "🧩 PATRONES",
        type: "sequence",
        question: "1, 3, 6, 10, ?",
        answer: "15",
        points: 150,
        stat: "logic"
    },

    {
        title: "Cálculo mental",
        category: "⚡ VELOCIDAD",
        type: "sequence",
        question: "9 × 7 = ?",
        answer: "63",
        points: 100,
        stat: "speed"
    },

    {
        title: "Secuencia",
        category: "🧩 LÓGICA",
        type: "sequence",
        question: "5, 10, 20, 40, ?",
        answer: "80",
        points: 150,
        stat: "logic"
    },

    {
        title: "Memoria",
        category: "🧠 MEMORIA",
        type: "memory",
        items: ["🐱", "🍔", "🚲", "🌞", "🎮", "🐸", "⚽", "🎁"],
        answer: "🎮",
        points: 150,
        stat: "memory"
    },

    {
        title: "Multiplicación",
        category: "⚡ VELOCIDAD",
        type: "sequence",
        question: "12 × 4 = ?",
        answer: "48",
        points: 100,
        stat: "speed"
    },

    {
        title: "Patrón",
        category: "🧩 LÓGICA",
        type: "sequence",
        question: "100, 90, 80, 70, ?",
        answer: "60",
        points: 120,
        stat: "logic"
    },

    {
        title: "Reto mental",
        category: "🧠 LÓGICA",
        type: "sequence",
        question: "7 + 8 + 9 = ?",
        answer: "24",
        points: 100,
        stat: "logic"
    },

    {
        title: "Memoria visual",
        category: "👀 OBSERVACIÓN",
        type: "memory",
        items: ["🚀", "🐸", "🍎", "🎯", "🐶", "🌎", "🎸", "🔥"],
        answer: "🌎",
        points: 150,
        stat: "observation"
    },

    {
        title: "Secuencia",
        category: "🧩 LÓGICA",
        type: "sequence",
        question: "4, 8, 12, 16, ?",
        answer: "20",
        points: 100,
        stat: "logic"
    },

    {
        title: "Reto matemático",
        category: "🔢 MATEMÁTICA",
        type: "sequence",
        question: "50 ÷ 5 = ?",
        answer: "10",
        points: 100,
        stat: "logic"
    },

    {
        title: "Velocidad",
        category: "⚡ VELOCIDAD",
        type: "sequence",
        question: "11 + 22 = ?",
        answer: "33",
        points: 100,
        stat: "speed"
    },

    {
        title: "Patrón",
        category: "🧩 LÓGICA",
        type: "sequence",
        question: "2, 6, 18, 54, ?",
        answer: "162",
        points: 200,
        stat: "logic"
    },

    {
        title: "Memoria",
        category: "🧠 MEMORIA",
        type: "memory",
        items: ["🍌", "🚗", "🐼", "🎧", "⚽", "🌟", "🍕", "📚"],
        answer: "🐼",
        points: 150,
        stat: "memory"
    },

    {
        title: "Cálculo",
        category: "🔢 MATEMÁTICA",
        type: "sequence",
        question: "25 × 4 = ?",
        answer: "100",
        points: 150,
        stat: "logic"
    },

    {
        title: "Secuencia final",
        category: "🧩 LÓGICA",
        type: "sequence",
        question: "1, 2, 4, 7, 11, ?",
        answer: "16",
        points: 200,
        stat: "logic"
    },

    {
        title: "Gran desafío",
        category: "👑 DESAFÍO",
        type: "sequence",
        question: "10, 20, 40, 80, ?",
        answer: "160",
        points: 250,
        stat: "logic"
    }

];


// ===============================
// GIRAR RULETA
// ===============================

spinBtn.addEventListener("click", spin);


function spin() {

    spinBtn.disabled = true;

    const randomGame =
        games[Math.floor(Math.random() * games.length)];

    currentGame = randomGame;

    const randomRotation =
        1440 + Math.floor(Math.random() * 720);

    rotation += randomRotation;

    roulette.style.transform =
        `rotate(${rotation}deg)`;

    setTimeout(() => {

        showGame(randomGame);

    }, 4000);
}


// ===============================
// MOSTRAR JUEGO
// ===============================

function showGame(game) {

    document.getElementById("homeScreen")
        .classList.remove("active");

    document.getElementById("gameScreen")
        .classList.add("active");

    document.getElementById("category")
        .textContent = game.category;

    document.getElementById("gameTitle")
        .textContent = game.title;

    const content =
        document.getElementById("gameContent");

    const answerArea =
        document.getElementById("answerArea");

    content.innerHTML = "";
    answerArea.innerHTML = "";

    if (game.type === "sequence") {

        content.innerHTML = `
            <div class="sequence">
                ${game.question}
            </div>
        `;

        answerArea.innerHTML = `
            <input
                id="answerInput"
                class="answer-input"
                type="number"
                placeholder="Escribe tu respuesta"
                autofocus
            >
        `;

    }

    if (game.type === "memory") {

        content.innerHTML = `
            <p>Memoriza el símbolo marcado.</p>

            <div class="memory-grid">
                ${game.items.map((item, index) => `
                    <div class="memory-item"
                         data-index="${index}">
                        ${item}
                    </div>
                `).join("")}
            </div>
        `;

        setTimeout(() => {

            const items =
                document.querySelectorAll(".memory-item");

            items.forEach(item => {
                item.style.visibility = "hidden";
            });

            answerArea.innerHTML = `
                <input
                    id="answerInput"
                    class="answer-input"
                    placeholder="¿Qué símbolo recuerdas?"
                >
            `;

        }, 2500);
    }

    startTimer(10);

    document.getElementById("result").textContent = "";

    document.getElementById("submitBtn")
        .style.display = "inline-block";

    spinBtn.disabled = false;
}


// ===============================
// COMPROBAR
// ===============================

document.getElementById("submitBtn")
    .addEventListener("click", checkAnswer);


function checkAnswer() {

    clearInterval(timerInterval);

    const input =
        document.getElementById("answerInput");

    if (!input) return;

    const userAnswer =
        input.value.trim().toLowerCase();

    const correct =
        currentGame.answer.toLowerCase();

    const result =
        document.getElementById("result");

    gamesPlayed++;

    if (userAnswer === correct) {

        score += currentGame.points;
        xp += currentGame.points;

        stats[currentGame.stat] += 5;

        result.innerHTML =
            `🎉 ¡CORRECTO! +${currentGame.points} puntos`;

    } else {

        result.innerHTML =
            `❌ Incorrecto. La respuesta era <b>${currentGame.answer}</b>`;

    }

    saveData();
    updateUI();

    document.getElementById("submitBtn")
        .style.display = "none";

    setTimeout(() => {

        document.getElementById("gameScreen")
            .classList.remove("active");

        document.getElementById("homeScreen")
            .classList.add("active");

    }, 2500);
}


// ===============================
// TEMPORIZADOR
// ===============================

function startTimer(seconds) {

    clearInterval(timerInterval);

    let time = seconds;

    document.getElementById("timer")
        .textContent = time;

    timerInterval = setInterval(() => {

        time--;

        document.getElementById("timer")
            .textContent = time;

        if (time <= 0) {

            clearInterval(timerInterval);

            document.getElementById("result")
                .textContent =
                `⏰ Se acabó el tiempo.`;

            document.getElementById("submitBtn")
                .style.display = "none";

        }

    }, 1000);
}


// ===============================
// GUARDAR
// ===============================

function saveData() {

    localStorage.setItem("score", score);
    localStorage.setItem("xp", xp);
    localStorage.setItem("gamesPlayed", gamesPlayed);

    localStorage.setItem(
        "brainStats",
        JSON.stringify(stats)
    );
}


// ===============================
// ACTUALIZAR UI
// ===============================

function updateUI() {

    const level =
        Math.floor(xp / 500) + 1;

    document.getElementById("score")
        .textContent = score;

    document.getElementById("xp")
        .textContent = `⭐ ${xp} XP`;

    document.getElementById("level")
        .textContent = `🧠 Nivel ${level}`;

    document.getElementById("gamesPlayed")
        .textContent = gamesPlayed;

    document.getElementById("memoryBar")
        .style.width =
        Math.min(stats.memory, 100) + "%";

    document.getElementById("logicBar")
        .style.width =
        Math.min(stats.logic, 100) + "%";

    document.getElementById("observationBar")
        .style.width =
        Math.min(stats.observation, 100) + "%";

    document.getElementById("speedBar")
        .style.width =
        Math.min(stats.speed, 100) + "%";
}


// ===============================
// INICIO
// ===============================

updateUI();