// 🔹 Variables globales y configuración
const imageURLs = {
  craneo: "img/imgcraneo.png",
  brazos: "img/imgbrazos.png",
  piernas: "img/imgpiernas.png",
  pies: "img/imgpies.png",
  columna_vertebral: "img/imgcolumna.png",
  costillas: "img/imgcostillas.png",
  manos: "img/imgmanos.png",
  pelvis: "img/imgpelvis.png"
};

let score = 0;
let currentQuestion = 0;
let currentCategory = '';
let timerInterval;
let timeRemaining = 10;

// 🔹 Preguntas avanzadas por categoría
const questions = {
  craneo: [
    {
      question: "¿Cuál es la función principal del hueso temporal en el cráneo?",
      options: [
        "Proteger el cerebro y contener el oído medio e interno",
        "Formar la estructura de la mandíbula",
        "Conectar el cráneo con la columna vertebral",
        "Soportar el peso del rostro"
      ],
      correct: 0
    },
    {
      question: "¿Cuál de los siguientes huesos NO forma parte del neurocráneo?",
      options: ["Frontal", "Parietal", "Maxilar", "Occipital"],
      correct: 2
    },
    {
      question: "¿Cómo se llama la articulación que conecta el cráneo con la columna vertebral?",
      options: ["Articulación temporomandibular", "Atlantooccipital", "Suturas sagitales", "Coronales"],
      correct: 1
    }
  ],

  brazos: [
    {
      question: "¿Qué hueso del brazo se articula directamente con la escápula en la articulación del hombro?",
      options: ["Radio", "Húmero", "Cúbito", "Clavícula"],
      correct: 1
    },
    {
      question: "¿Cuál es el hueso largo que forma la parte medial del antebrazo?",
      options: ["Radio", "Escápula", "Cúbito", "Húmero"],
      correct: 2
    },
    {
      question: "¿Qué hueso del brazo participa en la articulación del codo pero no en la del hombro?",
      options: ["Clavícula", "Escápula", "Radio", "Húmero"],
      correct: 2
    }
  ],

  piernas: [
    {
      question: "¿Qué hueso de la pierna soporta la mayor parte del peso del cuerpo?",
      options: ["Peroné", "Tibia", "Fémur", "Calcáneo"],
      correct: 1
    },
    {
      question: "¿Cuál es la función principal del fémur?",
      options: [
        "Conectar la pelvis con la tibia",
        "Formar la rodilla",
        "Soportar el peso y permitir la locomoción",
        "Proteger los nervios de la pierna"
      ],
      correct: 2
    },
    {
      question: "¿Dónde se encuentra el hueso denominado 'rótula'?",
      options: ["En la rodilla", "En el tobillo", "En el muslo", "En la pelvis"],
      correct: 0
    }
  ],

  pies: [
    {
      question: "¿Cuál es el hueso más grande del pie?",
      options: ["Astrágalo", "Calcáneo", "Metatarso", "Falanges"],
      correct: 1
    },
    {
      question: "¿Qué función tienen los huesos metatarsianos?",
      options: [
        "Formar el talón",
        "Soportar el arco del pie y permitir movimiento",
        "Conectar el pie con la pierna",
        "Proteger los dedos"
      ],
      correct: 1
    },
    {
      question: "¿Cuántos huesos forman el tarso?",
      options: ["5", "7", "9", "12"],
      correct: 1
    }
  ],

  columna_vertebral: [
    {
      question: "¿Cuántas vértebras forman la columna vertebral humana adulta?",
      options: ["24", "26", "33", "30"],
      correct: 1
    },
    {
      question: "¿Qué región de la columna vertebral contiene las vértebras cervicales?",
      options: ["Parte superior del cuello", "Zona lumbar", "Región torácica", "Sacra"],
      correct: 0
    },
    {
      question: "¿Cuál es la función principal de los discos intervertebrales?",
      options: [
        "Unir las vértebras y permitir flexibilidad",
        "Proteger la médula espinal",
        "Soportar el peso del cráneo",
        "Conectar la columna con la pelvis"
      ],
      correct: 0
    }
  ],

  costillas: [
    {
      question: "¿Cuántas costillas verdaderas tiene el ser humano y por qué se llaman así?",
      options: [
        "7, porque se unen directamente al esternón",
        "5, porque no se unen al esternón",
        "12, porque protegen el corazón",
        "14, porque son las más largas"
      ],
      correct: 0
    },
    {
      question: "¿Qué característica distingue a las costillas flotantes?",
      options: [
        "No se unen al esternón ni a otras costillas",
        "Son las más cortas",
        "Se articulan con la clavícula",
        "Forman parte del abdomen"
      ],
      correct: 0
    },
    {
      question: "¿Cuál es la función principal de la caja torácica?",
      options: [
        "Proteger órganos vitales como el corazón y pulmones",
        "Sostener la cabeza",
        "Conectar la columna vertebral con las extremidades",
        "Almacenar calcio"
      ],
      correct: 0
    }
  ],

  manos: [
    {
      question: "¿Cuántos huesos componen el carpo de la mano?",
      options: ["6", "8", "10", "12"],
      correct: 1
    },
    {
      question: "¿Cuál es el hueso más largo de la mano?",
      options: ["Metacarpos", "Falanges proximales", "Falanges medias", "Falanges distales"],
      correct: 0
    },
    {
      question: "¿Qué huesos forman la base de los dedos?",
      options: ["Carpianos", "Metacarpos", "Falanges", "Escápula"],
      correct: 1
    }
  ],

  pelvis: [
    {
      question: "¿Qué huesos forman la pelvis ósea?",
      options: ["Iliaco, isquion y pubis", "Fémur, tibia y peroné", "Sacrum y cóccix", "Escápula y clavícula"],
      correct: 0
    },
    {
      question: "¿Cuál es la función principal de la pelvis en el cuerpo humano?",
      options: [
        "Soportar el peso de la parte superior y proteger órganos pélvicos",
        "Permitir la locomoción",
        "Proteger la médula espinal",
        "Conectar la columna con los brazos"
      ],
      correct: 0
    },
    {
      question: "¿Cómo se llama la articulación donde se une la pelvis con el fémur?",
      options: ["Articulación coxofemoral", "Articulación sacroilíaca", "Articulación del codo", "Articulación temporomandibular"],
      correct: 0
    }
  ]
};

