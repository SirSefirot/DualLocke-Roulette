# Recompensas Dual-Locke · Pokémon Añil

Sistema de recompensas por combate para partidas Dual-Locke, con estética navideña.
Reparte 18 premios en 3 ruletas: el ganador elige una y la bloquea, el perdedor tira
en una de las dos que quedan.

## Cómo ejecutarlo

No hace falta instalar nada ni compilar: son HTML, CSS y JavaScript sin dependencias.

**Windows** — doble clic en `iniciar.bat`
**Mac / Linux** — `./iniciar.sh` desde la terminal

Ambos levantan un servidor en `http://localhost:8080` y abren el navegador solos.
Para usar otro puerto: `iniciar.bat 3000` o `./iniciar.sh 3000`.

También puedes abrir `index.html` con doble clic, sin servidor. Funciona igual.

## Publicarlo en GitHub Pages

En el repositorio: **Settings → Pages → Source: Deploy from a branch →
Branch: `main` / carpeta `/ (root)` → Save**.

En un par de minutos queda en `https://TU-USUARIO.github.io/DualLocke-Roulette/`.

## Cómo funciona el reparto

Los 18 premios se barajan con Fisher-Yates y se cortan en 3 grupos de 6. El reparto
se descarta entero y se vuelve a barajar si no cumple estas dos condiciones:

- El Jackpot nunca comparte ruleta con un premio de tier Master Ball.
- Los dos Master Ball caen siempre en ruletas distintas.

Descartar en lugar de mover piezas a mano es lo que mantiene la equiprobabilidad:
cada premio acaba en cada ruleta un tercio de las veces, comprobado con 200.000
simulaciones.

## Premios especiales

- **Reroll** — devuelve la tirada a la misma ruleta, sin límite de repeticiones.
- **1 menta aleatoria** — abre una ruleta con las 25 naturalezas.
- **Item competitivo aleatorio** — abre una ruleta con 50 objetos.
- **Jackpot** — lanza fuegos artificiales y deja elegir entre un Reroll o el
  **Huevo JACKPOT**, del que sale un Ultraente o un Pokémon Paradoja al azar.

Aparte de las ruletas, ambos jugadores reciben 2 capturas extras por disputar el combate.

## Personalizar

Casi todo se edita en `script.js`:

| Qué | Dónde |
|---|---|
| Premios, iconos y descripciones | `RECOMPENSAS` |
| Naturalezas | `NATURALEZAS` |
| Objetos competitivos | `ITEMS_COMPETITIVOS` |
| Pokémon del huevo | `ULTRAENTES` y `PARADOJA` |
| Nombres de las ruletas | `NOMBRES_RULETA` |

El tamaño general de la interfaz sale del `font-size` del `html`, en `style.css`.

## Notas

Los sprites se cargan de [PokeAPI](https://github.com/PokeAPI/sprites), así que la
pantalla del huevo necesita conexión. El resto funciona sin internet, salvo la
tipografía, que cae a una alternativa del sistema.
