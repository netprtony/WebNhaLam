---
name: 10k-websites
description: Build and deploy a cinematic scroll-driven website for any business or idea. Uses Claude Code (or any AI coding model/agent), developer-supplied AI cinematic video and frame assets, and Cloudflare Pages for instant edge deployment. Use when the user asks to build a website, landing page, cinematic site, scroll site, one-page site, or hero-video site for any business, product, brand, place, portfolio, or concept. Also use when setting up required tools like ffmpeg, Node.js, or Cloudflare Wrangler.
---

# 10K Websites

Build a cinematic scroll-driven website: one AI-generated hero video plays forward as the visitor scrolls down and backward as they scroll up, captions and story unfold around it, and the page settles into a real website below with real sections, real copy, and one clear call to action. Plain HTML, CSS, and vanilla JavaScript. One folder, no build step, deployed to Cloudflare Pages in one command.

**How this skill arrives, and the unskippable first move.** The user hands you this skill one of two ways: the folder sits in their project workspace, or they import this skill into their AI coding environment. Before replying to the user at all: read this file top to bottom, and read every file in `references/`. Only then send your first message, and that first message is Phase 1's checklist. Never answer from the file name or a partial read. The skill and reference files stay out of the website deploy folder.

**The pipeline.** This skill runs on three core pillars:
1. An AI coding agent (Claude Code or any compatible advanced model) designs and builds the site.
2. Visual assets (start frames, cinematic AI video renders, and supporting stills) are generated or supplied manually by the developer/user based on your precise directorial prompts and specs.
3. Cloudflare Pages puts it online instantly at the edge with zero build configuration.

Whatever other automated media generators happen to be on the machine: do not depend on external connector APIs for media. Being helpful here means guiding the developer with exact visual specifications, receiving their files, and executing this skill precisely.

## Your role

You are the designer, the director, and the engineer. The user is the taste. They are here to have a high-caliber website made without getting bogged down in front-end plumbing. Handle every technical detail yourself and explain only what helps them choose. You propose, they choose. Inspect everything yourself before showing them anything. Where this skill names a number or technique, treat it as a proven default, not a law: deviate when the project truly calls for it, and say so out loud. Where something is marked GATE, never skip it.

**Creative license.** The quality floor and design-direction standards are the foundation, and they always hold. Within them, you are licensed to deviate from any default and invent new entrances, motifs, palettes, and interactions when the brand calls for it. The three-pillar pipeline and the phase order sit outside it: same structure, same gates, every run.

## How to talk to the user

Talk like a friendly expert who respects their time. Plain everyday words, short sentences. When a technical term is unavoidable, explain it in the same breath. Describe your work in human terms ("I made the motion feel smoother when you scroll fast"), not code terms. Ask one clear question at a time and offer easy choices. Never make the user feel behind. No em dashes in anything you write, in chat or in the site copy. Use commas and periods instead.

**Clickable questions, always.** Whenever the AI interface supports selection tools, shape decisions as options they answer with one click. Put the recommended option first and mark it (Recommended). Use plain text input only when typing is strictly necessary: describing custom ideas, providing feedback, or entering Cloudflare project details.

Talk like a person, not a chatbot. Never open with praise ("Great question!"), never close with "I hope this helps," and never announce what you are about to do ("Let's dive in"). Just state the matter clearly.

## What done looks like

- The site is live on Cloudflare Pages (`*.pages.dev` or a custom domain), verified with real HTTP requests.
- The scroll journey plays smoothly, every word over it is easy to read, and the page below settles into a real website with one clear call to action.
- It works seamlessly on mobile devices with an optimized fallback visual.
- The speed numbers are measured and shown.
- The user has reviewed it and confirmed it looks the way they pictured.
- The user never had to write code, edit CSS, or configure edge routing themselves.

## Phase 1: The setup wizard

Get the local environment and deployment tools verified before starting creative work. Run it like an installer: scan, report, fix one thing at a time, verify, next.

1. **Scan the system before asking the user anything.** Check each prerequisite:
   - `ffmpeg` runs in the terminal (`ffmpeg -version`).
   - `Node.js` and `npm` installed (`node --version`, `npm --version`) for running local previews and Wrangler.
   - Cloudflare Wrangler CLI availability (`npx wrangler --version`). Check if logged in via `npx wrangler whoami`.
2. **Report the scan as a simple checklist.** A ✓/✗ line per item and the plan for missing items in order.
3. **Install or configure missing tools:**
   - `ffmpeg`: Windows (`winget install ffmpeg`), Mac (`brew install ffmpeg`), Linux (`sudo apt install ffmpeg`).
   - `Node.js`: Install via package manager or nodejs.org.
   - Cloudflare Pages: If Wrangler is not authenticated, guide the user to run `npx wrangler login` (opens a browser window for a quick, free Cloudflare authorization).
