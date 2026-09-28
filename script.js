// ==========================================
// LA RULETA DE LA VIDA - V2
// ==========================================


// ==========================================
// DATOS DEL JUGADOR
// ==========================================

let score =
    Number(localStorage.getItem("score")) || 0;

let xp =
    Number(localStorage.getItem("xp")) || 0;

let gamesPlayed =
    Number(localStorage.getItem("gamesPlayed")) || 0;

let combo = 0;

let bestCombo =
    Number(localStorage.getItem("bestCombo")) || 0;

let lives = 3;

let difficultyLevel = 1;

let currentGame = null;

let timerInterval;

let rotation = 0;


// ==========================================
// ESTADÍSTICAS
// ==========================================

let stats =
    JSON.parse(
        localStorage.getItem("brainStats")
    ) || {

        memory: 0,

        logic: 0,

        observation: 0,

        speed: 0

    };


// ==========================================
// ELEMENTOS
// ==========================================

const roulette =
    document.getElementById("roulette");

const spinBtn =
    document.getElementById("spinBtn");

const submitBtn =
    document.getElementById("submitBtn");


// ==========================================
// BANCO DE PREGUNTAS
// ==========================================

const games = [

    // =============================
    // LÓGICA
    // =============================

    {
        title: "Secuencia misteriosa",
        category: "🧩 LÓGICA",
        difficulty: 1,
        question: "2, 4, 8, 16, ¿?",
        answer: "32",
        points: 100,
        stat: "logic"
    },

    {
        title: "Secuencia",
        category: "🧩 LÓGICA",
        difficulty: 1,
        question: "3, 6, 9, 12, ¿?",
        answer: "15",
        points: 100,
        stat: "logic"
    },

    {
        title: "Patrón",
        category: "🧩 LÓGICA",
        difficulty: 2,
        question: "5, 10, 20, 40, ¿?",
        answer: "80",
        points: 150,
        stat: "logic"
    },

    {
        title: "Patrón avanzado",
        category: "🧩 LÓGICA",
        difficulty: 3,
        question: "1, 3, 6, 10, ¿?",
        answer: "15",
        points: 200,
        stat: "logic"
    },

    {
        title: "Secuencia difícil",
        category: "🧩 LÓGICA",
        difficulty: 4,
        question: "2, 6, 18, 54, ¿?",
        answer: "162",
        points: 300,
        stat: "logic"
    },


    // =============================
    // MATEMÁTICA
    // =============================

    {
        title: "Cálculo rápido",
        category: "🔢 MATEMÁTICA",
        difficulty: 1,
        question: "15 + 27 = ¿?",
        answer: "42",
        points: 100,
        stat: "speed"
    },

    {
        title: "Multiplicación",
        category: "🔢 MATEMÁTICA",
        difficulty: 2,
        question: "12 × 7 = ¿?",
        answer: "84",
        points: 150,
        stat: "speed"
    },

    {
        title: "Cálculo mental",
        category: "🔢 MATEMÁTICA",
        difficulty: 3,
        question: "125 ÷ 5 = ¿?",
        answer: "25",
        points: 200,
        stat: "speed"
    },

    {
        title: "Reto matemático",
        category: "🔢 MATEMÁTICA",
        difficulty: 4,
        question: "17 × 12 = ¿?",
        answer: "204",
        points: 300,
        stat: "speed"
    },


    // =============================
    // MEMORIA
    // =============================

    {
        title: "Memoria rápida",
        category: "🧠 MEMORIA",
        difficulty: 1,
        type: "memory",
        items: [
            "🍎",
            "🚗",
            "🐶",
            "⚽",
            "🍕",
            "🎸",
            "🌙",
            "📱"
        ],
        answer: "🌙",
        points: 150,
        stat: "memory"
    },

    {
        title: "Memoria visual",
        category: "🧠 MEMORIA",
        difficulty: 2,
        type: "memory",
        items: [
            "🐱",
            "🍔",
            "🚲",
            "🌞",
            "🎮",
            "🐸",
            "⚽",
            "🎁"
        ],
        answer: "🎮",
        points: 200,
        stat: "memory"
    },

    {
        title: "Memoria extrema",
        category: "🧠 MEMORIA",
        difficulty: 3,
        type: "memory",
        items: [
            "🚀",
            "🐸",
            "🍎",
            "🎯",
            "🐶",
            "🌎",
            "🎸",
            "🔥"
        ],
        answer: "🌎",
        points: 250,
        stat: "memory"
    },


    // =============================
    // OBSERVACIÓN
    // =============================

    {
        title: "Encuentra el número",
        category: "👀 OBSERVACIÓN",
        difficulty: 1,
        type: "observation",
        question: "¿Qué número es diferente?",
        items: [
            "7",
            "7",
            "7",
            "9",
            "7",
            "7"
        ],
        answer: "9",
        points: 150,
        stat: "observation"
    },

    {
        title: "Detecta el diferente",
        category: "👀 OBSERVACIÓN",
        difficulty: 2,
        type: "observation",
        question: "¿Cuál es diferente?",
        items: [
            "🐶",
            "🐶",
            "🐶",
            "🐱",
            "🐶",
            "🐶"
        ],
        answer: "🐱",
        points: 200,
        stat: "observation"
    },


    // =============================
    // PALABRAS
    // =============================

    {
        title: "Palabra rápida",
        category: "🔤 PALABRAS",
        difficulty: 1,
        question: "Escribe una palabra que empiece con P",
        answerType: "startsWith",
        answer: "p",
        points: 100,
        stat: "speed"
    },

    {
        title: "Palabra difícil",
        category: "🔤 PALABRAS",
        difficulty: 2,
        question: "Escribe una fruta que empiece con M",
        answerType: "startsWith",
        answer: "m",
        points: 150,
        stat: "speed"
    },


    // =============================
    // RETOS
    // =============================

    {
        title: "Reto mental",
        category: "🧠 DESAFÍO",
        difficulty: 2,
        question: "7 + 8 + 9 = ¿?",
        answer: "24",
        points: 150,
        stat: "logic"
    },

    {
        title: "Gran desafío",
        category: "👑 DESAFÍO",
        difficulty: 4,
        question: "10, 20, 40, 80, ¿?",
        answer: "160",
        points: 300,
        stat: "logic"
    },

    {
        title: "Desafío final",
        category: "👑 EXTREMO",
        difficulty: 5,
        question: "1, 2, 4, 7, 11, ¿?",
        answer: "16",
        points: 400,
        stat: "logic"
    }

];


