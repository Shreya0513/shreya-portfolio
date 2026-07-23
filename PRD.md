# Shreya Chauhan Portfolio — Product Requirements Document

Status: **v2 direction, in progress**. This PRD supersedes the informal phase-plan used to build the current v1 (Hero/Dock/CommandSearch/cursor-canvas already in the codebase). It exists so any engineer or coding agent — human or Claude — can pick this up without re-deriving intent from chat history.

---

## 1. Reference material status

Three reference screenshots exist in the repo:
- `public/Screenshot 2026-07-18 at 8.49.02 PM.png` — hero/landing composition
- `public/Screenshot 2026-07-18 at 10.49.37 PM.png` — close-up of the background marbling effect only (not a new section)
- `public/Screenshot 2026-07-18 at 10.53.33 PM.png` — the **"Me" tab view**, and confirmed by the user to define the interaction pattern for **every** tab, not just Me

This third screenshot is architecturally decisive — see §4, which replaces the original scrolling-canvas IA entirely.

**Background effect, corrected description from the close-up reference:** this is a **swirling marbling / ink-flow effect** — translucent ribbon-like streams of color (pink, mint-green, yellow, blue) that twist, taper, and blend with vortex-like distortion across a large diagonal swath of the viewport. It reads as directional fluid flow, not a field of soft round blobs. This is meaningfully different from the current implementation (`src/components/effects/CursorLiquidLight.tsx`), which composites overlapping radial-gradient circles. Matching this reference properly requires either: (a) a curl-noise-driven particle/ribbon system in Canvas2D (draw many thin translucent strokes along a noise-based flow field, closer to true marbling), or (b) accepting a looser approximation with the current blob system tuned toward larger, more elongated, more overlapping shapes. Option (a) is a real visual upgrade but nontrivial; recommend prototyping it as its own reviewable step rather than bundling into a larger section pass.

## 2. Product vision

This is not a portfolio site. It is a small interactive software product that happens to contain Shreya Chauhan's professional information. The bar: a visitor's first reaction should be "who built this," not "nice portfolio." Every section should read as a deliberate product surface — an AI-feeling assistant, a set of interactive cards, a live theme editor — not a scroll of static content blocks.

