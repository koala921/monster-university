const questions = [
    {
        questionText: '¿Cuál es tu color favorito?',
        answerOptions: [
            { answerText: 'Rojo', house: 'Roar Omega Roar' },
            { answerText: 'Azul', house: 'Jaws Theta Chi' },
            { answerText: 'Verde', house: 'Python Nu Kappa' },
            { answerText: 'Amarillo', house: 'Oozma Kappa' },
        ],
    },
    {
        questionText: '¿Qué instrumento te gustaría tocar?',
        answerOptions: [
            { answerText: 'Guitarra', house: 'Roar Omega Roar' },
            { answerText: 'Piano', house: 'Python Nu Kappa' },
            { answerText: 'Batería', house: 'Jaws Theta Chi' },
            { answerText: 'Violín', house: 'Oozma Kappa' },
        ],
    },
    {
        questionText: '¿Cuál es tu comida favorita?',
        answerOptions: [
            { answerText: 'Pizza', house: 'Oozma Kappa' },
            { answerText: 'Sushi', house: 'Jaws Theta Chi' },
            { answerText: 'Ensalada', house: 'Python Nu Kappa' },
            { answerText: 'Hamburguesa', house: 'Roar Omega Roar' },
        ],
    },
    {
        questionText: '¿Qué prefieres hacer en tu tiempo libre?',
        answerOptions: [
            { answerText: 'Leer un libro', house: 'Python Nu Kappa' },
            { answerText: 'Salir con amigos', house: 'Oozma Kappa' },
            { answerText: 'Hacer ejercicio', house: 'Roar Omega Roar' },
            { answerText: 'Jugar videojuegos', house: 'Jaws Theta Chi' },
        ],
    },
    {
        questionText: '¿Cuál es tu superhéroe favorito?',
        answerOptions: [
            { answerText: 'Iron Man', house: 'Roar Omega Roar' },
            { answerText: 'Spider-Man', house: 'Oozma Kappa' },
            { answerText: 'Wonder Woman', house: 'Python Nu Kappa' },
            { answerText: 'Batman', house: 'Jaws Theta Chi' },
        ],
    },
    {
        questionText: '¿Cuál es tu clase favorita?',
        answerOptions: [
            { answerText: 'Historia', house: 'Python Nu Kappa' },
            { answerText: 'Educación Física', house: 'Roar Omega Roar' },
            { answerText: 'Arte', house: 'Oozma Kappa' },
            { answerText: 'Ciencias', house: 'Jaws Theta Chi' },
        ],
    },
];

let currentQuestionIndex = 0;
let answers = [];

document.addEventListener('DOMContentLoaded', () => {
    showQuestion();
});

function showQuestion() {
    const questionSection = document.getElementById('question-section');
    const questionText = document.getElementById('question-text');
    const answerButtons = document.getElementById('answer-buttons');

    questionSection.classList.remove('hidden');
    document.getElementById('result-section').classList.add('hidden');

    const currentQuestion = questions[currentQuestionIndex];
    questionText.innerText = currentQuestion.questionText;
    answerButtons.innerHTML = '';

    currentQuestion.answerOptions.forEach((answerOption, index) => {
        const button = document.createElement('button');
        button.innerText = answerOption.answerText;
        button.addEventListener('click', () => selectAnswer(answerOption.house));
        answerButtons.appendChild(button);
    });
}

function selectAnswer(house) {
    answers.push(house);

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
        localStorage.setItem('quizResults', JSON.stringify(answers));
    }
}

function showResult() {
    const resultSection = document.getElementById('result-section');
    const resultHouse = document.getElementById('result-house');
    const resultGif = document.getElementById('result-gif');

    resultSection.classList.remove('hidden');
    document.getElementById('question-section').classList.add('hidden');

    const houseCounts = answers.reduce((acc, house) => {
        acc[house] = (acc[house] || 0) + 1;
        return acc;
    }, {});
    const sortedHouses = Object.keys(houseCounts).sort((a, b) => houseCounts[b] - houseCounts[a]);
    const topHouse = sortedHouses[0];
    resultHouse.innerText = topHouse;

    let imageEmbed = '';
    if (topHouse === 'Roar Omega Roar') {
        imageEmbed = `<img src="./gifs/ROAR.gif" alt="Roar Omega Roar">`;
    } else if (topHouse === 'Oozma Kappa') {
        imageEmbed = `<img src="./gifs/Oozma Kappa.webp" alt="Oozma Kappa">`;
    } else if (topHouse === 'Python Nu Kappa') {
        imageEmbed = `<img src="./gifs/PNK.gif" alt="Python Nu Kappa">`;
    } else if (topHouse === 'Jaws Theta Chi') {
        imageEmbed = `<img src="./gifs/Jaws_Theta_Chi.gif" alt="Jaws Theta Chi">`;
    }
    resultGif.innerHTML = imageEmbed;
}