// ==========================================
// GIRAR RULETA
// ==========================================

spinBtn.addEventListener(
    "click",
    spinRoulette
);


function spinRoulette() {

    if (lives <= 0) {

        showGameOver();

        return;

    }


    spinBtn.disabled = true;


    currentGame =
        chooseGame();


    const randomRotation =
        1440 +
        Math.floor(
            Math.random() * 720
        );


    rotation += randomRotation;


    roulette.style.transform =
        `rotate(${rotation}deg)`;


    setTimeout(
        () => {

            showGame(
                currentGame
            );

        },

        4000
    );

}


// ==========================================
// ELEGIR PREGUNTA
// ==========================================

function chooseGame() {

    let available =
        games.filter(
            game =>
                game.difficulty <=
                difficultyLevel
        );


    if (
        available.length === 0
    ) {

        available = games;

    }


    return available[
        Math.floor(
            Math.random() *
            available.length
        )
    ];

}


// ==========================================
// MOSTRAR JUEGO
// ==========================================

function showGame(game) {

    document
        .getElementById("homeScreen")
        .classList
        .remove("active");


    document
        .getElementById("gameScreen")
        .classList
        .add("active");


    document
        .getElementById("category")
        .textContent =
        game.category;


    document
        .getElementById("gameTitle")
        .textContent =
        game.title;


    document
        .getElementById("difficulty")
        .textContent =
        getDifficultyText(
            game.difficulty
        );


    const content =
        document.getElementById(
            "gameContent"
        );


    const answerArea =
        document.getElementById(
            "answerArea"
        );


    content.innerHTML = "";

    answerArea.innerHTML = "";


    // ============================
    // PREGUNTA NORMAL
    // ============================

    if (
        !game.type
    ) {

        content.innerHTML = `
            <div class="question">
                ${game.question}
            </div>
        `;


        answerArea.innerHTML = `
            <input
                id="answerInput"
                class="answer-input"
                placeholder="Escribe tu respuesta"
                autocomplete="off"
            >
        `;

    }


    // ============================
    // MEMORIA
    // ============================

    if (
        game.type ===
        "memory"
    ) {

        content.innerHTML = `

            <p>
                Memoriza estos símbolos.
            </p>

            <div class="question">

                ${game.items.join(" ")}

            </div>

        `;


        setTimeout(
            () => {

                content.innerHTML = `

                    <div class="question">

                        ¿Cuál recuerdas?

                    </div>

                `;


                answerArea.innerHTML = `

                    <input
                        id="answerInput"
                        class="answer-input"
                        placeholder="Escribe el emoji"
                        autocomplete="off"
                    >

                `;

            },

            2500
        );

    }


    // ============================
    // OBSERVACIÓN
    // ============================

    if (
        game.type ===
        "observation"
    ) {

        content.innerHTML = `

            <div>

                <p>
                    ${game.question}
                </p>

                <div class="question">

                    ${game.items.join(" ")}

                </div>

            </div>

        `;


        answerArea.innerHTML = `

            <input
                id="answerInput"
                class="answer-input"
                placeholder="Escribe tu respuesta"
                autocomplete="off"
            >

        `;

    }


    document
        .getElementById("result")
        .textContent = "";


    submitBtn.style.display =
        "inline-block";


    startTimer(
        getTime(game.difficulty)
    );


    setTimeout(
        () => {

            const input =
                document.getElementById(
                    "answerInput"
                );

            if (input) {

                input.focus();

            }

        },

        100
    );

}