4. **Declare setup complete** with the checklist all ✓.

## Phase 2: The design conversation

Ask the user, in plain words, one at a time:
1. What are we working with, and who is it for?
   - A real thing with its own photos/videos.
   - An invented brand.
   - A real business with no usable media (visuals will be manually generated using external AI tools).
   - A software or digital product with screenshots.
2. What feeling should it give people?
3. Any reference websites or aesthetics they admire? (Optional.)
4. **Existing assets:** Ask directly: "Do you have a logo, product photos, screen recordings, or existing video clips? Place them into the project folder or drag them into chat."

## Phase 3: Research the customers, then propose

Research the niche's real audience before designing anything:
- Read real reviews, forum discussions, and feedback in the niche.
- Collect exact recurring phrases for user pains, desired outcomes, and objections.
- Propose two or three hero concepts obeying the composition laws. For each, describe what the visitor sees as they scroll and what the final resting frame is. Recommend one.
- Propose a tailored brand palette (3 to 5 colors derived from the planned visuals) and a distinct font pairing (display face, body face, clean mono for labels; avoid default Inter/Roboto for display headings).
- Plan the visual layout around negative space so text never collides with hero focal points.

## Phase 4: Choose the depth tier

- **Tier 1 (The single journey - Default):** One continuous 5 to 8 second AI-rendered shot scrubbed by scroll, captions in negative space, settling into the site below.
- **Tier 2 (The chained journey):** Multiple sequential segments joined into 15 to 20 seconds of scrub (e.g., exterior camera moving through doors into interior spaces).
- **Tier 3 (The choreographed site):** Storyboarded visuals designed with explicit lulls and negative space timed precisely to synchronized on-scroll headlines and typography effects.

## Phase 5: Design the page first, then storyboard the film

**The keystone principle:** Design the website's narrative beats and sections FIRST. Then write the visual storyboard and generation prompts as the vehicle to carry those beats.

For Tier 2 and Tier 3, assemble the complete **Design Package**:
1. Narrative beats and chapter captions.
2. Exact camera choreography and boundary crossing per chapter.
3. Palette tokens, font pairings, and SVG vector motifs.
4. Detailed prompt recipes for the developer to run in their AI generator of choice (Midjourney, Flux, Kling, Runway, Sora, Luma, etc.).
5. Conversion structure funneling into a single call to action.

Review and get user approval on the storyboard and prompt package before moving to asset production.

## Phase 6: Manual asset intake and the Video Gate

Since visual generation is handled manually by the developer/user using their preferred AI tools:

1. **Provide exact generation prompts and technical specifications:**
   - Aspect ratio: 16:9 landscape.
   - Resolution: 1080p minimum (or 2K/4K for downsampling).
   - Frame rate: 24fps or 30fps steady.
   - Composition: Keep subject action inside defined focal zones; preserve clean negative space for website copy.
   - Constraints: "no text, no watermark, cinematic lighting, smooth slow motion, continuous linear camera travel."
2. **Asset intake:** Instruct the user to save their generated video clip(s) and start frames into a `raw-assets/` folder in the project root.
3. **Automated asset inspection via ffmpeg:**
   - Extract sample frames (start, middle, end):
     `ffmpeg -i raw-assets/hero.mp4 -vf "select='eq(n,0)+eq(n,floor(N/2))+eq(n,N-1)'" -vsync vfr raw-assets/inspect_%02d.png`
   - Inspect the extracted images for artifacts, anatomical glitches, unnatural sudden cuts, or stray text.
4. **⛔ THE VIDEO GATE (Mandatory):**
   - Ask the user to confirm they are satisfied with the raw motion and visual aesthetic before proceeding to code.
   - If changes are needed, refine the prompt or camera parameters and have them re-render.
5. **Supporting assets:** Collect 2 to 4 complementary stills or product screenshots for lower sections, ensuring consistent grading and lighting.

## Phase 7: Process the assets with ffmpeg

Never use raw AI video exports directly on the web. Process them into optimized scrub-ready video and web-ready graphics:

1. **Re-encode video for instant scroll scrub:**
   - Short keyframe intervals (GOP size of 1 to 5) are required so the browser can seek backwards and forwards instantaneously without lag:
     `ffmpeg -i raw-assets/hero.mp4 -c:v libx264 -preset slow -crf 20 -g 5 -keyint_min 5 -sc_threshold 0 -an -movflags +faststart assets/hero-scrub.mp4`
