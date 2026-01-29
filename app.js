import { MemoryLane } from "./games/memoryLane.js";
import { DoubleDice } from "./games/doubleDice.js";

/**
 * Global App State (shared across all games)
 */
const state = {
  players: [],
  scores: {}, // { name: number }
  settings: {
    spice: "medium", // low | medium | high
  },
  picker: {
    bag: [],
  },
};

const games = [MemoryLane, DoubleDice];

const appEl = document.getElementById("app");

/** Utilities **/
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function resetPickerBag() {
  state.picker.bag = shuffle([...state.players]);
}

function pickNextPlayer() {
  if (state.players.length === 0) return null;
  if (state.picker.bag.length === 0) resetPickerBag();
  return state.picker.bag.pop();
}

function addScore(name, delta) {
  state.scores[name] = (state.scores[name] ?? 0) + delta;
}

/** Simple renderer **/
function render(screenFn) {
  appEl.innerHTML = "";
  screenFn();
}

/** Intro / Setup Screen **/
function SetupScreen() {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <h1>Party Arcade 🎲</h1>
    <p class="small">A tiny party games app. Add players, choose spice level, then play.</p>
    <hr/>

    <label>Spice level</label>
    <select id="spice">
      <option value="low">Low (PG)</option>
      <option value="medium" selected>Medium</option>
      <option value="high">High (Spicy)</option>
    </select>

    <label>Players (comma-separated)</label>
    <input id="players" placeholder="Fisayo, Tolu, Kunle, Zainab" />

    <button id="start">Start</button>

    <p class="small" style="margin-top:10px;">
      Rule: No pass in Memory Lane — if it picks you, you must answer 😈
    </p>
  `;
  appEl.appendChild(card);

  card.querySelector("#start").onclick = () => {
    const spice = card.querySelector("#spice").value;
    const raw = card.querySelector("#players").value.trim();
    const players = raw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    // Basic validation
    const unique = [...new Set(players.map(p => p.toLowerCase()))];
    if (players.length < 2) {
      alert("Add at least 2 players.");
      return;
    }
    if (unique.length !== players.length) {
      alert("Duplicate player names found. Make them unique.");
      return;
    }

    state.settings.spice = spice;
    state.players = players;
    state.scores = Object.fromEntries(players.map((p) => [p, 0]));
    resetPickerBag();

    render(GameHubScreen);
  };
}

/** Game Hub **/
function GameHubScreen() {
  const header = document.createElement("div");
  header.className = "card";
  header.innerHTML = `
    <div class="row">
      <div>
        <h2>Game Hub</h2>
        <div style="margin-top:6px;">
          <span class="pill">Players: ${state.players.length}</span>
          <span class="pill" style="margin-left:8px;">Spice: ${state.settings.spice}</span>
        </div>
      </div>
      <div style="text-align:right;">
        <button class="secondary" id="edit">Edit setup</button>
      </div>
    </div>
  `;
  appEl.appendChild(header);

  header.querySelector("#edit").onclick = () => render(SetupScreen);

  const list = document.createElement("div");
  list.className = "list";

  games.forEach((g) => {
    const btn = document.createElement("button");
    btn.className = "secondary";
    btn.textContent = `Play: ${g.title}`;
    btn.onclick = () => render(() => GameScreen(g));
    list.appendChild(btn);
  });

  appEl.appendChild(list);

  const scoreboard = document.createElement("div");
  scoreboard.className = "card";
  scoreboard.innerHTML = `
    <h2>Scoreboard</h2>
    <div id="scores" class="small"></div>
    <button class="secondary" id="resetScores">Reset scores</button>
  `;
  appEl.appendChild(scoreboard);

  const scoresEl = scoreboard.querySelector("#scores");
  scoresEl.innerHTML = Object.entries(state.scores)
    .sort((a, b) => b[1] - a[1])
    .map(
      ([name, score]) =>
        `<div class="row"><div>${name}</div><div style="text-align:right;">${score}</div></div>`
    )
    .join("");

  scoreboard.querySelector("#resetScores").onclick = () => {
    state.players.forEach((p) => (state.scores[p] = 0));
    render(GameHubScreen);
  };
}

/** Game Screen **/
function GameScreen(game) {
  const wrapper = document.createElement("div");
  wrapper.className = "card";
  wrapper.innerHTML = `
    <div class="row">
      <div>
        <h2>${game.title}</h2>
        <div class="small">${game.description ?? ""}</div>
      </div>
      <div style="text-align:right;">
        <button class="secondary" id="back">Back</button>
      </div>
    </div>
    <div id="gameRoot"></div>
  `;
  appEl.appendChild(wrapper);

  wrapper.querySelector("#back").onclick = () => render(GameHubScreen);

  const api = {
    state,
    pickNextPlayer,
    addScore,
    goHome: () => render(GameHubScreen),
  };

  game.render(wrapper.querySelector("#gameRoot"), api);
}

/** Start **/
render(SetupScreen);