// ==========================================
// DIFICULTAD
// ==========================================

function getDifficultyText(level) {

    const difficulties = {

        1: "🟢 FÁCIL",

        2: "🟡 NORMAL",

        3: "🟠 DIFÍCIL",

        4: "🔴 EXTREMO",

        5: "🟣 IMPOSIBLE"

    };


    return difficulties[level]
        || difficulties[1];

}


// ==========================================
// TIEMPO
// ==========================================

function getTime(level) {

    const times = {

        1: 15,

        2: 12,

        3: 10,

        4: 8,

        5: 6

    };


    return times[level]
        || 15;

}


// ==========================================
// TEMPORIZADOR
// ==========================================

function startTimer(seconds) {

    clearInterval(
        timerInterval
    );


    let time = seconds;


    document
        .getElementById("timer")
        .textContent =
        time;


    timerInterval =
        setInterval(
            () => {

                time--;


                document
                    .getElementById("timer")
                    .textContent =
                    time;


                if (
                    time <= 0
                ) {

                    clearInterval(
                        timerInterval
                    );


                    loseLife(
                        "⏰ Se acabó el tiempo"
                    );

                }

            },

            1000
        );

}


// ==========================================
// COMPROBAR
// ==========================================

submitBtn.addEventListener(
    "click",
    checkAnswer
);


function checkAnswer() {

    clearInterval(
        timerInterval
    );


    const input =
        document.getElementById(
            "answerInput"
        );


    if (!input) return;


    const answer =
        input.value
            .trim()
            .toLowerCase();


    let correct = false;


    // RESPUESTA NORMAL

    if (
        !currentGame.answerType
    ) {

        correct =
            answer ===
            currentGame.answer
                .toLowerCase();

    }


    // PALABRA QUE COMIENZA CON

    if (
        currentGame.answerType ===
        "startsWith"
    ) {

        correct =
            answer.length > 0 &&
            answer.startsWith(
                currentGame.answer
            );

    }


    if (correct) {

        winGame();

    } else {

        loseLife(
            `❌ Respuesta incorrecta`
        );

    }

}


// ==========================================
// GANAR
// ==========================================

function winGame() {

    gamesPlayed++;

    combo++;


    if (
        combo > bestCombo
    ) {

        bestCombo =
            combo;

    }


    const multiplier =
        Math.min(
            combo,
            5
        );


    const points =
        currentGame.points *
        multiplier;


    score += points;

    xp += points;


    stats[
        currentGame.stat
    ] += 5;


    document
        .getElementById("result")
        .innerHTML =

        `🎉 ¡CORRECTO!<br>
         ⭐ +${points} XP
         <br>
         🔥 COMBO x${combo}`;


    showNotification(
        `🎉 +${points} XP`
    );


    difficultyLevel =
        Math.min(
            5,
            1 +
            Math.floor(
                gamesPlayed / 3
            )
        );


    saveData();

    updateUI();


    submitBtn.style.display =
        "none";


    setTimeout(
        returnHome,
        1800
    );

}


// ==========================================
// PERDER VIDA
// ==========================================