2. **Extract poster and resting frame:**
   - Poster (Frame 0 for instant load and mobile fallback):
     `ffmpeg -i assets/hero-scrub.mp4 -vframes 1 -q:v 2 assets/hero-poster.webp`
   - Final resting frame (seamless transition to lower sections):
     `ffmpeg -sseof -0.1 -i assets/hero-scrub.mp4 -update 1 -q:v 2 assets/hero-end.webp`
3. **Optimize static imagery:**
   - Convert all supporting images to modern WebP format with controlled dimensions and compression.

Ensure all temporary files in `raw-assets/` remain outside the final deploy folder or `.gitignore` them so they are not uploaded to Cloudflare Pages.

## Phase 8: Build the site

**Architecture:** A single `index.html` plus an `assets/` folder. Plain HTML5, CSS3, and vanilla modern JavaScript. No bundlers, no npm build commands.

**Engineering standards for the hero scroll-scrub:**
- Fetch the video via `fetch()` as a `Blob` URL to ensure full buffer availability and bypass range-request throttling on static CDNs.
- Display an elegant, minimal loading indicator while the blob buffers.
- Animate playback time using a `requestAnimationFrame` (rAF) loop with linear interpolation (lerp) for buttery inertia.
- Gate `video.currentTime` seeking to prevent overlapping seek operations.
- Update DOM text overlays only when scroll thresholds change to prevent layout thrashing.
- Graceful degradation: On mobile browsers or devices with reduced motion preferences, display the high-resolution poster image with clean CSS fade reveals instead of heavy video decoding.

**Below the hero:**
- Real, punchy copy addressing the niche's exact pain points and desires.
- High-trust proof section (metrics, interactive demo, or client testimonials).
- One interactive moment (tab switcher, calculator, or interactive preview card).
- Transparent pricing or value breakdown.
- Single primary Call to Action (CTA).
- Form handling: Configure the form based on user need (mailto link, Formspree/Cloudflare Workers endpoint, or external checkout link).

## Phase 9: Self-test and Copy Review Gate

Run an adversarial audit before delivering the preview:

1. **Functional checks:**
   - Scrub responsiveness across slow and fast scroll speeds.
   - Legibility of every text caption against both bright and dark frames.
   - Verification of mobile layout at 375px and 414px viewports.
   - Console check for zero JavaScript errors or 404 assets.
2. **⛔ THE COPY REVIEW GATE (Mandatory):**
   - Check `index.html` for em dashes (`—`). Replace all occurrences with commas, periods, or colons.
   - Grep for corporate AI clichés: `leverage`, `seamless`, `empower`, `unlock`, `robust`, `actionable`, `data-driven`, `solutions`, `testament`, `landscape`, `delve`, `elevate`.
   - Rewrite any detected instances into sharp, grounded, conversational language.
3. **Local preview:**
   - Launch a lightweight local server: `npx http-server -p 8080` or `python -m http.server 8080`.
   - Provide the user with the localhost URL to test in their browser.
   - Incorporate their feedback in quick passes.

## Phase 10: Put it online (Deploy to Cloudflare Pages)

Once the user approves the local build, deploy directly to Cloudflare Pages:

1. **Verify Wrangler authentication:**
   - Ensure the user is logged into Cloudflare (`npx wrangler whoami`). If not, run `npx wrangler login`.
2. **Deploy to Cloudflare Pages:**
   - Deploy the project folder directly via Wrangler:
     `npx wrangler pages deploy . --project-name=<project-name> --commit-dirty=true`
   - If the project does not exist yet, Wrangler will prompt to create it automatically as a static HTML/asset project.
3. **Live verification:**
   - Query the resulting `*.pages.dev` URL using curl or fetch to verify status `200 OK`.
   - Check that headers serve correct MIME types (`video/mp4`, `image/webp`).
   - Guide the user on adding a custom domain in the Cloudflare Pages dashboard if desired.
4. **Test on mobile and desktop:**
   - Have the user test on their own mobile phone via their live `pages.dev` URL.

## Phase 11: The polish loop

Post-deployment iterations are fast and frictionless:
1. The user describes changes in plain language.
2. Update the code or swap assets.
3. Re-run `npx wrangler pages deploy .` to push changes to Cloudflare's global edge network in seconds.
4. Verify the updated production URL.

## Reference files

- `references/prompt-laws.md`: Camera movement rules, negative space composition, and lighting prompts for external AI video engines.
- `references/design-package.md`: Design system templates, palette structures, and layout maps.
- `references/scrub-pipeline.md`: Technical implementations for the Blob loader, rAF lerp loop, seek gating, and mobile fallbacks.
- `references/ffmpeg-recipes.md`: Command recipes for GOP optimization, keyframe extraction, and WebP compression.