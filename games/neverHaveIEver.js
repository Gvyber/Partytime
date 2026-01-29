export const NeverHaveIEver = {
  id: "neverHaveIEver",
  title: "Never Have I Ever — Vawulence Edition",
  description: "Drop a finger if guilty. If only one person drops, chaos begins.",
  render(root, api) {
    root.innerHTML = `
      <div class="card" style="margin:12px 0; text-align:center;">
        <div id="levelTag" class="pill">Choose a level</div>

        <div class="list" style="margin-top:12px;">
          <button id="lvl1" class="secondary">🟢 Green Pepper</button>
          <button id="lvl2" class="secondary">🟡 Shombo</button>
          <button id="lvl3" class="secondary">🔴 Ghost Pepper</button>
        </div>

        <div class="card" style="margin-top:14px;">
          <div id="statement" style="font-size:22px; line-height:1.45; min-height:120px;">
            Pick a level to begin…
          </div>
        </div>

        <div class="row" style="margin-top:12px;">
          <button id="next" class="secondary">Next</button>
          <button id="vawulence">Vawulence Trigger</button>
        </div>
      </div>
    `;

    const levels = {
      1: [
        "Never have I ever stalked someone’s page for over 10 minutes.",
        "Never have I ever pretended not to see a message while I was actively online.",
        "Never have I ever 'formed' busy just to avoid a long conversation.",
        "Never have I ever re-read old chats just to catch vibes.",
        "Never have I ever acted uninterested when I was actually dying for the person to talk to me.",
        "Never have I ever muted someone’s status because they post too much.",
        "Never have I ever lied about my location because I didn’t want to go out.",
        "Never have I ever practiced a spontaneous selfie for more than 5 minutes.",
        "Never have I ever deleted a post because it didn’t get enough likes quickly.",
        "Never have I ever checked someone’s Last Seen more than 5 times in an hour.",
      ],
      2: [
        "Never have I ever sent a risky message and regretted it immediately.",
        "Never have I ever liked two people at the same time and tried to balance them.",
        "Never have I ever enjoyed attention from someone completely off-limits.",
        "Never have I ever used a fake account to check on an ex or crush.",
        "Never have I ever lied to a partner about who I was with.",
        "Never have I ever sent a screenshot to the wrong person.",
        "Never have I ever flirted just to get a favor or discount.",
        "Never have I ever stayed in a relationship to avoid being single during a holiday.",
        "Never have I ever intentionally made someone jealous on social media.",
        "Never have I ever archived a chat because I wasn’t ready to let go.",
      ],
      3: [
        "Never have I ever stolen a crush or potential from a friend.",
        "Never have I ever caught feelings for someone in this room right now.",
        "Never have I ever gone through a partner’s phone secretly.",
        "Never have I ever ghosted someone I was actually dating without explanation.",
        "Never have I ever sent a very suggestive photo to someone I haven’t met.",
        "Never have I ever been the side-piece and known exactly what I was doing.",
        "Never have I ever told a major lie to escape a situationship.",
        "Never have I ever hooked up with an ex while they were in a new relationship.",
        "Never have I ever kept a backup person waiting just in case.",
        "Never have I ever lied about my relationship status to move to someone.",
      ],
    };

    let currentLevel = null;
    let lastIndex = -1;

    function pick(level) {
      const arr = levels[level];
      let idx;
      do {
        idx = Math.floor(Math.random() * arr.length);
      } while (idx === lastIndex);
      lastIndex = idx;
      return arr[idx];
    }

    function show(level) {
      currentLevel = level;
      root.querySelector("#levelTag").textContent =
        level === 1 ? "🟢 Green Pepper" :
        level === 2 ? "🟡 Shombo" :
        "🔴 Ghost Pepper";

      root.querySelector("#statement").textContent = pick(level);
    }

    root.querySelector("#lvl1").onclick = () => show(1);
    root.querySelector("#lvl2").onclick = () => show(2);
    root.querySelector("#lvl3").onclick = () => show(3);

    root.querySelector("#next").onclick = () => {
      if (!currentLevel) return alert("Pick a level first.");
      show(currentLevel);
    };

    root.querySelector("#vawulence").onclick = () => {
      root.querySelector("#statement").innerHTML = `
        <div style="
          background: rgba(255,0,0,0.18);
          border: 1px solid rgba(255,0,0,0.5);
          padding:14px;
          border-radius:16px;
        ">
          <b>SOLO CONFESSION</b><br/>
          Spill the tea or take a double penalty!
        </div>
      `;
    };
  },
};