function loseLife(message) {

    clearInterval(
        timerInterval
    );


    lives--;


    combo = 0;


    updateLives();


    document
        .getElementById("result")
        .innerHTML =

        `${message}<br>
         ❤️ Te quedan ${lives} vidas`;


    gamesPlayed++;


    saveData();

    updateUI();


    submitBtn.style.display =
        "none";


    if (
        lives <= 0
    ) {

        setTimeout(
            showGameOver,
            1500
        );

    } else {

        setTimeout(
            returnHome,
            1500
        );

    }

}


// ==========================================
// VOLVER AL INICIO
// ==========================================

function returnHome() {

    document
        .getElementById("gameScreen")
        .classList
        .remove("active");


    document
        .getElementById("homeScreen")
        .classList
        .add("active");


    spinBtn.disabled =
        false;

}


// ==========================================
// GAME OVER
// ==========================================

function showGameOver() {

    clearInterval(
        timerInterval
    );


    document
        .getElementById("homeScreen")
        .classList
        .remove("active");


    document
        .getElementById("gameScreen")
        .classList
        .remove("active");


    document
        .getElementById("gameOverScreen")
        .classList
        .add("active");


    document
        .getElementById("finalScore")
        .textContent =
        score;


    document
        .getElementById("finalXP")
        .textContent =
        xp;


    document
        .getElementById("finalCombo")
        .textContent =
        bestCombo;

}


// ==========================================
// REINICIAR PARTIDA
// ==========================================

document
    .getElementById("restartBtn")
    .addEventListener(
        "click",
        restartGame
    );


function restartGame() {

    lives = 3;

    combo = 0;

    difficultyLevel = 1;


    updateLives();

    updateUI();


    document
        .getElementById("gameOverScreen")
        .classList
        .remove("active");


    document
        .getElementById("homeScreen")
        .classList
        .add("active");


    spinBtn.disabled =
        false;

}


// ==========================================
// VIDAS
// ==========================================

function updateLives() {

    const life1 =
        document.getElementById(
            "life1"
        );

    const life2 =
        document.getElementById(
            "life2"
        );

    const life3 =
        document.getElementById(
            "life3"
        );


    life1.textContent =
        lives >= 1
            ? "❤️"
            : "🖤";


    life2.textContent =
        lives >= 2
            ? "❤️"
            : "🖤";


    life3.textContent =
        lives >= 3
            ? "❤️"
            : "🖤";

}


// ==========================================
// GUARDAR
// ==========================================

function saveData() {

    localStorage.setItem(
        "score",
        score
    );


    localStorage.setItem(
        "xp",
        xp
    );


    localStorage.setItem(
        "gamesPlayed",
        gamesPlayed
    );


    localStorage.setItem(
        "bestCombo",
        bestCombo
    );


    localStorage.setItem(
        "brainStats",
        JSON.stringify(
            stats
        )
    );

}


// ==========================================
// ACTUALIZAR UI
// ==========================================

function updateUI() {

    const level =
        Math.floor(
            xp / 1000
        ) + 1;


    document
        .getElementById("score")
        .textContent =
        score;


    document
        .getElementById("xp")
        .textContent =
        `⭐ ${xp} XP`;


    document
        .getElementById("level")
        .textContent =
        `🧠 Nivel ${level}`;


    document
        .getElementById("gamesPlayed")
        .textContent =
        gamesPlayed;


    document
        .getElementById("combo")
        .textContent =
        `x${combo}`;


    document
        .getElementById("bestCombo")
        .textContent =
        bestCombo;


    document
        .getElementById("memoryBar")
        .style.width =
        Math.min(
            stats.memory,
            100
        ) + "%";


    document
        .getElementById("logicBar")
        .style.width =
        Math.min(
            stats.logic,
            100
        ) + "%";


    document
        .getElementById("observationBar")
        .style.width =
        Math.min(
            stats.observation,
            100
        ) + "%";


    document
        .getElementById("speedBar")
        .style.width =
        Math.min(
            stats.speed,
            100
        ) + "%";

}


// ==========================================
// NOTIFICACIÓN
// ==========================================

function showNotification(
    message
) {

    const notification =
        document.getElementById(
            "notification"
        );


    notification.textContent =
        message;


    notification.classList
        .add("show");


    setTimeout(
        () => {

            notification.classList
                .remove("show");

        },

        1500
    );

}


// ==========================================
// INICIO
// ==========================================

updateLives();

updateUI();