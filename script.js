/* ============================================================
   Recompensas Dual-Locke · Pokémon Añil
   ============================================================ */

const TIERS = {
  jackpot: { nombre: "Jackpot",     color: "#f0c419", texto: "#3a2a00", emoji: "🌟" },
  master:  { nombre: "Master Ball", color: "#8b3fd6", texto: "#ffffff", emoji: "🟣" },
  ultra:   { nombre: "Ultra Ball",  color: "#e8a51c", texto: "#3a2a00", emoji: "🟡" },
  super:   { nombre: "Super Ball",  color: "#2f7fd0", texto: "#ffffff", emoji: "🔵" },
  poke:    { nombre: "Poké Ball",   color: "#cf3b2c", texto: "#ffffff", emoji: "🔴" },
  nada:    { nombre: "Nada",        color: "#8b8f94", texto: "#1a1a1a", emoji: "⚪" }
};

// Los 18 premios. "corto" es lo que cabe dentro del gajo de la ruleta.
let RECOMPENSAS = [
  { tier: "jackpot", nombre: "JACKPOT",                              corto: "JACKPOT",     icono: "🎰",
    nota: "Eliges entre un Reroll o abrir el Huevo JACKPOT, del que sale un Ultraente o un Pokémon Paradoja al azar." },

  { tier: "master",  nombre: "Cápsula de randomización",             corto: "Cápsula",     icono: "🎲",
    nota: "Vuelve a randomizar uno de tus Pokémon." },
  { tier: "master",  nombre: "Universal DT",                         corto: "Univ. DT",    icono: "💽",
    nota: "Disco Técnico que puede enseñar su movimiento a cualquier Pokémon." },

  { tier: "ultra",   nombre: "Reroll",                               corto: "Reroll",      icono: "🔄",
    nota: "Anula el premio y vuelves a tirar en la misma ruleta." },
  { tier: "ultra",   nombre: "Item competitivo a elección",          corto: "Item comp.",  icono: "🎽",
    nota: "Eliges tú el objeto competitivo que quieras." },
  { tier: "ultra",   nombre: "2 capturas extras",                    corto: "2 capturas",  icono: "🎣",
    nota: "Dos capturas adicionales, aparte de las que da el combate." },
  { tier: "ultra",   nombre: "2 MTs aleatorias",                     corto: "2 MTs",       icono: "💿",
    nota: "Dos MTs al azar." },

  { tier: "super",   nombre: "1 menta a elección",                   corto: "Menta elec.", icono: "🌿",
    nota: "Cambias la naturaleza de un Pokémon por la que tú elijas." },
  { tier: "super",   nombre: "1 captura extra",                      corto: "1 captura",   icono: "🎣",
    nota: "Una captura adicional, aparte de las que da el combate." },
  { tier: "super",   nombre: "1 MT forzada",                         corto: "MT forzada",  icono: "📀",
    nota: "Enseña una de tus MTs a un Pokémon aunque no pueda aprenderla" },
  { tier: "super",   nombre: "Megapiedra o item evolutivo a elección", corto: "Megapiedra", icono: "💎",
    nota: "Eliges una megapiedra o un objeto de evolución." },
  { tier: "super",   nombre: "Item competitivo aleatorio",           corto: "Item aleat.", icono: "🎽",
    nota: "Objeto competitivo al azar, se sortea en su propia ruleta." },
  { tier: "super",   nombre: "1 captura extra",                      corto: "1 captura",   icono: "🎣",
    nota: "Una captura adicional, aparte de las que da el combate." },

  { tier: "poke",    nombre: "2 minisetas",                          corto: "2 minisetas", icono: "🍄",
    nota: "Dos minisetas." },
  { tier: "poke",    nombre: "2 escamas corazón",                    corto: "2 escamas",   icono: "💗",
    nota: "Dos escamas corazón, para recordar movimientos olvidados." },
  { tier: "poke",    nombre: "Item evolutivo a elección",            corto: "Item evo.",   icono: "🔷",
    nota: "Eliges el objeto de evolución que quieras." },
  { tier: "poke",    nombre: "1 menta aleatoria",                    corto: "Menta aleat.", icono: "🌿",
    nota: "Naturaleza al azar, se sortea en la ruleta de naturalezas." },

  { tier: "nada",    nombre: "Nada",                                 corto: "Nada",        icono: "💨",
    nota: "Sin premio. Mala suerte." }
];


// Orden de importancia para la lista resumen de cada ruleta.
const RECOMPENSAS_ORIGINALES = RECOMPENSAS;

const ORDEN_TIER = ["jackpot", "master", "ultra", "super", "poke", "nada"];

// ---------------------------------------------------------------
// Ruletas secundarias: se abren cuando el premio es "aleatorio".
// Edita estas listas libremente, la ruleta se adapta al numero de opciones.
// ---------------------------------------------------------------
const NATURALEZAS = [
  "Fuerte", "Huraña", "Audaz", "Firme", "Pícara",
  "Osada", "Dócil", "Plácida", "Agitada", "Floja",
  "Miedosa", "Activa", "Seria", "Alegre", "Ingenua",
  "Modesta", "Afable", "Mansa", "Tímida", "Alocada",
  "Serena", "Amable", "Grosera", "Cauta", "Rara"
];

