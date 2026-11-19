# AAA-Recherche (online, 19.11.2026) – 24 Bereiche, rund 270 Punkte

Quelle: Recherche-Helfer (Suchergebnisse zusammengefasst und umformuliert, nichts wörtlich übernommen). Englisch belassen.

```
AAA-QUALITY AUDIT CHECKLIST: 3D third-person story/school-life game (non-combat, ages 12–15, browser/three.js, tablets and PCs)

Method note: WebSearch worked, but WebFetch could not resolve any outside host in this session. That includes gameaccessibilityguidelines.com, devdocs.xbox.com, blog.playstation.com and matellion.blogspot.de. So the items below come from search-result summaries of the listed sources, combined and reworded into checkable lines. Nothing is copied verbatim. If you want item-by-item cross-checks against the full GAG, XAG and TLOU2 lists, those hosts need to be allowed in the session's network settings.

★ = especially relevant for a non-combat story/school game. 24 categories, about 270 items.

=====================================================================
1. CORE CONTROLS & GAME FEEL ("JUICE")
=====================================================================
- Input-to-response latency – The character visibly reacts to input on the very next frame, with no perceptible lag between pressing and moving. ★
- Acceleration/deceleration curves – Start and stop ramps are tuned so movement feels deliberate, not icy or robotic. ★
- Analog speed mapping – Stick or joystick deflection maps smoothly from walk to jog to run, and on touch a virtual stick distance does the same. ★
- Input buffering – An input pressed slightly early (interact, jump, trick) is queued and runs when it becomes valid, not dropped. ★
- Grace windows / coyote time – Timing-based actions (ollie off a ledge, catching a ball) give a few frames of leniency so the player's intent wins.
- Interruptible actions – Most non-story actions (sitting, idle fidgets, emotes) can be cancelled by moving.
- Feedback on every action – Every press produces at least one of: sound, animation, UI response, or particle. Nothing happens silently. ★
- Squash/stretch and overshoot tweening – UI and world pickups use easing (ease-out-back, elastic) instead of linear lerps. ★
- Camera shake / impact frames used sparingly – Small, intensity-scaled shakes on impacts in minigames (dunk, board landing), with a global slider. ★
- Hit-pause / micro-freeze on big moments – A brief time-scale dip (50–100 ms) sells a successful dunk, smash or landing.
- Satisfying "success" layering – Success moments stack sound, particles, a UI pop, a character reaction and haptics (where available) at once. ★
- Consistent physics scale – Gravity, jump heights and ball bounces feel the same across the whole game and fit the character's size.
- Haptics/vibration (where supported) – Gamepad rumble and mobile vibration are subtle, contextual and can be turned off.
- Responsive touch controls – On-screen controls have large hit areas, can be placed or resized, and show a pressed state. ★
- Contextual single-button interaction – One "interact" button resolves the most relevant nearby target using distance, facing and priority. ★

=====================================================================
2. CHARACTER LOCOMOTION & BODY ANIMATION
=====================================================================
- Smooth locomotion blending – A blend space covers idle, walk, jog and run with no foot-sliding at in-between speeds. ★
- Start/stop/turn transitions – Dedicated start, stop and pivot animations (or distance/motion matching) avoid instant snapping. ★
- Turn-in-place – Standing turns step the feet instead of rotating the whole body on the spot. ★
- Foot IK on slopes and stairs – Feet plant on uneven ground and steps, and the pelvis adjusts so legs never float or clip. ★
- Foot-plant locking – Planted feet don't slide during stops, turns or conversations.
- Head/eye look-at – Characters turn head and eyes toward the player, the speaker or points of interest, within clamped limits (about 60–70°), with a full body turn beyond that. ★
- Procedural lean and banking – The character leans into turns and acceleration (running, skating). ★
- Idle variations and fidgets – Several idles with random weighted fidgets (check phone, adjust backpack, shift weight) keep characters alive. ★
- Contextual animations – The character reacts to the environment (hand on railing, ducking under branches, stepping over small objects, squinting in sun). ★
- Hand IK for props – Hands correctly grip held objects (ball, paddle, phone, book) and touch doors or handles when interacting. ★
- Interaction alignment – Before a sit/open/pick-up animation, the character is smoothly warped into position (no visible teleport). ★
- Additive layers – Upper-body additives (waving, carrying, talking gestures) layer over locomotion without breaking the gait. ★
- Secondary motion – Hair, backpack straps, clothing and accessories have spring/jiggle physics or cloth-like secondary motion. ★
- Body language per character – Each named character has a distinct walk cycle and idle posture that reflect personality and mood. ★
- Emotional state animation sets – Characters have sad, happy, nervous and angry variants of idles and walks, driven by story state. ★
- No T-poses or pops – No visible snaps between animations, root-motion jumps, or default-pose frames anywhere.
- Crowd animation LOD – Distant NPCs use cheaper animation (lower update rate, fewer bones) without visible popping.

=====================================================================
3. FACIAL ANIMATION & CHARACTER PERFORMANCE
=====================================================================
- Lip sync – Mouth shapes (visemes) match dialogue audio, or are text-driven when there is no VO, and are timed correctly per language. ★
- Automatic blinking – Blinks are randomized and also happen at natural points (end of sentences, gaze shifts). ★
- Eye saccades and micro-movement – Eyes are never perfectly still while fixated, and small saccades avoid the "dead stare." ★
- Expression blendshapes – Each speaking character has at least 6–8 emotions (happy, sad, angry, surprised, embarrassed, worried, thinking, neutral) driven per line. ★
- Separately layered face systems – Gaze, blink, emotion and lip sync run as independent layers so they don't fight each other. ★
- Listener reactions – Non-speaking characters in a conversation nod, react, glance and shift expression. They don't freeze. ★
- Conversation gestures – Talking characters use hand and body gestures matched to line tone (emphasis, shrug, point). ★
- Emotion transitions – Expression changes blend over 150–400 ms, never snap.
- Stylization consistency – The face rig's level of realism matches the art style, avoiding uncanny-valley mismatch. ★
- Character silhouette readability – Main cast are recognizable by silhouette and color at distance (hair, clothes, accessories). ★

=====================================================================
4. GAMEPLAY CAMERA (THIRD-PERSON)
=====================================================================
- Camera never inside geometry – Collision uses a sphere- or frustum-cast, so the camera slides along walls instead of clipping through them.
- Character always visible – On occlusion the camera pulls in smoothly, or occluders fade/dither out. ★
- Small-gap safety – Thin poles and railings don't cause the camera to jitter in and out (hysteresis and smoothing on collision). ★
- Respects player intent – The camera never fights manual input. Auto-adjustment waits for a delay after the player stops moving it. ★
- Gentle auto-follow – When moving without camera input, the camera slowly realigns behind the character, with a tunable delay and speed. ★
- Look-ahead framing – The camera biases toward the direction of travel so the player sees where they're going.
- Pleasant composition – The character is framed slightly off-center (rule of thirds) with a stable horizon and no dutch roll during gameplay. ★
- Context-sensitive distance/FOV – Tighter in interiors and corridors, wider outdoors and in minigames, with smooth transitions. ★
- Vertical clamping – Pitch limits stop the camera from looking straight down into the scalp or straight up from under the floor.
- Smooth damping, no jitter – Spring/critically-damped follow, decoupled from physics tick jitter. Movement is never jerky.
- Invert X/Y and sensitivity options – Separate horizontal/vertical sensitivity and inversion for mouse, stick and touch. ★
- Touch camera drag – One-finger drag on the non-control half of the screen rotates the camera with inertia, and doesn't conflict with UI. ★
- Indoor/outdoor transitions – Doorways and stairs don't cause sudden camera snaps.
- Motion-sickness safeguards – Options to reduce camera bob, shake, FOV effects and motion blur, plus an optional center dot. ★
- Points of interest – Optional soft "look-at" hints toward important landmarks or new objectives, never forced for long.

=====================================================================
5. CINEMATIC & DIALOGUE CAMERA / STAGING
=====================================================================
- Conversation camera system – Dialogue uses shot/reverse-shot, over-the-shoulder and two-shots, chosen automatically by speaker. ★
- 180-degree rule respected – Dialogue cuts keep screen direction consistent so the player never loses spatial orientation. ★
- Shot variety – Auto-cutting avoids the same angle for many lines in a row and varies close-ups and mediums by emotional intensity. ★
- Staging/blocking – Characters walk to marks, face each other at natural distance and don't overlap or clip. ★
- Seamless gameplay-to-dialogue transition – The camera blends into conversation framing with no fade-to-black or teleport where possible. ★
- Letterbox / cinematic cues – Subtle framing changes signal "story moment" vs. free roam. ★
- Depth of field in close-ups – Shallow DOF isolates the speaker in close shots, scaled for performance tier. ★
- Lighting for conversations – Key/fill/rim lighting (or a character light rig) makes faces readable in every location and time of day. ★
- Skippable/pausable cutscenes – Every cutscene can be paused, and skipped after first viewing (or always), with confirmation. ★
- Replayable scenes – Important story scenes can be rewatched from a menu (memory/scrapbook). ★

=====================================================================
6. NARRATIVE & DIALOGUE SYSTEM
=====================================================================
- Clear dialogue UI – Speaker name, portrait or color tag, readable text box, and a visible "continue" affordance. ★
- Text pacing control – Typewriter text can be completed instantly with one tap, and an auto-advance option has adjustable speed. ★
- Dialogue history/log – Players can scroll back through previous lines in the current conversation and recent ones. ★
- Choice presentation – Options are short, distinct in intent, and show tone or emotion icons where helpful (supportive, honest, joking). ★
- No choice timers by default – Timed choices are optional, or can be extended or disabled (accessibility and reflection for SEL). ★
- Interruptible/conversational flow – Players can walk away, interrupt or return to conversations, and the system resumes gracefully. ★
- Barks/ambient lines – Short contextual lines fire from a rules database matched against world facts, so characters comment on what is happening. ★
- Bark rules have specificity and cooldowns – The most specific matching line wins, there are generic fallbacks, and repeat suppression and cooldowns prevent spam. ★
- Writer-friendly data pipeline – Dialogue lives in external data (Ink/Yarn/JSON) that writers can edit without code changes. ★
- Character voice consistency – Each character has a distinct voice and vocabulary that fits age 12–15, avoiding adult-sounding teen speech. ★
- Codex / journal – In-world diary or notebook records people met, events, goals and reflections. ★
- Relationship view – A screen shows the player's relationship with each character and recent changes, with qualitative or emoji descriptors rather than cold numbers. ★
- Character profiles – Unlockable bios with likes, dislikes and facts learned through interaction. ★
- Narrative pacing / beats – A clear act structure with alternating tension and relief, and a strong hook in the first 5 minutes. ★
- Voice-over or vocal "gibberish" – Either localized VO for key lines, or per-character vocal sounds/grunts with tonal variation for text lines. ★
- Diegetic communication – In-world phone messages, notes and posters deliver story asynchronously (texts from classmates, a school app). ★

=====================================================================
7. CHOICE, CONSEQUENCE & REACTIVITY
=====================================================================
- Choice tracking – Every meaningful choice is stored as a flag/variable and can be referenced later. ★
- Visible consequence signposting – A subtle notification ("X will remember that") signals that a choice matters. ★
- Short- and long-term callbacks – Choices pay off immediately (reaction) and later (a character references it days or chapters later). ★
- NPC memory – NPCs greet the player differently based on past interactions, help given, or promises kept or broken. ★
- World state changes – The environment reflects outcomes (a poster appears, a club exists, a broken thing is fixed). ★
- No "correct answer" shaming – Choices model real dilemmas. Feedback is reflective and non-judgmental, fitting SEL goals. ★
- Branch-and-bottleneck structure – Branches reconverge at manageable points, but the flavor of the branch persists in dialogue. ★
- End-of-chapter recap – A summary of key decisions, optionally compared with (anonymized, aggregate, opt-in) class or global choices. ★
- Perspective-taking moments – Choices are occasionally shown from another character's viewpoint, reinforcing empathy. ★
- Reflection prompts – Optional pauses where the player names or reflects on the emotions involved (journal entry, mood picker). ★
- Undo/rewind policy is explicit – Players know whether they can retry decisions (chapter select) or whether choices stick. ★
- Reactivity to player expression – NPCs comment on outfit, time of day, recent minigame results or player-character mood. ★

=====================================================================
8. NPC LIFE, SCHEDULES & AMBIENT AI
=====================================================================
- Daily schedules – NPCs follow time-of-day routines (arrive at school, class, lunch, clubs, go home). ★
- Smart objects – Benches, lockers, vending machines and basketball hoops advertise interactions NPCs use autonomously. ★
- Group behaviors – NPCs cluster in social groups that chat, laugh and gesture together, and disperse naturally. ★
- Reaction to player – NPCs glance at, step aside for, wave to or comment on the player when close or when the player runs or bumps them. ★
- Personal space / avoidance – Local avoidance stops NPCs walking through each other or the player, with natural sidestepping. ★
- Navmesh robustness – No NPCs stuck on corners, walking into walls, or jittering at doorways.
- Crowd density per zone/time – Corridors are busy between classes and quiet during lessons, so the campus feels alive at the right moments. ★
- Ambient conversations – Overheard NPC-to-NPC chatter (text bubbles or audio) delivers world flavor and hints. ★
- Variety in NPC appearance – Mix-and-match bodies, faces, hair, clothes and colors avoid visible clones. ★
- Animation desync – Crowds never animate in lockstep. Phase offsets and variations are randomized.
- Emotional contagion – Ambient NPCs react to events (cheer at a basket, gasp at a fall, applaud at an assembly). ★
- LOD for AI – Off-screen or distant NPCs use simplified simulation and pause/resume cleanly when re-entering view.
- Teacher/authority behaviors – Adults behave as adults (supervise, call students, react to running in halls), giving the setting credibility. ★

=====================================================================
9. WORLD BUILDING & ENVIRONMENTAL STORYTELLING
=====================================================================
- "What happened here?" details – Props are arranged so players can infer stories (abandoned lunch, a half-finished poster, a lost-and-found box). ★
- Lived-in campus – Lockers with personal decals, notice boards, student art, trophy cases, worn paths and scuffs. ★
- Consistent visual language – Architecture, signage and prop style coherently fit one place, era and culture. ★
- Diegetic signage – In-world signs, maps and room numbers support navigation and add flavor (localizable textures or text overlays). ★
- World changes over time – Decorations change for events and seasons, and posters update with story progress. ★
- Readable in-world documents – Notes, flyers and messages can be picked up and read, with a clean text overlay for accessibility. ★
- Character spaces reflect personality – Each main character's locker, room or desk reveals who they are. ★
- Ambient life – Birds, wind in trees, flags, clouds, distant traffic, leaves blowing. The world moves without the player. ★
- Hidden details / easter eggs – Small surprises reward curiosity (funny posters, secret spots, callbacks). ★
- Inclusive, diverse representation – Cast and world reflect varied backgrounds, body types and abilities, authentically and without stereotypes. ★

=====================================================================
10. LEVEL DESIGN, NAVIGATION & WAYFINDING
=====================================================================
- Landmarks visible from anywhere – Distinct tall or colorful landmarks (clock tower, gym, big tree) aid orientation. ★
- Districts with identity – Each campus area has its own color palette, materials and sound so players know where they are. ★
- Objective guidance – A clear current objective, with an optional waypoint, path line, or diegetic guide (e.g., Ghost of Tsushima-style wind/leaf or a phone map). ★
- Minimal, toggleable HUD navigation – Navigation aids can be summoned or hidden. The default is unobtrusive. ★
- Map screen – A readable stylized map with player position, objectives, named locations, and fast travel if the campus warrants it. ★
- Breadcrumbing – Lighting, color, open doors and NPC placement draw the eye toward the critical path. ★
- No dead ends without reward – Side paths lead to something (collectible, view, NPC, secret). ★
- Invisible boundaries handled gracefully – Edges use natural blockers (fences, hedges) and never invisible walls in open space.
- Traversal flow – No getting stuck on small ledges or props. Step-up height and collision capsules are tuned generously.
- Fast traversal options – Skateboard/bike or a "hurry" sprint for longer distances, so backtracking never feels tedious. ★
- Objective clarity on return – On resuming play, a short "Previously…" or current-goal reminder appears. ★

=====================================================================
11. VISUAL FIDELITY: ART DIRECTION, LIGHTING, MATERIALS, POST
=====================================================================
- Strong, cohesive art direction – A consistent stylization (palette, shape language, texel density) that ages well on low-end hardware. ★
- Color script – The overall palette shifts with story mood and time of day. ★
- PBR materials – Consistent roughness and metalness. Surfaces read correctly (wood, metal, fabric, glass).
- Baked lighting / lightmaps + light probes – High-quality GI for static scenes with dynamic characters lit consistently.
- Time-of-day lighting – Morning, noon, afternoon and evening states with matching sky, fog and shadows. ★
- Shadows – Stable shadows (no shimmering or acne) with cascades or a contact-shadow approximation, scaled by tier.
- Ambient occlusion – Baked or SSAO grounds objects. No floating props.
- Post-processing stack – Tonemapping (ACES/AgX), subtle bloom, color grading LUT, and vignette, each scalable.
- Anti-aliasing – FXAA/SMAA/MSAA or TAA appropriate to tier. No crawling edges on thin geometry.
- Correct color space – sRGB/linear handled correctly, so textures don't look washed out or crushed.
- Sky and atmosphere – Gradient sky, clouds, fog/haze for depth, and distance fade.
- Character rendering – Rim light or fresnel and skin subsurface approximation make characters pop from the background. ★
- No texture stretching or seams – UVs are clean, texel density is consistent, and LOD transitions don't pop. ★
- Foliage – Wind-animated grass and trees with alpha-to-coverage or dithered fading.

=====================================================================
12. VFX & WORLD ANIMATION
=====================================================================
- Ambient particles – Dust motes in sunbeams, leaves, petals and insects add life. ★
- Gameplay VFX – Clear trails, sparkles and impact puffs for minigame moments (ball swish, skate grind sparks). ★
- Weather – Optional rain, wind or snow states with matching audio and puddle/wetness response. ★
- Water/reflective surfaces – Plausible reflections (cube maps, SSR at high tier) on floors, windows and puddles.
- Interactive props – Kickable cans, swinging doors and bouncing balls respond with physics. ★
- Emotion VFX (stylized) – Optional comic-style emotion indicators (sweat drop, sparkles, rain cloud) amplify feelings for younger players. ★
- UI-to-world VFX – Collectibles and rewards fly to their UI counters with trails.

=====================================================================
13. AUDIO: SFX, FOLEY & SPATIALIZATION
=====================================================================
- Surface-aware footsteps – Footsteps vary by surface (tile, grass, wood, gravel, carpet, gym floor) via ground material detection. ★
- Variation and randomization – 4–8+ samples per sound with no immediate repeats, plus ±3–5% pitch and volume randomization per play. ★
- Clothing/foley layer – Cloth rustles, backpack jingle and shoe squeaks on the gym floor sync to animation events. ★
- 3D spatialization – Positional audio with distance attenuation curves and panning (Web Audio PannerNode / three.js PositionalAudio).
- Reverb zones – Each space has fitting reverb (hallway, gym, classroom, bathroom, outdoors) with smooth transitions. ★
- Occlusion/obstruction – Sounds behind walls or doors are muffled (low-pass) and level-reduced.
- Ambience beds – Layered room tones and outdoor beds (birds, distant traffic, school bell, chatter) per zone and time of day. ★
- Randomized one-shots in ambience – Occasional spot sounds (locker slam, laugh, ball bounce) keep ambience from looping noticeably. ★
- UI sound language – A consistent set of hover, select, back, confirm, error and reward sounds, short and pleasant. ★
- Minigame audio feedback – Distinct sounds for success, near-miss and fail, with escalating audio for streaks. ★
- No audio pops/clicks – Fades on start and stop. Voice-stealing and per-sound instance caps prevent overload.

=====================================================================
14. AUDIO: MUSIC & MIX
=====================================================================
- Adaptive music – Vertical layering (adding stems with intensity or mood) and/or horizontal resequencing (switching sections at bar lines). ★
- Mood-driven score – Music shifts with story emotion (calm, tense, sad, triumphant) and character themes (leitmotifs). ★
- Smooth transitions – Music changes crossfade on musical boundaries, never abrupt cuts. ★
- Location themes – Each area or activity (cafeteria, gym, skatepark) has its own musical identity. ★
- Silence used intentionally – Music drops out for emotionally heavy moments. ★
- Dialogue ducking – Music and SFX duck automatically (sidechain-style) under dialogue and important cues. ★
- Mix buses with separate sliders – Master, music, SFX, voice, ambience and UI volumes are adjustable independently. ★
- Loudness consistency – Consistent integrated loudness across scenes, with no sudden volume spikes. ★
- Mono/stereo options – A mono audio toggle for single-ear hearing or one-earbud play. ★
- Audio focus behavior – Audio pauses or ducks when the tab or app loses focus, and resumes correctly. Web Audio unlocks on first user gesture. ★

=====================================================================
15. UI/UX: HUD, MENUS & INFORMATION ARCHITECTURE
=====================================================================
- Minimal, contextual HUD – HUD elements appear only when relevant and fade otherwise. ★
- Clear visual hierarchy – The most important info is biggest, highest contrast and in a consistent position. ★
- Consistent UI language – One style for buttons, panels, icons and transitions throughout. ★
- Readable typography – Minimum effective text size is large for tablet and distance viewing, with good letter and line spacing, and no thin or decorative fonts for body text. ★
- Safe areas – UI respects notches, rounded corners and browser chrome, and scales across 4:3 tablets, 16:9 and 21:9 PCs. ★
- Resolution/DPI independence – UI is crisp at any DPR, with vector or high-res assets.
- Input-aware prompts – Button glyphs switch automatically between touch, keyboard/mouse and gamepad when the player changes device. ★
- Menu navigation by every input – Menus are fully usable with touch, mouse, keyboard (Tab/arrows/Enter/Esc) and gamepad, with a visible focus state. ★
- Quick access – Pause, map, journal and settings are each reachable in one action. ★
- Confirmation for destructive actions – Overwriting a save, quitting without saving and resetting progress all require a confirm, with the safe option preselected. ★
- Animated transitions – Menus slide/fade in 150–300 ms, are never sluggish, and can be reduced via a reduced-motion option. ★
- Notification queue – Toasts (achievements, relationship changes, objectives) are queued, never overlap, and don't obscure dialogue. ★
- Diegetic/meta UI – The in-world phone or notebook doubles as the menu where it supports immersion without hurting readability. ★
- Loading/transition screens – Show tips, lore or character art, and a progress indicator. ★
- Error messages in plain language – Network or save errors explain what happened and what to do, with a friendly age-appropriate tone. ★
- Iconography with labels – Icons are paired with text labels or tooltips. No mystery icons. ★

=====================================================================
16. ONBOARDING & TUTORIALS
=====================================================================
- Teach by doing – Mechanics are introduced in context through level design and story, not walls of text. ★
- One concept at a time – New mechanics are spaced out, each practiced in a safe context before it is combined with others. ★
- Just-in-time prompts – A control hint appears right when the action is first needed and disappears once performed. ★
- Context-sensitive re-prompts – If a player seems stuck (no progress for N seconds), a gentle hint appears. ★
- Non-patronizing tone – Hints respect the player's intelligence, and experienced players can skip tutorials. ★
- Control reference – A controls/help page is always reachable from pause, for each input type. ★
- Tutorial replay – Minigame tutorials and instructions can be replayed anytime. ★
- First 10 minutes – Movement, interaction, dialogue choice and a first emotional hook are all reached quickly, with minimal menus before play. ★
- Fail-safe learning – Early mistakes have no harsh penalties. Failure is framed as learning. ★
- Playtested with target age – Onboarding is validated by watching real 12–15-year-olds play silently (observe, don't ask). ★

=====================================================================
17. MINIGAMES & ACTIVITIES
=====================================================================
- Distinct, tactile controls per minigame – Each (basketball shot meter, table tennis swing timing, skate tricks) has a clear readable input model. ★
- Analog skill expression – Timing and direction quality affect outcome (shot arc, spin, trick height) so mastery is possible. ★
- Readable success/fail feedback – Instantly clear why a shot missed (too early, too weak), with visual and audio cues. ★
- Difficulty ramp – Starts easy, adapts or offers levels, and never blocks story progression behind skill. ★
- Assist options – Aim assist, slower ball speed, wider timing windows and auto-play or skip for players who struggle. ★
- Short sessions – Rounds of 1–3 minutes with instant restart. ★
- Personal bests and goals – Score targets, medals (bronze/silver/gold) and personal records encourage replay. ★
- Social framing – Minigames tie into relationships (play with a friend, cheer reactions, cooperative modes). ★
- Juicy presentation – Crowd reactions, slow-mo on great shots, combo counters and dynamic camera moments. ★
- Consistent with world physics/style – Minigames use the same characters, animations and art as the main game, not a different visual language. ★
- Pause/quit anytime – Minigames can be paused and exited without losing story progress. ★
- Camera tuned per minigame – Each activity has a purpose-built camera (low skate cam, behind-shooter basketball cam, side table tennis cam). ★

=====================================================================
18. PROGRESSION, REWARDS & COLLECTIBLES (ETHICAL RETENTION)
=====================================================================
- Clear sense of progress – Chapter or day counter, story progress and relationship growth visibly advance. ★
- Intrinsic motivation focus – Rewards support competence, autonomy and relatedness (self-determination theory) rather than compulsion. ★
- Collectibles with meaning – Collectibles reveal lore, character backstory or SEL content, not just counters. ★
- Collection tracker – A per-area completion overview so completionists know what remains. ★
- Cosmetic customization – Earnable outfits, board designs, room or locker decoration for self-expression. ★
- Achievements/badges – In-game badges for milestones, kind actions, exploration and minigame mastery, with fair and transparent criteria. ★
- Hooks between sessions – Each session ends with a story cliffhanger or an "upcoming event" teaser. Narrative curiosity, not FOMO. ★
- Varied reward cadence – Small frequent rewards mixed with larger rare milestones. ★
- No predatory mechanics – No loot boxes, no real-money purchases, no paid currencies, no countdown FOMO, no daily login streak penalties. ★
- Calendar/time structure (optional) – A school-day or week structure (Persona-style dayparts) gives pacing and meaningful choice of how to spend time. ★
- Reward the "soft skills" – Helping, listening and resolving conflicts unlock content as meaningfully as minigame skill does. ★
- New Game+/chapter select – Replay chapters to explore other choices without restarting everything. ★

=====================================================================
19. DIFFICULTY, ASSISTS & ADAPTIVE TUNING
=====================================================================
- Multiple difficulty/assist presets – Story/relaxed, default and challenge modes, changeable anytime without penalty. ★
- Granular assists – Separate toggles for timing windows, game speed, hints and auto-complete of minigames. ★
- Dynamic difficulty adjustment (subtle) – Minigame difficulty quietly adapts to repeated failure (wider windows, slower opponents). It never punishes success harshly. ★
- Failure skip offer – After N failures, offer to skip or auto-complete a challenge with a respectful framing. ★
- Live-tunable parameters – Timing windows, speeds and AI skill are data-driven, adjustable without code changes, ideally via remote config. ★
- Teacher/parent settings (if applicable) – Optionally lock or set difficulty, time limits or content options for class use. ★

=====================================================================
20. ACCESSIBILITY: VISION & HEARING
=====================================================================
- Subtitles on by default (or asked at first launch) – Covering all dialogue, including barks and ambient chatter. ★
- Subtitle customization – Size (at least 3 steps), background opacity, color, and speaker name and color. ★
- Speaker identification – Names and colors on every line, with off-screen speakers marked. ★
- Closed captions for important sounds – [bell rings], [door slams], with optional directional indicators. ★
- Audio cues have visual equivalents – Every gameplay-relevant sound also has a visual cue, and vice versa. ★
- Scalable UI and text – Global UI and text size options, tested at maximum size with no clipping. ★
- High-contrast mode – Option for high-contrast UI and outlines on interactables. ★
- Contrast ratios – Text meets at least 4.5:1 contrast against its background. ★
- Colorblind support – No information conveyed by color alone (shapes, icons, patterns too), plus colorblind filters or palette options. ★
- Screen reader / TTS for menus and dialogue – Text-to-speech for UI and dialogue text (Web Speech API or the OS screen reader via ARIA live regions). ★
- Brightness/gamma calibration – Setup screen on first launch. ★
- Photosensitivity safety – No rapid flashing (more than 3 per second), with a reduce-flashes option. ★
- Interaction highlights – Optional outline or glow on interactable objects and NPCs. ★

=====================================================================
21. ACCESSIBILITY: MOTOR & COGNITIVE
=====================================================================
- Full input remapping – Remap all keyboard and gamepad controls, and reposition or resize touch controls. ★
- Hold-to-toggle / no button mashing – Every hold can become a toggle and every rapid press a hold. ★
- One-handed play possible – Core loop playable with one hand (mouse-only or touch-only modes). ★
- No mandatory precise timing for story – Story progress never depends on fine motor skill. ★
- Adjustable game speed – Slow-motion option for minigames. ★
- Accessibility presets – Bundles for vision, hearing, motor and cognitive that set recommended options at once. ★
- Accessibility at first launch – Key accessibility options (text size, subtitles, motion) are offered before gameplay starts. ★
- Objective reminder – The current objective is always retrievable with one press. ★
- Recap / story-so-far – Chapter summaries and a "previously" for players returning after days (typical in school use). ★
- Simple language mode – Plain-language variants or glossary tooltips for complex terms, and a reading level suitable for 12-year-olds and ESL learners. ★
- Avoid time pressure – Reading, choices and menus are never timed unless that is optional. ★
- Clear, consistent controls – The same button does the same thing everywhere. ★
- Content warnings – Optional notices before emotionally intense topics (bullying, loss), with the ability to skip or soften. ★
- Accessibility documentation – Accessibility features are documented on a store/info page and in-game. ★
- Mental health best practices – Supportive framing of difficult topics, with help resources or a trusted-adult prompt where SEL content touches sensitive issues. ★

=====================================================================
22. SAVE SYSTEM & SESSION DESIGN
=====================================================================
- Frequent autosave – Saves at meaningful events (scene change, choice made, minigame end, chapter start), never relying only on a timer. ★
- Saving indicator – A visible icon while saving, and a warning not to close the tab during a write. ★
- Atomic writes + backups – Write to temp then swap, and keep at least 2 rotating backups to survive tab close or crash. ★
- Multiple slots / profiles – Several save slots or profiles, important on shared school devices. ★
- Save metadata – Slot shows chapter name, playtime, timestamp and a thumbnail. ★
- Cross-device continuity – Optional cloud or account save or a code-based export/import, so students can continue between school and home. ★
- Resilient to browser storage limits – Uses IndexedDB, handles quota errors gracefully, and warns if private mode prevents saving. ★
- Session-friendly length – Natural stopping points every 10–20 minutes, fitting a lesson period. ★
- Resume where you left off – "Continue" button on the title screen loads the latest state instantly. ★
- Save versioning/migration – Old saves load after game updates (schema version and migration). ★

=====================================================================
23. PERFORMANCE, SCALABILITY, LOADING & SETTINGS (WEB)
=====================================================================
- Stable frame rate target – A locked 30 or 60 fps per tier, with frame-time consistency (no hitches) mattering more than peak fps. ★
- Automatic quality detection – Benchmarks or GPU-detects on first run and picks a preset (low/med/high) on its own. ★
- Dynamic resolution / DPR cap – Device pixel ratio capped (e.g., ≤1.5 on tablets) and lowered dynamically when frame time spikes. ★
- Graphics settings menu – Presets plus individual toggles (shadows, AO, post-FX, render scale, draw distance, NPC density, particle count). ★
- Draw-call budget – Instancing and merging keep draw calls low (aiming around 100–200 on low-end tablets), monitored via renderer.info.
- Mesh LODs and impostors – Distant buildings, trees and NPCs use LODs or billboards.
- Texture compression – KTX2/Basis textures for GPU-compressed memory, and Draco/Meshopt geometry for download size. ★
- Fast first load – The first playable scene arrives in seconds, with remaining assets streamed and progressive loading behind the menu or intro. ★
- Caching – Service worker / HTTP caching so repeat visits load instantly, plus offline-capable play on school networks if possible. ★
- No shader compilation hitches – Shaders and materials pre-compiled or warmed during loading (renderer.compile). ★
- Memory management – Geometries, textures and materials disposed on scene change. No leaks over long sessions.
- Thermal/battery awareness – A battery-saver mode (30 fps cap, reduced effects) for tablets. ★
- Graceful WebGL context-loss recovery – The game recovers or reloads without losing progress. ★
- Pause on visibility change – Simulation, audio and rendering pause when the tab is hidden. ★
- Low-bandwidth friendliness – Total download size is reasonable for shared school Wi-Fi, with assets chunked by chapter. ★
- Window/orientation handling – Correct resize, landscape lock or prompt on tablets, and fullscreen toggle. ★

=====================================================================
24. LOCALIZATION, SOCIAL/PHOTO FEATURES, PRIVACY & SAFETY, QA/POLISH
=====================================================================
(Grouped for brevity. Treat as four sub-sections when auditing.)

Localization
- Externalized strings with stable IDs – All player-facing text comes from string tables, with no hard-coded text in code or textures. ★
- Text expansion tolerance – UI handles about 30%+ longer text (e.g., German) with auto-wrap or auto-size. Pseudo-localization tested. ★
- Plural/gender/variable handling – ICU MessageFormat-style plurals and gender agreement, and no sentence-fragment concatenation. ★
- Font coverage – Fonts support all target scripts (umlauts, accented characters, Cyrillic, etc.) with fallback fonts. ★
- Language switch in-game – Changeable from settings without restart, with an auto-detected default. ★
- Culturally appropriate content – Gestures, symbols, school-system details and humor adapted per locale. ★
- Number/date formatting – Locale-correct formats.

Social features & photo mode
- Photo mode – Pause the scene, free camera within bounds, FOV and DOF controls, filters, frames, character poses and expressions, hide HUD. ★
- Photo saving/sharing – Save to device locally. Any sharing is opt-in and moderated for minors. ★
- Emotes/expressions – A player-character emote wheel (wave, thumbs up, dance) for self-expression and NPC reactions. ★
- Asynchronous social (safe) – Optional class-level features (compare choices, shared leaderboards with nicknames), with no open chat for minors. ★
- Classroom integration – An optional teacher view of progress or reflection prompts, privacy-preserving and opt-in. ★

Privacy, safety, telemetry & wellbeing
- High-privacy by default – Data-minimal defaults per the UK Age Appropriate Design Code, COPPA and GDPR-K, with no tracking ads. ★
- Privacy-safe telemetry – Anonymous or pseudonymous aggregate events (funnel progression, drop-off points, minigame fail rates, settings usage), no PII, documented and opt-in where required. ★
- No negative nudges – No dark patterns pushing data sharing, extended play or purchases. Positive nudges only (break reminders, privacy-protective choices). ★
- Break reminders / session timers – Optional gentle prompts after long play. ★
- Age-appropriate content review – Story content reviewed for age rating (PEGI/USK/ESRB-equivalent) and SEL accuracy, ideally with educators or psychologists. ★
- Clear, kid-readable privacy info – Short explanations at the point where any setting or data use matters. ★

QA, polish & stability
- No soft-locks – Every story state can be continued, with a "reset position / unstuck" option in the pause menu. ★
- Collision polish – No falling through floors, getting stuck in props, or walking through walls. ★
- Text QA – No typos, overflow, missing strings or placeholder text in any language. ★
- Visual polish pass – No z-fighting, light leaks, floating props, LOD pops, flickering shadows or missing textures. ★
- Audio polish pass – No missing sounds, repeated-sample fatigue or volume spikes. ★
- Device matrix testing – Tested on target school tablets (iPad, Chromebook, Android) and low-end PCs across Chrome, Safari, Edge and Firefox. ★
- Crash/error reporting – Anonymous error capture (JS exceptions, WebGL errors) to fix stability issues. ★
- Long-session stability – A 1–2 hour soak test with no memory growth or fps degradation. ★
- Edge-case input – Mid-session device switching (touch to keyboard), controller disconnect pausing the game, and multi-touch conflicts all handled. ★
- Playtests with the target audience – Regular sessions with 12–15-year-olds and teachers, tracking confusion points and emotional response. ★
- Consistent fit and finish – Title screen, credits, version number, settings persistence and a polished app icon/favicon. ★

=====================================================================
MAIN SOURCES
=====================================================================
Camera
- John Nesky, "50 Camera Mistakes" (GDC 2014) – https://gdcvault.com/play/1020460/50-Camera
- Game Developer, "Video: 50 common game camera mistakes and how to fix them" – https://gamedeveloper.com/design/video-50-common-game-camera-mistakes----and-how-to-fix-them
- Unreal Engine tech blog, "Six ingredients for a dynamic third person camera" – https://www.unrealengine.com/tech-blog/six-ingredients-for-a-dynamic-third-person-camera
- Game Developer, "Accurate Collision Zoom for Cameras" – https://gamedeveloper.com/programming/accurate-collision-zoom-for-cameras
- Game Developer, "Real-time Cameras – Navigation and Occlusion" – https://gamedeveloper.com/design/real-time-cameras---navigation-and-occlusion
- Game Developer, "Third person camera design with free move zone" – https://gamedeveloper.com/design/third-person-camera-design-with-free-move-zone

Game feel
- Jonasson & Purho, "Juice It or Lose It" (GDC Europe 2012) – https://gdcvault.com/play/1016789/Juice-It-or-Lose
- Game feel (Wikipedia overview, incl. Nijman / Berbece talks) – https://en.wikipedia.org/wiki/Game_feel
- GameAnalytics, "Squeezing more juice out of your game design" – https://www.gameanalytics.com/blog/squeezing-more-juice-out-of-your-game-design
- "Input Buffering, Coyote Time, and Game Feel" – https://kindatechnical.com/game-development/input-buffering-coyote-time-and-game-feel.html

Animation
- Ubisoft, "Fitting the World: A Biomechanical Approach to Foot IK" (GDC 2016) – https://gdcvault.com/play/1023009/Fitting-the-World-A-Biomechanical
- Game Developer, "Most inspiring game animation tech talks of 2016" (Motion Matching, For Honor) – https://gamedeveloper.com/programming/most-inspiring-game-animation-tech-talks-of-2016
- Valve, "The Right Foot in the Wrong Place" (SIGGRAPH 2021) – https://history.siggraph.org/wp-content/uploads/2022/06/2021-Talks-Heuvel_The-Right-Foot-in-the-Wrong-Place.pdf
- Naughty Dog at GDC 2021 (Motion Matching in TLOU2) – https://naughtydog.com/blog/naughty_dog_at_gdc_2021
- Naughty Dog at GDC 2017 (physics layer on animation, Uncharted 4) – https://naughtydog.com/blog/naughty_dog_gdc_2017
- JALI / Cyberpunk 2077 facial animation (SFU) – https://www.sfu.ca/fas/news-and-outreach/years/2020/ai-technology-behind-cyberpunk2077-automatic-facial-animations.html
- USC ICT, "A Practical and Configurable Lip Sync Method for Games" – https://ict.usc.edu/pubs/A%20Practical%20and%20Configurable%20Lip%20Sync%20Method%20for%20Games.pdf
- Meta Avatars expressive features (blink, gaze, micro-saccades) – https://developers.meta.com/horizon/documentation/unreal/as-avatars-expressive-unreal/

UX/UI and onboarding
- IxDF, "Design for Joy: Why Games Break Traditional UX Rules" (Hodent framework) – https://ixdf.org/literature/article/design-for-joy-why-games-break-traditional-ux-rules
- GDC Podcast ep. 8, Celia Hodent – https://www.gamedeveloper.com/design/games-psychology-and-ux-with-celia-hodent---gdc-podcast-ep-8
- Game Developer, "Secretly console first: multi-platform game UI design" – https://www.gamedeveloper.com/design/secretly-console-first-a-better-approach-to-multi-platform-game-ui-design
- Apple HIG, "Designing for games" – https://developer.apple.com/design/human-interface-guidelines/designing-for-games
- Game Developer, "No More Tutorials! How to Convey Information Through Design" – https://www.gamedeveloper.com/audio/no-more-tutorials-how-to-convey-information-through-design-repost-
- George Fan's PvZ onboarding lessons (UX Collective) – https://uxdesign.cc/lessons-in-onboarding-from-plants-vs-zombies-d936d58c10c

Accessibility
- Game Accessibility Guidelines – https://gameaccessibilityguidelines.com/
- Xbox Accessibility Guidelines (XAG 101–123) – https://learn.microsoft.com/en-us/gaming/accessibility/guidelines
- XAG 101 Text display deep dive – https://devdocs.xbox.com/build/game-principles/accessibility/xag-deep-dives/xag-101-text-display
- The Last of Us Part II accessibility features (PlayStation Blog) – https://blog.playstation.com/2020/06/09/the-last-of-us-part-ii-accessibility-features-detailed
- PlayStation TLOU2 accessibility page – https://playstation.com/en-us/games/the-last-of-us-part-ii/accessibility/
- Can I Play That?, Deaf/HoH accessibility guide – https://caniplaythat.com/2019/07/11/basic-accessibility-options-for-deaf-hoh-players/
- AbleGamers, Accessible Player Experiences (APX) – https://accessible.games/apx

Narrative and dialogue
- Elan Ruskin (Valve), "AI-driven Dynamic Dialog through Fuzzy Pattern Matching" (GDC 2012) slides – https://cdn.fastly.steamstatic.com/apps/valve/2012/GDC2012_Ruskin_Elan_DynamicDialog.pdf
- Emily Short on the Ruskin talk – https://emshort.blog/2012/03/16/gdc-2012-talk-on-dynamic-dialogue/
- "Do You Copy? Dialog Systems and Tools in Firewatch" (GDC 2017) – https://gdcvault.com/play/1024000/Do-You-Copy-Dialog-System
- "Interactive Story Without Challenge Mechanics: The Design of Firewatch" – https://www.gdcvault.com/play/1026087/Interactive-Story-Without-Challenge-Mechanics
- GDC Game Narrative Review: Life is Strange – https://media.gdcvault.com/gdc2017/GameNarrativeReview/GDCReview_SamsonJinks_LifeIsStrange.pdf
- Square Enix, "Choice and consequences in the Life is Strange series" – https://www.square-enix-games.com/news/video-choice-consequences-life-strange-series
- Game Developer, "Comparing the Social Link system in Persona 3/4/5" – https://gamedeveloper.com/design/same-but-different---comparing-the-social-link-system-in-persona-3-4-5

World, NPCs and level design
- Smith & Worch, "What Happened Here? Environmental Storytelling" (GDC 2010) – https://www.gdcvault.com/play/1012647
- Nieman Storyboard, Harvey Smith on environmental storytelling – https://niemanstoryboard.org/2011/01/14/harvey-smith-on-environmental-storytelling-and-embedding-narrative/
- Rockstar on RDR2 NPC interactions (GamingBolt) – https://gamingbolt.com/red-dead-redemption-2s-npc-interactions-are-a-huge-leap-forward-says-rockstar
- PC Gamer, "Red Dead Redemption 2 NPCs lead interesting lives" – https://pcgamer.com/red-dead-redemption-2-npcs-lead-interesting-lives
- GDC 2021, Ghost of Tsushima Guiding Wind – https://gdconf.com/news/see-how-ghost-tsushima’s-guiding-wind-came-life-gdc-2021

Audio
- Winifred Phillips, vertical layering / hybrid structure (GDC 2021) – https://www.gamedeveloper.com/game-platforms/hybrid-horizontal-vertical-structure-for-game-music-composers-from-spyder-to-sackboy-gdc-2021-
- Unreal tech blog, "Redesigning audio in ShooterGame" (surface footsteps, mix) – https://www.unrealengine.com/tech-blog/redesigning-audio-in-unreal-engine-s-shooter-game-sample-project
- Game Developer, "The Game Audio Mixing Revolution" – https://gamedeveloper.com/audio/the-game-audio-mixing-revolution
- A Sound Effect, footstep sound design tutorial – https://www.asoundeffect.com/?p=723733

Minigames, difficulty and retention ethics
- EA, Skate "Get Control" (Flick-It) – https://www.ea.com/games/skate/skate/news/get-control
- Game Developer, Skate's text-based control prototype – https://www.gamedeveloper.com/game-platforms/ea-s-blackwood-text-based-prototype-perfected-i-skate-i-s-control-scheme
- Engadget, "Resident Evil 4 secretly adjusted its difficulty" – https://www.engadget.com/2015-06-03-resident-evil-4-difficulty.html
- Deceptive Patterns, taxonomy of dark patterns in GaaS games – https://deceptive.design/articles/designing-for-monetization-a-taxonomy-of-dark-patterns-in-top-grossing-gaas-video-games
- Frontiers, dark patterns and children – https://frontiersin.org/articles/10.3389/fdgth.2022.822933/full
- vzbv report on manipulative design in online games – https://www.vzbv.de/sites/default/files/2025-04/25-03-11_Additional_information_vzbv_manipulative_design_online-games.pdf

Privacy and safety
- ICO Age Appropriate Design Code – https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/childrens-information/childrens-code-guidance-and-resources/age-appropriate-design-a-code-of-practice-for-online-services
- ICO nudge techniques standard – https://ico.org.uk/for-organisations/guide-to-data-protection/ico-codes-of-practice/age-appropriate-design-a-code-of-practice-for-online-services/13-nudge-techniques
- Mishcon de Reya, ICO top tips for games designers – https://mishcon.com/news/ico-publishes-new-top-tips-for-games-designers
- Unity Analytics and COPPA – https://docs.unity3d.com/2020.2/Documentation/Manual/UnityAnalyticsCOPPA.html

Saves, performance and localization
- Microsoft GDK, Game saves best practices – https://learn.microsoft.com/en-us/gaming/gdk/docs/features/common/game-save/game-saves-best-practice
- Meta, save game best practices – https://developers.meta.com/horizon/documentation/unity/ps-save-game-best-practices/
- R3F docs, "Scaling performance" – https://r3f.docs.pmnd.rs/advanced/scaling-performance
- Utsubo, "100 Three.js Tips That Actually Improve Performance" – https://www.utsubo.com/blog/threejs-best-practices-100-tips
- three.js forum, Draco + KTX2 compression example – https://discourse.threejs.org/t/compression-draco-ktx2-example/31382
- Needle, glTF progressive loading – https://engine.needle.tools/docs/gltf-progressive/
- Game Developer, "How to Prepare a Game for Localization: 10 Basic Rules" – https://www.gamedeveloper.com/business/how-to-prepare-a-game-for-localization-10-basic-rules
- Translated, Game Localization developer guide – https://translated.com/resources/game-localization-developer-guide

Photo mode
- Epic Games Store, "How to master the art of in-game photography" – https://store.epicgames.com/news/how-to-master-the-art-of-in-game-photography
- TechRadar, "Best video game photo modes" – https://techradar.com/best/best-video-game-photo-modes-capture-the-perfect-in-game-picture

Caveats
- Several GDC Vault pages are members-only. Talk content was taken from public summaries and slides, not the recordings.
- Numeric thresholds (draw-call budgets, DPR cap, text-expansion percentages, flash frequency) are common industry rules of thumb from the sources above. Verify them against your own target devices.
- No full camera, accessibility, TLOU2 or APX lists could be fetched (WebFetch was blocked, see the note at the top). If you need a strict item-by-item GAG/XAG compliance check, open those sites directly or allow their hosts in this session.```
