import { MemoryLane } from "./games/memoryLane.js";
import { DoubleDice } from "./games/doubleDice.js";
import { Taboo20 } from "./games/taboo20.js";
import { WahalaOrWinning } from "./games/wahalaOrWinning.js";
import { NeverHaveIEver } from "./games/neverHaveIEver.js";
import { TruthOrDare } from "./games/truthOrDare.js";

/**
 * Global App State (shared across all games)
 * No scoring in this version.
 */
const state = {
  players: [],
  settings: {
    spice: "medium", // low | medium | high
  },
  picker: {
    bag: [],
  },
};

const games = [MemoryLane, DoubleDice, Taboo20, WahalaOrWinning, NeverHaveIEver, TruthOrDare];

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
    <div class="party-banner">
      <h1>🎉 Party Arcade 🎲</h1>
      <p>Get ready for epic party games like Truth or Dare, Never Have I Ever, and more! Set up your crew and let's get the fun started.</p>
    </div>
    <hr/>

    <label>Spice Level 🔥</label>
    <select id="spice">
      <option value="low">Low (PG) - Mild fun</option>
      <option value="medium" selected>Medium - Balanced vibes</option>
      <option value="high">High (Spicy) - Wild energy</option>
    </select>

    <label>Players (comma-separated) 👥</label>
    <input id="players" placeholder="Fisayo, Tolu, Kunle, Zainab" />

    <button class="arcade-button" id="start">Start the Party! 🚀</button>

    <p class="small" style="margin-top:10px;">
      Single-device mode: One phone shows the game, everyone plays together. Add 2+ players to begin!
    </p>
  `;
  appEl.appendChild(card);

  card.querySelector("#start").onclick = () => {
    const spice = card.querySelector("#spice").value;
    const raw = card.querySelector("#players").value.trim();
    const players = raw.split(",").map(s => s.trim()).filter(Boolean);

    const unique = [...new Set(players.map(p => p.toLowerCase()))];
    if (players.length < 2) return alert("Add at least 2 players to start the party! 🎉");
    if (unique.length !== players.length) return alert("Duplicate names found. Make them unique for fair play.");

    state.settings.spice = spice;
    state.players = players;
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
    goHome: () => render(GameHubScreen),
  };

  game.render(wrapper.querySelector("#gameRoot"), api);
}

/** Start **/
render(SetupScreen);