const ITEMS_COMPETITIVOS = [
  "Amuleto Puro", "Banda Focus", "Cinta Focus", "Banda Atadura",
  "Botas Gruesas", "Botón Escape", "Capa Furtiva", "Cascabel Concha",
  "Casco Dentado", "Chaleco Asalto", "Cinta Elección", "Cinta Experto",
  "Cinta Fuerte", "Dado Trucado", "Energía Potenciadora", "Gafas Elección",
  "Gafas Especiales", "Garra Rápida", "Garra Afilada", "Garra Garfio",
  "Globo Helio", "Guante de Boxeo", "Hierba Blanca", "Hierba Copia",
  "Hierba Única", "Llamasfera", "Lodo Negro", "Lupa",
  "Metrónomo", "Eviolite", "Pañuelo Elección", "Paracontacto",
  "Periscopio", "Raíz Grande", "Refleluz", "Restos",
  "Roca Calor", "Roca Helada", "Roca Lluvia", "Roca Suave",
  "Roca del Rey", "Seguro Debilidad", "Semilla Bruma", "Semilla Electro",
  "Semilla Hierba", "Semilla Psique", "Tarjeta Roja", "Telescopio",
  "Toxiesfera", "Vidaesfera"
];

// Pokemon del Huevo JACKPOT. Los sprites se cargan de PokeAPI por su numero.
const ULTRAENTES = [
  [793, "Nihilego"], [794, "Buzzwole"], [795, "Pheromosa"], [796, "Xurkitree"],
  [797, "Celesteela"], [798, "Kartana"], [799, "Guzzlord"], [803, "Poipole"],
  [805, "Stakataka"], [806, "Blacephalon"]
];

const PARADOJA = [
  [984, "Colmilargo"], [985, "Melenaltiva"], [986, "Furioseta"], [987, "Melenaespectral"],
  [988, "Reptalada"], [989, "Pelarena"], [1005, "Bramaluna"],
  [990, "Ferrodada"], [991, "Ferrosaco"], [992, "Ferropalmas"], [993, "Ferrocuello"],
  [994, "Ferropolilla"], [995, "Ferropúas"], [1006, "Ferropaladín"]
];

