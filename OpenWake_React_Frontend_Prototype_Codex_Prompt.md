# OpenWake Responsive React Frontend Prototype — Codex Build Plan

> **For agentic workers:** Build this plan task-by-task. Use test-driven development for state and interaction logic, verify every responsive breakpoint, and keep the result presentation-ready. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a polished, responsive OpenWake frontend prototype that can be presented tomorrow and deployed as a static site on Netlify.

**Architecture:** A client-only React single-page application uses a small state machine and deterministic mock telemetry to demonstrate placement guidance, face calibration, live monitoring, warning escalation, and future hardware compatibility. It does not request camera access, run facial analysis, contact a backend, or control hardware.

**Tech Stack:** React, TypeScript, Vite, plain CSS with design tokens, Lucide React icons, Recharts for lightweight charts, Vitest, React Testing Library, and Playwright for responsive smoke checks.

**Visual Reference:** `OpenWake_UI_Reference.png`. Use it for visual direction only: near-black surfaces, subtle borders, soft aqua highlights, compact technical typography, dense cards, and restrained glow. Do not copy its brand name, text, sample images, or exact layout.

**Deployment Target:** Netlify static hosting with `npm run build` and publish directory `dist`.

## Start Here: Prompt to Give Codex

Attach this Markdown and `OpenWake_UI_Reference.png`, then send Codex the following:

```text
Build the OpenWake responsive React frontend prototype from the attached implementation plan and visual reference.

Read the complete plan before editing. This is a presentation prototype for tomorrow, so prioritize a polished first viewport, a coherent demo flow, and responsive behavior over production functionality. Implement the tasks in order, run the specified checks, and keep all data deterministic and local.

Do not request camera, microphone, Bluetooth, location, or notification permissions. Do not add a backend, login, database, real facial recognition, real AI inference, or hardware control. The interface must always identify itself as Demo Mode and must never imply that it is safe for real driving.

Start with Task 1. Continue through all tasks unless blocked by a real error. At the end, run the full verification checklist and give me the local preview instructions plus the Netlify-ready build directory.
```

---

# Part I — Product Specification

## 1. Prototype Purpose

The prototype should let a presenter tell this story in approximately two minutes:

1. OpenWake starts in a clear demonstration dashboard.
2. The presenter begins a simulated driver setup.
3. The interface checks phone placement and face position.
4. A short anonymous calibration captures a simulated baseline.
5. Drive Mode displays changing eye and head-position telemetry.
6. The presenter triggers a warning and then a critical alert.
7. The interface shows how a future external wake accessory could connect, while clearly indicating that hardware control is disabled.

The result is a high-fidelity frontend demonstration, not a functional drowsiness detector.

## 2. Scope

### Build now

- Responsive React web interface.
- Dashboard with believable deterministic mock metrics.
- Simulated placement and face-calibration flow.
- Simulated live-monitoring view.
- Warning and critical alert demonstrations.
- Session event timeline and compact summary.
- Future hardware compatibility card in a disabled/simulated state.
- Local reset and replay controls.
- Netlify configuration and deployment documentation.

### Explicitly exclude

- Real camera access or recorded video.
- Face recognition, face identity, embeddings, or biometric storage.
- MediaPipe, TensorFlow, cloud AI, or local AI inference.
- Accounts, authentication, APIs, databases, analytics, or tracking.
- Real Bluetooth, ESP32, Raspberry Pi, pump, sprayer, or actuator commands.
- Background monitoring or claims of vehicle safety certification.
- A fake login page, marketing landing page, pricing, or unrelated product sections.

## 3. Demo Mode Disclosure

Display a persistent but unobtrusive badge reading `Interactive prototype · Simulated data` in the top bar. The footer or information panel must include:

> OpenWake is a presentation prototype. It does not detect real fatigue and must not be used while driving.

Never label simulated values as real camera results.

## 4. Information Architecture

Use a single-page application with view state rather than route navigation. The primary views are:

- `overview` — presentation dashboard and entry point.
- `calibration` — placement and anonymous baseline simulation.
- `drive` — simulated live-monitoring interface.
- `summary` — completed demonstration session.

Use a desktop sidebar at widths of `1024px` and above. Use a compact top bar plus bottom navigation below `1024px`. On phones, prioritize the status, central camera visualization, alert controls, and essential metrics.

