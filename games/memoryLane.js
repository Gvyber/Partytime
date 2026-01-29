export const MemoryLane = {
  id: "memoryLane",
  title: "Memory Lane — Suspicious Edition",
  description: "Story starters that sound like you shouldn’t be saying them out loud. No pass.",
  render(root, api) {
    root.innerHTML = `
      <div class="card" style="margin:12px 0;">
        <div class="row" style="align-items:center;">
          <div id="turn" class="pill">Press “Next turn”</div>
          <div style="text-align:right;" class="small">
            Spice: <span class="pill">${api.state.settings.spice}</span>
          </div>
        </div>

        <div style="margin-top:12px;">
          <div class="small" style="margin-bottom:6px; opacity:.8;">Starter line</div>
          <div id="prompt" style="font-size:18px; line-height:1.35;"></div>
        </div>

        <button id="next">Next turn</button>

        <div class="row">
          <button class="secondary" id="plus">+1 point</button>
          <button class="secondary" id="minus">-1 point</button>
        </div>

        <div class="small" style="margin-top:10px; opacity:.75;">
          Rule: No pass. Answer or embrace your shame.
        </div>
      </div>
    `;

    const promptBank = {
      low: [
        "I pretended to be asleep to avoid a very awkward conversation…",
        "I once ignored a call because I knew exactly what it was about…",
        "I once gave advice I would never follow myself…",
        "I sent a message I immediately wished I could delete from existence…",
        "I once acted like I didn’t recognize someone in public for a selfish reason…",
      ],
      medium: [
        "I once followed someone I shouldn’t have followed because curiosity won…",
        "There was a day I saw something on someone’s phone I wish I didn’t see…",
        "I entered a situation fully knowing it could cause wahala later…",
        "I lied smoothly to escape being caught in something small but suspicious…",
        "There was a time I went somewhere I told nobody about…",
        "I stayed longer than I should have in a place I had no business being…",
      ],
      high: [
        "I helped a friend cover up something questionable…",
        "I saw two people in a situation and quietly walked away like I saw nothing…",
        "I once enjoyed attention I absolutely should not have enjoyed…",
        "I knew something that could cause serious drama but kept quiet…",
      ],
    };

    // Spice rule: higher includes lower
    const spice = api.state.settings.spice;
    const prompts =
      spice === "high"
        ? [...promptBank.low, ...promptBank.medium, ...promptBank.high]
        : spice === "medium"
        ? [...promptBank.low, ...promptBank.medium]
        : [...promptBank.low];

    let currentPlayer = null;
    let lastPromptIndex = -1;

    function nextPromptIndex() {
      if (prompts.length <= 1) return 0;
      let idx;
      do {
        idx = Math.floor(Math.random() * prompts.length);
      } while (idx === lastPromptIndex);
      lastPromptIndex = idx;
      return idx;
    }

    function nextTurn() {
      currentPlayer = api.pickNextPlayer();
      const prompt = prompts[nextPromptIndex()];
      root.querySelector("#turn").textContent = `Turn: ${currentPlayer}`;
      root.querySelector("#prompt").textContent = prompt;
    }

    root.querySelector("#next").onclick = nextTurn;

    root.querySelector("#plus").onclick = () => {
      if (!currentPlayer) return;
      api.addScore(currentPlayer, 1);
      alert(`${currentPlayer} +1`);
    };

    root.querySelector("#minus").onclick = () => {
      if (!currentPlayer) return;
      api.addScore(currentPlayer, -1);
      alert(`${currentPlayer} -1`);
    };
  },
};
