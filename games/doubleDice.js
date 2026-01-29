export const DoubleDice = {
  id: "doubleDice",
  title: "Double Dice — Spicy Edition",
  description: "Roll the dice. Face your fate.",
  render(root, api) {
    root.innerHTML = `
      <div class="card" style="text-align:center;">
        <div id="player" class="pill">Tap Roll</div>

        <div style="font-size:80px; margin:20px 0;" id="dice">🎲 🎲</div>

        <div id="action" style="
          font-size:20px;
          line-height:1.4;
          margin:20px 0;
          min-height:80px;
        "></div>

        <button id="roll">ROLL THE DICE</button>
      </div>
    `;

    const actions = {
      2: `Hot Seat: Describe the most "R-rated" dream you’ve ever had involving someone the group knows.`,
      3: `Body Language: Give a 10-second "sensual" demonstration of how to eat a piece of fruit.`,
      4: `Digital Strip: Show the group the "thirstiest" photo in your hidden or archived folder.`,
      5: `The Whisperer: Lean in and whisper a shameless pickup line to the person on your left.`,
      6: `Handy Work: Give the person across from you a 30-second hand or shoulder massage.`,
      7: `The Review: Rate the vibe of everyone in the room from 1–10 based only on their outfit.`,
      8: `Red Flag: Admit a toxic trait you have that usually scares people away.`,
      9: `Swap: Trade one item of clothing with the person to your right for the next 3 rounds.`,
      10: `Search History: Reveal the last embarrassing thing you Googled at 2:00 AM.`,
      11: `The Tease: Perform a 15-second slow-motion dance to a song the group chooses.`,
      12: `Full Disclosure: What is the one thing you would do if you knew there were absolutely no consequences?`,
    };

    function rollDice() {
      const d1 = Math.floor(Math.random() * 6) + 1;
      const d2 = Math.floor(Math.random() * 6) + 1;
      const total = d1 + d2;

      const player = api.pickNextPlayer();

      root.querySelector("#player").textContent = `Turn: ${player}`;
      root.querySelector("#dice").textContent = `${d1} 🎲 ${d2}`;
      root.querySelector("#action").textContent = actions[total];
    }

    root.querySelector("#roll").onclick = rollDice;
  },
};
