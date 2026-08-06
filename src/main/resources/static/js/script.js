const API_URL = 'http://localhost:8081/api/characters';
const API_URL2 = 'http://localhost:8080/api/characters';

let victorias = JSON.parse(localStorage.getItem('victoriasGrammys') || '{}');

function guardarVictoria(nombre) {
    victorias[nombre] = (victorias[nombre] || 0) + 1;
    localStorage.setItem('victoriasGrammys', JSON.stringify(victorias));
}

function medallaPara(nombre) {
    const cantidad = victorias[nombre] || 0;
    if (cantidad >= 5) return ' 🏆';
    if (cantidad >= 3) return ' 🥇';
    if (cantidad >= 1) return ' 🥉';
    return '';
}

function sonidoVictoria() {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const notas = [523.25, 659.25, 783.99, 1046.50];
        notas.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.value = freq;
            osc.connect(gain);
            gain.connect(ctx.destination);
            const start = ctx.currentTime + i * 0.12;
            gain.gain.setValueAtTime(0.15, start);
            gain.gain.exponentialRampToValueAtTime(0.001, start + 0.35);
            osc.start(start);
            osc.stop(start + 0.35);
        });
    } catch (e) {
        console.warn('No se pudo reproducir el sonido de victoria:', e);
    }
}

const fighter1Image = document.getElementById('fighter1Image');
const fighter2Image = document.getElementById('fighter2Image');
const grid1 = document.getElementById('grid1');
const grid2 = document.getElementById('grid2');
const fightButton = document.getElementById('fightButton');
const randomButton = document.getElementById('randomButton');
const resultDiv = document.getElementById('result');

const stats1 = document.getElementById('stats1');
const stats2 = document.getElementById('stats2');
const hp1 = document.getElementById('hp1');
const en1 = document.getElementById('en1');
const def1 = document.getElementById('def1');
const hpBar1 = document.getElementById('hpBar1');
const enBar1 = document.getElementById('enBar1');
const arma1Span = document.getElementById('arma1');
const ataque1Span = document.getElementById('ataque1');

const hp2 = document.getElementById('hp2');
const en2 = document.getElementById('en2');
const def2 = document.getElementById('def2');
const hpBar2 = document.getElementById('hpBar2');
const enBar2 = document.getElementById('enBar2');
const arma2Span = document.getElementById('arma2');
const ataque2Span = document.getElementById('ataque2');

const historySection = document.getElementById('history-section');
const historyList = document.getElementById('historyList');

let peleadores = [];
let fighter1Data = null;
let fighter2Data = null;

function normalizarPersonajeNaruto(personaje) {
    return {
        id: personaje.id + 100000,
        nombre: personaje.nombre,
        puntosVida: Math.round(personaje.nivelDePoder / 60),
        energia: Math.round(personaje.nivelDePoder / 70),
        defensaBase: parseFloat((personaje.nivelDePoder / 600).toFixed(1)),
        url_imagen: personaje.url_imagen || null,
        armaDelPeleador: [],
        ataqueDelPeleador: [],
        aldea: personaje.aldea
    };
}

async function fetchData() {
    let propios = [];
    let delProfe = [];

    try {
        const response = await fetch(API_URL);
        propios = await response.json();
    } catch (error) {
        console.error('Error al conectar con TU API:', error);
    }

    try {
        const response2 = await fetch(API_URL2);
        const crudosDelProfe = await response2.json();
        delProfe = crudosDelProfe.map(normalizarPersonajeNaruto);
    } catch (error) {
        console.error('Error al conectar con la API del profe:', error);
    }

    peleadores = [...propios, ...delProfe];
    renderizarGrid(grid1, 1);
    renderizarGrid(grid2, 2);
}

function renderizarGrid(container, slot) {
    if (!container) return;
    container.innerHTML = '';

    if (peleadores.length === 0) {
        const vacio = document.createElement('p');
        vacio.className = 'mini-grid-loading';
        vacio.textContent = 'No hay personajes disponibles.';
        container.appendChild(vacio);
        return;
    }

    const seleccionado = slot === 1 ? fighter1Data : fighter2Data;

    peleadores.forEach(fighter => {
        const card = document.createElement('div');
        card.className = 'mini-card';
        if (seleccionado && seleccionado.id === fighter.id) {
            card.classList.add('selected');
        }

        const img = document.createElement('img');
        img.src = fighter.url_imagen || (slot === 1 ? 'placeholder1.png' : 'placeholder2.png');
        img.alt = fighter.nombre;

        const nombre = document.createElement('span');
        nombre.textContent = fighter.nombre + medallaPara(fighter.nombre);

        card.appendChild(img);
        card.appendChild(nombre);

        card.addEventListener('click', () => seleccionarFighter(slot, fighter));

        container.appendChild(card);
    });
}

function seleccionarFighter(slot, fighter) {
    if (slot === 1) {
        fighter1Data = fighter;
    } else {
        fighter2Data = fighter;
    }

    actualizarPanel(slot, fighter);

    renderizarGrid(grid1, 1);
    renderizarGrid(grid2, 2);
}