const SPRITE = n => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${n}.png`;

// Que premio abre que ruleta secundaria
const SECUNDARIAS = {
  "1 menta aleatoria":        { titulo: "Ruleta de naturalezas", sub: "La menta cambia la naturaleza a:", opciones: NATURALEZAS },
  "Item competitivo aleatorio": { titulo: "Ruleta de items competitivos", sub: "Te llevas:", opciones: ITEMS_COMPETITIVOS }
};

const NOMBRES_RULETA = ["Ruleta del Muérdago", "Ruleta del Acebo", "Ruleta del Abeto"];
const POR_RULETA = RECOMPENSAS.length / 3;   // 6

/* ---------- estado ---------- */
let ruletas = [];            // [[premio x6], [...], [...]]
let angulos = [0, 0, 0];     // rotación actual de cada canvas
let fase = "inicio";         // inicio | turnoGanador | girando | turnoPerdedor | fin
let elegidaGanador = null;
let resultados = { ganador: null, perdedor: null };
let reroll = null;              // { quien, indice } cuando toca repetir tirada

/* ============================================================
   Sonido (generado con Web Audio, sin archivos externos)
   ============================================================ */
const audio = {
  ctx: null,
  silencio: false,

  activar() {
    if (!this.ctx) this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (this.ctx.state === "suspended") this.ctx.resume();
  },

  tono(frec, dur, tipo = "square", vol = 0.14) {
    if (this.silencio || !this.ctx) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gan = this.ctx.createGain();
    osc.type = tipo;
    osc.frequency.setValueAtTime(frec, t);
    gan.gain.setValueAtTime(vol, t);
    gan.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.connect(gan).connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + dur);
  },

  clic()  { this.activar(); this.tono(680, 0.07, "square", 0.12); },
  tic()   { this.tono(1250, 0.035, "triangle", 0.09); },
  fin()   { [523, 659, 784, 1047].forEach((f, i) =>
              setTimeout(() => this.tono(f, 0.22, "triangle", 0.13), i * 110)); },
  nada()  { [330, 262].forEach((f, i) =>
              setTimeout(() => this.tono(f, 0.28, "sine", 0.12), i * 160)); },

  // silbido ascendente + estallido, para los fuegos artificiales
  cohete(retraso = 0) {
    this.activar();
    if (this.silencio || !this.ctx) return;
    const t = this.ctx.currentTime + retraso;

    const osc = this.ctx.createOscillator();
    const g1 = this.ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(420, t);
    osc.frequency.exponentialRampToValueAtTime(1600, t + 0.5);
    g1.gain.setValueAtTime(0.09, t);
    g1.gain.exponentialRampToValueAtTime(0.0001, t + 0.55);
    osc.connect(g1).connect(this.ctx.destination);
    osc.start(t); osc.stop(t + 0.56);

    const dur = 1.1;
    const buf = this.ctx.createBuffer(1, this.ctx.sampleRate * dur, this.ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 3);
    const src = this.ctx.createBufferSource();
    src.buffer = buf;
    const filtro = this.ctx.createBiquadFilter();
    filtro.type = "bandpass";
    filtro.frequency.setValueAtTime(1400, t + 0.5);
    filtro.frequency.exponentialRampToValueAtTime(280, t + 1.4);
    const g2 = this.ctx.createGain();
    g2.gain.setValueAtTime(0.32, t + 0.5);
    g2.gain.exponentialRampToValueAtTime(0.0001, t + 1.5);
    src.connect(filtro).connect(g2).connect(this.ctx.destination);
    src.start(t + 0.5);
  }
};

/* ============================================================
   Reparto
   ============================================================ */
function barajar(lista) {
  const a = lista.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function repartir() {
  // Baraja y corta en 3 grupos de 6 hasta que el jackpot no comparta
  // ruleta con ningún premio de tier Master Ball.
  for (let intento = 0; intento < 500; intento++) {
    const mezcla = barajar(RECOMPENSAS);
    const grupos = [
      mezcla.slice(0, POR_RULETA),
      mezcla.slice(POR_RULETA, POR_RULETA * 2),
      mezcla.slice(POR_RULETA * 2)
    ];
    const valido = grupos.every(g => {
      const tieneJackpot = g.some(p => p.tier === "jackpot");
      const masters      = g.filter(p => p.tier === "master").length;
      return !(tieneJackpot && masters > 0) && masters <= 1;
    });
    if (valido) return grupos;
  }
  throw new Error("No se pudo repartir cumpliendo las reglas de jackpot y Master Ball.");
}

/* ============================================================
   Dibujo de la ruleta
   ============================================================ */
const caras = new WeakMap();   // cada ruleta guarda su cara ya dibujada

function crearCara(S, elementos, pintarGajo) {
  const off = document.createElement("canvas");
  off.width = off.height = S;
  const ctx = off.getContext("2d");
  const c = S / 2, r = c - 20;
  const paso = (Math.PI * 2) / elementos.length;
  ctx.translate(c, c);
  elementos.forEach((el, i) => {
    const ini = i * paso;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, r, ini, ini + paso);
    ctx.closePath();
    pintarGajo(ctx, el, i, r, ini, paso);
  });
  return off;
}

function estrella(ctx, x, y, r) {
  ctx.beginPath();
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    const rad = i % 2 ? r * 0.34 : r;
    ctx[i ? "lineTo" : "moveTo"](x + Math.cos(a) * rad, y + Math.sin(a) * rad);
  }
  ctx.closePath();
  ctx.fill();
}

function marco(ctx, c, r) {
  ctx.beginPath();
  ctx.arc(0, 0, r + 15, 0, Math.PI * 2);
  ctx.fillStyle = "#7d1420";
  ctx.fill();
  ctx.lineWidth = 6;
  ctx.strokeStyle = "#e9b949";
  ctx.stroke();
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * Math.PI * 2;
    ctx.beginPath();
    ctx.arc(Math.cos(a) * (r + 8), Math.sin(a) * (r + 8), 4, 0, Math.PI * 2);
    ctx.fillStyle = i % 2 ? "#fff4d0" : "#ffd45e";
    ctx.fill();
  }
}

function eje(ctx) {
  ctx.beginPath();
  ctx.arc(0, 0, 30, 0, Math.PI * 2);
  ctx.fillStyle = "#3b0a11";
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.strokeStyle = "#e9b949";
  ctx.stroke();
}

function dibujar(canvas, premios, rotacion) {
  const ctx = canvas.getContext("2d");
  const S = canvas.width, c = S / 2, r = c - 20;

  if (!caras.has(canvas)) {
    caras.set(canvas, crearCara(S, premios, (cx, p, i, rr, ini, paso) => {
      const t = TIERS[p.tier];
      const esJackpot = p.tier === "jackpot";

      if (esJackpot) {
        // relleno dorado con brillo, para que destaque sobre el resto
        const g = cx.createLinearGradient(
          Math.cos(ini) * rr, Math.sin(ini) * rr,
          Math.cos(ini + paso) * rr, Math.sin(ini + paso) * rr
        );
        g.addColorStop(0,   "#b8860b");
        g.addColorStop(.35, "#ffe680");
        g.addColorStop(.55, "#fff8dc");
        g.addColorStop(.75, "#f0c419");
        g.addColorStop(1,   "#a9791a");
        cx.fillStyle = g;
        cx.fill();
        cx.lineWidth = 5;
        cx.strokeStyle = "#fff6cf";
        cx.stroke();
      } else {
        cx.fillStyle = t.color;
        cx.fill();
        cx.lineWidth = 2.5;
        cx.strokeStyle = "rgba(0,0,0,.35)";
        cx.stroke();
      }

      cx.save();
      cx.rotate(ini + paso / 2);
      cx.textAlign = "right";
      cx.textBaseline = "middle";

      if (esJackpot) {
        // destellos repartidos por el gajo
        cx.fillStyle = "rgba(255,255,255,.9)";
        [[rr - 105, -34, 7], [rr - 58, 30, 5], [rr - 150, 20, 4.5], [rr - 82, -8, 3.5]]
          .forEach(([x, y, s]) => estrella(cx, x, y, s));

        cx.font = "900 26px Bungee, Karla, sans-serif";
        cx.lineWidth = 5;
        cx.strokeStyle = "#5a3200";
        cx.strokeText("JACKPOT", rr - 22, -2);
        cx.fillStyle = "#fffbe8";
        cx.fillText("JACKPOT", rr - 22, -2);
        cx.font = "30px sans-serif";
        cx.fillText(p.icono, rr - 30, 32);
      } else {
        cx.fillStyle = t.texto;
        cx.font = "bold 17px Karla, sans-serif";
        cx.fillText(p.corto, rr - 20, 0);
        cx.font = "22px sans-serif";
        cx.fillText(p.icono, rr - 20, 26);
      }
      cx.restore();
    }));
  }

  ctx.clearRect(0, 0, S, S);
  ctx.save();
  ctx.translate(c, c);
  marco(ctx, c, r);
  ctx.rotate(rotacion);
  ctx.drawImage(caras.get(canvas), -c, -c);
  ctx.rotate(-rotacion);
  eje(ctx);
  ctx.restore();
}

/* ============================================================
   Interfaz
   ============================================================ */
const $wheels  = document.getElementById("wheels");
const $turn    = document.getElementById("turn");
const $results = document.getElementById("results");
const $cards   = document.getElementById("resultCards");
const $lobby   = document.getElementById("lobby");

function nombreGanador() {
  return document.getElementById("winnerName").value.trim() || "Ganador";
}
function nombrePerdedor() {
  return document.getElementById("loserName").value.trim() || "Perdedor";
}

function pintarRuletas() {
  $wheels.innerHTML = "";
  ruletas.forEach((premios, i) => {
    const ordenados = premios.slice().sort(
      (a, b) => ORDEN_TIER.indexOf(a.tier) - ORDEN_TIER.indexOf(b.tier)
    );
    const box = document.createElement("div");
    box.className = "wheel-box";
    box.id = "box-" + i;
    box.innerHTML = `
      <h2>${NOMBRES_RULETA[i]}</h2>
      <div class="canvas-wrap">
        <div class="pointer"></div>
        <canvas id="canvas-${i}" width="520" height="520"></canvas>
      </div>
      <button class="pick" data-wheel="${i}">Tirar esta ruleta</button>
      <ul class="prize-list">
        ${ordenados.map(p => `
          <li><span class="dot" style="background:${TIERS[p.tier].color}"></span><span class="ico sm">${p.icono}</span>${p.nombre}</li>
        `).join("")}
      </ul>`;
    $wheels.appendChild(box);
    caras.delete(document.getElementById("canvas-" + i));
    dibujar(document.getElementById("canvas-" + i), premios, angulos[i]);
  });

  $wheels.querySelectorAll(".pick").forEach(btn => {
    btn.addEventListener("click", () => { audio.clic(); tirar(Number(btn.dataset.wheel)); });
  });
}

function actualizarBotones() {
  $wheels.querySelectorAll(".pick").forEach(btn => {
    const i = Number(btn.dataset.wheel);
    const box = document.getElementById("box-" + i);
    box.classList.remove("locked", "chosen");

    if (fase === "turnoGanador") {
      btn.disabled = false;
      btn.textContent = "Tirar esta ruleta";
    } else if (fase === "turnoPerdedor") {
      if (i === elegidaGanador) {
        btn.disabled = true;
        btn.textContent = "Bloqueada";
        box.classList.add("locked", "chosen");
      } else {
        btn.disabled = false;
        btn.textContent = "Tirar esta ruleta";
      }
    } else if (fase === "reroll") {
      if (i === reroll.indice) {
        btn.disabled = false;
        btn.textContent = "Volver a tirar";
        box.classList.add("chosen");
      } else {
        btn.disabled = true;
        btn.textContent = i === elegidaGanador && reroll.quien === "perdedor" ? "Bloqueada" : "—";
        box.classList.add("locked");
      }
    } else {
      btn.disabled = true;
      if (fase === "fin") btn.textContent = "Ronda terminada";
    }
  });
}

const REGLAS = $turn.innerHTML;   // se guarda para poder volver a mostrarlo
function mensaje(html) { $turn.innerHTML = html; }

/* ============================================================
   Tirada
   ============================================================ */
function tirar(indice) {
  if (fase !== "turnoGanador" && fase !== "turnoPerdedor" && fase !== "reroll") return;

  const quien = fase === "reroll" ? reroll.quien
              : fase === "turnoGanador" ? "ganador" : "perdedor";
  const nombre = quien === "ganador" ? nombreGanador() : nombrePerdedor();
  const premios = ruletas[indice];
  const destino = Math.floor(Math.random() * premios.length);
  const paso = (Math.PI * 2) / premios.length;

  fase = "girando";
  actualizarBotones();
  mensaje(`Girando <b>${NOMBRES_RULETA[indice]}</b>…`);

  const canvas = document.getElementById("canvas-" + indice);
  const inicio = angulos[indice];
  // el gajo elegido debe acabar bajo la flecha (arriba = -90º)
  const base = -Math.PI / 2 - (destino * paso + paso / 2);
  const vueltas = 3 + Math.floor(Math.random() * 2);
  const final = base + vueltas * Math.PI * 2 + Math.ceil((inicio - base) / (Math.PI * 2)) * Math.PI * 2;

  const duracion = 5200;
  const t0 = performance.now();
  let ultimoGajo = null;

  function frame(ahora) {
    const p = Math.min((ahora - t0) / duracion, 1);
    const e = 1 - Math.pow(1 - p, 5);           // frenada larga y suave
    angulos[indice] = inicio + (final - inicio) * e;
    dibujar(canvas, premios, angulos[indice]);

    // un tic cada vez que un gajo cruza la flecha
    const gajo = Math.floor(angulos[indice] / paso);
    if (gajo !== ultimoGajo) { if (ultimoGajo !== null) audio.tic(); ultimoGajo = gajo; }
    if (p < 1) requestAnimationFrame(frame);
    else terminarTirada(quien, nombre, indice, premios[destino]);
  }
  requestAnimationFrame(frame);
}

function terminarTirada(quien, nombre, indice, premio) {
  resultados[quien] = { nombre, ruleta: indice, premio };

  // El Reroll obliga a repetir la tirada en la misma ruleta
  if (premio.nombre === "Reroll") {
    audio.clic();
    reroll = { quien, indice };
    if (quien === "ganador") elegidaGanador = indice;
    fase = "reroll";
    actualizarBotones();
    mensaje(`🔄 <b>${nombre}</b> ha sacado <b>Reroll</b>. Vuelve a tirar en ${NOMBRES_RULETA[indice]}.`);
    return;
  }
  reroll = null;

  if (premio.tier === "nada") audio.nada(); else audio.fin();

  const secundaria = SECUNDARIAS[premio.nombre] ? premio.nombre : null;

  if (quien === "ganador") {
    elegidaGanador = indice;
    fase = "turnoPerdedor";
    actualizarBotones();
    mensaje(`<b>${nombre}</b> se lleva <b>${premio.nombre}</b>. Turno de <b>${nombrePerdedor()}</b>: elige una de las dos ruletas libres.`);
  } else {
    fase = "fin";
    actualizarBotones();
    mensaje(`Ronda cerrada. <b>${nombre}</b> se lleva <b>${premio.nombre}</b>.`);
    if (!secundaria && premio.tier !== "jackpot") mostrarResultados();
  }

  if (secundaria) setTimeout(() => abrirBonus(secundaria, quien), 700);
  if (premio.tier === "jackpot") abrirJackpot(quien, indice);
}

function mostrarResultados() {
  $cards.innerHTML = ["ganador", "perdedor"].map(k => {
    const r = resultados[k];
    const t = TIERS[r.premio.tier];
    const detalle = r.detalle ? ` <span style="color:var(--crema)">→ ${r.detalle}</span>` : "";
    const pie = r.premio.tier === "jackpot"
      ? "Tira ahora en la Jackpot Roulette. Si el premio no te sirve, haz reroll."
      : `${t.emoji} Tier ${t.nombre} · ${NOMBRES_RULETA[r.ruleta]}`;
    return `
      <div class="rcard" style="border-color:${t.color}">
        <p class="who">${k === "ganador" ? "Ganador" : "Perdedor"}</p>
        <p class="name">${r.nombre}</p>
        <p class="prize" style="color:${t.color === "#8b8f94" ? "#cfd3d7" : t.color}">${r.premio.nombre}${detalle}</p>
        <p class="tier">${pie}</p>
      </div>`;
  }).join("");
  $results.hidden = false;
}

function pintarCatalogo() {
  document.getElementById("catalog").innerHTML = ORDEN_TIER.map(clave => {
    const t = TIERS[clave];
    const lista = RECOMPENSAS.filter(p => p.tier === clave);
    return `
      <div class="tier-col" style="border-top-color:${t.color}">
        <h3 style="color:${t.color === "#8b8f94" ? "#cfd3d7" : t.color}">
          ${t.emoji} ${t.nombre}
          <span class="n">${lista.length} ${lista.length === 1 ? "premio" : "premios"}</span>
        </h3>
        <ul>
          ${lista.map(p => `<li style="border-left-color:${t.color}"${p.nota ? ` title="${p.nota}"` : ""}><span class="ico">${p.icono}</span><span>${p.nombre}</span></li>`).join("")}
        </ul>
      </div>`;
  }).join("");
}
pintarCatalogo();

/* ============================================================
   Controles
   ============================================================ */
document.getElementById("randomize").addEventListener("click", () => {
  audio.clic();
  ruletas = repartir();
  angulos = [0, 0, 0];
  elegidaGanador = null;
  resultados = { ganador: null, perdedor: null };
  reroll = null;
  fase = "turnoGanador";
  $results.hidden = true;
  $jk.hidden = true;
  $bonus.hidden = true;
  $lobby.hidden = true;
  $wheels.hidden = false;
  pintarRuletas();
  actualizarBotones();
  mensaje(`Premios repartidos. Turno de <b>${nombreGanador()}</b>: elige la ruleta que quieras tirar.`);
});

document.getElementById("home").addEventListener("click", () => {
  audio.clic();
  fase = "inicio";
  elegidaGanador = null;
  reroll = null;
  resultados = { ganador: null, perdedor: null };
  $wheels.hidden = true;
  $results.hidden = true;
  $bonus.hidden = true;
  document.body.classList.remove("modal-open");
  $lobby.hidden = false;
  mensaje(REGLAS);
});

const $help = document.getElementById("helpModal");
document.getElementById("help").addEventListener("click", () => {
  audio.clic();
  document.getElementById("helpGrid").innerHTML = ORDEN_TIER.map(clave => {
    const t = TIERS[clave];
    const color = t.color === "#8b8f94" ? "#cfd3d7" : t.color;
    return `
      <div class="help-tier">
        <h3 style="color:${color};border-color:${t.color}">${t.emoji} ${t.nombre}</h3>
        <ul>
          ${RECOMPENSAS.filter(p => p.tier === clave).map(p => `
            <li style="border-left-color:${t.color}">
              <span class="ico">${p.icono}</span>
              <span><b>${p.nombre}</b><small>${p.nota}</small></span>
            </li>`).join("")}
        </ul>
      </div>`;
  }).join("");
  $help.hidden = false;
});
document.getElementById("helpClose").addEventListener("click", () => { audio.clic(); $help.hidden = true; });
$help.addEventListener("click", e => { if (e.target === $help) $help.hidden = true; });

/* ============================================================
   Editor de premios
   ============================================================ */
const $edit     = document.getElementById("editModal");
const $editText = document.getElementById("editText");
const $editErr  = document.getElementById("editError");
const CLAVE_GUARDADO = "dualocke-premios";

// Abrevia el nombre para que quepa dentro del gajo de la ruleta
function abreviar(nombre) {
  if (nombre.length <= 13) return nombre;
  const palabras = nombre.split(" ");
  let corto = "";
  for (const p of palabras) {
    if ((corto + " " + p).trim().length > 12) break;
    corto = (corto + " " + p).trim();
  }
  return (corto || nombre.slice(0, 11)) + ".";
}

function premiosATexto(lista) {
  return ORDEN_TIER.map(clave => {
    const t = TIERS[clave];
    const suyos = lista.filter(p => p.tier === clave);
    return `# ${t.nombre.toUpperCase()}\n` +
      suyos.map(p => `${p.nombre} | ${p.icono || ""} | ${p.nota || ""}`).join("\n");
  }).join("\n\n");
}

