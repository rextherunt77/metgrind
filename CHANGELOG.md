# Changelog

Standalone camera rep-counting test for RepGrind. Not part of the RepGrind app.

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
