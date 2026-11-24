# Changelog

Standalone camera rep-counting test for RepGrind. Not part of the RepGrind app.

## v0.5.0
- **Practice movements page** (`practice.html`): movement testing, sliders, simulate and graph moved off the METGrind page. METGrind itself now shows only the metcon, camera, WOD Code and results. The sliders are shared between the pages.
- **Voice framing help:** before a workout the app says "Move left", "Move right", "Step back" or "Step closer" until you are fully in the picture, and "Good" when you are. Uses the voice setting; silent during a workout.
- **Results and charts:** rep chart, results and history like REPGrind.
- **WOD Code:** the camera phone can send reps to a coach device and follow its start.
- Build: `python3 tools/build.py` makes `index.html` and `practice.html` from `src/app.html`.

## v0.4.6
- **Logo:** the round kettlebell with claw marks, now inside camera corner brackets.

## v0.4.5
- **Logo:** the kettlebell is now round (a ball with a handle), with the claw marks.

## v0.4.4
- **Logo:** a kettlebell with the REPGrind claw marks, on the orange square (v0.4.3 had a barbell, v0.4.2 a kettlebell with a check mark).

## v0.4.3
- **New logo:** a barbell with the same claw marks as REPGrind, on the orange square. Replaces the kettlebell logo of v0.4.2.

## v0.4.2
- **Logo:** orange rounded square, camera corner brackets around a kettlebell with a counted-rep check mark. Used as the header logo, favicon, home-screen icon and in a web app manifest.

## v0.4.1
- METGrind is marked **beta** (page title and a badge next to the name): it is under development.

## v0.4 – METGrind
- **New name and scope:** METGrind. REPGrind is where you make a metcon, METGrind is where you do it. REPGrind's *Open in METGrind* button sends a chipper or rep scheme here as `?metcon=<code>`; you can also paste the link or code.
- Metcon runner: 5-4-3-2-1 countdown, then the clock runs; each set switches the camera to that movement, voice says the next one, and the metcon ends when the last rep is counted. Result with total time and splits, *Copy result*, last 30 results kept on the phone.
- Movements as before: air squat, wall ball, lunge, burpee, jump burpee, Russian and American kettlebell swing. The movement test below the metcon card is unchanged.
- Competing is next: live with a code first, a shared leaderboard later.

## 0.3 (2026-11-24)
- New movements: wall ball (squat standard plus hands must reach a hand-height line at the top), lunge (front knee bend, back knee dropped, upright torso), kettlebell swing Russian (hands above eye level) and American (hands overhead), both with hips open at the top.
- Camera zoom (slider and +/- buttons where the camera supports it) and a camera list, e.g. to pick the ultra-wide lens.
- Same colours and look as the RepGrind app.
- New voice causes: not high enough, hips not open, back knee not low enough.

## 0.2 (2026-11-24)
- New movement selector: air squat, burpee (no jump), burpee with jump.
- Burpee: counts when the torso goes near horizontal (floor line slider) and you come back upright. With the jump variant, the feet must also leave the floor (jump height slider) and, optionally, the hands go above the head.
- Voice causes for burpees: not down to the floor, no jump, hands not overhead.

## 0.1 (2026-11-24)
First versioned release. Air squats only.
- Phone camera plus MediaPipe pose model, everything on the phone.
- A rep counts only if, at the bottom, the knee angle is low enough, the hips are below the knees and the torso is upright. Sliders for all three.
- Voice (English or Finnish) says "no rep" and the cause.
- Both thumbs up starts a set, both open palms stops it (hand gesture model). Start set / Stop set buttons as backup.
- Simulation button tests the counting logic without a camera.
- Live knee-angle graph, rep log, model choice (lite, full, heavy).

Versioning: 0.x while testing. Each change gets a new entry here, the version shown on the page, and a git tag `v0.x`.
