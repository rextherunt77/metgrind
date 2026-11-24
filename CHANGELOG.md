# Changelog

Standalone camera rep-counting test for RepGrind. Not part of the RepGrind app.

## 0.1 (2026-11-24)
First versioned release. Air squats only.
- Phone camera plus MediaPipe pose model, everything on the phone.
- A rep counts only if, at the bottom, the knee angle is low enough, the hips are below the knees and the torso is upright. Sliders for all three.
- Voice (English or Finnish) says "no rep" and the cause.
- Both thumbs up starts a set, both open palms stops it (hand gesture model). Start set / Stop set buttons as backup.
- Simulation button tests the counting logic without a camera.
- Live knee-angle graph, rep log, model choice (lite, full, heavy).

Versioning: 0.x while testing. Each change gets a new entry here, the version shown on the page, and a git tag `v0.x`.
