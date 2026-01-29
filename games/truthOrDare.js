export const TruthOrDare = {
  id: "truthOrDare",
  title: "Truth or Dare — A Lil More",
  description: "Choose Truth or Dare. Levels escalate. No scoring, just vibes.",
  render(root, api) {
    root.innerHTML = `
      <div class="card" style="text-align:center; margin:12px 0;">
        <div id="turn" class="pill">Press Truth or Dare</div>

        <div style="margin-top:14px;">
          <div class="small">Level</div>
          <div class="row" style="margin-top:6px;">
            <button id="lvl1" class="secondary">1</button>
            <button id="lvl2" class="secondary">2</button>
            <button id="lvl3" class="secondary">3</button>
          </div>
        </div>

        <div class="row" style="margin-top:14px;">
          <button id="truth">Truth</button>
          <button id="dare">Dare</button>
        </div>

        <div class="card" style="margin-top:14px;">
          <div id="question" style="font-size:20px; min-height:120px;"></div>
        </div>

        <div class="row" style="margin-top:10px;">
          <button id="tooEasy" class="secondary">Too Easy 🔁</button>
          <button id="next" class="secondary">Next Turn</button>
        </div>
      </div>
    `;

    // --- QUESTIONS (shortened here, you will paste your full lists) ---
    const QUESTIONS = {
      truth: {
        1: [ "Have you ever had a crush on someone in this room?" ],
        2: [ "What’s your favorite sex position — and why?" ],
        3: [ "Describe in full detail the wildest sex dream you've ever had." ]
      },
      dare: {
        1: [ "Give a slow shoulder massage to someone of your choice for 30 seconds." ],
        2: [ "Do a slow, seductive strip tease — no full nudity." ],
        3: [ "Stand facing a wall. Let someone come up behind you and grind for 1 minute." ]
      }
    };

    let currentLevel = 1;
    let currentType = null;
    let lastIndex = -1;

    function pick(arr) {
      let idx;
      do {
        idx = Math.floor(Math.random() * arr.length);
      } while (idx === lastIndex);
      lastIndex = idx;
      return arr[idx];
    }

    function ask(type) {
      currentType = type;
      const player = api.pickNextPlayer();
      root.querySelector("#turn").textContent = `Turn: ${player} — ${type.toUpperCase()} (L${currentLevel})`;
      const q = pick(QUESTIONS[type][currentLevel]);
      root.querySelector("#question").textContent = q;
    }

    root.querySelector("#lvl1").onclick = () => currentLevel = 1;
    root.querySelector("#lvl2").onclick = () => currentLevel = 2;
    root.querySelector("#lvl3").onclick = () => currentLevel = 3;

    root.querySelector("#truth").onclick = () => ask("truth");
    root.querySelector("#dare").onclick = () => ask("dare");

    root.querySelector("#tooEasy").onclick = () => {
      if (currentLevel < 3) currentLevel++;
    };

    root.querySelector("#next").onclick = () => {
      root.querySelector("#question").textContent = "";
      root.querySelector("#turn").textContent = "Press Truth or Dare";
    };
  }
};