function actualizarPanel(slot, selected) {
    const img = slot === 1 ? fighter1Image : fighter2Image;
    const statsBox = slot === 1 ? stats1 : stats2;
    const hp = slot === 1 ? hp1 : hp2;
    const en = slot === 1 ? en1 : en2;
    const def = slot === 1 ? def1 : def2;
    const hpBar = slot === 1 ? hpBar1 : hpBar2;
    const enBar = slot === 1 ? enBar1 : enBar2;
    const armaSpan = slot === 1 ? arma1Span : arma2Span;
    const ataqueSpan = slot === 1 ? ataque1Span : ataque2Span;
    const placeholder = slot === 1 ? 'placeholder1.png' : 'placeholder2.png';

    img.src = selected.url_imagen || placeholder;

    hp.textContent = selected.puntosVida;
    en.textContent = selected.energia;
    def.textContent = selected.defensaBase;

    hpBar.style.width = Math.min((selected.puntosVida / 200) * 100, 100) + '%';
    enBar.style.width = Math.min((selected.energia / 150) * 100, 100) + '%';

    armaSpan.textContent = (selected.armaDelPeleador && selected.armaDelPeleador.length > 0)
        ? selected.armaDelPeleador.map(a => a.nombre).join(', ')
        : 'Sin equipamiento';

    ataqueSpan.textContent = (selected.ataqueDelPeleador && selected.ataqueDelPeleador.length > 0)
        ? selected.ataqueDelPeleador.map(at => at.nombre).join(', ')
        : 'Sin ataques especiales';

    statsBox.classList.remove('hidden');
}

fightButton.addEventListener('click', () => {
    if (!fighter1Data || !fighter2Data) {
        alert('⚠️ Seleccioná ambos artistas para iniciar el duelo.');
        return;
    }

    const fighter1 = fighter1Data;
    const fighter2 = fighter2Data;

    if (fighter1.id === fighter2.id) {
        alert('⚠️ Un artista no puede competir contra sí mismo.');
        return;
    }

    resultDiv.textContent = "🎤 El jurado está analizando las presentaciones y el equipamiento...";
    resultDiv.classList.remove('hidden');

    setTimeout(() => {
        let bonusArma1 = 0;
        if (fighter1.armaDelPeleador) {
            fighter1.armaDelPeleador.forEach(a => bonusArma1 += (a.bonificadorDanio || 0));
        }

        let bonusArma2 = 0;
        if (fighter2.armaDelPeleador) {
            fighter2.armaDelPeleador.forEach(a => bonusArma2 += (a.bonificadorDanio || 0));
        }

        const power1 = fighter1.puntosVida + (fighter1.defensaBase * 10) + fighter1.energia + bonusArma1;
        const power2 = fighter2.puntosVida + (fighter2.defensaBase * 10) + fighter2.energia + bonusArma2;

        let winnerText = "";
        let winnerName = "";

        if (power1 > power2) {
            winnerName = fighter1.nombre;
            winnerText = `🏆 ¡El ganador del Grammy es: ${fighter1.nombre}! ✨ (${Math.round(power1)} vs ${Math.round(power2)} pts)`;
        } else if (power2 > power1) {
            winnerName = fighter2.nombre;
            winnerText = `🏆 ¡El ganador del Grammy es: ${fighter2.nombre}! 🔥 (${Math.round(power2)} vs ${Math.round(power1)} pts)`;
        } else {
            winnerName = "Empate";
            winnerText = `🤝 ¡Empate histórico en la gala!`;
        }

        resultDiv.textContent = winnerText;

        if (winnerName === fighter1.nombre) {
            hpBar2.style.width = '8%';
            hpBar2.classList.add('bar-hit');
        } else if (winnerName === fighter2.nombre) {
            hpBar1.style.width = '8%';
            hpBar1.classList.add('bar-hit');
        }

        if (winnerName !== "Empate") {
            confetti({
                particleCount: 120,
                spread: 70,
                origin: { y: 0.6 }
            });
            sonidoVictoria();
            guardarVictoria(winnerName);
            renderizarGrid(grid1, 1);
            renderizarGrid(grid2, 2);
        }

        historySection.classList.remove('hidden');
        const li = document.createElement('li');
        li.textContent = `${fighter1.nombre} vs ${fighter2.nombre} ➡️ Ganador: ${winnerName}${medallaPara(winnerName)}`;
        historyList.prepend(li);

    }, 1200);
});

randomButton.addEventListener('click', () => {
    if (peleadores.length < 2) {
        alert('⚠️ Todavía no cargaron los artistas, esperá un segundo y reintentá.');
        return;
    }

    const idx1 = Math.floor(Math.random() * peleadores.length);
    let idx2 = Math.floor(Math.random() * peleadores.length);
    while (idx2 === idx1) {
        idx2 = Math.floor(Math.random() * peleadores.length);
    }

    seleccionarFighter(1, peleadores[idx1]);
    seleccionarFighter(2, peleadores[idx2]);

    fightButton.click();
});

fetchData();