function textoAPremios(texto) {
  const porNombre = {};
  ORDEN_TIER.forEach(c => porNombre[TIERS[c].nombre.toUpperCase()] = c);

  const lista = [];
  let actual = null;

  texto.split("\n").forEach((linea, n) => {
    const l = linea.trim();
    if (!l) return;

    if (l.startsWith("#")) {
      const nombre = l.slice(1).trim().toUpperCase();
      if (!porNombre[nombre]) {
        throw new Error(`Línea ${n + 1}: el tier "${l.slice(1).trim()}" no existe. ` +
          `Los válidos son: ${Object.keys(porNombre).join(", ")}.`);
      }
      actual = porNombre[nombre];
      return;
    }

    if (!actual) throw new Error(`Línea ${n + 1}: hay un premio antes del primer tier.`);

    const partes = l.split("|").map(x => x.trim());
    if (!partes[0]) throw new Error(`Línea ${n + 1}: el premio no tiene nombre.`);

    lista.push({
      tier: actual,
      nombre: partes[0],
      corto: abreviar(partes[0]),
      icono: partes[1] || "🎁",
      nota: partes[2] || ""
    });
  });

  if (lista.length < 3 || lista.length % 3 !== 0) {
    throw new Error(`Hay ${lista.length} premios. Tiene que ser un múltiplo de 3 ` +
      `(por ejemplo 15, 18 o 21) para repartirlos en las tres ruletas.`);
  }
  return lista;
}

