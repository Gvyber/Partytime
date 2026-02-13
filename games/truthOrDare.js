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
  1: [
    "Have you ever had a crush on someone in this room?",
    "Who is the person you’ve been most attracted to in your entire life?",
    "When was the last time you kissed someone?",
    "Have you ever been tempted to kiss someone you shouldn’t have?",
    "Have you ever flirted your way out of trouble?",
    "What’s the most daring thing you've worn in public?",
    "What’s the sexiest item of clothing you own?",
    "Would you rather go on a secret date or a public one with someone risky?",
    "Have you ever sent a flirty message and regretted it?",
    "What’s your biggest turn-on in someone’s appearance?",
    "What’s something non-physical that instantly attracts you to someone?",
    "Have you ever been caught checking someone out?",
    "Have you ever had butterflies around someone in this group?",
    "If you had to go on a date with someone here, who would you pick and why?",
    "If you could steal one kiss without consequences, who would it be from?",
    "What’s the boldest way you've shown someone you liked them?",
    "Have you ever pretended not to like someone just to hide your feelings?",
    "What’s the most spontaneous flirty move you’ve made?",
    "Have you ever worn clothing of the opposite sex?",
    "If you knew you only had a short time left on earth, would you tell your crush you love them?",
    "Tell the group two lies and one truth.",
    "Have you ever been completely rejected by someone?",
    "Is there someone everyone thinks is hot, but you think is unattractive?",
    "Is there someone everyone thinks is unattractive, but you secretly find hot?",
    "What’s the biggest age difference between you and someone you’ve dated or kissed?",
    "Would you ever go skinny dipping if no one would find out?"
  ],

  2: [
    "Have you ever regretted having sex with someone immediately afterwards?",
    "Have you ever had sex with someone before you had even kissed them?",
    "When is the last time you masturbated?",
    "What age were you when you first masturbated?",
    "When is the last time you watched porn?",
    "What kind of porn do you love or hate? Why?",
    "Do you own any sex toys?",
    "Do you enjoy being dominant or submissive in bed?",
    "Have you ever dominated someone?",
    "Have you ever been submissive for someone in the bedroom?",
    "Have you ever had sex outdoors or in a risky place?",
    "Have you ever had sex in public? Do you want to try?",
    "Have you ever tried anal?",
    "Have you ever had a homosexual experience?",
    "What kinds of sexual roleplaying have you done before?",
    "What’s your favorite sex position — and why?",
    "What body part do you most enjoy being kissed or touched?",
    "What turns you on the most in someone of the opposite sex?",
    "Have you ever wanted to have sex with someone you’d never date?",
    "Have you ever fantasized about someone in a position of power over you?",
    "Have you ever had phone sex?",
    "What’s the kinkiest thing you’ve ever tried?",
    "Have you ever had a one-night stand you still think about?",
    "What’s the most risqué photo or video you’ve taken?",
    "What is the most orgasms you’ve had in one day?",
    "What was your quickest orgasm ever?",
    "What’s the most satisfying orgasm you’ve ever had?",
    "Would you rather a long night of foreplay or a quick wild round?",
    "Have you ever said someone else’s name in bed by mistake?",
    "What’s the dirtiest dream you’ve ever had?",
    "Have you ever had sex somewhere you might have been caught?",
    "What’s the most adventurous place you’ve fantasized about having sex?",
    "If you could change genders for one day, what would you do first?",
    "If you could have a threesome with two people, who would you choose?",
    "Would you ever have a threesome with two guys and one girl? Or two girls and one guy?",
    "Describe the last piece of erotica you read.",
    "Have you ever considered exploring the swinging lifestyle?",
    "What is the horniest you’ve ever felt?",
    "What is the weirdest thing that turns you on?",
    "Tell everyone about the best sex you ever had."
  ],

  3: [
    "Describe in full detail the wildest sex dream you've ever had.",
    "What’s the dirtiest thing you’ve ever whispered during sex?",
    "Have you ever swallowed your partner’s ejaculate?",
    "Who do you think about during sex other than me?",
    "When is the last time you had a hard-on?",
    "Have you ever hired a prostitute?",
    "What would you do if you found out your partner used to be a prostitute?",
    "Guys: Do you ever wish you had a bigger penis? Women: Do you ever wish you had bigger breasts?",
    "What is the biggest penis you have ever seen in real life?",
    "What’s the sluttiest or nastiest thing you’ve ever done?",
    "If someone here had to tie you up and take control, who would you choose?",
    "Have you ever secretly touched yourself thinking about someone in this room?",
    "If we turned off the lights right now, who would you sneak over to?",
    "Pick someone in the group and describe how you’d seduce them.",
    "What’s the naughtiest thing you've ever done in public or semi-public?",
    "If your ultimate fantasy person required something extreme to sleep with you, would you do it?",
    "Guys only: If women paid you for sex, would you become a male prostitute?",
    "Guys only: If she’d try anal only if you tried it first with a strap-on, what would you say?",
    "If you had to choose between a great face and horrible body or terrible face and great body, what would you choose?",
    "What is the most important part of a man or woman’s anatomy to you?"
  ]
},
           dare: {
  1: [
    "Give a slow shoulder massage to someone of your choice for 30 seconds.",
    "Do a 2-minute sensual slow dance to a song of your choice.",
    "Sit facing someone and maintain deep eye contact for 60 seconds without laughing.",
    "Let everyone watch as you perform your sexiest dance move.",
    "Maintain close eye contact while someone slowly runs a finger down your arm.",
    "Let someone guide your hands to “read their body like braille” (clothes on).",
    "Kiss someone lightly on the neck or shoulder, then kiss them on the lips briefly.",
    "Whisper a secret desire into someone’s ear.",
    "Do a slow spin while someone describes what they like most about you.",
    "Sit beside someone and move gently on their lap or leg to music.",
    "Blindfold yourself and guess who touches you (arm or face only).",
    "Put your head on someone’s chest for 30 seconds.",
    "Let someone adjust your hair or outfit like they’re prepping you for a date.",
    "Hold someone's hand and describe what you'd do if alone together for one hour.",
    "Play a flirty staring contest — loser gives a peck on the cheek.",
    "Show how you’d seduce a crush using only body language.",
    "Do a dramatic romantic movie pose with someone.",
    "Let someone lightly trace your lips or jawline with a finger.",
    "Lie beside someone without touching for 1 minute — highest tension wins.",
    "Sit face to face and tell someone one thing you’d love to try with them.",
    "Sit on someone’s lap and maintain eye contact for 20 seconds — no talking.",
    "Dance closely with someone for 1 minute.",
    "Lie down and let someone draw on your body (clothes on) using their finger.",
    "Blow softly on someone’s neck or ear — they must stay still.",
    "Get behind someone and hold their waist while swaying to music for 30 seconds.",
    "Do a slow teasing body roll in front of the group.",
    "Let someone feed you something sweet with their hands.",
    "Pick someone to guide you in a slow dance for 1 minute, no speaking allowed.",
    "Swap clothes with anyone you choose.",
    "Pass a candy or grape to anyone you choose using only your lips.",
    "Kiss anyone you choose while also eating a candy.",
    "Try to turn anyone you choose on without touching them.",
    "Eat fruit or food off anyone you choose.",
    "Drink a shot from anyone you choose’s belly button.",
    "Twerk for anyone you choose or for the group.",
    "Recreate the sounds you make during sex.",
    "With a blindfold on, try to identify the person that is selected by the others to kiss you.",
    "Show everyone playing the game your favorite porn site.",
    "No dare for you, you horny MF."
    `Choose someone. Sit knee-to-knee and hold eye contact while they describe what they find attractive about you.`,
`Let someone guide you in a slow dance — but they must keep one hand firmly on your waist the entire time.`,
`Whisper something you’ve always wanted to try but never admitted aloud.`,
`Stand very close to someone and count slowly to 30 together without breaking eye contact.`,
`Choose someone. They may run a single finger slowly down your arm while describing what they’re imagining.`,
`Let someone reposition you however they like (no lifting) for 45 seconds.`,
`Close your eyes. Someone adjusts your posture and steps away. You must guess who it was.`,
`Sit between two people. They take turns complimenting you in a low voice.`,
`Let someone fix your collar, necklace, or hair very slowly while maintaining eye contact.`,
`Choose someone. You must mirror their breathing pattern for one minute.`,
`Let someone whisper instructions to you that you must follow silently.`,
`Stand back-to-back with someone and lean your weight into each other for 60 seconds.`,
`Choose someone. You must stay within one foot of them for the next two turns.`,
`Let someone decide whether you sit, stand, or kneel for the next round.`,
`Allow someone to trace one line along your arm and describe what they’d do next.`,
`Sit facing someone. They may tilt your chin up gently.`,
`Let someone choose your pose and hold it for 45 seconds.`,
`Choose someone. They decide whether you speak or remain silent for the next turn.`,
`Stand in the center. One person steps forward and says one bold compliment.`,
`Let someone guide you by the waist for 30 seconds without speaking.`
  ],
                2: [
                    `Sit in front of someone and let them caress your thighs (over clothing) for 30 seconds.`,
`Allow someone to kiss a body part of your choice.`,
`Do a slow full-body rubdown on someone — clothes stay on.`,
`Simulate oral teasing using an ice cube or fingers on someone’s arm or neck.`,
`Trace someone’s lips with your tongue, then kiss them deeply.`,
`Demonstrate how you’d ride someone — fully clothed, no grinding.`,
`Do a strip tease — remove one clothing item slowly over 90 seconds.`,
`Sit between someone’s legs, let them stroke your waist, and kiss for 30 seconds.`,
`Let someone caress you however they like (over clothing) for 30 seconds.`,
`Do a dirty grind dance on someone for 30 seconds.`,
`Kiss and lightly bite someone’s ear while whispering something naughty.`,
`Simulate a passionate make-out scene for 30 seconds.`,
`Do a body shot with someone, then kiss.`,
`Play the “word moan” game for four rounds.`,
`Switch seats and sit on someone’s lap for the next two turns.`,
`Use your tongue to trace a shape on someone's neck or stomach — they guess it.`,
`Get on all fours while someone guides your waist (over clothing) for 20 seconds.`,
`Let someone press their body against yours and guide a slow grind for 30 seconds.`,
`Give someone a slow dance ending in a passionate kiss.`,
`Give someone a grinding lap dance for 60 seconds — their hands stay on the chair.`,
`Lie face down and let someone grind lightly on you to music.`,
`Dance as close as possible to a partner without fully touching.`,
`Let someone lick something sweet off your collarbone or shoulder.`,
`Stand blindfolded while someone runs their hands along your sides and hips.`,
`Simulate a slow-motion bedroom scene (no clothes removed) for 20 seconds.`,
`Take turns whispering wild fantasies into each other’s ear.`,
`Grind from behind while your partner keeps their hands behind their head.`,
`Take turns licking a small fruit without biting.`,
`Have a dirty dancing contest — 30 seconds each.`,
`Give anyone you choose a hickey.`,
`Show everyone playing the game your craziest sex position.`,
`Teach everyone your kinkiest sex technique.`,
`Demonstrate how to give a blow job on an unpeeled banana.`,
`Kiss and lick anyone you choose’s feet or neck for 1 minute.`,
`Kiss and lick anyone you choose’s feet or neck for 2 minutes.`,
`Bend anyone you choose over your knee and spank them ten times.`,
`Bend over anyone you choose’s knee and let them spank you twenty times.`,
`Slowly kiss anyone you choose from their feet to the top of their head.`,
`Grab anyone you choose’s hair and pull them into your boobs or crotch.`,
`Race anyone you choose to see who can get turned on the fastest.`,
`Go commando for 1 minute.`,
`Go commando for 2 minutes.`,
`Undress anyone you choose with everything but your hands.`,
`Suck anyone you choose’s nipples for 1 minute.`,
`Choose someone to suck your nipples for 1 minute.`,
`Suck anyone you choose’s nipples for 2 minutes.`,
`Choose someone to suck your nipples for 2 minutes.`,
`Rest your hands inside anyone you choose’s pants for the next 1 minute.`,
`Rest your hands inside anyone you choose’s pants for the next 2 minutes.`,
`Recreate the weirdest thing that ever happened to you during sex.`,
`Tell two people in the group to start kissing, then direct them to start doing other stuff like undressing or groping for 1 minute.`,
`Tell two people in the group to start kissing, then direct them to start doing other stuff like undressing or groping for 2 minutes.` 
                `Choose someone. For the next 3 full minutes, they control where you sit, stand, or move ; no speaking allowed from you.`,
`Stand against a wall. Someone stands in front of you and may adjust your posture, chin, shoulders, or waist slowly for 60 seconds.`,
`Choose someone. Sit on their lap for 1 minute. You may move or not once seated.`,
`Let someone guide your hands slowly for 90 seconds. You must follow without hesitation.`,
`Choose someone. They may whisper instructions to you for 2 minutes. You must obey.`,
`Blindfold yourself. Others may move around you and speak close to your ear or touch permitted parts for 2 minutes. You cannot remove the blindfold.`,
`Sit on someone’s lap. They are not allowed to touch you. You are allowed to move. 90 seconds.`,
`Choose someone. They may pull you close and hold you against them for a minute. No talking.`,
`Let someone decide one accessory or clothing layer to remove — and you keep it off for the next 3 turns.`,
`Choose someone. They may position you however they want (appropriate contact only) and you must hold the position for 60 seconds.`,
`Sit face-to-face. They may lightly guide your chin or waist while describing what they’re imagining 1 minute.`,
`Stand in front of someone. They may slowly circle you and narrate their “approach” — 60 seconds.`,
`Choose someone. They may pull you onto their lap and decide whether you stay still or move slowly — 2 minutes.`,
`Stand in the center. The group votes who you have the most tension with. You must stand close to that person for a minute and whatever happens…..`,
`Choose someone. They may rest their hands at your waist and control your movement for a minute.`,
`Allow someone to press you gently against a wall and hold you there — 90 seconds.`],
                3: [
                    `Let someone pull your shirt up and trace slow circles on your bare chest or back for 20 seconds.`,
`Lie down. Let someone straddle you and simulate full rhythm while maintaining eye contact for 45 seconds.`,
`Stand facing a wall or backing it. Let someone grind against you from behind for 1 minute.`,
`Stand facing a wall or backing it. Let someone grind against you from behind for 2 minutes.`,
`Go into a corner with someone for 90 seconds. Return and describe what happened.`,
`Let someone slowly unzip or unbutton your outfit halfway while narrating what they’d do next.`,
`Do a mirror strip tease with someone — below waist stays covered.`,
`Lie down and let someone kiss from your neck to your stomach for 30 seconds.`,
`Lie down and let someone kiss from your neck to your stomach for 1 minute.`,
`Let someone command your hands for 1 minute — guiding them on their own body.`,
`Let someone command your hands for 2 minutes — guiding them on their own body.`,
`Press your body fully against someone and simulate slow, heavy breathing for 30 seconds.`,
`Press your body fully against someone and simulate slow, heavy breathing for 1 minute.`,
`Sit in the middle while one person grinds from the front and another from behind — rotating after 45 seconds.`,
`Anyone you choose has to use a sex toy on themselves.`,
`Guys: Finger a girl, then taste it. Women: Taste him.`,
`Give anyone you choose cunnilingus for 1 minute.`,
`Give anyone you choose cunnilingus for 2 minutes.`,
`Give head to anyone you choose for 1 minute.`,
`Give head to anyone you choose for 2 minutes.`,
`Give anyone oral sex while they sit and back the others for 1 minute.`,
`Give anyone oral sex while they sit and back the others for 2 minutes.`,
`Get yourself off by dry humping anyone you choose.`,
`Guys: Spell the alphabet on your girl’s pussy with your tongue.`,
`Women: Spell the alphabet on the tip of your man’s penis with your tongue.`,
`Sit on anyone you choose’s face for 1 minute.`,
`Sit on anyone you choose’s face for 2 minutes.`,
`Lick whipped cream off anyone you choose’s chest, breasts, pussy, or penis.`,
`Masturbate in front of the group or me.`,
`Stay naked for the next 1 minute.`,
`Stay naked for the next 2 minutes.`,
`Strip for anyone you choose.`,
`Make anyone you choose fake cum using only your lips.`,
`Send anyone you choose a naked snap as view once.`    ]
            }
        };

    let currentLevel = 1;
    let currentType = null;
   const usedTracker = {
  truth: { 1: [], 2: [], 3: [] },
  dare: { 1: [], 2: [], 3: [] }
};

function pick(type, level) {
  const pool = QUESTIONS[type][String(level)];
  let available = pool.filter((_, i) => !usedTracker[type][level].includes(i));

  if (available.length === 0) {
    usedTracker[type][level] = [];
    available = pool;
  }

  const randomIndex = Math.floor(Math.random() * available.length);
  const chosen = available[randomIndex];
  const originalIndex = pool.indexOf(chosen);

  usedTracker[type][level].push(originalIndex);
  return chosen;
}

    function ask(type) {
      currentType = type;
      const player = api.pickNextPlayer();
      root.querySelector("#turn").textContent = `Turn: ${player} — ${type.toUpperCase()} (L${currentLevel})`;
      const q = pick(type, currentLevel);
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
