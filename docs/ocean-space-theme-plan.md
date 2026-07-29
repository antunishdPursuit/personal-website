# Ocean and Space Theme Plan

## Goal

Create two connected versions of the portfolio:

- **Space mode:** the current dark universe with orbiting stars.
- **Ocean mode:** a bright, sunlit underwater environment with drifting particles,
  bubbles, and water-light cues.

Both modes will use the same layout and the same Three.js canvas. The environment
will change without loading two simultaneous 3D scenes.

## Working rules

- Make and review one visual or technical change at a time.
- Keep the existing Three.js particle buffers when possible.
- Do not add realistic water simulation during the first version.
- Keep the canvas pixel ratio capped.
- Stop canvas work while the hero is offscreen.
- Respect `prefers-reduced-motion`.
- Run lint and a production build after each checkpoint.
- Test desktop and mobile before moving to the next checkpoint.

## Checklist

### Checkpoint 1: Theme state and control

- [x] Add `space` and `ocean` theme state.
- [x] Use the operating-system preference on a first visit.
- [x] Remember a manual choice.
- [x] Apply the saved theme before React renders.
- [x] Add an accessible navigation toggle.
- [x] Pass lint and the production build.
- [x] Visually confirm the toggle on desktop.
- [x] Visually confirm the toggle in the mobile navigation.
- [x] Confirm the selection remains after a reload.

### Checkpoint 2: Semantic color system

- [x] Define theme-independent color names for the page surface, text, borders,
      accents, panels, and navigation.
- [x] Preserve the current appearance in space mode.
- [x] Add an accessible ocean palette.
- [x] Change the fixed CSS starfield into an ocean-compatible ambient layer.
- [x] Confirm text and control contrast in both modes.
- [x] Confirm that switching themes does not shift the layout.

### Checkpoint 3: Shared Three.js environment

- [x] Pass the current environment into `ParticleField`.
- [x] Keep one `Canvas`.
- [x] Keep particle positions and materials memoized.
- [x] Preserve the current space movement.
- [x] Interpolate scene colors instead of remounting the canvas.
- [x] Confirm that toggling does not create another WebGL context.

### Checkpoint 4: Ocean particle behavior

- [x] Change star colors into white, aqua, and warm sunlight tones.
- [x] Change orbital rotation into slow upward and lateral current movement.
- [x] Use mostly small suspended particles.
- [x] Add a small number of recognizable bubbles.
- [x] Add a lightweight water-surface or light-ray cue.
- [x] Avoid shadows, reflections, physical water materials, and post-processing.

### Checkpoint 5: Motion and lifecycle

- [x] Provide a stable reduced-motion version of each environment.
- [x] Keep the hero intersection observer.
- [ ] Confirm rendering stops when the hero is offscreen.
- [ ] Check pointer movement in both environments.
- [ ] Check scrolling while the canvas is active.

### Checkpoint 6: Verification

- [ ] Run `npm run lint`.
- [ ] Run `npm run build`.
- [ ] Test current Chrome, Safari, and Firefox.
- [ ] Test a narrow mobile viewport.
- [ ] Test system light and dark preferences.
- [ ] Test reduced motion.
- [ ] Compare scroll and theme-switch responsiveness.
- [ ] Record any remaining visual or performance problems.

### Checkpoint 7: Hero tuning

- [x] Remove the duplicate fixed CSS starfield.
- [x] Keep the Three.js canvas as the only particle system.
- [x] Separate permanent star rotation from pointer easing.
- [x] Add subtle scroll influence without changing the base orbit speed.
- [x] Replace the pale ocean background with the Sunlit Lagoon palette.
- [x] Use normal alpha blending for ocean particles.
- [x] Increase ocean particle and bubble contrast.
- [x] Add two lightweight surface-wave lines.
- [x] Confirm that the waves do not create horizontal overflow.
- [x] Confirm that space frames continue changing without pointer input.
- [x] Confirm one canvas in space and ocean modes.
- [x] Add coordinated particle-level wave motion in ocean mode.
- [x] Keep immutable base positions so ocean particles cannot drift away.
- [x] Give near particles and bubbles stronger current movement.
- [x] Restore the original particle sphere when returning to space.
- [x] Move ocean particles from left to right with horizontal wrapping.
- [x] Preserve vertical wave motion while ocean particles travel.
- [x] Add a second two-line wave band below the hero calls to action.
- [x] Hide both wave bands in space mode.
- [x] Verify desktop and mobile placement without horizontal overflow.

## Later enhancements

These items are outside the first ocean hero implementation:

- A miniature character with space and ocean variants.
- A bioluminescent transition between the two environments.
- The Saturn-ring and ocean-ripple journey redesign.
- Themed frames for project and certificate images.
- Advanced water shaders or realistic wave simulation.