function aplicarPremios(lista) {
  RECOMPENSAS = lista;
  pintarCatalogo();
}

// Al arrancar, recupera los premios guardados en este navegador
try {
  const guardado = localStorage.getItem(CLAVE_GUARDADO);
  if (guardado) aplicarPremios(JSON.parse(guardado));
} catch (e) { /* si falla, se usan los originales */ }

document.getElementById("edit").addEventListener("click", () => {
  audio.clic();
  $editText.value = premiosATexto(RECOMPENSAS);
  $editErr.textContent = "";
  $edit.hidden = false;
});

document.getElementById("editSave").addEventListener("click", () => {
  try {
    const lista = textoAPremios($editText.value);
    aplicarPremios(lista);
    try { localStorage.setItem(CLAVE_GUARDADO, JSON.stringify(lista)); } catch (e) {}
    audio.fin();
    $edit.hidden = true;
    fase = "inicio";
    $wheels.hidden = true;
    $results.hidden = true;
    $lobby.hidden = false;
    mensaje(REGLAS);
  } catch (err) {
    audio.nada();
    $editErr.textContent = err.message;
  }
});

document.getElementById("editReset").addEventListener("click", () => {
  audio.clic();
  $editText.value = premiosATexto(RECOMPENSAS_ORIGINALES);
  $editErr.textContent = "";
});

