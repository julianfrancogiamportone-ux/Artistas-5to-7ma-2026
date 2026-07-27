const API_URL = 'http://localhost:8081/api/characters';

// --- Contador de victorias por artista (se guarda en el navegador) ---
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

// --- Sonido de victoria (se genera con la Web Audio API, sin archivos externos) ---
function sonidoVictoria() {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const notas = [523.25, 659.25, 783.99, 1046.50]; // Do-Mi-Sol-Do agudo, un jingle cortito
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

const fighter1Select = document.getElementById('fighter1');
const fighter2Select = document.getElementById('fighter2');
const fighter1Image = document.getElementById('fighter1Image');
const fighter2Image = document.getElementById('fighter2Image');
const fightButton = document.getElementById('fightButton');
const randomButton = document.getElementById('randomButton');
const resultDiv = document.getElementById('result');

// Elementos de estadísticas y barras
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

// Historial
const historySection = document.getElementById('history-section');
const historyList = document.getElementById('historyList');

let peleadores = [];

async function fetchData() {
    try {
        const response = await fetch(API_URL);
        peleadores = await response.json();
        loadFighters();
    } catch (error) {
        console.error('Error al conectar con la API de Java:', error);
    }
}

function loadFighters() {
    peleadores.forEach(fighter => {
        const option1 = document.createElement('option');
        option1.value = JSON.stringify(fighter);
        option1.text = fighter.nombre + medallaPara(fighter.nombre);
        fighter1Select.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = JSON.stringify(fighter);
        option2.text = fighter.nombre + medallaPara(fighter.nombre);
        fighter2Select.appendChild(option2);
    });
}

// Vuelve a armar las opciones de los selects para reflejar medallas actualizadas,
// manteniendo la selección actual de cada fighter
function refrescarSelects() {
    const valorPrevio1 = fighter1Select.value;
    const valorPrevio2 = fighter2Select.value;

    fighter1Select.innerHTML = '<option value="" disabled>Seleccioná al Artista 1...</option>';
    fighter2Select.innerHTML = '<option value="" disabled>Seleccioná al Artista 2...</option>';
    loadFighters();

    if (valorPrevio1) fighter1Select.value = valorPrevio1;
    if (valorPrevio2) fighter2Select.value = valorPrevio2;
}

// Actualizar Artista 1
fighter1Select.addEventListener('change', () => {
    if (!fighter1Select.value) return;
    const selected = JSON.parse(fighter1Select.value);
    
    fighter1Image.src = selected.url_imagen || 'placeholder1.png';
    
    // Rellenar datos
    hp1.textContent = selected.puntosVida;
    en1.textContent = selected.energia;
    def1.textContent = selected.defensaBase;

    // Animar barras (asumiendo un tope de 200 para que se llene visualmente bien)
    hpBar1.style.width = Math.min((selected.puntosVida / 200) * 100, 100) + '%';
    enBar1.style.width = Math.min((selected.energia / 150) * 100, 100) + '%';

    // Mostrar Arma y Ataque (tomados de tus relaciones @ManyToMany en Java)
    arma1Span.textContent = (selected.armaDelPeleador && selected.armaDelPeleador.length > 0) 
        ? selected.armaDelPeleador.map(a => a.nombre).join(', ') 
        : 'Sin equipamiento';

    ataque1Span.textContent = (selected.ataqueDelPeleador && selected.ataqueDelPeleador.length > 0) 
        ? selected.ataqueDelPeleador.map(at => at.nombre).join(', ') 
        : 'Sin ataques especiales';

    stats1.classList.remove('hidden');
});

// Actualizar Artista 2
fighter2Select.addEventListener('change', () => {
    if (!fighter2Select.value) return;
    const selected = JSON.parse(fighter2Select.value);
    
    fighter2Image.src = selected.url_imagen || 'placeholder2.png';
    
    hp2.textContent = selected.puntosVida;
    en2.textContent = selected.energia;
    def2.textContent = selected.defensaBase;

    hpBar2.style.width = Math.min((selected.puntosVida / 200) * 100, 100) + '%';
    enBar2.style.width = Math.min((selected.energia / 150) * 100, 100) + '%';

    arma2Span.textContent = (selected.armaDelPeleador && selected.armaDelPeleador.length > 0) 
        ? selected.armaDelPeleador.map(a => a.nombre).join(', ') 
        : 'Sin equipamiento';

    ataque2Span.textContent = (selected.ataqueDelPeleador && selected.ataqueDelPeleador.length > 0) 
        ? selected.ataqueDelPeleador.map(at => at.nombre).join(', ') 
        : 'Sin ataques especiales';

    stats2.classList.remove('hidden');
});

// Lógica de Batalla Épica
fightButton.addEventListener('click', () => {
    if (!fighter1Select.value || !fighter2Select.value) {
        alert('⚠️ Seleccioná ambos artistas para iniciar el duelo.');
        return;
    }

    const fighter1 = JSON.parse(fighter1Select.value);
    const fighter2 = JSON.parse(fighter2Select.value);

    if (fighter1.id === fighter2.id) {
        alert('⚠️ Un artista no puede competir contra sí mismo.');
        return;
    }

    resultDiv.textContent = "🎤 El jurado está analizando las presentaciones y el equipamiento...";
    resultDiv.classList.remove('hidden');

    setTimeout(() => {
        // Cálculo avanzado sumando bonificadores de armas si existen
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

        // --- Animación de "daño": la barra de vida del perdedor baja visualmente ---
        // (no toca los datos reales, es solo un efecto visual del golpe recibido)
        if (winnerName === fighter1.nombre) {
            hpBar2.style.width = '8%';
            hpBar2.classList.add('bar-hit');
        } else if (winnerName === fighter2.nombre) {
            hpBar1.style.width = '8%';
            hpBar1.classList.add('bar-hit');
        }

        // Si hay un ganador real: confeti, sonido y registro de la victoria
        if (winnerName !== "Empate") {
            confetti({
                particleCount: 120,
                spread: 70,
                origin: { y: 0.6 }
            });
            sonidoVictoria();
            guardarVictoria(winnerName);
            refrescarSelects();
        }

        // Agregar al historial
        historySection.classList.remove('hidden');
        const li = document.createElement('li');
        li.textContent = `${fighter1.nombre} vs ${fighter2.nombre} ➡️ Ganador: ${winnerName}${medallaPara(winnerName)}`;
        historyList.prepend(li); // Inserta arriba, la más nueva primero

    }, 1200);
});

// --- Botón "Pelea Aleatoria" ---
randomButton.addEventListener('click', () => {
    if (peleadores.length < 2) {
        alert('⚠️ Todavía no cargaron los artistas, esperá un segundo y reintentá.');
        return;
    }

    // Elegir dos índices distintos al azar
    const idx1 = Math.floor(Math.random() * peleadores.length);
    let idx2 = Math.floor(Math.random() * peleadores.length);
    while (idx2 === idx1) {
        idx2 = Math.floor(Math.random() * peleadores.length);
    }

    const random1 = peleadores[idx1];
    const random2 = peleadores[idx2];

    // Seleccionar esos artistas en los <select> (comparando por id, ya que el
    // texto de la opción puede tener medalla agregada al lado del nombre)
    seleccionarPorId(fighter1Select, random1.id);
    seleccionarPorId(fighter2Select, random2.id);

    // Disparar el evento "change" a mano, para que se actualicen stats/imagen
    fighter1Select.dispatchEvent(new Event('change'));
    fighter2Select.dispatchEvent(new Event('change'));

    // Y arrancar la pelea automáticamente
    fightButton.click();
});

function seleccionarPorId(selectElement, id) {
    for (const option of selectElement.options) {
        if (!option.value) continue;
        const data = JSON.parse(option.value);
        if (data.id === id) {
            selectElement.value = option.value;
            return;
        }
    }
}

fetchData();