## 5. Core Demo Journey

### 5.1 Overview

The initial view must be useful immediately, with no onboarding wall. Show:

- OpenWake wordmark and compact shield/eye motif.
- `Prototype online` system state.
- Primary call to action: `Start calibration`.
- Last simulated session: `24 min`, `3 warnings`, `0 critical events`.
- Four key cards: readiness, fatigue index, camera quality, and accessory state.
- A 60-second signal chart using deterministic data.
- Recent-event list with three sample events.
- `Replay demo` control that resets all state.

### 5.2 Placement and Calibration

Use one full-width workspace with a central simulated camera viewport. The viewport contains:

- A subtle grid and vignette.
- An oval face guide.
- Small landmark dots around the eyes, nose, and mouth; these are decorative UI markers, not a real face scan.
- A status chip that changes from `Searching` to `Face aligned`.
- Placement checks: face centered, camera angle, lighting, eyes visible, and distance.

The calibration sequence has three stages:

1. `Position` — presenter clicks `Run placement check`.
2. `Baseline` — progress animates from 0 to 100 percent in about four seconds.
3. `Ready` — show a compact baseline result and enable `Enter Drive Mode`.

Include `Skip to ready` for reliable live presentations. This must produce exactly the same ready state every time.

### 5.3 Drive Mode

Drive Mode is the presentation centerpiece. It should resemble an instrument panel, not a generic admin template.

Show:

- Large simulated camera viewport with face outline and landmark overlay.
- Dominant state label: `ATTENTIVE`, `CAUTION`, or `WAKE NOW`.
- Fatigue risk meter from 0–100.
- PERCLOS percentage.
- Blink rate per minute.
- Eye-closure duration.
- Head pose with pitch and yaw.
- Camera quality and mock frame rate.
- Session duration.
- Scrolling event timeline capped to the latest six events.

Presentation controls:

- `Normal` restores the attentive state.
- `Simulate warning` changes values into a caution state.
- `Simulate critical` opens the critical alert overlay.
- `End session` opens the summary view.

Place presentation controls in a clearly labeled `Demo controls` area so no one mistakes them for real detection controls.

### 5.4 Alert Demonstration

The warning state uses amber, a contained pulse, and the message `Possible fatigue pattern`. It must not block the entire interface.

The critical state uses red-orange, a stronger but restrained pulse, and a high-contrast overlay containing:

- `WAKE NOW`
- `Prolonged eye closure simulated`
- `Acknowledge alert`
- A visual vibration indicator.
- A sound icon and `Demo tone` label. Sound is optional and can play only after a deliberate user click; the prototype must remain complete without audio.

Acknowledgement returns to the caution state and logs the event.

### 5.5 Summary

Show a presentation-friendly session summary:

- Session duration.
- Average fatigue index.
- Warning count.
- Critical count.
- Longest simulated eye closure.
- Signal-quality percentage.
- A small risk-over-time chart.
- Chronological event list.
- `Replay demo` and `Return to overview` buttons.

### 5.6 Future Hardware Panel

Show this as a small engineering-readiness panel, not a working control surface:

- Heading: `Future wake accessory`.
- State: `Simulator only · Hardware disconnected`.
- Planned link: `Bluetooth Low Energy`.
- Planned safeguards: paired device, authenticated commands, cooldown, manual arm, and physical disable switch.
- One disabled button: `Physical output unavailable in prototype`.

Do not include a button that appears capable of spraying water or activating any physical device.

## 6. Visual Design Direction

### 6.1 Design thesis

Create a dark technical cockpit that feels calm, credible, and premium. It should borrow the reference image’s layered charcoal surfaces, thin borders, compact metrics, and aqua emphasis without copying its content.

Avoid a generic SaaS dashboard. The focal point is the driver state and simulated camera viewport.

### 6.2 Design tokens

Use CSS custom properties with these starting values:

```css
:root {
  color-scheme: dark;
  --bg: #070909;
  --surface-1: #0d1010;
  --surface-2: #121616;
  --surface-3: #171c1c;
  --border: rgba(255, 255, 255, 0.09);
  --border-strong: rgba(255, 255, 255, 0.16);
  --text: #f4f7f6;
  --text-muted: #8e9996;
  --aqua: #77f0dd;
  --aqua-strong: #1fd7bd;
  --amber: #ffb45b;
  --danger: #ff664c;
  --success: #80e6ad;
  --radius-sm: 12px;
  --radius-md: 18px;
  --radius-lg: 26px;
  --shadow-soft: 0 20px 60px rgba(0, 0, 0, 0.34);
}
```