document.getElementById("editCancel").addEventListener("click", () => { audio.clic(); $edit.hidden = true; });
$edit.addEventListener("click", e => { if (e.target === $edit) $edit.hidden = true; });

const $mute = document.getElementById("mute");
$mute.addEventListener("click", () => {
  audio.silencio = !audio.silencio;
  $mute.textContent = audio.silencio ? "🔇" : "🔊";
  $mute.setAttribute("aria-pressed", String(audio.silencio));
  $mute.title = audio.silencio ? "Activar sonido" : "Silenciar";
  if (!audio.silencio) audio.clic();
});

/* ============================================================
   Ruleta secundaria (premios aleatorios)
   ============================================================ */
const $bonus       = document.getElementById("bonusModal");
const $bonusTitle  = document.getElementById("bonusTitle");
const $bonusSub    = document.getElementById("bonusSub");
const $bonusCanvas = document.getElementById("bonusCanvas");
const $bonusResult = document.getElementById("bonusResult");
const $bonusList   = document.getElementById("bonusList");
const $bonusSpin   = document.getElementById("bonusSpin");
const $bonusClose  = document.getElementById("bonusClose");

const PALETA = ["#cf3b2c", "#e8a51c", "#2f7fd0", "#1e7a4d", "#8b3fd6", "#c9922c"];

