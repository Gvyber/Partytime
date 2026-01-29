export const Taboo20 = {
  id: "taboo20",
  title: "20 Questions — Taboo Naija Edition",
  description: "Yes/No only. Max 20 questions. No hints. The accusations are the entertainment.",
  render(root, api) {
    root.innerHTML = `
      <div class="card" style="margin:12px 0;">
        <div class="row">
          <div>
            <div class="pill">Mode: Single-device</div>
          </div>
          <div style="text-align:right;">
            <button class="secondary" id="newRound">New round</button>
          </div>
        </div>

        <div style="margin-top:12px;" id="setup">
          <h2 style="margin-bottom:6px;">Setup</h2>
          <div class="small">One person thinks of something from a taboo category. Others ask yes/no questions only.</div>

          <label>Category (thinker picks secretly)</label>
          <select id="category"></select>

          <div class="row">
            <div>
              <label>Thinker</label>
              <select id="thinker"></select>
            </div>
            <div>
              <label>Secret answer (type it here)</label>
              <input id="secret" placeholder="e.g., Muting someone’s status but still checking it" />
            </div>
          </div>

          <button id="start">Start round</button>

          <div class="small" style="margin-top:10px;">
            Rule: Thinker must only respond with <b>Yes</b>, <b>No</b>, or <b>Irrelevant</b>.
          </div>
        </div>

        <div style="margin-top:12px; display:none;" id="play">
          <div class="row">
            <div>
              <div class="pill" id="catPill"></div>
              <div class="small" style="margin-top:6px;">
                Thinker: <b id="thinkerName"></b>
              </div>
            </div>
            <div style="text-align:right;">
              <div class="pill">Questions: <span id="count">0</span>/20</div>
            </div>
          </div>

          <div class="card" style="margin-top:12px;">
            <div class="row">
              <input id="questionInput" placeholder='Type a yes/no question… e.g. "Does it involve phones?"' />
              <button id="addQ" class="secondary">Add</button>
            </div>

            <div class="row" style="margin-top:10px;">
              <button id="yes">YES</button>
              <button id="no">NO</button>
            </div>
            <button id="irr" class="secondary">IRRELEVANT</button>

            <div class="small" style="margin-top:10px;">
              Add the question first, then tap the thinker’s response.
            </div>
          </div>

          <div class="card" style="margin-top:12px;">
            <div class="row">
              <div><b>Log</b></div>
              <div style="text-align:right;">
                <button id="toggleSecret" class="secondary">Reveal answer</button>
              </div>
            </div>
            <div id="secretBox" class="small" style="display:none; margin-top:10px;">
              <span class="pill">Answer</span>
              <div style="margin-top:6px; font-size:16px;" id="secretText"></div>
            </div>

            <div id="log" style="margin-top:12px;" class="small"></div>
          </div>

          <div id="limitMsg" class="card" style="display:none; margin-top:12px;">
            <h2 style="margin-bottom:6px;">20 questions used.</h2>
            <div class="small">Time to guess. No more questions.</div>
          </div>
        </div>
      </div>
    `;

    const categories = [
      "Things people hide in relationships",
      "Lies adults tell regularly",
      "Reasons people actually attend events",
      "Things people pretend not to enjoy but do",
      "Places people have done questionable things",
      "Behaviour after small alcohol",
      "Things people do when they like someone but don’t want to show it",
      "Secrets phones usually contain",
      "Signs someone is catching feelings",
      "Things people do but would deny publicly",
    ];

    const setupEl = root.querySelector("#setup");
    const playEl = root.querySelector("#play");

    const catSel = root.querySelector("#category");
    catSel.innerHTML = categories.map(c => `<option value="${c}">${c}</option>`).join("");

    const thinkerSel = root.querySelector("#thinker");
    thinkerSel.innerHTML = api.state.players.map(p => `<option value="${p}">${p}</option>`).join("");

    let pendingQuestion = "";
    let count = 0;
    let secret = "";
    let revealed = false;

    function resetRound() {
      pendingQuestion = "";
      count = 0;
      secret = "";
      revealed = false;

      root.querySelector("#questionInput").value = "";
      root.querySelector("#count").textContent = "0";
      root.querySelector("#log").innerHTML = "";
      root.querySelector("#limitMsg").style.display = "none";
      root.querySelector("#secretBox").style.display = "none";
      root.querySelector("#toggleSecret").textContent = "Reveal answer";
    }

    function startRound() {
      const category = catSel.value;
      const thinker = thinkerSel.value;
      secret = root.querySelector("#secret").value.trim();

      if (!secret) return alert("Type the secret answer first (so the host doesn’t forget).");

      resetRound();

      root.querySelector("#catPill").textContent = `Category: ${category}`;
      root.querySelector("#thinkerName").textContent = thinker;
      root.querySelector("#secretText").textContent = secret;

      setupEl.style.display = "none";
      playEl.style.display = "block";
    }

    function addToLog(text) {
      const log = root.querySelector("#log");
      const div = document.createElement("div");
      div.style.padding = "8px 0";
      div.style.borderTop = "1px solid rgba(255,255,255,0.10)";
      div.textContent = text;
      log.prepend(div);
    }

    function setLimitIfNeeded() {
      root.querySelector("#count").textContent = String(count);
      if (count >= 20) {
        root.querySelector("#limitMsg").style.display = "block";
        root.querySelector("#questionInput").disabled = true;
        root.querySelector("#addQ").disabled = true;
        root.querySelector("#yes").disabled = true;
        root.querySelector("#no").disabled = true;
        root.querySelector("#irr").disabled = true;
      }
    }

    // Setup handlers
    root.querySelector("#start").onclick = startRound;

    root.querySelector("#newRound").onclick = () => {
      setupEl.style.display = "block";
      playEl.style.display = "none";
      root.querySelector("#secret").value = "";
      resetRound();
    };

    // Play handlers
    root.querySelector("#addQ").onclick = () => {
      if (count >= 20) return;
      const q = root.querySelector("#questionInput").value.trim();
      if (!q) return alert("Type a question first.");
      pendingQuestion = q;
      root.querySelector("#questionInput").value = "";
      addToLog(`Q${count + 1}: ${pendingQuestion} (awaiting response…)`);
    };

    function respond(ans) {
      if (count >= 20) return;
      if (!pendingQuestion) return alert("Add the question first, then choose the response.");

      count += 1;
      addToLog(`A${count}: ${ans} — "${pendingQuestion}"`);
      pendingQuestion = "";
      setLimitIfNeeded();
    }

    root.querySelector("#yes").onclick = () => respond("YES");
    root.querySelector("#no").onclick = () => respond("NO");
    root.querySelector("#irr").onclick = () => respond("IRRELEVANT");

    root.querySelector("#toggleSecret").onclick = () => {
      revealed = !revealed;
      root.querySelector("#secretBox").style.display = revealed ? "block" : "none";
      root.querySelector("#toggleSecret").textContent = revealed ? "Hide answer" : "Reveal answer";
    };
  },
};
