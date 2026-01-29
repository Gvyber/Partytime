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
            'truth': {
                1: [
                    "Have you ever had a crush on someone in this room?", "What’s the most daring thing you've worn in public?", "Have you ever sent a flirty message and regretted it?", "What’s your biggest turn-on in someone’s appearance?", "Would you rather go on a secret date or a public one with someone risky?", "Have you ever been tempted to kiss someone you shouldn’t have?", "What’s your favorite part of the opposite sex’s body — and why?", "Have you ever flirted your way out of trouble?", "What’s the most romantic or sexy dream you’ve ever had?", "If you had to go on a date with someone here, who would you pick and why?", "What’s the cheesiest pick-up line you’ve secretly liked?", "What’s your guilty pleasure when you’re attracted to someone?", "Do you like it when someone takes control or plays hard to get?", "What’s something romantic or flirty that you’ve done that actually worked?", "Have you ever had a fantasy about someone at work, school, or church?", "What’s the most exciting compliment you’ve received from the opposite sex?", "Who in this room do you think is most likely to be a good kisser?", "Would you ever go skinny dipping if no one would find out?", "What’s the most spontaneous flirty move you’ve made?", "What’s a subtle but sexy thing you notice when you're attracted to someone?", "What’s the boldest way you've shown someone you liked them?", "Have you ever been caught checking someone out?", "If someone here slid into your DMs, who would make your heart race a little?", "What's a song that instantly puts you in a flirty mood?", "Have you ever had butterflies around someone in this group?", "What’s a harmless lie you’ve told to impress someone you liked?", "What outfit or look makes you feel your sexiest?", "Have you ever pretended not to like someone just to hide your feelings?", "What’s something non-physical that instantly attracts you to someone?", "If you could steal one kiss without consequences, who would it be from?"
                ],
                2: [
                    "What’s your favorite sex position — and why?", "Have you ever had sex outdoors or in a risky place?", "How many people have you kissed in one day?", "Do you enjoy being dominant or submissive in bed?", "What’s your biggest sexual fantasy that you’ve never told anyone?", "Have you ever had phone sex, and how did it go?", "Have you ever masturbated to someone you know personally?", "What's the kinkiest thing you’ve ever tried in bed?", "How loud are you during sex — be honest?", "Have you ever had a one-night stand you still think about?", "What body part do you most enjoy being kissed or touched?", "What’s your favorite type of dirty talk to hear?", "Have you ever tried role-play — and what role did you play?", "Have you ever watched adult content with a partner?", "If you had to pick a fetish, what would it be?", "How often do you think about sex in a day?", "Have you ever hooked up with someone and forgot their name?", "What’s the naughtiest thought you’ve had during a normal conversation?", "Have you ever wanted to sleep with a friend but didn’t?", "Do you like being teased or doing the teasing?", "Have you ever fantasized about someone in a position of power over you?", "What’s the most risqué photo or video you’ve ever taken?", "Have you ever had sex in a place where you might have been caught?", "If you had to describe your best sexual experience in one word, what would it be?", "What is your secret move that you think drives people wild?", "Have you ever had sex with someone you didn’t expect to enjoy — but did?", "Have you ever said someone else's name in bed by mistake?", "Would you rather a long night of foreplay or a quick wild round?", "What’s the most adventurous place you’ve fantasized about having sex?"
                ],
                3: [
                    "Describe in full detail the wildest sex dream you've ever had — who was in it, what happened, and how did it end?", "What’s the dirtiest thing you’ve ever whispered during sex — say it now like you meant it.", "Which part of your body do you secretly wish someone would obsess over — and what should they do to it?", "If someone here had to tie you up and take control, who would you choose — and what would you beg them to do?", "Describe your most intense orgasm — what triggered it and what sounds did you make?", "Have you ever secretly touched yourself thinking about someone in this room? Say who and what you imagined.", "If we turned off the lights right now, who would you sneak over to — and what would you do to them?", "What’s something sexual you’ve never done, but fantasize about regularly?", "Pick someone in the group and describe in detail how you’d seduce them from start to finish.", "What’s the naughtiest thing you've ever done with someone in public or semi-public — be honest and specific."
                ]
            },
            'dare': {
                1: [
                    "Give a slow shoulder massage to someone of your choice for 30 seconds.", "Do a 2-minute sensual slow dance to a song of your choice.", "Sit facing someone and maintain deep eye contact for 60 seconds without laughing.", "Let everyone watch as you perform your sexiest dance move.", "Maintain close eye contact while someone slowly runs a finger down your arm.", "Let someone guide your hands to 'read their body like braille' (clothes on).", "Kiss someone lightly on the neck or shoulder, then kiss them on the lips for a few seconds.", "Share a secret desire with someone in private — whisper it close to their ear.", "Do a slow spin while someone watches and describes what they like most about you.", "Sit beside someone and move on their lap or leg to music — you can exchange places if you want.", "Blindfold yourself and guess who touches you (on the arm or face) just by feel.", "Put your head on someone’s chest and stay there for 30 seconds.", "Let someone adjust your hair or outfit as if prepping you for a date.", "Hold someone's hand and describe what you'd do if you were alone together for one hour.", "Play a flirty staring contest — loser gives a peck on the cheek.", "Show someone how you’d seduce a crush with just body language.", "Pretend you’re on a romantic movie set — do a dramatic pose with someone.", "Let someone lightly trace your lips or jawline with a feather or finger.", "Lie beside someone on the floor without touching for 1 minute — highest tension wins.", "Sit face to face with someone and tell them one thing you’d love to try with them.", "Whisper something seductive into the ear of someone you're most attracted to.", "Sit on someone’s lap and maintain eye contact for 20 seconds — no talking.", "Dance closely with someone for 1 minute — your choice of song and style.", "Lie on the floor and let someone draw on your body (clothes on) using their finger.", "Play “guess the item” — someone puts an object in a bag, and you feel it blindfolded.", "Blow softly on someone’s neck or ear — they must stay completely still.", "Get behind someone and hold their waist while swaying to a song — 30 seconds.", "Do a slow, teasing body roll or belly dance in front of the group.", "Let someone feed you something sweet with their hands — no utensils.", "Pick someone to hold your waist and guide you in a slow dance for 1 minute, no speaking allowed."
                ],
                2: [
                    "Sit in front of someone and let them caress your thighs (over clothing) for 30 seconds.", "Allow someone to lick or kiss any body part of your choice.", "Do a slow full-body rubdown on someone — clothes stay on.", "Simulate oral teasing using either an ice cube or two fingers on someone’s arm or neck.", "Trace the person’s lips with your tongue, then kiss them deeply.", "Choose someone and demonstrate how you’d ride them — fully clothed, no grinding.", "Do a strip tease — remove one clothing item slowly for 90 seconds while everyone watches.", "Sit between someone’s legs, let them stroke your waist, and kiss for 30 seconds.", "Let someone touch and caress you however they like for 30 seconds.", "Do a slow, seductive strip tease — no full nudity.", "Do a dirty grind dance on someone for 30 seconds.", "Kiss and lightly bite someone’s ear while whispering something naughty for 30 seconds.", "Simulate a passionate make-out scene with someone for 30 seconds.", "Pick someone and do a body shot — then kiss for 30 seconds.", "Play the 'word moan' game — whisper a dirty word and moan after it for 4 rounds.", "Switch seats with someone and sit on their lap for the next two turns.", "Use your tongue to slowly trace a shape on someone's neck or stomach and let them guess it.", "Get on all fours while someone 'guides' your waist with their hands — 20 seconds.", "Let someone press their body against yours and guide you in a dirty grind — 30 seconds.", "Give someone a slow dance and end it with a passionate kiss.", "Give someone a slow, grinding lap dance for 60 seconds — their hands must stay on the chair.", "Lie face down and let someone grind lightly on you to the beat of a song — 30 seconds.", "With music on, pick a partner and dance as close as possible without fully touching.", "Let someone suck or lick something off your collarbone, shoulder, or stomach.", "Stand blindfolded while someone runs their hands along your sides and hips for 30 seconds.", "Simulate a slow-motion bedroom scene (no clothes removed) — 20 seconds with a partner.", "Choose someone and take turns whispering your wildest fantasies into each other’s ear.", "Place your hands on a partner's waist and grind from behind while they keep their hands behind their head — 45 seconds.", "Pick someone and take turns licking a small fruit (grape, strawberry) — no biting.", "Have a dirty dancing contest — each player has 30 seconds to seduce the others with only body movement."
                ],
                3: [
                    "Let someone pull your shirt up and trace slow circles on your bare chest or back with their tongue for 20 seconds.", "Lay flat. Let someone straddle you and simulate the full rhythm of sex while maintaining eye contact — 45 seconds.", "Stand facing a wall. Let someone come up behind you and grind against you like they mean it — 1 full minute.", "Go into a corner with someone for 90 seconds. Come back and describe (or act) what just happened — be vivid.", "Choose someone. Let them slowly unzip or unbutton your outfit halfway while narrating what they’d do next.", "Do a “mirror” strip tease with someone — one of you moves, the other copies every move (only clothing below waist stays on).", "Lie down. Let someone of your choice kiss and tease their way from your neck to your belly button — 30 seconds.", "Choose someone. They will “command” your hands for 1 minute — guiding them anywhere on their own body.", "Pick someone. Press your body fully against theirs and simulate slow, heavy breathing during sex for 30 seconds.", "Sit in the middle. One person grinds from the front, another from behind — all fully clothed — 45 seconds rotation."
                ]
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