let bonus = null;   // { opciones, angulo, quien, girando }

function dibujarBonus() {
  const ctx = $bonusCanvas.getContext("2d");
  const S = $bonusCanvas.width, c = S / 2, r = c - 20;
  const n = bonus.opciones.length;

  if (!bonus.cara) {
    bonus.cara = crearCara(S, bonus.opciones, (cx, texto, i, rr, ini, paso) => {
      cx.fillStyle = PALETA[i % PALETA.length];
      cx.fill();
      cx.lineWidth = 2;
      cx.strokeStyle = "rgba(0,0,0,.3)";
      cx.stroke();
      cx.save();
      cx.rotate(ini + paso / 2);
      cx.textAlign = "right";
      cx.textBaseline = "middle";
      cx.fillStyle = "#fff";
      cx.font = `bold ${n > 34 ? 12 : n > 18 ? 15 : 19}px Karla, sans-serif`;
      cx.fillText(texto, rr - 12, 0);
      cx.restore();
    });
  }

  ctx.imageSmoothingQuality = "low";
  ctx.clearRect(0, 0, S, S);
  ctx.save();
  ctx.translate(c, c);
  marco(ctx, c, r);
  ctx.rotate(bonus.angulo);
  ctx.drawImage(bonus.cara, -c, -c);
  ctx.rotate(-bonus.angulo);
  eje(ctx);
  ctx.restore();
}

function abrirBonus(nombrePremio, quien) {
  const cfg = SECUNDARIAS[nombrePremio];
  bonus = { opciones: cfg.opciones, angulo: 0, quien, girando: false, cara: null };
  $bonusTitle.textContent = cfg.titulo;
  $bonusSub.textContent = `${resultados[quien].nombre} · ${cfg.sub}`;
  $bonusResult.textContent = "";
  $bonusSpin.hidden = false;
  $bonusSpin.disabled = false;
  $bonusClose.hidden = true;
  $bonusList.innerHTML = cfg.opciones.map((o, i) =>
    `<li data-op="${i}"><span class="dot" style="background:${PALETA[i % PALETA.length]}"></span>${o}</li>`
  ).join("");
  $bonus.hidden = false;
  document.body.classList.add("modal-open");
  dibujarBonus();
}

$bonusSpin.addEventListener("click", () => {
  if (bonus.girando) return;
  audio.clic();
  bonus.girando = true;
  $bonusSpin.disabled = true;

  const n = bonus.opciones.length;
  const paso = (Math.PI * 2) / n;
  const destino = Math.floor(Math.random() * n);
  const base = -Math.PI / 2 - (destino * paso + paso / 2);
  const inicio = bonus.angulo;
  const final = base + (3 + Math.floor(Math.random() * 2)) * Math.PI * 2
              + Math.ceil((inicio - base) / (Math.PI * 2)) * Math.PI * 2;

  const dur = 5200, t0 = performance.now();
  let ultimo = null;

  (function frame(ahora) {
    const p = Math.min((ahora - t0) / dur, 1);
    bonus.angulo = inicio + (final - inicio) * (1 - Math.pow(1 - p, 5));
    dibujarBonus();
    const gajo = Math.floor(bonus.angulo / paso);
    if (gajo !== ultimo) { if (ultimo !== null) audio.tic(); ultimo = gajo; }
    if (p < 1) requestAnimationFrame(frame);
    else {
      const elegido = bonus.opciones[destino];
      $bonusResult.textContent = elegido;
      const fila = $bonusList.querySelector(`[data-op="${destino}"]`);
      if (fila) fila.classList.add("win");
      audio.fin();
      resultados[bonus.quien].detalle = elegido;
      $bonusSpin.hidden = true;
      $bonusClose.hidden = false;
      bonus.girando = false;
      if (fase === "fin") mostrarResultados();
    }
  })(performance.now());
});

$bonusClose.addEventListener("click", () => {
  audio.clic();
  $bonus.hidden = true;
  document.body.classList.remove("modal-open");
});

/* ============================================================
   Jackpot: fuegos artificiales, eleccion y huevo
   ============================================================ */
const $fw       = document.getElementById("fireworks");
const $jk       = document.getElementById("jackpotModal");
const $jkChoice = document.getElementById("jkChoice");
const $jkEggV   = document.getElementById("jkEggView");
const $jkWho    = document.getElementById("jkWho");
const $eggBtn   = document.getElementById("eggBtn");
const $eggFlash = document.getElementById("eggFlash");
const $eggRes   = document.getElementById("eggResult");
const $eggSpr   = document.getElementById("eggSprite");
const $eggName  = document.getElementById("eggName");
const $eggSub   = document.getElementById("jkEggSub");
const $eggPool  = document.getElementById("eggPool");
const $jkClose  = document.getElementById("jkClose");

let jackpot = null;   // { quien, indice }

