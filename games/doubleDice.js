export const DoubleDice = {
  id: "doubleDice",
  title: "Double Dice — Spicy Edition",
  description: "Roll real dice. Enter the numbers. Face your fate.",
  render(root, api) {
    root.innerHTML = `
      <style>
        /* Local-only styles so you don't have to touch style.css */
        .dd-wrap { position: relative; overflow: hidden; }
        .dd-overlay {
          position: absolute; inset: 0;
          background: rgba(255,255,255,0.25);
          opacity: 0; pointer-events: none;
        }
        .dd-flash { animation: ddFlash 220ms ease-out 1; }
        @keyframes ddFlash { 0% { opacity: 0; } 30% { opacity: 1; } 100% { opacity: 0; } }

        .dd-shake { animation: ddShake 260ms ease-in-out 1; }
        @keyframes ddShake {
          0% { transform: translateX(0); }
          20% { transform: translateX(-3px); }
          40% { transform: translateX(3px); }
          60% { transform: translateX(-2px); }
          80% { transform: translateX(2px); }
          100% { transform: translateX(0); }
        }

        .dd-inputs {
          display:flex; align-items:center; justify-content:center; gap:10px;
          margin: 18px 0;
        }
        .dd-input {
          width:82px; text-align:center; font-size:30px; font-weight:800;
          padding: 12px 10px;
        }
        .dd-plus { font-size:26px; opacity:0.85; }

        .dd-total {
          font-size: 64px;
          font-weight: 900;
          letter-spacing: 0.5px;
          margin: 6px 0 10px;
          min-height: 72px;
          display:flex; align-items:center; justify-content:center;
        }
        .dd-pop { animation: ddPop 420ms cubic-bezier(.2,.9,.2,1) 1; }
        @keyframes ddPop {
          0%   { transform: scale(0.7); opacity: 0; filter: blur(2px); }
          55%  { transform: scale(1.15); opacity: 1; filter: blur(0px); }
          100% { transform: scale(1); }
        }

        .dd-suspense { opacity: 0.9; font-style: italic; }
      </style>

      <div class="card dd-wrap" style="text-align:center; margin:12px 0;">
        <div class="dd-overlay" id="overlay"></div>

        <div id="player" class="pill">Roll real dice 🎲🎲</div>

        <div class="dd-inputs">
          <input id="die1" class="dd-input" type="number" min="1" max="6" inputmode="numeric" placeholder="1-6" />
          <div class="dd-plus">+</div>
          <input id="die2" class="dd-input" type="number" min="1" max="6" inputmode="numeric" placeholder="1-6" />
        </div>

        <div id="result" class="small" style="margin-bottom:10px;"></div>

        <div id="total" class="dd-total"></div>

        <div id="action" style="font-size:20px; line-height:1.45; min-height:110px;"></div>

        <button id="reveal">REVEAL FATE</button>

        <div class="small" style="margin-top:10px;">One roll = one fate.</div>
      </div>
    `;

    const actions = {
      2: `Hot Seat: Describe the most "R-rated" dream you’ve ever had involving someone the group knows.`,
      3: `Body Language: Give a 10-second sensual demonstration of how to eat a piece of fruit.`,
      4: `Digital Strip: Show the group the thirstiest photo in your hidden or archived folder.`,
      5: `The Whisperer: Lean in and whisper a shameless pickup line to the person on your left.`,
      6: `Handy Work: Give the person across from you a 30-second hand or shoulder massage.`,
      7: `The Review: Rate the vibe of everyone in the room from 1–10 based only on their outfit.`,
      8: `Red Flag: Admit a toxic trait you have that usually scares people away.`,
      9: `Swap: Trade one item of clothing with the person to your right for the next 3 rounds.`,
      10: `Search History: Reveal the last embarrassing thing you Googled at 2:00 AM.`,
      11: `The Tease: Perform a 15-second slow-motion dance to a song the group chooses.`,
      12: `Full Disclosure: What is the one thing y
