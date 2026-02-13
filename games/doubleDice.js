export const DoubleDice = {
  id: "doubleDice",
  title: "Double Dice — Spicy Edition",
  description: "Roll real dice. Enter the numbers. Face your fate.",
  render(root, api) {
    root.innerHTML = `
      <div class="card" style="text-align:center; margin:12px 0; overflow:hidden;">
        <div id="player" class="pill">Roll real dice 🎲🎲</div>

        <div style="display:flex; align-items:center; justify-content:center; gap:10px; margin:18px 0;">
          <input id="die1" type="number" min="1" max="6" inputmode="numeric"
                 placeholder="1-6"
                 style="width:82px; text-align:center; font-size:30px; font-weight:800; padding:12px 10px;" />
          <div style="font-size:26px; opacity:0.85;">+</div>
          <input id="die2" type="number" min="1" max="6" inputmode="numeric"
                 placeholder="1-6"
                 style="width:82px; text-align:center; font-size:30px; font-weight:800; padding:12px 10px;" />
        </div>

        <div id="result" class="small" style="margin-bottom:10px;"></div>

        <div id="total"
             style="font-size:64px; font-weight:900; letter-spacing:0.5px; margin:6px 0 10px; min-height:72px; display:flex; align-items:center; justify-content:center;">
        </div>

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
      12: `Full Disclosure: What is the one thing you would do if you knew there were absolutely no consequences?`,
    };

    const $ = (sel) => root.querySelector(sel);

    const elWrap = root.querySelector(".card");
    const elDie1 = $("#die1");
    const elDie2 = $("#die2");
    const elPlayer = $("#player");
    const elResult = $("#result");
    const elTotal = $("#total");
    const elAction = $("#action");
    const btnReveal = $("#reveal");

    // --------- FX (safe, no CSS keyframes needed) ----------
    function flashOnce() {
      // Quick background flash by toggling inline style
      const prev = elWrap.style.boxShadow;
      elWrap.style.boxShadow = "0 0 0 9999px rgba(255,255,255,0.18) inset";
      setTimeout(() => { elWrap.style.boxShadow = prev; }, 160);
    }

    function shakeOnce() {
      // Tiny shake using inline transforms
      const prev = elWrap.style.transform;
      let i = 0;
      const steps = [-3, 3, -2, 2, 0];
      const timer = setInterval(() => {
        elWrap.style.transform = `translateX(${steps[i]}px)`;
        i++;
        if (i >= steps.length) {
          clearInterval(timer);
          elWrap.style.transform = prev || "";
        }
      }, 45);
    }

    function popTotal(text) {
      elTotal.textContent = text;
      elTotal.style.transform = "scale(0.8)";
      elTotal.style.opacity = "0.2";
      setTimeout(() => {
        elTotal.style.transition = "transform 260ms ease, opacity 260ms ease";
        elTotal.style.transform = "scale(1.1)";
        elTotal.style.opacity = "1";
        setTimeout(() => {
          elTotal.style.transform = "scale(1)";
        }, 160);
      }, 20);
      setTimeout(() => {
        elTotal.style.transition = "";
      }, 500);
    }

    // --------- Sound (pure WebAudio, optional) ----------
    let audioCtx = null;
    function getAudio() {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      return audioCtx;
    }
    function beep(freq, dur, gain) {
      try {
        const ctx = getAudio();
        if (ctx.state === "suspended") ctx.resume();

        const t = ctx.currentTime;
        const osc = ctx.createOscillator();
        const g = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, t);

        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(gain, t + 0.01);
        g.gain.exponentialRampToValueAtTime(0.0001, t + dur);

        osc.connect(g);
        g.connect(ctx.destination);

        osc.start(t);
        osc.stop(t + dur + 0.02);
      } catch {
        // If audio fails, ignore silently (never crash UI)
      }
    }
    function rollSfx() {
      beep(220, 0.06, 0.03);
      beep(260, 0.06, 0.03);
      beep(300, 0.06, 0.03);
    }
    function revealSfx() {
      beep(523.25, 0.09, 0.04);
      beep(659.25, 0.10, 0.04);
      beep(783.99, 0.12, 0.04);
    }

    function validDie(n) {
      return Number.isInteger(n) && n >= 1 && n <= 6;
    }

    function readDie(el) {
      const v = Number(el.value);
      return validDie(v) ? v : null;
    }

    function reveal() {
      const d1 = readDie(elDie1);
      const d2 = readDie(elDie2);

      if (d1 === null || d2 === null) {
        shakeOnce();
        flashOnce();
        beep(180, 0.12, 0.03);
        elResult.textContent = "";
        elTotal.textContent = "";
        elAction.textContent = "Enter valid dice numbers between 1 and 6.";
        return;
      }

      const total = d1 + d2;
      const player = api.pickNextPlayer();

      elPlayer.textContent = `Turn: ${player}`;
      elResult.textContent = `Rolled: ${d1} + ${d2}`;
      elTotal.textContent = "";
      elAction.textContent = "Calculating fate…";

      rollSfx();
      flashOnce();
      shakeOnce();

      setTimeout(() => {
        popTotal(String(total));
        revealSfx();
        flashOnce();

        setTimeout(() => {
          elAction.textContent = actions[total] || "No action set for that total.";
        }, 250);
      }, 1000);
    }

    btnReveal.onclick = reveal;
    elDie1.addEventListener("keydown", (e) => { if (e.key === "Enter") reveal(); });
    elDie2.addEventListener("keydown", (e) => { if (e.key === "Enter") reveal(); });
  },
};