Use a local system font stack: `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`. Do not depend on a remote font request.

### 6.3 Styling rules

- Use aqua for active controls, selected navigation, focus rings, and healthy status.
- Use amber only for caution and red-orange only for critical alerts.
- Use glow on no more than one or two focal elements per viewport.
- Use 1px borders and subtle inner highlights to separate dark surfaces.
- Do not use excessive gradients, glassmorphism, neon text, or large blurred blobs.
- Use Lucide icons instead of manually drawn interface icons.
- Use uppercase labels only for short statuses, never for paragraphs.
- Use tabular numerals for telemetry.
- Keep animation duration between 160–350ms except for the calibration progress and alert pulse.
- Honor `prefers-reduced-motion` by removing looping motion and instant-completing calibration transitions.

## 7. Responsive Requirements

### Wide desktop: `1280px` and above

- Fixed sidebar around 220px.
- Top bar spans the content area.
- Dashboard uses a 12-column grid.
- Simulated camera viewport occupies at least half of Drive Mode width.
- Metrics appear in a two-column rail.

### Tablet/small laptop: `768px–1279px`

- Sidebar collapses below `1024px`.
- Use a compact header and bottom navigation.
- Dashboard cards use two columns.
- Drive Mode places the camera above a two-column metric grid.

### Phone: below `768px`

- One-column flow.
- Header title and demo badge remain visible.
- Bottom navigation has four large touch targets.
- Primary buttons are full width or at least 44px tall.
- Charts remain legible without horizontal page scrolling.
- Demo controls collapse into a clearly labeled drawer/card.
- Critical overlay fits a 360×640 viewport and can be acknowledged without scrolling.

### General

- Content width must remain usable at 320px.
- No clipped text at 200% browser zoom.
- No horizontal body overflow.
- Use `clamp()` for major heading and metric sizes.
- Preserve safe spacing around mobile browser chrome.

## 8. Mock Data and State Contract

Create these exact exported types:

```ts
export type AppView = 'overview' | 'calibration' | 'drive' | 'summary';
export type DriverState = 'attentive' | 'caution' | 'critical';
export type CalibrationStage = 'position' | 'baseline' | 'ready';
export type AccessoryState = 'simulator-only';

export interface TelemetrySample {
  timestampMs: number;
  fatigueRisk: number;
  perclos: number;
  blinkRate: number;
  closureMs: number;
  pitch: number;
  yaw: number;
  quality: number;
  fps: number;
}

export interface SessionEvent {
  id: string;
  timestampMs: number;
  severity: 'info' | 'warning' | 'critical';
  label: string;
}

export interface DemoState {
  view: AppView;
  driverState: DriverState;
  calibrationStage: CalibrationStage;
  calibrationProgress: number;
  elapsedMs: number;
  telemetry: TelemetrySample[];
  events: SessionEvent[];
  warningCount: number;
  criticalCount: number;
  accessoryState: AccessoryState;
}
```

Use a reducer with these exact actions:

```ts
export type DemoAction =
  | { type: 'START_CALIBRATION' }
  | { type: 'START_BASELINE' }
  | { type: 'SET_CALIBRATION_PROGRESS'; progress: number }
  | { type: 'COMPLETE_CALIBRATION' }
  | { type: 'ENTER_DRIVE_MODE' }
  | { type: 'TICK'; elapsedMs: number }
  | { type: 'SIMULATE_WARNING' }
  | { type: 'SIMULATE_CRITICAL' }
  | { type: 'ACKNOWLEDGE_ALERT' }
  | { type: 'RESTORE_NORMAL' }
  | { type: 'END_SESSION' }
  | { type: 'RESET_DEMO' };
```

Mock telemetry must be deterministic. Derive it from elapsed time and driver state; do not use `Math.random()`. Keep at most 60 chart samples and six visible events.

## 9. Accessibility Requirements

