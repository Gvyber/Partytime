export const WahalaOrWinning = {
  id: "wahalaOrWinning",
  title: "Wahala or Winning — Moral Danger Edition",
  description: "Pick a level. Get a scenario. No escape, just decisions.",
  render(root, api) {
    root.innerHTML = `
      <div class="card" style="margin:12px 0;">
        <div class="row" style="align-items:center;">
          <div id="turn" class="pill">Tap a level to start</div>
          <div style="text-align:right;" class="small">
            Players: <span class="pill">${api.state.players.length}</span>
          </div>
        </div>

        <div style="margin-top:14px;" class="small">
          Main Menu: Choose Your Level. Then answer out loud.
        </div>

        <div class="list" style="margin-top:12px;">
          <button id="lvl1" class="secondary">🟢 Level 1: Mild Pepper (Social Friction)</button>
          <button id="lvl2" class="secondary">🟡 Level 2: Shombo (Rising Heat)</button>
          <button id="lvl3" class="secondary">🔴 Level 3: Ghost Pepper (Pure Wahala)</button>
        </div>

        <div class="card" style="margin-top:12px;">
          <div class="small" style="opacity:.8;">Scenario</div>
          <div id="scenario" style="font-size:20px; line-height:1.45; min-height:120px; margin-top:8px;">
            Choose a level above…
          </div>
          <div class="small" style="margin-top:10px; opacity:.75;">
            Rule: No hints, no debates. Pick your move and own it.
          </div>
        </div>

        <div class="row" style="margin-top:10px;">
          <button id="nextSame" class="secondary">Next (same level)</button>
          <button id="nextAny" class="secondary">Next (any level)</button>
        </div>
      </div>
    `;

    const levels = {
      1: {
        name: "🟢 Mild Pepper",
        items: [
          `The Ghost Watcher: Someone who "curved" you months ago views every one of your stories first. Do you block them or post a "thirst trap" to pepper them?`,
          `The Borrowed Fit: A friend returns an expensive outfit with a stain but says nothing. Do you call them out or just never lend them clothes again?`,
          `The Status Sniper: Someone views your statuses for weeks but ignores your DMs. Do you confront them or hide your status from them?`,
          `The Accidental Tag: You’re "low-key" at a spot you shouldn't be, and a friend tags you. Do you ask them to delete it or pray nobody sees it?`,
          `The Bill Diver: You’re out and the "big spender" of the group "forgets" their wallet. Do you cover them or make them Transfer/Zelle/Opay the money right there?`,
        ],
      },
      2: {
        name: "🟡 Shombo",
        items: [
          `The 1:00 AM Text: Your ex texts "I miss you" at 1:17 AM. Do you reply "Who is this?", "Come over", or just "👍"?`,
          `The Wrong DM: You accidentally send a gossipy screenshot to the person you were talking about. What is your immediate "damage control" move?`,
          `The Work Spouse: Your partner is jealous of your work bestie. Do you distance yourself or tell your partner they are being insecure?`,
          `The Secret History: You find out your friend is dating someone you once had a "thing" with. Do you give them the "tea" or keep quiet?`,
          `The Public Flirt: Someone flirts with you aggressively in front of everyone. Do you shut it down or play along to see where it goes?`,
          `The Snooper: You see a message on a friend's phone that reveals a huge secret. Do you tell the person involved or mind your business?`,
        ],
      },
      3: {
        name: "🔴 Ghost Pepper",
        items: [
          `The Forbidden Fruit: You’ve caught serious feelings for your best friend’s sibling. Do you confess to the friend or take it to your grave?`,
          `The Alibi: A friend asks you to cover for them while they cheat. Their partner calls you crying, asking where they were. What do you say?`,
          `The Receipt Holder: You have a screenshot that could end a relationship in this room right now. Do you delete it or keep it "for security"?`,
          `The Payback: You find out your partner cheated months ago. Do you cheat back to "level the score" or just leave?`,
          `The Wedding Crasher: You find out your friend's fiancé is cheating a week before the wedding. Do you tell them or keep quiet to avoid ruining the day?`,
          `The Secret Chat: Your friend’s partner is being "too friendly" in your DMs. Do you tell your friend immediately or wait for "hard proof"?`,
        ],
      },
    };

    let currentLevel = null;
    let lastIndexByLevel = { 1: -1, 2: -1, 3: -1 };

    function pickScenario(levelNum) {
      const arr = levels[levelNum].items;
      if (arr.length === 1) return 0;

      let idx;
      do {
        idx = Math.floor(Math.random() * arr.length);
      } while (idx === lastIndexByLevel[levelNum]);
      lastIndexByLevel[levelNum] = idx;
      return idx;
    }

    function run(levelNum) {
      currentLevel = levelNum;
      const player = api.pickNextPlayer();
      const idx = pickScenario(levelNum);
      const text = arrSafe(levelNum, idx);

      root.querySelector("#turn").textContent = `Turn: ${player} — ${levels[levelNum].name}`;
      root.querySelector("#scenario").textContent = text;
    }

    function arrSafe(levelNum, idx) {
      return levels[levelNum]?.items?.[idx] ?? "Scenario missing (check file).";
    }

    root.querySelector("#lvl1").onclick = () => run(1);
    root.querySelector("#lvl2").onclick = () => run(2);
    root.querySelector("#lvl3").onclick = () => run(3);

    root.querySelector("#nextSame").onclick = () => {
      if (!currentLevel) return alert("Pick a level first.");
      run(currentLevel);
    };

    root.querySelector("#nextAny").onclick = () => {
      const any = [1, 2, 3][Math.floor(Math.random() * 3)];
      run(any);
    };
  },
};