Non-negotiables carried over from the original brief and already agreed with the user:
- The "Ask me anything" bar is **not a real LLM call**. It is a scripted intent-matcher over authored Q&A content, rendered with a typing animation, that scrolls to and highlights the relevant section. This must keep feeling like a real assistant even though it's fully static and client-side.
- No traditional top navbar. Navigation is either the quick-nav card grid under the hero search bar (per the reference image) and/or a minimal persistent affordance once scrolled — see open question in §4.
- Cursor/background effect is a soft, restrained multi-color ("VIBGYOR" in the user's words, but tuned toward watercolor/ink-in-milk, not neon rainbow) wash that reacts to pointer movement, implemented in Canvas2D — not WebGL, not a literal CSS gradient.

## 3. Design bible (extracted from the confirmed reference image)

Observed directly from the screenshot:
- **Background**: near-white canvas with a swirling marbling/ink-flow effect — translucent ribbon-like streams of pink, mint-green, yellow, and blue that twist and taper with vortex-like distortion across a large diagonal portion of the viewport (confirmed via close-up reference, §1). Not round blobs, not a tight cursor trail — directional fluid flow, very soft edges, never saturated.
- **Avatar**: large (~280px), friendly, illustrated/Memoji-style character face, centered, floating above the fold with generous whitespace around it, positioned above the greeting text.
- **Greeting typography**: two-tier — a small, casual line ("Hey, I'm [Name] 👋") directly above a very large, bold single-line role/title ("AI Engineer" equivalent). No paragraph of body copy competes with it at this stage.
- **Ask bar**: full-width-but-constrained (~700px max), tall rounded-full pill, soft shadow, placeholder "Ask me anything…", circular accent-colored submit button docked inside the right edge.
- **Quick-nav**: a row of 5 equal-width **rounded-square cards** (not a pill dock) directly beneath the ask bar — each with an emoji/icon on top and a label below (Me, Projects, Skills, Fun, Contact). This is a materially different pattern from a floating bottom dock — it's inline, part of the hero composition, always-visible-on-load rather than scroll-tracking.
- **Top-left chrome**: a small pill badge ("Build your AI portfolio →") — this is template-vendor branding in the reference, **not to be copied**; it signals "this whole page is admittedly a template" which is the opposite of what we want. Omit entirely.

## 4. Information architecture — CORRECTED: app shell + tab switching, NOT a scrolling page

**This is the single most important architectural decision in this document. The current codebase (single scrolling page with anchor-linked sections, built in earlier sessions) does not match the product the user wants and must be restructured.**

Confirmed from the third reference screenshot: the product is a **persistent app shell** around a **swappable content pane**. There is no page-level scroll between sections. Concretely:

- **Fixed/persistent chrome, present on every tab:** small avatar (top-center, shrinks/relocates once a tab is active — in the reference it moves to a small icon top-center once inside a tab, vs. large and centered on the hero/"Me" landing state), the "Ask me anything" input, the 5 nav cards (Me / Projects / Skills / Fun / Contact) directly above the input, and a "quick questions" affordance (collapsible chip row, "Hide quick questions" toggle in the reference) — these never leave the screen and never scroll away.
- **Swappable content pane:** clicking a nav card does not scroll the page — it replaces the content area *above* the fixed input/dock with that tab's view, likely with a crossfade/slide transition (motion detail TBD, not yet confirmed by reference). The "Me" tab's content pane shows: photo, name, age, location, a short greeting blurb, tag chips, then a longer narrative paragraph below.
- **Internal scroll is fine; page-level scroll between sections is not.** If a tab's content is taller than the available space above the fixed dock, that content pane itself may scroll internally — the dock and input never move. This is different from "no scrolling anywhere"; it's "no scrolling *between* Me/Projects/Skills/Fun/Contact."
- **This replaces `id`-anchored sections and `scrollToWithHighlight` entirely.** The current `useActiveSection` (IntersectionObserver-based active-tab tracking) and `scrollToWithHighlight` (smooth-scroll-to-anchor) utilities are built for a scrolling page and are no longer the right mechanism — tab state becomes a plain `activeTab` value (React state, or a query param — see open question below), and the CommandSearch's "navigate to a section" behavior becomes "switch active tab" instead of "scroll to anchor."
- **Effort note:** this is a rearchitecture of the app shell, not a copy-editing pass. `app/page.tsx`, `Hero.tsx`, `Dock.tsx`, `CommandSearch.tsx`, and `scrollHighlight.ts` all need to change. Existing section components (`About`, `Experience`, `Projects`, `Skills`, `Education`, `Contact`) can likely be reused as the *content* rendered inside each tab's pane, but their outer wrapper (`<section id="..." className="py-24 md:py-32">` etc., sized for a long page) needs to become a tab-pane-sized wrapper instead.

**Open question — do not implement until answered:** does switching tabs update the URL (e.g. `/?tab=projects` or `/projects` route) so a tab is linkable/shareable/back-button-able, or is it purely client-side state with no URL reflection (matching the reference, which shows no visible URL change)? Recommendation: reflect it in the URL via a query param at minimum, for shareability and SEO, without a full route change — but confirm before building since it affects whether this stays a single Next.js page or becomes a parallel-routes/intercepting-routes setup.

## 5. Section specs

### 5.1 Hero / landing state (confirmed against reference)
This is the shell's default/empty state — no tab selected yet.
- Replace current initials-avatar with a friendlier illustrated avatar (illustration/Memoji-style asset — needs to be sourced or commissioned; placeholder should visibly read as "temporary" until then, e.g. a soft gradient blob with a simple smiling face, not another initials circle). Large (~280px) and centered in this landing state.
- Two-tier greeting: "Hey, I'm Shreya 👋" (small, regular weight) + "Software Engineer" or similar single large bold line
- Ask bar + 5 nav cards, per §4, positioned low on screen (not scroll-revealed — always present)
- Background wash per §3
- Resume/GitHub/LinkedIn links: not part of this landing state per the reference (it shows none) — these likely belong inside the Me tab or Contact tab instead. Confirm placement when Me/Contact are built.

### 5.2 Me tab (confirmed against reference, §1 third screenshot)
Once "Me" is clicked, the avatar shrinks/relocates to a small top-center icon, and the content pane shows, top to bottom: a profile card (photo, full name, age, location, a short "Hey 👋 I'm..." greeting blurb, tag chips like "AI", "Developer", "Sport"), then a longer narrative paragraph below the card. The existing `Experience`/`About` values-and-timeline content from the current build likely belongs *within* this tab's scrollable content pane (below the narrative paragraph, per the "internal scroll is fine" rule in §4) rather than as a separate top-level tab — Experience was never named as its own nav card in any reference. Photo: same open question as the Hero avatar — needs a real asset or a designed placeholder, not a stock photo (the reference's photo is the *template's own* creator, not something to copy).

### 5.3 Projects tab `[pattern confirmed = tab-pane per §4; visual treatment within the pane still INFERRED]`
Assume, consistent with the original detailed brief (still valid): large image-dominant cards, huge rounded corners, minimal text on the card face, hover = lift + image zoom + shadow growth. Click opens an immersive case-study view (`Dialog` component already exists in the kit) containing Problem / Solution / Architecture / Tech Stack / Challenges / Learnings / Future Improvements / GitHub / Live links — matches the existing `ProjectCaseStudy` type, no data-model change needed. RoundLens stays placeholder content until the user supplies real details. This card grid renders inside the Projects tab's content pane, per §4 — not as a scrollable page section.

### 5.4 Skills tab `[pattern confirmed = tab-pane per §4; visual treatment within the pane still INFERRED]`
Assume, consistent with the original brief: each skill is its own clickable unit (not a static badge), opening a detail panel with experience blurb, related projects, sample snippet, strength indicator, related technologies. The data model (`SkillDetail`, `skillDetails.ts`) already exists for 5 flagship skills — wiring the click-to-detail interaction is the remaining work. Renders inside the Skills tab's content pane.

### 5.5 Fun tab `[pattern confirmed = tab-pane per §4; content still undecided]`
Not yet built in any form. User wants "some cool game kinda thing." Needs a concrete decision before implementation — see open question below. Must stay polished, not gimmicky.

### 5.6 Contact tab `[pattern confirmed = tab-pane per §4; visual treatment "same kind of theme" as Hero/Me]`
Interpreted as: same soft-wash background, large friendly typography, minimal form/CTA, matching the hero's visual language. Current `Contact` section's content (large CTA, email button, social row) is likely close — renders inside the Contact tab's content pane.

## 6. AI "Ask me anything" — behavior change required for the tab-shell model

Current implementation (`src/components/ui/command-search/`, `src/lib/intentMatcher.ts`, `src/content/qa.ts`) does: keyword/fuzzy match against authored Q&A entries → typing-animation response → **auto-scroll-to-section** with a highlight pulse. The matching/typing-animation mechanism is reusable as-is and satisfies the "feels like AI, isn't AI" requirement. The **navigation side-effect must change**: instead of scrolling to an anchor, a matched `QAEntry.targetSection` should **switch `activeTab`** to the corresponding tab (e.g. asking about projects sets `activeTab = "projects"`, swapping the content pane, rather than calling `scrollToWithHighlight`). The typed response can still render inline in the landing state before the tab switches, same as today — only the "where does it navigate to" mechanism changes, per §4.

## 7. UI Kit + Theme Studio — architecture (see §8 below for a plain-language explanation)

The codebase already has the prerequisite layer for this: every color, spacing, radius, shadow, and font value is a CSS custom property in `src/styles/tokens.css`, consumed exclusively through `var(--token-name)` — components never hardcode a literal value. This is what makes runtime theming possible without a rebuild.

**Theme Studio** (not yet built — deferred from the original plan, now the signature feature per the user's evolving brief):
- A `ThemeProvider` React Context wrapping the app, holding the current token overrides in state
- A settings panel UI (likely a `Dialog` or slide-over, opened from the Dock) exposing controls for: accent color (color picker → sets `--accent-indigo`/`--accent-violet`/`--accent-cyan`), radius scale (slider → sets `--radius-md` etc. as a multiplier), spacing density (compact/comfortable/spacious preset → adjusts `--space-*` scale), glass intensity (slider → `--glass-blur`/`--glass-bg` alpha), cursor/background intensity (slider → the alpha values in `CursorLiquidLight.tsx`), shadow strength, animation speed (multiplier applied to `--duration-*` tokens)
- On change, the panel writes directly to `document.documentElement.style.setProperty('--token-name', value)` — this updates every component instantly with no re-render of React state needed, because Tailwind utilities already resolve through these CSS variables
- Persist the override set to `localStorage` so it survives reload
- "Copy theme JSON" action serializes the current override map to the clipboard

## 8. Plain-language explanation: how the UI kit + dynamic theming actually works here

You asked specifically how to build this — here's the mechanism, in order:

1. **Every visual property is a variable, not a value.** Instead of a Button component saying `background: #4F46E5`, it says `background: var(--color-accent)`, and `--color-accent` is defined once in `tokens.css`. This is already true throughout the current codebase.
2. **Tailwind reads the same variables.** Using Tailwind v4's `@theme inline` block, utility classes like `bg-accent` or `rounded-lg` are configured to resolve to those same CSS variables rather than fixed values — so both hand-written CSS and Tailwind utilities stay in sync automatically.
3. **Changing a variable at runtime re-themes everything.** Because CSS custom properties are live — the browser re-paints any element using `var(--x)` the instant `--x` changes — a single line of JavaScript (`document.documentElement.style.setProperty('--color-accent', '#ff0000')`) reskins every button, badge, link, and gradient on the page simultaneously, with zero component code changes and no page reload.
4. **The Theme Studio panel is just a form bound to that mechanism.** Each control (color picker, slider, toggle) calls that same `setProperty` function on change. There's no complex state management needed — the CSS variable *is* the state, and `localStorage.setItem` on each change is what makes it persist.
5. **The "UI Kit" itself is the existing `src/components/ui/` directory** — Button, Card, Badge, Dock, CommandSearch, Dialog, Tabs, Accordion, Tooltip, Avatar, etc. It already follows this rule (no hardcoded colors, `cva` for variants). Building the Theme Studio doesn't require touching these components again — it requires only the token layer + the settings panel, because the components were already built correctly against tokens from day one.

## 9. Open questions requiring user input before further implementation

**Resolved:**
- Experience folds into the Me tab's content pane (scrollable, below the profile card and narrative paragraph) — no separate 6th nav card.
- Tab state reflects in the URL via a query param (e.g. `?tab=projects`), kept in sync with `activeTab`, so tabs are shareable/refresh-safe.
- Resume/GitHub/LinkedIn links live inside the Me tab (profile card area) and are repeated in the Contact tab — not in the hero landing state, not as persistent shell chrome.

**Still open:**
1. Confirm intended visuals *within* each tab pane for Projects, Skills, Fun, Contact — the tab-switching *pattern* is now confirmed (§4), but the detailed visual layout inside each pane beyond Me is still text-brief-only.
2. Fun tab: pick a concrete game/interaction (options from the original brief: memory game, typing race, "guess the API," mini terminal) — needs one confirmed choice to scope the build.
3. Avatar/photo: is a real photo/illustration coming, or should a designed placeholder (non-initials) be built now? Applies to both the large hero avatar and the Me tab's profile photo.
4. Theme Studio scope for v1: full token surface (color/radius/spacing/glass/cursor/shadow/motion) or a smaller starting set shipped first and expanded later?

## 10. Non-goals (updated)

No real backend/LLM call for the search bar. No WebGL shader (Canvas2D only). No true 3D avatar/react-three-fiber. **No page-level scrolling between Me/Projects/Skills/Fun/Contact** — this replaces the earlier "single continuous scrolling canvas" non-goal, which described the *previous, now-superseded* IA and should not be followed.