- Use semantic `header`, `nav`, `main`, `section`, and `button` elements.
- Give every icon-only button an accessible name.
- Ensure visible keyboard focus.
- All text and meaningful indicators must meet WCAG AA contrast.
- Never encode status using color alone; pair it with icon and text.
- Give changing driver status `aria-live="polite"`.
- Give the critical alert `role="alertdialog"`, label it, move focus into it, and return focus to the trigger after acknowledgement.
- Decorative telemetry visuals use `aria-hidden="true"`.
- Reduced-motion users receive static state changes without looping pulses.

## 10. Definition of Done

- The two-minute demo flow works reliably without network access after load.
- Every displayed measurement is visibly identified as simulated or presented inside Demo Mode.
- No permission prompt appears.
- No browser console errors occur.
- The app is visually coherent at 360×800, 768×1024, 1024×768, and 1440×900.
- Keyboard navigation can complete the whole demo.
- Reloading returns to the same predictable starting state.
- `npm test`, `npm run build`, and Playwright smoke tests pass.
- The `dist` directory is ready for Netlify.

---

# Part II — File Structure

Create the following focused structure:

```text
openwake-prototype/
├── index.html
├── package.json
├── package-lock.json
├── vite.config.ts
├── vitest.config.ts
├── playwright.config.ts
├── netlify.toml
├── README.md
├── public/
│   └── favicon.svg
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── styles/
│   │   ├── tokens.css
│   │   ├── global.css
│   │   └── animations.css
│   ├── demo/
│   │   ├── demoTypes.ts
│   │   ├── demoReducer.ts
│   │   ├── demoTelemetry.ts
│   │   └── demoReducer.test.ts
│   ├── components/
│   │   ├── AppShell.tsx
│   │   ├── Navigation.tsx
│   │   ├── StatusBadge.tsx
│   │   ├── MetricCard.tsx
│   │   ├── SignalChart.tsx
│   │   ├── CameraSimulator.tsx
│   │   ├── EventTimeline.tsx
│   │   ├── DemoControls.tsx
│   │   ├── CriticalAlert.tsx
│   │   └── FutureAccessoryCard.tsx
│   ├── views/
│   │   ├── OverviewView.tsx
│   │   ├── CalibrationView.tsx
│   │   ├── DriveView.tsx
│   │   └── SummaryView.tsx
│   └── test/
│       └── setup.ts
└── tests/
    └── responsive-demo.spec.ts
```

Responsibilities:

- `App.tsx` owns the reducer, timer lifecycle, and view selection.
- `demoReducer.ts` is pure and contains all state transitions.
- `demoTelemetry.ts` creates deterministic samples and summary values.
- Views compose components but do not own duplicate demo state.
- `CameraSimulator.tsx` renders the decorative face frame and quality states without using a camera.
- `CriticalAlert.tsx` owns accessible dialog focus behavior.
- CSS files own visual tokens, layout, and motion; avoid inline style objects except chart values that must be computed.

---

# Part III — Implementation Tasks

## Review Focus

- A presenter clicking quickly through calibration must still reach one valid ready state without duplicate timers.
- React Strict Mode must not create two active telemetry intervals.
- Repeated critical simulation must not add duplicate overlays or unbounded events.
- A 360px-wide screen must not overflow horizontally or hide the alert acknowledgement.
- Reduced-motion mode must eliminate infinite pulse animation and complete simulated progress safely.

### Task 1: Scaffold the static React application and foundation

**Files:**

- Create the project using Vite’s React TypeScript template.
- Create: `src/styles/tokens.css`
- Create: `src/styles/global.css`
- Create: `public/favicon.svg`
- Create: `netlify.toml`
- Modify: `index.html`
- Modify: `src/main.tsx`

**Produces:** A branded, empty OpenWake shell that builds to `dist` without warnings.