// 🔹 Función para iniciar el quiz
function startQuiz(category) {
  currentCategory = category;
  currentQuestion = 0;
  score = 0;
  document.getElementById("category-selection").classList.add("hidden");
  document.getElementById("quiz-container").classList.remove("hidden");
  document.getElementById("category-title").textContent =
    category.charAt(0).toUpperCase() + category.slice(1).replace("_", " ");
  document.getElementById("category-image").src = imageURLs[category];
  document.getElementById("score-bar").style.display = "block";
  document.getElementById("score").textContent = score;
  showQuestion();
  startTimer();
}

// 🔹 Temporizador con parada al responder
function startTimer() {
  timeRemaining = 10;
  document.getElementById("time").textContent = timeRemaining;
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timeRemaining--;
    document.getElementById("time").textContent = timeRemaining;
    if (timeRemaining <= 0) {
      clearInterval(timerInterval);
      disableOptions();
      showCorrectAnswer();
      document.getElementById("next-button").classList.remove("hidden");
    }
  }, 1000);
}

// 🔹 Mostrar pregunta y opciones
function showQuestion() {
  const question = questions[currentCategory][currentQuestion];
  const optionsContainer = document.getElementById("answer-options");
  document.getElementById("question-text").textContent = question.question;
  optionsContainer.innerHTML = "";
  question.options.forEach((option, index) => {
    const li = document.createElement("li");
    li.textContent = option;
    li.onclick = () => checkAnswer(index, question.correct);
    li.style.pointerEvents = "auto";
    li.style.backgroundColor = "#e3f2fd";
    optionsContainer.appendChild(li);
  });
  document.getElementById("next-button").classList.add("hidden");
  document.getElementById("change-category-button").classList.add("hidden");
}

// 🔹 Deshabilitar opciones (al responder o tiempo agotado)
function disableOptions() {
  const options = document.getElementById("answer-options").children;
  for (let option of options) {
    option.style.pointerEvents = "none";
  }
}

// 🔹 Mostrar la respuesta correcta en verde
function showCorrectAnswer() {
  const options = document.getElementById("answer-options").children;
  const correct = questions[currentCategory][currentQuestion].correct;
  for (let i = 0; i < options.length; i++) {
    if (i === correct) {
      options[i].style.backgroundColor = "green";
      options[i].style.color = "white";
    }
  }
}

// 🔹 Revisar la respuesta seleccionada
function checkAnswer(selected, correct) {
  clearInterval(timerInterval);
  disableOptions();

  const options = document.getElementById("answer-options").children;
  if (selected === correct) {
    options[selected].style.backgroundColor = "green";
    options[selected].style.color = "white";
    score += 10;
  } else {
    options[selected].style.backgroundColor = "red";
    options[selected].style.color = "white";
    showCorrectAnswer();
  }
  document.getElementById("score").textContent = score;
  document.getElementById("next-button").classList.remove("hidden");
}

// 🔹 Pasar a siguiente pregunta o finalizar categoría
function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions[currentCategory].length) {
    showQuestion();
    startTimer();
  } else {
    document.getElementById("question-text").textContent = "¡Has completado esta categoría!";
    document.getElementById("answer-options").innerHTML = "";
    document.getElementById("next-button").classList.add("hidden");
    document.getElementById("change-category-button").classList.remove("hidden");
  }
}

// 🔹 Volver al menú de categorías
function changeCategory() {
  clearInterval(timerInterval);
  document.getElementById("quiz-container").classList.add("hidden");
  document.getElementById("category-selection").classList.remove("hidden");
  document.getElementById("score-bar").style.display = "none";
}

// 🔹 Eventos botones
document.getElementById("next-button").onclick = nextQuestion;
document.getElementById("change-category-button").onclick = changeCategory;