/* ---------- fuegos artificiales ---------- */
function fuegos(ms = 2200) {
  const ctx = $fw.getContext("2d");
  $fw.width = innerWidth; $fw.height = innerHeight;
  $fw.hidden = false;

  const particulas = [];
  const colores = ["#ffd85e", "#ff5f4d", "#6ec5ff", "#8fe388", "#ffffff", "#d78bff"];

  function estallar(x, y) {
    const color = colores[Math.floor(Math.random() * colores.length)];
    for (let i = 0; i < 46; i++) {
      const a = (i / 46) * Math.PI * 2 + Math.random() * 0.2;
      const v = 2.6 + Math.random() * 4.4;
      particulas.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, vida: 1, color });
    }
  }

  const t0 = performance.now();
  let siguiente = 0;

  (function frame(ahora) {
    const t = ahora - t0;
    if (t > siguiente && t < ms - 500) {
      estallar(innerWidth * (0.15 + Math.random() * 0.7), innerHeight * (0.15 + Math.random() * 0.45));
      audio.cohete();
      siguiente = t + 280 + Math.random() * 220;
    }

    ctx.clearRect(0, 0, $fw.width, $fw.height);
    for (let i = particulas.length - 1; i >= 0; i--) {
      const p = particulas[i];
      p.x += p.vx; p.y += p.vy; p.vy += 0.075; p.vx *= 0.985; p.vy *= 0.985;
      p.vida -= 0.017;
      if (p.vida <= 0) { particulas.splice(i, 1); continue; }
      ctx.globalAlpha = Math.max(p.vida, 0);
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2.6, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    if (t < ms || particulas.length) requestAnimationFrame(frame);
    else { ctx.clearRect(0, 0, $fw.width, $fw.height); $fw.hidden = true; }
  })(performance.now());
}

/* ---------- eleccion ---------- */
function abrirJackpot(quien, indice) {
  jackpot = { quien, indice };
  fuegos();
  $jkWho.textContent = `${resultados[quien].nombre} ha reventado la ruleta`;
  $jkChoice.hidden = false;
  $jkEggV.hidden = true;
  setTimeout(() => { $jk.hidden = false; }, 450);
}

document.getElementById("jkReroll").addEventListener("click", () => {
  audio.clic();
  $jk.hidden = true;
  const { quien, indice } = jackpot;
  const nombre = resultados[quien].nombre;
  reroll = { quien, indice };
  if (quien === "ganador") elegidaGanador = indice;
  fase = "reroll";
  $results.hidden = true;
  actualizarBotones();
  mensaje(`🔄 <b>${nombre}</b> cambia el Jackpot por un <b>Reroll</b>. Vuelve a tirar en ${NOMBRES_RULETA[indice]}.`);
});

/* ---------- huevo ---------- */
let premioHuevo = null;

document.getElementById("jkEgg").addEventListener("click", () => {
  audio.clic();
  const bolsa = [...ULTRAENTES, ...PARADOJA];
  premioHuevo = bolsa[Math.floor(Math.random() * bolsa.length)];   // tirada invisible

  $eggPool.innerHTML = [["Ultraentes", ULTRAENTES], ["Pokémon Paradoja", PARADOJA]]
    .map(([titulo, lista]) => `
      <div>
        <h3>${titulo}</h3>
        <div class="pool-grid">
          ${lista.map(([n, nom]) => `
            <div class="pool-mon">
              <img src="${SPRITE(n)}" alt="${nom}" loading="lazy">
              <span>${nom}</span>
            </div>`).join("")}
        </div>
      </div>`).join("");

  $eggRes.hidden = true;
  $eggBtn.hidden = false;
  $eggBtn.classList.remove("rompiendo");
  $eggBtn.disabled = false;
  $eggSub.textContent = "Pulsa el huevo para abrirlo";
  $jkClose.hidden = true;
  $jkChoice.hidden = true;
  $jkEggV.hidden = false;
});

$eggBtn.addEventListener("click", () => {
  $eggBtn.disabled = true;
  $eggBtn.classList.add("rompiendo");
  audio.tono(180, 0.12, "square", 0.12);
  setTimeout(() => audio.tono(150, 0.14, "square", 0.12), 260);
  setTimeout(() => audio.tono(120, 0.18, "square", 0.13), 520);

  setTimeout(() => {
    $eggFlash.classList.add("on");
    audio.cohete();
    setTimeout(() => {
      $eggBtn.hidden = true;
      const [num, nombre] = premioHuevo;
      $eggSpr.src = SPRITE(num);
      $eggSpr.alt = nombre;
      $eggName.textContent = nombre;
      $eggRes.hidden = false;
      $eggSub.textContent = "¡Del huevo ha salido!";
      $jkClose.hidden = false;
      audio.fin();
      resultados[jackpot.quien].detalle = nombre;
      $eggFlash.classList.remove("on");
      if (fase === "fin") mostrarResultados();
    }, 330);
  }, 880);
});

$jkClose.addEventListener("click", () => { audio.clic(); $jk.hidden = true; });

/* ---------- nieve ---------- */
(function nieve() {
  const cont = document.getElementById("snow");
  const copos = ["❄", "❅", "❆", "•"];
  for (let i = 0; i < 22; i++) {
    const s = document.createElement("span");
    s.className = "flake";
    s.textContent = copos[Math.floor(Math.random() * copos.length)];
    s.style.left = Math.random() * 100 + "%";
    s.style.fontSize = (8 + Math.random() * 14) + "px";
    s.style.animationDuration = (7 + Math.random() * 9) + "s";
    s.style.animationDelay = (-Math.random() * 12) + "s";
    s.style.opacity = 0.25 + Math.random() * 0.45;
    cont.appendChild(s);
  }
})();