- [ ] Create the Vite React TypeScript project in an `openwake-prototype` directory.
- [ ] Install only `lucide-react`, `recharts`, `vitest`, `jsdom`, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`, and `@playwright/test` beyond the template dependencies.
- [ ] Enable React Strict Mode.
- [ ] Set the document title to `OpenWake · Interactive Prototype`.
- [ ] Add a description explaining that this is a simulated driver-awareness interface.
- [ ] Add the supplied design tokens and global reset.
- [ ] Create a simple aqua shield/eye favicon as an SVG asset.
- [ ] Add `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "dist"
```

- [ ] Run `npm run build` and fix every error.
- [ ] Commit with `chore: scaffold OpenWake frontend prototype`.

### Task 2: Implement deterministic demo state and tests

**Files:**

- Create: `src/demo/demoTypes.ts`
- Create: `src/demo/demoReducer.ts`
- Create: `src/demo/demoTelemetry.ts`
- Create: `src/demo/demoReducer.test.ts`
- Create: `src/test/setup.ts`
- Create: `vitest.config.ts`

**Consumes:** The exact state, action, telemetry, and event contracts in Part I.

**Produces:** `initialDemoState`, `demoReducer(state, action)`, `sampleForState(driverState, elapsedMs)`, and `summarizeSession(state)`.

- [ ] Write tests proving the initial view is `overview`, calibration completes deterministically, warning and critical counts increment exactly once per transition, acknowledgement returns to `caution`, reset restores the initial state, telemetry is identical for identical inputs, samples are capped at 60, and visible events are capped at six.
- [ ] Run the tests and confirm they fail because the reducer and telemetry helpers do not exist.
- [ ] Implement the smallest pure reducer and deterministic telemetry functions needed to pass.
- [ ] Use fixed formulas based on elapsed seconds, such as sine waves with state-specific baselines; never use `Math.random()`.
- [ ] Run `npm test -- --run` and confirm all tests pass under Strict Mode-compatible behavior.
- [ ] Commit with `feat: add deterministic prototype state`.

### Task 3: Build the responsive application shell

**Files:**

- Create: `src/components/AppShell.tsx`
- Create: `src/components/Navigation.tsx`
- Create: `src/components/StatusBadge.tsx`
- Modify: `src/App.tsx`
- Modify: `src/styles/global.css`

**Consumes:** `AppView` and the current demo state.

**Produces:** A responsive shell with desktop sidebar, compact top bar, mobile bottom navigation, main content region, and persistent prototype disclosure.

- [ ] Add the OpenWake wordmark, short navigation labels (`Overview`, `Calibration`, `Drive`, `Summary`), system-state chip, and prototype badge.
- [ ] Disable navigation into Drive and Summary until their states are available, while retaining readable disabled styling.
- [ ] Make the sidebar fixed only on wide screens; do not leave an empty sidebar gutter on smaller screens.
- [ ] Ensure every navigation target is a real button with an accessible current-state label.
- [ ] Add a concise footer disclaimer.
- [ ] Verify the shell at 360px, 768px, 1024px, and 1440px without horizontal overflow.
- [ ] Commit with `feat: build responsive prototype shell`.

### Task 4: Build overview cards and presentation dashboard

**Files:**

- Create: `src/components/MetricCard.tsx`
- Create: `src/components/SignalChart.tsx`
- Create: `src/components/EventTimeline.tsx`
- Create: `src/components/FutureAccessoryCard.tsx`
- Create: `src/views/OverviewView.tsx`
- Modify: `src/App.tsx`

**Consumes:** Initial telemetry, sample session events, and `START_CALIBRATION`.

**Produces:** A polished first viewport that visually establishes OpenWake within five seconds.

- [ ] Build a clear hero row with `Driver readiness`, a large `Ready for demonstration` state, and the `Start calibration` action.
- [ ] Add four compact metric cards with realistic sample values and explicit simulated-data context.
- [ ] Render a 60-second chart with aqua as the primary series and amber only for risk segments.
- [ ] Add a recent-events list and future accessory card.
- [ ] Make the first viewport information-dense without showing every available component above the fold.
- [ ] Confirm that no card uses filler text, lorem ipsum, copied labels from the reference, or meaningless percentages.
- [ ] Commit with `feat: create OpenWake overview dashboard`.

### Task 5: Build the simulated camera and calibration flow

**Files:**

- Create: `src/components/CameraSimulator.tsx`
- Create: `src/views/CalibrationView.tsx`
- Create: `src/views/CalibrationView.test.tsx`
- Modify: `src/App.tsx`
- Modify: `src/styles/animations.css`

**Consumes:** Calibration state and actions.

**Produces:** A deterministic three-stage calibration demonstration with no permission request.

- [ ] Write interaction tests covering placement check, baseline start, progress completion, `Skip to ready`, and entering Drive Mode.
- [ ] Build the abstract camera viewport with face oval, eye/nose/mouth markers, corner brackets, grid, and clear `Simulated camera` label.
- [ ] Render five placement checks and transition them from checking to passed in a fixed sequence.
- [ ] Animate baseline progress over approximately four seconds and guard against duplicate intervals.
- [ ] Make `Skip to ready` immediately cancel progress, set exactly 100 percent, and expose `Enter Drive Mode`.
- [ ] Under reduced motion, complete the progress without animated transitions.
- [ ] Run `npm test -- --run`.
- [ ] Commit with `feat: add simulated calibration journey`.

### Task 6: Build Drive Mode and demo controls

**Files:**

- Create: `src/components/DemoControls.tsx`
- Create: `src/views/DriveView.tsx`
- Create: `src/views/DriveView.test.tsx`
- Modify: `src/App.tsx`

**Consumes:** `TICK`, `SIMULATE_WARNING`, `SIMULATE_CRITICAL`, `RESTORE_NORMAL`, and `END_SESSION`.

**Produces:** The main simulated monitoring dashboard with bounded live telemetry.

- [ ] Write tests showing that one timer updates elapsed time, controls produce the expected state labels, events remain bounded, and ending a session opens Summary.
- [ ] Render the camera simulator as the largest element.
- [ ] Add status, fatigue meter, PERCLOS, blink rate, closure duration, pitch/yaw, quality, FPS, and duration.
- [ ] Update telemetry once per second with a single cleanup-safe interval.
- [ ] Provide clearly labeled demo controls and keep them reachable on phone layouts.
- [ ] Make state changes immediately readable through text, icon, and color.
- [ ] Run `npm test -- --run`.
- [ ] Commit with `feat: build simulated Drive Mode`.

### Task 7: Add accessible warning and critical alert states

**Files:**

- Create: `src/components/CriticalAlert.tsx`
- Create: `src/components/CriticalAlert.test.tsx`
- Modify: `src/views/DriveView.tsx`
- Modify: `src/styles/animations.css`

**Consumes:** Driver state and `ACKNOWLEDGE_ALERT`.

**Produces:** Non-blocking caution styling and a keyboard-accessible critical overlay.

- [ ] Test alert-dialog role, focus entry, Escape behavior only if it is paired with explicit acknowledgement, focus return, and reduced-motion styling.
- [ ] Add the amber warning treatment without obscuring monitoring data.
- [ ] Add the critical overlay with `WAKE NOW`, simulated-cause text, acknowledgement, visual vibration indicator, and optional tone control.
- [ ] Do not autoplay sound. If a tone is included, generate a brief Web Audio tone only after the user clicks `Demo tone` and stop it on acknowledgement.
- [ ] Ensure the overlay fits at 360×640 with no required page scroll.
- [ ] Run `npm test -- --run`.
- [ ] Commit with `feat: add prototype alert escalation`.

### Task 8: Build summary, replay, and reset behavior

**Files:**

- Create: `src/views/SummaryView.tsx`
- Create: `src/views/SummaryView.test.tsx`
- Modify: `src/App.tsx`

**Consumes:** `summarizeSession`, `END_SESSION`, and `RESET_DEMO`.

**Produces:** A presentation-ready conclusion and reliable replay loop.

- [ ] Test summary calculations using a fixed state fixture.
- [ ] Display all summary metrics listed in Part I.
- [ ] Render the risk-over-time chart and chronological event list.
- [ ] Make `Replay demo` reset all counters, samples, intervals, and view state.
- [ ] Make `Return to overview` reset to the same predictable initial dashboard.
- [ ] Run `npm test -- --run`.
- [ ] Commit with `feat: complete prototype summary flow`.

### Task 9: Responsive, accessibility, and visual QA

**Files:**

- Create: `playwright.config.ts`
- Create: `tests/responsive-demo.spec.ts`
- Modify: relevant components and CSS only when a check exposes a defect.

**Consumes:** The complete demo journey.

**Produces:** Verified layouts and interaction flow at the required viewport sizes.

- [ ] Add Playwright smoke checks at 360×800, 768×1024, 1024×768, and 1440×900.
- [ ] Assert the page has no horizontal body overflow at each viewport.
- [ ] Exercise overview → calibration → skip → drive → critical → acknowledge → summary → replay.
- [ ] Assert the critical acknowledgement button is inside the viewport at 360×640.
- [ ] Run the site with reduced motion and verify no element uses an infinite animation.
- [ ] Use the supplied reference side-by-side to check hierarchy, borders, card density, aqua restraint, and typography—not exact pixel copying.
- [ ] Check keyboard navigation, visible focus, landmark semantics, and 200% zoom.
- [ ] Remove unused starter assets and console logging.
- [ ] Commit with `test: verify responsive demo journey`.

### Task 10: Netlify handoff and presentation documentation

**Files:**

- Modify: `README.md`
- Verify: `netlify.toml`
- Verify: `package.json`

**Consumes:** The completed static build.

**Produces:** A repository that can be pushed to GitHub and imported into Netlify without additional configuration.

- [ ] Document local setup: `npm install`, `npm run dev`, `npm test -- --run`, and `npm run build`.
- [ ] Document the two-minute presentation script.
- [ ] Document that Netlify should use build command `npm run build` and publish directory `dist`.
- [ ] Document limitations: simulated data, no camera, no AI, no real alert reliability, and no hardware control.
- [ ] Run `npm test -- --run`.
- [ ] Run `npx playwright test`.
- [ ] Run `npm run build`.
- [ ] Preview the production build and verify direct load works.
- [ ] Confirm `dist/index.html` exists and contains no local absolute file paths.
- [ ] Commit with `docs: prepare Netlify presentation handoff`.

---

# Part IV — Presentation Script

Use this script during the demo:

1. **Overview:** “OpenWake is an offline-first concept for identifying driver fatigue patterns. Today’s interface is an interactive frontend using simulated data.”
2. **Calibration:** “The production app would verify camera position, eye visibility, and lighting, then learn an anonymous baseline for this driver.”
3. **Drive Mode:** “During a session, the interface combines eye closure, blink behavior, head pose, and signal quality instead of relying on a single threshold.”
4. **Warning:** Trigger `Simulate warning`. “A questionable pattern raises a caution state without immediately overreacting.”
5. **Critical:** Trigger `Simulate critical`. “A sustained pattern escalates to a clear sound-and-vibration alert. This prototype visualizes that escalation.”
6. **Future hardware:** “The architecture leaves room for a paired wake accessory, but hardware output is intentionally disabled until safety testing and safeguards are complete.”
7. **Summary:** “The session view provides an explainable timeline instead of storing camera footage or facial identity.”

## Presenter fallback

If any animation is slow, click `Skip to ready`. If sound is unavailable, continue with the visual alert—the demo is designed to be complete without audio. Reloading the page always restores the starting state.

---

# Part V — Final Codex Verification Checklist

Before handing the result back, Codex must confirm:

- [ ] No camera, microphone, Bluetooth, location, or notification permission is requested.
- [ ] No network request is required for the interface to function after the initial static load.
- [ ] Every live-looking value is deterministic and clearly part of Demo Mode.
- [ ] No `Math.random()` exists in telemetry code.
- [ ] No interval survives view exit or reset.
- [ ] No event or chart array grows without a cap.
- [ ] The critical alert is keyboard accessible and mobile-safe.
- [ ] Reduced motion is respected.
- [ ] The supplied visual reference influenced hierarchy and styling without being copied.
- [ ] All tests and the production build pass.
- [ ] `dist` is ready for Netlify.

## Research Basis

- React recommends modern component-based applications and supports TypeScript workflows: https://react.dev/learn
- React Strict Mode exposes unsafe effects and cleanup mistakes during development: https://react.dev/reference/react/StrictMode
- React recommends modern browser-oriented testing rather than deprecated shallow renderer patterns: https://react.dev/blog/2024/04/25/react-19-upgrade-guide
- Netlify’s documented Vite defaults are `npm run build` and publish directory `dist`: https://docs.netlify.com/build/frameworks/framework-setup-guides/vite/
- Original OpenWake product direction: `OpenWake_Software_Proposal.pdf`.

## Final Decision

For tomorrow, build only this responsive React presentation prototype. Preserve the native Android blueprint as the later engineering path for real camera processing, continuous monitoring, native alerts, and Bluetooth hardware integration.
