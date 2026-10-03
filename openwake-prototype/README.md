# OpenWake Interactive Prototype

OpenWake is a presentation-ready, client-only React prototype for explaining a simulated driver-awareness workflow. Every live-looking value is deterministic and local. The experience does not access a camera, perform facial analysis, contact a backend, or control hardware.

> OpenWake is a presentation prototype. It does not detect real fatigue and must not be used while driving.

## Workspace redesign

The interface follows the AquaSentry and Blindspot workspace design: neutral light/dark surfaces, compact typography, horizontal navigation, bordered metric strips and restrained semantic warning colors. Theme preference is saved independently. The existing Overview, Calibration, Drive and Summary flow, timers, telemetry, alert acknowledgment and replay behavior are preserved.

The intervention panel now reflects the revised proposal: a servo-actuated trigger spray bottle is the primary proposed output; buzzer and LED are additional/backup outputs. The proposed controller is ESP32 over local Wi-Fi, with USB as a development fallback. The panel describes bounded actuation, recovery, inhibition and manual stop as future hardware requirements. All outputs remain disconnected; no physical actuation or waking effectiveness is claimed.

## XAMPP

Run `npm run build` in `openwake-prototype`, start Apache, and open `http://localhost/OpenWake/`. The repository-root PHP entry redirects to the generated static build. Relative asset paths also support Netlify hosting. Generated `dist` files remain excluded from Git; the source and build configuration are committed.

## Local setup

Requirements: Node.js 20.19+ or 22.12+ and npm (matching Vite's supported Node versions).

```bash
npm install
npm run dev
```

Vite prints the local preview URL. Reloading the page always restores the same Overview state.

## Verification

```bash
npm test -- --run
npx playwright install chromium
npx playwright test
npm run build
```

The unit suite covers the deterministic reducer, telemetry, calibration timing, Drive Mode, accessible alert focus, and summary behavior. Playwright exercises the full presentation flow at 360×800, 768×1024, 1024×768, and 1440×900.

## Two-minute presentation script

1. **Overview:** “OpenWake is an offline-first concept for identifying driver fatigue patterns. Today’s interface is an interactive frontend using simulated data.”
2. **Calibration:** Select **Start calibration**, then explain: “The production app would verify camera position, eye visibility, and lighting, then learn an anonymous baseline for this driver.” Use **Skip to ready** when time is tight.
3. **Drive Mode:** “During a session, the interface combines eye closure, blink behavior, head pose, and signal quality instead of relying on a single threshold.”
4. **Warning:** Select **Simulate warning**. “A questionable pattern raises a caution state without immediately overreacting.”
5. **Critical:** Select **Simulate critical**. “A sustained pattern escalates to a clear visual alert. This prototype visualizes that escalation.” Select **Acknowledge alert**.
6. **Intervention:** “Water spray is the primary proposed wake intervention. Buzzer and LED provide additional and backup alerts. All three outputs are disconnected in this preview.”
7. **Summary:** Select **End session**. “The session view provides an explainable timeline instead of storing camera footage or facial identity.”

If animation timing is inconvenient during a live demo, use **Skip to ready**. The critical state is complete without audio.

## Netlify deployment

The repository root includes a `netlify.toml` that sets the base directory to `openwake-prototype`. Import the repository into Netlify; it will use:

- Build command: `npm run build`
- Publish directory: `dist`
- Production artifact: `openwake-prototype/dist`

When deploying this directory by itself, its local `netlify.toml` provides the same build and publish settings.

## Prototype limitations

- All telemetry, landmarks, warnings, and alerts are simulated.
- No camera, microphone, Bluetooth, location, or notification permission is requested.
- No real AI, fatigue detection, facial recognition, biometric storage, or alert reliability is provided.
- No API, account, database, tracking, or analytics service is present.
- The intervention panel cannot connect to or activate spray, buzzer or LED hardware.
- The prototype is not a safety device and must not be used while driving.

## Project structure

```text
src/demo/        Deterministic state, telemetry, and summaries
src/components/  Reusable shell, camera, charts, controls, and alerts
src/views/       Overview, calibration, Drive Mode, and summary screens
tests/           Responsive Playwright journey
dist/            Netlify-ready production build (generated)
```
